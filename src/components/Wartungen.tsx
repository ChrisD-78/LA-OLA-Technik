import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
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
  Image
} from 'lucide-react';
import ImageGalleryModal from './ImageGalleryModal';
import { Inspection, Equipment } from '../types';

interface WartungenProps {
  inspections: Inspection[];
  equipment: Equipment[];
  onDelete: (id: string) => void;
  onUpdate: (inspection: Inspection) => void;
}

const Wartungen: React.FC<WartungenProps> = ({ inspections, equipment, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtere nur Wartungen
  const wartungen = inspections.filter(insp => 
    insp.category === 'wartung' || 
    insp.type === 'maintenance' ||
    insp.notes?.toLowerCase().includes('wartung') ||
    insp.inspector.toLowerCase().includes('wartung')
  );

  const filteredWartungen = wartungen.filter(wartung => {
    const equipmentItem = equipment.find(eq => eq.id === wartung.equipmentId);
    const matchesSearch = 
      (equipmentItem?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      wartung.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wartung.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wartung.status === statusFilter;
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

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Wartung löschen möchten?')) {
      onDelete(id);
    }
  };

  const stats = {
    total: wartungen.length,
    pending: wartungen.filter(w => w.status === 'pending').length,
    completed: wartungen.filter(w => w.status === 'completed').length,
    overdue: wartungen.filter(w => {
      if (w.status === 'pending' && w.scheduledDate) {
        return new Date(w.scheduledDate) < new Date();
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
        <h1 className="text-4xl font-bold text-white mb-4">Wartungen</h1>
        <p className="text-xl text-white/90">Übersicht aller Wartungsarbeiten und -planungen</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-modern grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="stats-icon">
            <Wrench className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.total}</div>
          <div className="stats-label">Gesamt Wartungen</div>
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
          <h2 className="text-2xl font-bold text-gray-900">Wartungs-Übersicht</h2>
          <button 
            className="btn-modern btn-primary"
            onClick={() => navigate('/inspections/new?category=wartung')}
          >
            <Plus className="h-4 w-4" />
            Neue Wartung planen
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

      {/* Wartungen Table */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-4">Anlage</th>
                <th className="text-left py-4 px-4">Geplant für</th>
                <th className="text-left py-4 px-4">Prüfer</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Ergebnis</th>
                <th className="text-left py-4 px-4">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredWartungen.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    <div className="empty-state-modern">
                      <Wrench className="empty-state-icon" />
                      <p>Keine Wartungen gefunden</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWartungen.map(wartung => {
                  const equipmentItem = getEquipmentById(wartung.equipmentId);
                  return (
                    <tr key={wartung.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {equipmentItem?.name || wartung.equipmentId}
                            </div>
                            <div className="text-sm text-gray-500">
                              {equipmentItem?.type || 'Unbekannter Typ'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{new Date(wartung.scheduledDate).toLocaleDateString('de-DE')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{wartung.inspector}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(wartung.status)}
                          <span className="ml-2">{getStatusBadge(wartung)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {wartung.result ? (
                          <span className={`badge-modern ${
                            wartung.result === 'passed' ? 'badge-success' :
                            wartung.result === 'failed' ? 'badge-danger' :
                            'badge-warning'
                          }`}>
                            {wartung.result === 'passed' ? 'Bestanden' :
                             wartung.result === 'failed' ? 'Nicht bestanden' :
                             'Bedingt'}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/inspections/edit/${wartung.id}`)}
                            className="btn-modern btn-secondary p-2"
                            title="Bearbeiten"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(wartung.id)}
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

export default Wartungen;
