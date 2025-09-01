import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  CheckSquare, 
  AlertTriangle, 
  Calendar,
  Plus,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Equipment, Inspection, DashboardStats } from '../types';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

interface DashboardProps {
  equipment: Equipment[];
  inspections: Inspection[];
}

const Dashboard: React.FC<DashboardProps> = ({ equipment, inspections }) => {
  const today = new Date();
  
  const stats: DashboardStats = {
    totalEquipment: equipment.length,
    activeEquipment: equipment.filter(eq => eq.status === 'active').length,
    pendingInspections: inspections.filter(insp => insp.status === 'pending').length,
    overdueInspections: inspections.filter(insp => 
      insp.status === 'pending' && isBefore(new Date(insp.scheduledDate), today)
    ).length,
    completedInspectionsThisMonth: inspections.filter(insp => 
      insp.status === 'completed' && 
      insp.completedDate && 
      new Date(insp.completedDate).getMonth() === today.getMonth()
    ).length
  };

  const upcomingInspections = inspections
    .filter(insp => insp.status === 'pending')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  const overdueInspections = inspections.filter(insp => 
    insp.status === 'pending' && isBefore(new Date(insp.scheduledDate), today)
  );

  const getEquipmentById = (id: string) => {
    return equipment.find(eq => eq.id === id);
  };

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

  const getInspectionStatusBadge = (inspection: Inspection) => {
    if (inspection.status === 'completed') {
      return <span className="badge badge-success">Abgeschlossen</span>;
    }
    if (isBefore(new Date(inspection.scheduledDate), today)) {
      return <span className="badge badge-danger">Überfällig</span>;
    }
    return <span className="badge badge-warning">Anstehend</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/equipment/new" className="btn btn-primary">
            <Plus className="h-4 w-4" />
            Gerät hinzufügen
          </Link>
          <Link to="/inspections/new" className="btn btn-secondary">
            <CheckSquare className="h-4 w-4" />
            Prüfung planen
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Gesamt Geräte</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Aktive Geräte</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeEquipment}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-yellow-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Anstehende Prüfungen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingInspections}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Überfällige Prüfungen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdueInspections}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Prüfungen diesen Monat</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedInspectionsThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Inspections */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Anstehende Prüfungen</h2>
            <Link to="/inspections" className="text-blue-600 hover:text-blue-800 text-sm">
              Alle anzeigen
            </Link>
          </div>
          
          {upcomingInspections.length === 0 ? (
            <div className="empty-state">
              <Calendar className="empty-state-icon" />
              <p>Keine anstehenden Prüfungen</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingInspections.map(inspection => {
                const equipment = getEquipmentById(inspection.equipmentId);
                return (
                  <div key={inspection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{equipment?.name}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(inspection.scheduledDate), 'dd.MM.yyyy', { locale: de })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getInspectionStatusBadge(inspection)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Overdue Inspections */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Überfällige Prüfungen</h2>
            {overdueInspections.length > 0 && (
              <span className="badge badge-danger">{overdueInspections.length}</span>
            )}
          </div>
          
          {overdueInspections.length === 0 ? (
            <div className="empty-state">
              <CheckSquare className="empty-state-icon" />
              <p>Keine überfälligen Prüfungen</p>
            </div>
          ) : (
            <div className="space-y-3">
              {overdueInspections.slice(0, 5).map(inspection => {
                const equipment = getEquipmentById(inspection.equipmentId);
                return (
                  <div key={inspection.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{equipment?.name}</p>
                      <p className="text-sm text-red-600">
                        Überfällig seit {format(new Date(inspection.scheduledDate), 'dd.MM.yyyy', { locale: de })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="badge badge-danger">Überfällig</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 