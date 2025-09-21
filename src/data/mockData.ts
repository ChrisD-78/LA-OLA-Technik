import { Equipment, Inspection, InspectionTemplate } from '../types';

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'CNC-Fräsmaschine Haas VF-2',
    type: 'Technische Prüfungen',
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
    type: 'Elektrische Prüfungen',
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
    type: 'Technische Prüfungen',
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
    type: 'Wartung',
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
    name: 'Lüftungsanlage Zentrallüftung',
    type: 'Lüftungsanlagen',
    location: 'Technikraum Dach',
    manufacturer: 'Systemair',
    model: 'SAVE VSR 300',
    serialNumber: 'SYS-2022-089',
    purchaseDate: '2022-03-12',
    lastInspection: '2024-03-01',
    nextInspection: '2024-09-01',
    status: 'active',
    notes: 'Zentrale Lüftungsanlage für Hauptgebäude'
  },
  {
    id: '6',
    name: 'Digitales Multimeter Fluke 87V',
    type: 'Messgeräte',
    location: 'Labor',
    manufacturer: 'Fluke',
    model: '87V',
    serialNumber: 'FLUKE-2023-012',
    purchaseDate: '2023-05-10',
    lastInspection: '2024-02-15',
    nextInspection: '2024-05-15',
    status: 'active',
    notes: 'Präzisionsmessgerät für elektrische Messungen'
  },
  {
    id: '7',
    name: 'Oszilloskop Tektronix MSO64',
    type: 'Messgeräte',
    location: 'Labor',
    manufacturer: 'Tektronix',
    model: 'MSO64',
    serialNumber: 'TEK-2023-034',
    purchaseDate: '2023-07-20',
    lastInspection: '2024-01-10',
    nextInspection: '2024-07-10',
    status: 'active',
    notes: '4-Kanal Mixed Signal Oszilloskop'
  },
  {
    id: '8',
    name: 'Hydraulikpresse 100t',
    type: 'Wartung',
    location: 'Halle C, Station 5',
    manufacturer: 'Enerpac',
    model: 'P-392',
    serialNumber: 'ENE-2021-156',
    purchaseDate: '2021-11-08',
    lastInspection: '2024-02-28',
    nextInspection: '2024-08-28',
    status: 'maintenance',
    notes: 'Regelmäßige Wartung der Hydraulikflüssigkeit erforderlich'
  },
  {
    id: '9',
    name: 'Schaltschrank Hauptverteilung',
    type: 'Elektrische Prüfungen',
    location: 'Elektroraum Hauptgebäude',
    manufacturer: 'Rittal',
    model: 'AE 1060.500',
    serialNumber: 'RIT-2020-245',
    purchaseDate: '2020-04-15',
    lastInspection: '2024-01-05',
    nextInspection: '2024-07-05',
    status: 'active',
    notes: 'Hauptverteilung für Gebäudestrom'
  },
  {
    id: '10',
    name: 'Absauganlage Werkstatt',
    type: 'Lüftungsanlagen',
    location: 'Halle B, Schweißbereich',
    manufacturer: 'Kemper',
    model: 'ProfiMaster',
    serialNumber: 'KEM-2022-167',
    purchaseDate: '2022-09-14',
    lastInspection: '2024-03-10',
    nextInspection: '2024-09-10',
    status: 'active',
    notes: 'Absaugung für Schweißrauch und Dämpfe'
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
    status: 'completed',
    result: 'failed',
    notes: 'Wartung und Kalibrierung - Mängel festgestellt'
  },
  {
    id: '3',
    equipmentId: '3',
    type: 'technical_inspection',
    scheduledDate: '2024-06-01',
    inspector: 'TÜV Süd',
    status: 'completed',
    result: 'conditional',
    notes: 'Jährliche TÜV-Prüfung nach BetrSichV - bedingt bestanden'
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
    nextInspectionDate: '2024-09-15',
    documents: [
      {
        id: '1',
        filename: 'Wartungsprotokoll_Laser_2024-03-15.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPJ4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQLQKMC4wNzcgMCBURApCVCAvRjEgMTIgVGYKNzIgNzIwIFRkCihXYXJ0dW5nc3Byb3Rva29sbCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjA0IDAwMDAwIG4gCjAwMDAwMDAyOTggMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MDAKJSVFT0Y=',
        description: 'Wartungsprotokoll für Laser-Cutter',
        uploadedAt: '2024-03-15T10:30:00Z',
        fileSize: 245760
      }
    ]
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
    nextInspectionDate: '2024-07-15',
    documents: [
      {
        id: '2',
        filename: 'Prüfbericht_CNC_2024-01-15.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPJ4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQLQKMC4wNzcgMCBURApCVCAvRjEgMTIgVGYKNzIgNzIwIFRkCihQcsO8ZmJlcmljaHQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDIwNCAwMDAwMCBuIAowMDAwMDAwMjk4IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDAwCiUlRU9G',
        description: 'Prüfbericht für CNC-Maschine',
        uploadedAt: '2024-01-15T14:20:00Z',
        fileSize: 189440
      }
    ]
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