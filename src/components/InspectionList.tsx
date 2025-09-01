import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { Equipment, Inspection } from '../types';
import { format, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';

interface InspectionListProps {
  inspections: Inspection[];
  equipment: Equipment[];
  onDelete: (id: string) => void;
}

const InspectionList: React.FC<InspectionListProps> = ({ inspections, equipment, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredInspections = inspections.filter(insp => {
    const equipmentItem = equipment.find(eq => eq.id === insp.equipmentId);
    const matchesSearch = equipmentItem?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || insp.status === statusFilter;
    const matchesType = typeFilter === 'all' || insp.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (inspection: Inspection) => {
    const today = new Date();
    if (inspection.status === 'completed') {
      return <span className="badge badge-success">Abgeschlossen</span>;
    }
    if (isBefore(new Date(inspection.scheduledDate), today)) {
      return <span className="badge badge-danger">Überfällig</span>;
    }
    return <span className="badge badge-warning">Anstehend</span>;
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'safety':
        return <span className="badge badge-danger">Sicherheit</span>;
      case 'maintenance':
        return <span className="badge badge-warning">Wartung</span>;
      case 'calibration':
        return <span className="badge badge-secondary">Kalibrierung</span>;
      case 'certification':
        return <span className="badge badge-success">Zertifizierung</span>;
      default:
        return <span className="badge badge-secondary">{type}</span>;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Prüfung löschen möchten?')) {
      onDelete(id);
    }
  };

  const getEquipmentById = (id: string) => {
    return equipment.find(eq => eq.id === id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Prüfungen</h1>
        <Link to="/inspections/new" className="btn btn-primary">
          <Plus className="h-4 w-4" />
          Prüfung planen
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="form-label">Suche</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Gerät, Prüfer, Notizen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Alle Status</option>
              <option value="pending">Anstehend</option>
              <option value="completed">Abgeschlossen</option>
              <option value="overdue">Überfällig</option>
              <option value="cancelled">Abgebrochen</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Typ</label>
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Alle Typen</option>
              <option value="safety">Sicherheit</option>
              <option value="maintenance">Wartung</option>
              <option value="calibration">Kalibrierung</option>
              <option value="certification">Zertifizierung</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">&nbsp;</label>
            <button
              className="btn btn-secondary w-full"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
      </div>

      {/* Inspections Table */}
      {filteredInspections.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <CheckSquare className="empty-state-icon" />
            <p>Keine Prüfungen gefunden</p>
            <p className="text-sm text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                ? 'Versuchen Sie andere Suchkriterien' 
                : 'Planen Sie Ihre erste Prüfung'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Gerät</th>
                  <th>Typ</th>
                  <th>Geplant für</th>
                  <th>Prüfer</th>
                  <th>Status</th>
                  <th>Ergebnis</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredInspections.map(inspection => {
                  const equipmentItem = getEquipmentById(inspection.equipmentId);
                  return (
                    <tr key={inspection.id}>
                      <td>
                        <div>
                          <div className="font-medium text-gray-900">
                            {equipmentItem?.name || 'Unbekanntes Gerät'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {equipmentItem?.location}
                          </div>
                        </div>
                      </td>
                      <td>{getTypeBadge(inspection.type)}</td>
                      <td>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {format(new Date(inspection.scheduledDate), 'dd.MM.yyyy', { locale: de })}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {inspection.inspector}
                        </div>
                      </td>
                      <td>{getStatusBadge(inspection)}</td>
                      <td>
                        {inspection.result ? (
                          <span className={`badge ${
                            inspection.result === 'passed' ? 'badge-success' :
                            inspection.result === 'failed' ? 'badge-danger' :
                            'badge-warning'
                          }`}>
                            {inspection.result === 'passed' ? 'Bestanden' :
                             inspection.result === 'failed' ? 'Nicht bestanden' :
                             'Bedingt'}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <Link
                            to={`/inspections/edit/${inspection.id}`}
                            className="btn btn-secondary"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(inspection.id)}
                            className="btn btn-danger"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionList; 