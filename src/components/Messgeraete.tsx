import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Thermometer,
  Gauge,
  Zap,
  Droplets,
  Wind,
  Settings
} from 'lucide-react';
import { Equipment } from '../types';

interface MessgeraeteProps {
  equipment: Equipment[];
  onDelete: (id: string) => void;
  onUpdate: (equipment: Equipment) => void;
}

const Messgeraete: React.FC<MessgeraeteProps> = ({ equipment, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtere nur Messgeräte
  const messgeraete = equipment.filter(eq => 
    eq.category === 'messgeraete' || 
    eq.type.toLowerCase().includes('mess') ||
    eq.name.toLowerCase().includes('mess') ||
    eq.name.toLowerCase().includes('sensor') ||
    eq.name.toLowerCase().includes('thermometer') ||
    eq.name.toLowerCase().includes('druck') ||
    eq.name.toLowerCase().includes('ph')
  );

  const filteredEquipment = messgeraete.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge-modern badge-success">Aktiv</span>;
      case 'inactive':
        return <span className="badge-modern badge-secondary">Inaktiv</span>;
      case 'maintenance':
        return <span className="badge-modern badge-warning">Wartung</span>;
      default:
        return <span className="badge-modern badge-secondary">{status}</span>;
    }
  };

  const getEquipmentIcon = (name: string, type: string) => {
    const lowerName = name.toLowerCase();
    const lowerType = type.toLowerCase();
    
    if (lowerName.includes('thermometer') || lowerName.includes('temperatur') || lowerType.includes('temperatur')) {
      return <Thermometer className="h-6 w-6 text-red-500" />;
    }
    if (lowerName.includes('druck') || lowerName.includes('pressure') || lowerType.includes('druck')) {
      return <Gauge className="h-6 w-6 text-blue-500" />;
    }
    if (lowerName.includes('ph') || lowerName.includes('wasser') || lowerType.includes('wasser')) {
      return <Droplets className="h-6 w-6 text-cyan-500" />;
    }
    if (lowerName.includes('strom') || lowerName.includes('spannung') || lowerType.includes('elektro')) {
      return <Zap className="h-6 w-6 text-yellow-500" />;
    }
    if (lowerName.includes('luft') || lowerName.includes('lüftung') || lowerType.includes('lüftung')) {
      return <Wind className="h-6 w-6 text-gray-500" />;
    }
    return <Settings className="h-6 w-6 text-purple-500" />;
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Messgerät löschen möchten?')) {
      onDelete(id);
    }
  };

  const stats = {
    total: messgeraete.length,
    active: messgeraete.filter(eq => eq.status === 'active').length,
    maintenance: messgeraete.filter(eq => eq.status === 'maintenance').length,
    inactive: messgeraete.filter(eq => eq.status === 'inactive').length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Messgeräte</h1>
        <p className="text-xl text-white/90">Übersicht aller Messgeräte und Sensoren</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-modern grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="stats-icon">
            <Package className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.total}</div>
          <div className="stats-label">Gesamt Messgeräte</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <Settings className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.active}</div>
          <div className="stats-label">Aktive Geräte</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <Edit className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.maintenance}</div>
          <div className="stats-label">In Wartung</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <Trash2 className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.inactive}</div>
          <div className="stats-label">Inaktiv</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-modern">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Messgeräte-Übersicht</h2>
          <button 
            className="btn-modern btn-primary"
            onClick={() => navigate('/equipment/new?category=messgeraete')}
          >
            <Plus className="h-4 w-4" />
            Neues Messgerät hinzufügen
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
                placeholder="Messgerät, Typ, Standort..."
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
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
              <option value="maintenance">Wartung</option>
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
      
      {/* Equipment Grid */}
      <div className="grid-modern grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.length === 0 ? (
          <div className="col-span-full">
            <div className="empty-state-modern">
              <Package className="empty-state-icon" />
              <p>Keine Messgeräte gefunden</p>
            </div>
          </div>
        ) : (
          filteredEquipment.map(eq => (
            <div key={eq.id} className="card-modern hover:transform hover:scale-105 transition-all duration-300">
              {/* Hauptbild anzeigen */}
              {eq.images && eq.images.length > 0 && (
                <div className="mb-4">
                  <img
                    src={eq.images.find(img => img.isMainImage)?.url || eq.images[0].url}
                    alt={eq.name}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {getEquipmentIcon(eq.name, eq.type)}
                  <h3 className="font-semibold text-gray-900 ml-2">{eq.name}</h3>
                </div>
                {getStatusBadge(eq.status)}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Typ:</strong> {eq.type}</p>
                <p><strong>Standort:</strong> {eq.location}</p>
                <p><strong>Hersteller:</strong> {eq.manufacturer} {eq.model}</p>
                <p><strong>Seriennummer:</strong> {eq.serialNumber}</p>
                {eq.nextInspection && (
                  <p><strong>Nächste Prüfung:</strong> {new Date(eq.nextInspection).toLocaleDateString('de-DE')}</p>
                )}
              </div>
              
              {eq.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{eq.notes}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/equipment/edit/${eq.id}`)}
                  className="btn-modern btn-secondary flex-1"
                >
                  <Edit className="h-4 w-4" />
                  Bearbeiten
                </button>
                <button
                  onClick={() => handleDelete(eq.id)}
                  className="btn-modern btn-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messgeraete;
