import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  CheckSquare, 
  AlertTriangle, 
  Plus,
  TrendingUp
} from 'lucide-react';
import { Equipment, Inspection, DashboardStats } from '../types';
import { isBefore } from 'date-fns';

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


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🏊‍♂️ LA OLA Technik Dashboard 
          <span className="text-sm text-blue-600 ml-4">🔄 Auto-Deploy</span>
        </h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Überfällige Prüfungen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdueInspections}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard; 