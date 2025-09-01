import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  User,
  Package,
  Shield,
  FileText,
  Battery,
  Power
} from 'lucide-react';
import { Inspection, Equipment } from '../types';

interface ElektrischePruefungenProps {
  inspections: Inspection[];
  equipment: Equipment[];
  onDelete: (id: string) => void;
  onUpdate: (inspection: Inspection) => void;
}

const ElektrischePruefungen: React.FC<ElektrischePruefungenProps> = ({ inspections, equipment, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtere nur elektrische Prüfungen
  const elektrischePruefungen = inspections.filter(insp => 
    insp.category === 'elektrische_pruefung' || 
    insp.type === 'electrical' ||
    insp.notes?.toLowerCase().includes('elektrisch') ||
    insp.notes?.toLowerCase().includes('strom') ||
    insp.notes?.toLowerCase().includes('spannung') ||
    insp.notes?.toLowerCase().includes('vde') ||
    insp.notes?.toLowerCase().includes('dguv') ||
    insp.inspector.toLowerCase().includes('elektro') ||
    insp.inspector.toLowerCase().includes('elektrisch')
  );

  const filteredPruefungen = elektrischePruefungen.filter(pruefung => {
    const equipmentItem = equipment.find(eq => eq.id === pruefung.equipmentId);
    const matchesSearch = 
      (equipmentItem?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      pruefung.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pruefung.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pruefung.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (inspection: Inspection) => {
    const today = new Date();
    if (inspection.status === 'completed') {
      return <span className="badge-modern badge-success">Abgeschlossen</span>;
    }
    if (new Date(inspection.scheduledDate) < today) {
      return <span className="badge-modern badge-danger">Überfällig</span>;
    }
    return <span className="badge-modern badge-warning">Anstehend</span>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'electrical':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'safety':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'calibration':
        return <Battery className="h-5 w-5 text-green-500" />;
      default:
        return <Power className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese elektrische Prüfung löschen möchten?')) {
      onDelete(id);
    }
  };

  const stats = {
    total: elektrischePruefungen.length,
    pending: elektrischePruefungen.filter(p => p.status === 'pending').length,
    completed: elektrischePruefungen.filter(p => p.status === 'completed').length,
    overdue: elektrischePruefungen.filter(p => {
      if (p.status === 'pending' && p.scheduledDate) {
        return new Date(p.scheduledDate) < new Date();
      }
      return false;
    }).length
  };

  const getEquipmentById = (id: string) => {
    return equipment.find(eq => eq.id === id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Elektrische Prüfungen</h1>
        <p className="text-xl text-white/90">Übersicht aller elektrischen Prüfungen und Sicherheitsprüfungen</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-modern grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="stats-icon">
            <Zap className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.total}</div>
          <div className="stats-label">Gesamt Prüfungen</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <Clock className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.pending}</div>
          <div className="stats-label">Anstehend</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.completed}</div>
          <div className="stats-label">Abgeschlossen</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.overdue}</div>
          <div className="stats-label">Überfällig</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-modern">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Elektrische Prüfungen</h2>
          <button 
            className="btn-modern btn-primary"
            onClick={() => navigate('/inspections/new?category=elektrische_pruefung')}
          >
            <Plus className="h-4 w-4" />
            Neue Prüfung planen
          </button>
        </div>

        <div className="grid-modern grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="form-group-modern">
            <label className="form-label-modern">Suche</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="form-input-modern pl-10"
                placeholder="Anlage, Prüfer, Notizen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group-modern">
            <label className="form-label-modern">Status</label>
            <select
              className="form-select-modern"
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
          
          <div className="form-group-modern">
            <label className="form-label-modern">&nbsp;</label>
            <button
              className="btn-modern btn-secondary w-full"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter zurücksetzen
            </button>
          </div>
        </div>
      </div>

      {/* Prüfungen Table */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-4">Anlage</th>
                <th className="text-left py-4 px-4">Prüfungstyp</th>
                <th className="text-left py-4 px-4">Geplant für</th>
                <th className="text-left py-4 px-4">Prüfer</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Ergebnis</th>
                <th className="text-left py-4 px-4">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredPruefungen.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    <div className="empty-state-modern">
                      <Zap className="empty-state-icon" />
                      <p>Keine elektrischen Prüfungen gefunden</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPruefungen.map(pruefung => {
                  const equipmentItem = getEquipmentById(pruefung.equipmentId);
                  return (
                    <tr key={pruefung.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {equipmentItem?.name || pruefung.equipmentId}
                            </div>
                            <div className="text-sm text-gray-500">
                              {equipmentItem?.type || 'Unbekannter Typ'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {getTypeIcon(pruefung.type)}
                          <span className="ml-2">
                            {pruefung.type === 'electrical' ? 'Elektrische Prüfung' :
                             pruefung.type === 'calibration' ? 'Kalibrierung' :
                             pruefung.type === 'electrical_inspection' ? 'Elektrische Prüfung' :
                             pruefung.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{new Date(pruefung.scheduledDate).toLocaleDateString('de-DE')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{pruefung.inspector}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(pruefung.status)}
                          <span className="ml-2">{getStatusBadge(pruefung)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {pruefung.result ? (
                          <span className={`badge-modern ${
                            pruefung.result === 'passed' ? 'badge-success' :
                            pruefung.result === 'failed' ? 'badge-danger' :
                            'badge-warning'
                          }`}>
                            {pruefung.result === 'passed' ? 'Bestanden' :
                             pruefung.result === 'failed' ? 'Nicht bestanden' :
                             'Bedingt'}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/inspections/edit/${pruefung.id}`)}
                            className="btn-modern btn-secondary p-2"
                            title="Bearbeiten"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(pruefung.id)}
                            className="btn-modern btn-danger p-2"
                            title="Löschen"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElektrischePruefungen;
