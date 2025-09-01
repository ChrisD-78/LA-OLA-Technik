export interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  lastInspection?: string;
  nextInspection?: string;
  status: 'active' | 'inactive' | 'maintenance';
  notes?: string;
  images?: EquipmentImage[];
  category?: 'messgeraete' | 'anlagen' | 'elektrotechnik' | 'sanitaer' | 'lueftung' | 'heizung' | 'sicherheit' | 'sonstiges';
}

export interface EquipmentImage {
  id: string;
  filename: string;
  url: string;
  description?: string;
  uploadedAt: string;
  isMainImage: boolean;
}

export interface InspectionDocument {
  id: string;
  filename: string;
  url: string;
  description?: string;
  uploadedAt: string;
  fileSize: number;
}

export interface Inspection {
  id: string;
  equipmentId: string;
  type: 'maintenance' | 'calibration' | 'certification' | 'technical' | 'electrical' | 'technical_inspection' | 'electrical_inspection';
  scheduledDate: string;
  completedDate?: string;
  inspector: string;
  status: 'pending' | 'completed' | 'overdue' | 'cancelled';
  result?: 'passed' | 'failed' | 'conditional';
  notes?: string;
  findings?: string;
  nextInspectionDate?: string;
  category?: 'wartung' | 'technische_pruefung' | 'elektrische_pruefung' | 'messgeraete_pruefung';
  documents?: InspectionDocument[];
}

export interface InspectionTemplate {
  id: string;
  name: string;
  type: 'maintenance' | 'calibration' | 'certification' | 'technical' | 'electrical' | 'technical_inspection' | 'electrical_inspection';
  frequency: number; // in days
  description: string;
  checklist?: string[];
  category?: 'wartung' | 'technische_pruefung' | 'elektrische_pruefung' | 'messgeraete_pruefung';
}

export interface DashboardStats {
  totalEquipment: number;
  activeEquipment: number;
  pendingInspections: number;
  overdueInspections: number;
  completedInspectionsThisMonth: number;
} 