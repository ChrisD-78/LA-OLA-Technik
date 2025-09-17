import { Equipment, Inspection, InspectionTemplate } from '../types';

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'CNC-Fräsmaschine Haas VF-2',
    type: 'Fertigungsmaschine',
    location: 'Halle A, Arbeitsplatz 1',
    manufacturer: 'Haas Automation',
    model: 'VF-2',
    serialNumber: 'HAAS-2023-001',
    purchaseDate: '2023-01-15',
    lastInspection: '2024-01-15',
    nextInspection: '2024-07-15',
    status: 'active',
    notes: 'Hauptmaschine für Aluminium-Bearbeitung'
  },
  {
    id: '2',
    name: 'Schweißgerät Fronius TransPuls Synergic 5000',
    type: 'Schweißgerät',
    location: 'Halle B, Arbeitsplatz 3',
    manufacturer: 'Fronius',
    model: 'TransPuls Synergic 5000',
    serialNumber: 'FRON-2022-045',
    purchaseDate: '2022-06-20',
    lastInspection: '2024-02-10',
    nextInspection: '2024-08-10',
    status: 'active',
    notes: 'Für MIG/MAG-Schweißungen'
  },
  {
    id: '3',
    name: 'Kran 5t Brückenkran',
    type: 'Hebegerät',
    location: 'Halle A, Kranbahn',
    manufacturer: 'Demag',
    model: 'DR 5t',
    serialNumber: 'DEMAG-2021-078',
    purchaseDate: '2021-03-10',
    lastInspection: '2023-12-01',
    nextInspection: '2024-06-01',
    status: 'active',
    notes: 'Jährliche TÜV-Prüfung erforderlich'
  },
  {
    id: '4',
    name: 'Druckluftkompressor Atlas Copco GA 75',
    type: 'Kompressor',
    location: 'Technikraum',
    manufacturer: 'Atlas Copco',
    model: 'GA 75',
    serialNumber: 'ATLAS-2020-123',
    purchaseDate: '2020-09-05',
    lastInspection: '2024-01-20',
    nextInspection: '2024-07-20',
    status: 'active',
    notes: 'Versorgt gesamte Halle mit Druckluft'
  },
  {
    id: '5',
    name: 'Laser-Cutter Trumpf TruLaser 3030',
    type: 'Laserschneidmaschine',
    location: 'Halle C, Arbeitsplatz 2',
    manufacturer: 'Trumpf',
    model: 'TruLaser 3030',
    serialNumber: 'TRUMPF-2023-056',
    purchaseDate: '2023-08-12',
    lastInspection: '2024-03-01',
    nextInspection: '2024-09-01',
    status: 'maintenance',
    notes: 'Wartung läuft - Laseroptik wird getauscht'
  }
];

export const mockInspections: Inspection[] = [
  {
    id: '1',
    equipmentId: '1',
    type: 'technical_inspection',
    scheduledDate: '2024-07-15',
    inspector: 'Max Mustermann',
    status: 'pending',
    notes: 'Technische Prüfung nach DGUV V3'
  },
  {
    id: '2',
    equipmentId: '2',
    type: 'maintenance',
    scheduledDate: '2024-08-10',
    inspector: 'Anna Schmidt',
    status: 'pending',
    notes: 'Wartung und Kalibrierung'
  },
  {
    id: '3',
    equipmentId: '3',
    type: 'technical_inspection',
    scheduledDate: '2024-06-01',
    inspector: 'TÜV Süd',
    status: 'pending',
    notes: 'Jährliche TÜV-Prüfung nach BetrSichV'
  },
  {
    id: '4',
    equipmentId: '4',
    type: 'maintenance',
    scheduledDate: '2024-07-20',
    inspector: 'Technischer Dienst',
    status: 'pending',
    notes: 'Filterwechsel und Ölwechsel'
  },
  {
    id: '5',
    equipmentId: '5',
    type: 'maintenance',
    scheduledDate: '2024-03-15',
    completedDate: '2024-03-15',
    inspector: 'Trumpf Service',
    status: 'completed',
    result: 'passed',
    notes: 'Laseroptik gewechselt, Kalibrierung durchgeführt',
    nextInspectionDate: '2024-09-15'
  },
  {
    id: '6',
    equipmentId: '1',
    type: 'maintenance',
    scheduledDate: '2024-01-15',
    completedDate: '2024-01-15',
    inspector: 'Haas Service',
    status: 'completed',
    result: 'passed',
    notes: 'Routinewartung - alle Werte im Normbereich',
    nextInspectionDate: '2024-07-15'
  }
];

export const mockInspectionTemplates: InspectionTemplate[] = [
  {
    id: '1',
    name: 'Technische Prüfung DGUV V3',
    type: 'technical_inspection',
    frequency: 365,
    description: 'Jährliche technische Prüfung nach DGUV Vorschrift 3',
    checklist: [
      'Schutzvorrichtungen funktionsfähig',
      'Notaus-Schalter funktionsfähig',
      'Kabel und Steckverbindungen intakt',
      'Gehäuse und Abdeckungen fest',
      'Sicherheitshinweise lesbar'
    ]
  },
  {
    id: '2',
    name: 'Wartung CNC-Maschine',
    type: 'maintenance',
    frequency: 180,
    description: 'Halbjährliche Wartung für CNC-Maschinen',
    checklist: [
      'Kühlschmierstoff wechseln',
      'Filter reinigen/wechseln',
      'Schmierstellen nachschmieren',
      'Spindelspiel prüfen',
      'Maschinenparameter kontrollieren'
    ]
  },
  {
    id: '3',
    name: 'TÜV-Prüfung Hebezeuge',
    type: 'technical_inspection',
    frequency: 365,
    description: 'Jährliche TÜV-Prüfung für Hebezeuge nach BetrSichV',
    checklist: [
      'Tragfähigkeit prüfen',
      'Seilzug und Ketten kontrollieren',
      'Bremsen testen',
      'Sicherheitseinrichtungen prüfen',
      'Dokumentation vervollständigen'
    ]
  },
  {
    id: '4',
    name: 'Kalibrierung Messgeräte',
    type: 'measurement_devices',
    frequency: 90,
    description: 'Vierteljährliche Kalibrierung von Messgeräten',
    checklist: [
      'Messgenauigkeit prüfen',
      'Referenzwerte kalibrieren',
      'Messunsicherheit bestimmen',
      'Kalibrierschein ausstellen',
      'Nächsten Kalibriertermin festlegen'
    ]
  }
]; 