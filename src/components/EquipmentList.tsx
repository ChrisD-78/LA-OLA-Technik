import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Calendar
} from 'lucide-react';
import { Equipment } from '../types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface EquipmentListProps {
  equipment: Equipment[];
  onDelete: (id: string) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    const matchesType = typeFilter === 'all' || eq.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Aktiv</span>;
      case 'inactive':
        return <span className="badge badge-secondary">Inaktiv</span>;
      case 'maintenance':
        return <span className="badge badge-warning">Wartung</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Gerät löschen möchten?')) {
      onDelete(id);
    }
  };

  const standardTypes = ['Wartung', 'Messgeräte', 'Technische Prüfungen', 'Elektrische Prüfungen', 'Lüftungsanlagen'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Geräte</h1>
        <Link to="/equipment/new" className="btn btn-primary">
          <Plus className="h-4 w-4" />
          Gerät hinzufügen
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
                placeholder="Gerät, Typ, Standort..."
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
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
              <option value="maintenance">Wartung</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Typ</label>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                className={`btn-modern ${
                  typeFilter === 'all' 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
                onClick={() => setTypeFilter('all')}
              >
                Alle Typen
              </button>
              {standardTypes.map(type => (
                <button
                  key={type}
                  className={`btn-modern ${
                    typeFilter === type 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
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

      {/* Equipment List */}
      {filteredEquipment.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <Package className="empty-state-icon" />
            <p>Keine Geräte gefunden</p>
            <p className="text-sm text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                ? 'Versuchen Sie andere Suchkriterien' 
                : 'Fügen Sie Ihr erstes Gerät hinzu'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map(eq => (
            <div key={eq.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Package className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{eq.name}</h3>
                </div>
                {getStatusBadge(eq.status)}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-20">Typ:</span>
                  <span>{eq.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{eq.location}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Hersteller:</span> {eq.manufacturer} {eq.model}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Seriennummer:</span> {eq.serialNumber}
                </div>
                {eq.nextInspection && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Nächste Prüfung: {format(new Date(eq.nextInspection), 'dd.MM.yyyy', { locale: de })}</span>
                  </div>
                )}
              </div>
              
              {eq.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{eq.notes}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Link
                  to={`/equipment/edit/${eq.id}`}
                  className="btn btn-secondary flex-1"
                >
                  <Edit className="h-4 w-4" />
                  Bearbeiten
                </Link>
                <button
                  onClick={() => handleDelete(eq.id)}
                  className="btn btn-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentList; 