import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  CheckSquare,
  Calendar,
  User,
  AlertTriangle,
  ArrowLeft,
  Save,
  FileText,
  Download,
  X
} from 'lucide-react';
import { Equipment, Inspection, InspectionDocument } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock Data direkt in der App
const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Wasseraufbereitungsanlage',
    type: 'Wasseraufbereitung',
    location: 'Technikraum Hauptgebäude',
    manufacturer: 'AquaTech GmbH',
    model: 'WT-2000',
    serialNumber: 'AT-2023-001',
    purchaseDate: '2023-01-15',
    lastInspection: '2024-02-15',
    nextInspection: '2024-05-15',
    status: 'active',
    notes: 'Hauptanlage für Wasseraufbereitung aller Schwimmbecken',
    images: [
      {
        id: 'img1',
        filename: 'wasseraufbereitung-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Hauptansicht der Wasseraufbereitungsanlage',
        uploadedAt: '2024-02-15',
        isMainImage: true
      },
      {
        id: 'img2',
        filename: 'wasseraufbereitung-2.jpg',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        description: 'Steuerungseinheit der Anlage',
        uploadedAt: '2024-02-15',
        isMainImage: false
      }
    ]
  },
  {
    id: '2',
    name: 'Chlor-Dosieranlage',
    type: 'Chemie-Dosierung',
    location: 'Chemieraum Untergeschoss',
    manufacturer: 'ChemDos Systems',
    model: 'CD-500',
    serialNumber: 'CDS-2022-089',
    purchaseDate: '2022-08-20',
    lastInspection: '2024-01-10',
    nextInspection: '2024-04-10',
    status: 'active',
    notes: 'Automatische Chlordosierung für alle Becken',
    images: [
      {
        id: 'img3',
        filename: 'chlordosierung-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Chlor-Dosieranlage im Chemieraum',
        uploadedAt: '2024-01-10',
        isMainImage: true
      }
    ]
  },
  {
    id: '3',
    name: 'Umwälzpumpe Becken 1',
    type: 'Pumptechnik',
    location: 'Schwimmbecken 1, Technikschacht',
    manufacturer: 'Grundfos',
    model: 'UP 100',
    serialNumber: 'GF-2021-456',
    purchaseDate: '2021-05-12',
    lastInspection: '2024-03-01',
    nextInspection: '2024-06-01',
    status: 'active',
    notes: 'Hauptumwälzpumpe für das große Schwimmbecken',
    images: [
      {
        id: 'img4',
        filename: 'pumpe-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Umwälzpumpe im Technikschacht',
        uploadedAt: '2024-03-01',
        isMainImage: true
      }
    ]
  },
  {
    id: '4',
    name: 'Filteranlage Sauna',
    type: 'Filtration',
    location: 'Saunabereich, Technikraum',
    manufacturer: 'PoolTech',
    model: 'PT-Filter-300',
    serialNumber: 'PT-2020-123',
    purchaseDate: '2020-11-30',
    lastInspection: '2024-02-20',
    nextInspection: '2024-05-20',
    status: 'active',
    notes: 'Filteranlage für den Saunabereich',
    images: [
      {
        id: 'img5',
        filename: 'filter-sauna-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Filteranlage im Saunabereich',
        uploadedAt: '2024-02-20',
        isMainImage: true
      }
    ]
  },
  {
    id: '5',
    name: 'Lüftungsanlage Hauptbereich',
    type: 'Lüftungstechnik',
    location: 'Dachgeschoss, Lüftungszentrale',
    manufacturer: 'VentilAir Pro',
    model: 'VA-5000',
    serialNumber: 'VAP-2019-678',
    purchaseDate: '2019-03-10',
    lastInspection: '2024-01-25',
    nextInspection: '2024-07-25',
    status: 'maintenance',
    notes: 'Wartung läuft - Sicherheitssensoren werden kalibriert',
    images: [
      {
        id: 'img6',
        filename: 'lueftung-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Lüftungsanlage auf dem Dach',
        uploadedAt: '2024-01-25',
        isMainImage: true
      }
    ]
  },
  {
    id: '6',
    name: 'Heizungsanlage Beckenwasser',
    type: 'Heiztechnik',
    location: 'Technikraum Untergeschoss',
    manufacturer: 'Thermowärme GmbH',
    model: 'TW-Heat-800',
    serialNumber: 'TW-2020-445',
    purchaseDate: '2020-10-15',
    lastInspection: '2024-02-28',
    nextInspection: '2024-05-28',
    status: 'active',
    notes: 'Heizung für Schwimmbecken und Warmwasser',
    images: [
      {
        id: 'img7',
        filename: 'heizung-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Heizungsanlage im Technikraum',
        uploadedAt: '2024-02-28',
        isMainImage: true
      }
    ]
  },
  {
    id: '7',
    name: 'Notstromaggregat',
    type: 'Elektrotechnik',
    location: 'Außenbereich, Technikcontainer',
    manufacturer: 'PowerGen Systems',
    model: 'PG-Emergency-50',
    serialNumber: 'PGS-2021-789',
    purchaseDate: '2021-09-20',
    lastInspection: '2024-03-15',
    nextInspection: '2024-06-15',
    status: 'active',
    notes: 'Notstromversorgung für kritische Systeme',
    images: [
      {
        id: 'img8',
        filename: 'notstrom-1.jpg',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        description: 'Notstromaggregat im Container',
        uploadedAt: '2024-03-15',
        isMainImage: true
      }
    ]
  }
];

const mockInspections: Inspection[] = [
  {
    id: '1',
    equipmentId: '1',
    type: 'maintenance',
    scheduledDate: '2024-05-15',
    inspector: 'Hans Mueller (AquaTech)',
    status: 'pending',
    notes: 'Quartalswartung - Filter tauschen und Werte prüfen'
  },

  {
    id: '3',
    equipmentId: '3',
    type: 'maintenance',
    scheduledDate: '2024-06-01',
    inspector: 'Peter Wagner (Grundfos Service)',
    status: 'pending',
    notes: 'Jährliche Wartung der Umwälzpumpe'
  },
  {
    id: '4',
    equipmentId: '1',
    type: 'calibration',
    scheduledDate: '2024-02-15',
    completedDate: '2024-02-15',
    inspector: 'Hans Mueller (AquaTech)',
    status: 'completed',
    result: 'passed',
    findings: 'Alle Sensoren funktionieren einwandfrei',
    notes: 'Monatliche Kalibrierung der Sensoren',
    documents: [
      {
        id: 'doc1',
        filename: 'Kalibrierungsprotokoll_Wasseraufbereitung_2024-02-15.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsKsw6HDqMOgw7wKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKEthbGlicmllcnVuZ3Nwcm90b2tvbGwpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNTMgMDAwMDAgbiAKMDAwMDAwMDEyNSAwMDAwMCBuIAowMDAwMDAwMjMwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNQovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMzI3CiUlRU9G',
        description: 'Offizielles Kalibrierungsprotokoll',
        uploadedAt: '2024-02-15',
        fileSize: 256000
      },
      {
        id: 'doc2',
        filename: 'Messwerte_Sensoren_Feb2024.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsKsw6HDqMOgw7wKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMzgKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKE1lc3N3ZXJ0ZSBTZW5zb3JlbikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA1MyAwMDAwMCBuIAowMDAwMDAwMTI1IDAwMDAwIG4gCjAwMDAwMDAyMzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA1Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgozMzAKJSVFT0Y=',
        description: 'Detaillierte Messwerte der Sensoren',
        uploadedAt: '2024-02-15',
        fileSize: 128000
      }
    ]
  },
  {
    id: '5',
    equipmentId: '4',
    type: 'maintenance',
    scheduledDate: '2024-05-20',
    inspector: 'Lisa Bauer (PoolTech)',
    status: 'pending',
    notes: 'Filterwechsel und Systemcheck'
  },
  {
    id: '7',
    equipmentId: '2',
    type: 'technical_inspection',
    scheduledDate: '2024-06-15',
    inspector: 'Dr. Martin Schneider (TÜV)',
    status: 'pending',
    notes: 'Jährliche technische Prüfung der Chlor-Dosieranlage'
  },
  {
    id: '8',
    equipmentId: '3',
    type: 'electrical_inspection',
    scheduledDate: '2024-07-01',
    inspector: 'Elektro Weber GmbH',
    status: 'pending',
    notes: 'Elektrische Sicherheitsprüfung der Umwälzpumpe'
  },
  {
    id: '9',
    equipmentId: '6',
    type: 'maintenance',
    scheduledDate: '2024-08-01',
    inspector: 'Thermowärme Service',
    status: 'pending',
    notes: 'Wartung der Heizungsanlage'
  },
  {
    id: '10',
    equipmentId: '7',
    type: 'technical_inspection',
    scheduledDate: '2024-09-01',
    inspector: 'TÜV Süd',
    status: 'pending',
    notes: 'Technische Prüfung des Notstromaggregats'
  },
  {
    id: '6',
    equipmentId: '5',
    type: 'maintenance',
    scheduledDate: '2024-07-25',
    completedDate: '2024-03-10',
    inspector: 'Thomas Richter (VentilAir)',
    status: 'completed',
    result: 'passed',
    notes: 'Routinewartung - alle Werte im Normbereich',
    nextInspectionDate: '2024-07-15',
    documents: [
      {
        id: 'doc3',
        filename: 'Wartungsprotokoll_Lüftung_2024-03-10.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsKsw6HDqMOgw7wKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDcKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKFdhcnR1bmdzcHJvdG9rb2xsIEzDvGZ0dW5nKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxMCAwMDAwMCBuIAowMDAwMDAwMDUzIDAwMDAwIG4gCjAwMDAwMDAxMjUgMDAwMDAgbiAKMDAwMDAwMDIzMCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjMzMAolJUVPRg==',
        description: 'Wartungsprotokoll Lüftungsanlage',
        uploadedAt: '2024-03-10',
        fileSize: 180000
      }
    ]
  }
];

// PDF Upload Component
const PdfUpload = ({ onPdfAdd }: { 
  onPdfAdd: (file: File, description?: string) => void;
}) => {
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setIsUploading(true);
        try {
          onPdfAdd(file, description);
          setDescription('');
          // Reset file input
          e.target.value = '';
        } catch (error) {
          alert('Fehler beim Hochladen der Datei.');
        } finally {
          setIsUploading(false);
        }
      } else {
        alert('Bitte wählen Sie nur PDF-Dateien aus.');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-group-modern">
        <label className="form-label-modern">Beschreibung (optional)</label>
        <input
          type="text"
          className="form-input-modern"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="z.B. Prüfprotokoll, Zertifikat, Messwerte..."
        />
      </div>
      
      <div className="form-group-modern">
        <label className="form-label-modern">PDF-Dokument hochladen</label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="form-input-modern"
          disabled={isUploading}
        />
        <p className="text-sm text-gray-500 mt-1">
          {isUploading ? 'Datei wird hochgeladen...' : 'Nur PDF-Dateien sind erlaubt'}
        </p>
      </div>
    </div>
  );
};

// PDF Gallery Component
const PdfGallery = ({ documents, onDocumentDelete }: {
  documents: InspectionDocument[];
  onDocumentDelete: (documentId: string) => void;
}) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="empty-state-modern">
        <FileText className="empty-state-icon" />
        <p>Keine Dokumente vorhanden</p>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-red-600" />
            <div>
              <div className="font-medium text-gray-900">{doc.filename}</div>
              {doc.description && (
                <div className="text-sm text-gray-600">{doc.description}</div>
              )}
              <div className="text-xs text-gray-500">
                {formatFileSize(doc.fileSize)} • {new Date(doc.uploadedAt).toLocaleDateString('de-DE')}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <a
              href={doc.url}
              download={doc.filename}
              className="btn-modern btn-secondary p-2"
              title="Herunterladen"
            >
              <Download className="h-4 w-4" />
            </a>
            <button
              onClick={() => onDocumentDelete(doc.id)}
              className="btn-modern btn-danger p-2"
              title="Löschen"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// CSV Import Component
const CsvImport = ({ onEquipmentImport }: { 
  onEquipmentImport: (equipment: Equipment[]) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<Equipment[]>([]);

  const parseCSV = (csvText: string): Equipment[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const equipment: Equipment[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < headers.length) continue;

      const equipmentItem: Equipment = {
        id: uuidv4(),
        name: values[headers.indexOf('name')] || values[headers.indexOf('bezeichnung')] || values[headers.indexOf('gerät')] || `Gerät ${i}`,
        type: values[headers.indexOf('type')] || values[headers.indexOf('typ')] || values[headers.indexOf('art')] || 'Unbekannt',
        location: values[headers.indexOf('location')] || values[headers.indexOf('standort')] || values[headers.indexOf('ort')] || 'Unbekannt',
        manufacturer: values[headers.indexOf('manufacturer')] || values[headers.indexOf('hersteller')] || values[headers.indexOf('firma')] || 'Unbekannt',
        model: values[headers.indexOf('model')] || values[headers.indexOf('modell')] || values[headers.indexOf('bezeichnung')] || 'Unbekannt',
        serialNumber: values[headers.indexOf('serialnumber')] || values[headers.indexOf('seriennummer')] || values[headers.indexOf('sn')] || `SN-${i}`,
        purchaseDate: values[headers.indexOf('purchasedate')] || values[headers.indexOf('kaufdatum')] || values[headers.indexOf('datum')] || new Date().toISOString().split('T')[0],
        status: 'active' as const,
        notes: values[headers.indexOf('notes')] || values[headers.indexOf('notizen')] || values[headers.indexOf('bemerkungen')] || '',
        images: []
      };

      equipment.push(equipmentItem);
    }

    return equipment;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setIsUploading(true);
        try {
          const text = await file.text();
          const parsedEquipment = parseCSV(text);
          setPreviewData(parsedEquipment);
        } catch (error) {
          alert('Fehler beim Lesen der CSV-Datei.');
        } finally {
          setIsUploading(false);
        }
      } else {
        alert('Bitte wählen Sie nur CSV-Dateien aus.');
      }
    }
  };

  const handleImport = () => {
    if (previewData.length > 0) {
      onEquipmentImport(previewData);
      setPreviewData([]);
      alert(`${previewData.length} Geräte wurden erfolgreich importiert!`);
    }
  };

  const downloadTemplate = () => {
    const template = `Name,Type,Location,Manufacturer,Model,SerialNumber,PurchaseDate,Notes
Wasseraufbereitungsanlage,Wasseraufbereitung,Technikraum Hauptgebäude,AquaTech GmbH,WT-2000,AT-2023-001,2023-01-15,Hauptanlage für Wasseraufbereitung
Chlor-Dosieranlage,Chemie-Dosierung,Chemieraum Untergeschoss,ChemDos Systems,CD-500,CDS-2022-089,2022-08-20,Automatische Chlordosierung
Umwälzpumpe,Pumptechnik,Schwimmbecken 1,Technikschacht,Grundfos,UP 100,GF-2021-456,2021-05-12,Hauptumwälzpumpe`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'geraete_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">CSV-Import für Geräte</h3>
        <button
          onClick={downloadTemplate}
          className="btn-modern btn-secondary text-sm"
        >
          <Download className="h-4 w-4" />
          CSV-Template herunterladen
        </button>
      </div>

      <div className="form-group-modern">
        <label className="form-label-modern">CSV-Datei auswählen</label>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          className="form-input-modern"
          disabled={isUploading}
        />
        <p className="text-sm text-gray-500 mt-1">
          {isUploading ? 'Datei wird verarbeitet...' : 'Unterstützte Spalten: Name, Type, Location, Manufacturer, Model, SerialNumber, PurchaseDate, Notes'}
        </p>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900">
              Vorschau: {previewData.length} Geräte gefunden
            </h4>
            <button
              onClick={handleImport}
              className="btn-modern btn-primary"
            >
              <Plus className="h-4 w-4" />
              {previewData.length} Geräte importieren
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Typ</th>
                  <th>Standort</th>
                  <th>Hersteller</th>
                  <th>Modell</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 10).map((eq, index) => (
                  <tr key={index}>
                    <td className="text-sm">{eq.name}</td>
                    <td className="text-sm">{eq.type}</td>
                    <td className="text-sm">{eq.location}</td>
                    <td className="text-sm">{eq.manufacturer}</td>
                    <td className="text-sm">{eq.model}</td>
                  </tr>
                ))}
                {previewData.length > 10 && (
                  <tr>
                    <td colSpan={5} className="text-center text-sm text-gray-500">
                      ... und {previewData.length - 10} weitere Geräte
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ equipment, inspections, onDeleteEquipment, onAddEquipment, onNavigate }: { 
  equipment: Equipment[], 
  inspections: Inspection[],
  onDeleteEquipment: (id: string) => void,
  onAddEquipment: (equipment: Equipment[]) => void,
  onNavigate: (view: 'dashboard' | 'equipment' | 'equipment-new' | 'inspections' | 'inspections-new') => void
}) => {
  
  const stats = {
    totalEquipment: equipment.length,
    activeEquipment: equipment.filter(eq => eq.status === 'active').length,
    pendingInspections: inspections.filter(insp => insp.status === 'pending').length,
    overdueInspections: inspections.filter(insp => {
      if (insp.status === 'pending' && insp.scheduledDate) {
        return new Date(insp.scheduledDate) < new Date();
      }
      return false;
    }).length,
  };

  const recentInspections = inspections
    .filter(insp => insp.status === 'completed')
    .sort((a, b) => new Date(b.completedDate || '').getTime() - new Date(a.completedDate || '').getTime())
    .slice(0, 3);

  const upcomingInspections = inspections
    .filter(insp => insp.status === 'pending')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 3);

  const getEquipmentById = (id: string) => {
    return equipment.find(eq => eq.id === id);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Freizeitbad LA OLA</h1>
        <p className="text-xl text-white/90">Technische Dokumentation und Anlagenverwaltung</p>
      </div>

      <div className="grid-modern grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="stats-icon">
            <Package className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.totalEquipment}</div>
          <div className="stats-label">Anlagen gesamt</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <CheckSquare className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.activeEquipment}</div>
          <div className="stats-label">Aktive Anlagen</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.pendingInspections}</div>
          <div className="stats-label">Anstehende Prüfungen</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-icon">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="stats-number">{stats.overdueInspections}</div>
          <div className="stats-label">Überfällige Prüfungen</div>
        </div>
      </div>

      <div className="grid-modern grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Anstehende Prüfungen</h2>
          {upcomingInspections.length === 0 ? (
            <div className="empty-state-modern">
              <Calendar className="empty-state-icon" />
              <p>Keine anstehenden Prüfungen</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingInspections.map(inspection => {
                const equipment = getEquipmentById(inspection.equipmentId);
                const isOverdue = new Date(inspection.scheduledDate) < new Date();
                
                return (
                  <div key={inspection.id} className={`p-4 rounded-lg border ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{equipment?.name || 'Unbekannte Anlage'}</h3>
                        <p className="text-sm text-gray-600">{inspection.type} - {inspection.inspector}</p>
                        <p className="text-sm text-gray-500">{new Date(inspection.scheduledDate).toLocaleDateString('de-DE')}</p>
                      </div>
                      {isOverdue && (
                        <span className="badge-modern badge-danger">Überfällig</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card-modern">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Letzte Prüfungen</h2>
          {recentInspections.length === 0 ? (
            <div className="empty-state-modern">
              <CheckSquare className="empty-state-icon" />
              <p>Keine abgeschlossenen Prüfungen</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInspections.map(inspection => {
                const equipment = getEquipmentById(inspection.equipmentId);
                
                return (
                  <div key={inspection.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{equipment?.name || 'Unbekannte Anlage'}</h3>
                        <p className="text-sm text-gray-600">{inspection.type} - {inspection.inspector}</p>
                        <p className="text-sm text-gray-500">{new Date(inspection.completedDate || '').toLocaleDateString('de-DE')}</p>
                      </div>
                      <span className={`badge-modern ${
                        inspection.result === 'passed' ? 'badge-success' :
                        inspection.result === 'failed' ? 'badge-danger' :
                        'badge-warning'
                      }`}>
                        {inspection.result === 'passed' ? 'Bestanden' :
                         inspection.result === 'failed' ? 'Nicht bestanden' :
                         'Bedingt'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card-modern">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Anlagen-Übersicht</h2>
        
        <div className="space-y-3 mb-6">
          {equipment.map(eq => (
            <div key={eq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">{eq.name}</div>
                  <div className="text-sm text-gray-600">{eq.type} • {eq.location}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  eq.status === 'active' ? 'bg-green-100 text-green-800' :
                  eq.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {eq.status === 'active' ? 'Aktiv' :
                   eq.status === 'maintenance' ? 'Wartung' :
                   'Inaktiv'}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm(`Sind Sie sicher, dass Sie "${eq.name}" löschen möchten? Alle zugehörigen Prüfungen werden ebenfalls gelöscht.`)) {
                      onDeleteEquipment(eq.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-0.5"
                  title="Anlage löschen"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schnellaktionen</h2>
        <div className="grid-modern grid-cols-1 gap-4">
          <button
            onClick={() => onNavigate('inspections-new')}
            className="btn-modern btn-primary text-center"
          >
            <Calendar className="h-5 w-5" />
            Neue Prüfung planen
          </button>
        </div>

        <div className="mt-8">
          <CsvImport onEquipmentImport={(newEquipment) => {
            // Neue Geräte zur bestehenden Liste hinzufügen
            // Da dies eine lokale Demo-App ist, speichern wir in localStorage
            const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
            const updatedEquipment = [...existingEquipment, ...newEquipment];
            localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
            
            // Bestätigung anzeigen
            alert(`${newEquipment.length} Geräte wurden erfolgreich importiert und gespeichert!`);
            
            // Seite neu laden um die neuen Geräte anzuzeigen
            window.location.reload();
          }} />
        </div>
      </div>
    </div>
  );
};



// InspectionList Component  
const InspectionList = ({ inspections, equipment, onDelete }: { 
  inspections: Inspection[], 
  equipment: Equipment[],
  onDelete: (id: string) => void 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  


  const filteredInspections = inspections.filter(insp => {
    const equipmentItem = equipment.find(eq => eq.id === insp.equipmentId);
    const equipmentName = equipmentItem?.name || '';
    
    const matchesSearch = equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || insp.status === statusFilter;
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

  const getTypeBadge = (type: string) => {
    const typeMap = {
      maintenance: { label: 'Wartung', class: 'badge-primary' },
      calibration: { label: 'Kalibrierung', class: 'badge-secondary' },
      certification: { label: 'Zertifizierung', class: 'badge-success' },
      technical_inspection: { label: 'Technische Prüfung', class: 'badge-primary' },
      electrical_inspection: { label: 'Elektrische Prüfung', class: 'badge-warning' }
    };
    
    const config = typeMap[type as keyof typeof typeMap] || { label: type, class: 'badge-secondary' };
    return <span className={`badge-modern ${config.class}`}>{config.label}</span>;
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Prüfung löschen möchten?')) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Prüfungen & Wartung</h1>
        <p className="text-xl text-white/90">Übersicht aller Prüfungen und Wartungsarbeiten</p>
      </div>

      <div className="card-modern">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Prüfungs-Übersicht</h2>
          <button 
            className="btn-modern btn-primary"
            onClick={() => window.location.href = '/inspections/new'}
          >
            <Plus className="h-4 w-4" />
            Neue Prüfung planen
          </button>
        </div>

        <div className="grid-modern grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="form-group-modern">
            <label className="form-label-modern">Suche</label>
            <input
              type="text"
              className="form-input-modern"
              placeholder="Anlage, Prüfer, Notizen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              Filter zurücksetzen
            </button>
          </div>
        </div>
      </div>

      <div className="card-modern overflow-hidden max-w-[65%] mx-auto">
        <div className="overflow-x-auto">
          <table className="table-modern w-full table-fixed">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[16%]" />
              <col className="w-[8%]" />
              <col className="w-[8%]" />
              <col className="w-[8%]" />
              <col className="w-[6%]" />
              <col className="w-[6%]" />
              <col className="w-[8%]" />
              <col className="w-[8%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left py-4 px-2">InventarNr</th>
                <th className="text-left py-4 px-2">Gerät</th>
                <th className="text-left py-4 px-2">Typ</th>
                <th className="text-left py-4 px-2">Geplant für</th>
                <th className="text-left py-4 px-2">Prüfer</th>
                <th className="text-left py-4 px-2">Intervall</th>
                <th className="text-left py-4 px-2">Status</th>
                <th className="text-left py-4 px-2">Ergebnis</th>
                <th className="text-left py-4 px-2">Dokumente</th>
                <th className="text-left py-4 px-2">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-500">
                    <div className="empty-state-modern">
                      <CheckSquare className="empty-state-icon" />
                      <p>Keine Prüfungen gefunden</p>
                    </div>
                  </td>
                </tr>
                            ) : (
                filteredInspections.map(inspection => {
                  const equipmentItem = equipment.find(eq => eq.id === inspection.equipmentId);
                  const equipmentName = equipmentItem?.name || `Gelöschte Anlage (ID: ${inspection.equipmentId})`;
                  
                  return (
                    <tr key={inspection.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          <div className="text-sm text-gray-600 font-mono">
                            {equipmentItem?.serialNumber || '-'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          <div className={`font-medium truncate text-sm ${equipmentItem ? 'text-gray-900' : 'text-red-600'}`}>
                            {equipmentName}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          {getTypeBadge(inspection.type)}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center min-w-0">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
                          <span className="truncate text-sm">{new Date(inspection.scheduledDate).toLocaleDateString('de-DE')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center min-w-0">
                          <User className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
                          <span className="text-sm">{inspection.inspector}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          <span className="text-sm text-gray-600">
                            {inspection.inspectionInterval ? `${inspection.inspectionInterval} Tage` : '-'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          <div className="transform scale-75 origin-left">
                            {getStatusBadge(inspection)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          {inspection.result ? (
                            <div className="transform scale-75 origin-left">
                              <span className={`badge-modern ${
                                inspection.result === 'passed' ? 'badge-success' :
                                inspection.result === 'failed' ? 'badge-danger' :
                                'badge-warning'
                              }`}>
                                {inspection.result === 'passed' ? 'Bestanden' :
                                 inspection.result === 'failed' ? 'Nicht bestanden' :
                                 'Bedingt'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="min-w-0">
                          {inspection.documents && inspection.documents.length > 0 ? (
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4 text-red-600" />
                              <span className="text-sm font-medium">{inspection.documents.length}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex space-x-1 min-w-0 justify-start">
                          <button
                            onClick={() => window.location.href = '/inspections'}
                            className="btn-modern btn-secondary p-1.5 flex-shrink-0 min-w-[32px] h-8"
                            title="Bearbeiten"
                          >
                            <Edit className="h-3 w-3" />
                            </button>
                          <button
                            onClick={() => handleDelete(inspection.id)}
                            className="btn-modern btn-danger p-1.5 flex-shrink-0 min-w-[32px] h-8"
                            title="Löschen"
                          >
                            <Trash2 className="h-3 w-3" />
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

// EquipmentList Component
const EquipmentList = ({ equipment, onDelete, onAddNew }: { 
  equipment: Equipment[], 
  onDelete: (id: string) => void,
  onAddNew: () => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || eq.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Geräteverwaltung</h1>
        <p className="text-xl text-white/90">Alle technischen Geräte und Anlagen im Überblick</p>
      </div>

      <div className="card-modern">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Geräte-Übersicht</h2>
          <button 
            className="btn-modern btn-primary"
            onClick={onAddNew}
          >
            <Plus className="h-4 w-4" />
            Neues Gerät anlegen
          </button>
        </div>

        <div className="grid-modern grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="form-group-modern">
            <label className="form-label-modern">Suche</label>
            <input
              type="text"
              className="form-input-modern"
              placeholder="Name, InventarNr, Standort..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="form-group-modern">
            <label className="form-label-modern">Typ</label>
            <select
              className="form-select-modern"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Alle Typen</option>
              <option value="Wasseraufbereitung">Wasseraufbereitung</option>
              <option value="Chemie-Dosierung">Chemie-Dosierung</option>
              <option value="Pumptechnik">Pumptechnik</option>
              <option value="Filtration">Filtration</option>
              <option value="Lüftungstechnik">Lüftungstechnik</option>
              <option value="Heiztechnik">Heiztechnik</option>
              <option value="Elektrotechnik">Elektrotechnik</option>
              <option value="Sanitär">Sanitär</option>
              <option value="Sicherheit">Sicherheit</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
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
        </div>

        <div className="grid-modern grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
              <div className="empty-state-modern">
                <Package className="empty-state-icon" />
                <p>Keine Geräte gefunden</p>
              </div>
            </div>
          ) : (
            filteredEquipment.map(eq => (
              <div key={eq.id} className="equipment-card">
                <div className="card-header">
                  <div className="card-title">{eq.name}</div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    eq.status === 'active' ? 'bg-green-100 text-green-800' :
                    eq.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {eq.status === 'active' ? 'Aktiv' :
                     eq.status === 'maintenance' ? 'Wartung' :
                     'Inaktiv'}
                  </span>
                </div>
                
                <div className="card-content">
                  <div className="space-y-2 text-sm">
                    <div><strong>InventarNr:</strong> {eq.serialNumber}</div>
                    <div><strong>Typ:</strong> {eq.type}</div>
                    <div><strong>Standort:</strong> {eq.location}</div>
                    <div><strong>Hersteller:</strong> {eq.manufacturer}</div>
                    <div><strong>Modell:</strong> {eq.model}</div>
                    {eq.purchaseDate && (
                      <div><strong>Kaufdatum:</strong> {new Date(eq.purchaseDate).toLocaleDateString('de-DE')}</div>
                    )}
                    {eq.notes && (
                      <div><strong>Notizen:</strong> {eq.notes}</div>
                    )}
                  </div>
                </div>
                
                <div className="card-actions">
                  <button
                    onClick={() => {
                      if (window.confirm(`Sind Sie sicher, dass Sie "${eq.name}" löschen möchten? Alle zugehörigen Prüfungen werden ebenfalls gelöscht.`)) {
                        onDelete(eq.id);
                      }
                    }}
                    className="btn-modern btn-danger w-full"
                  >
                    <Trash2 className="h-4 w-4" />
                    Gerät löschen
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// EquipmentForm Component
const EquipmentForm = ({ onSave, onCancel }: { 
  onSave: (equipment: Equipment) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    type: '',
    location: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    status: 'active' as const,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Gerätename ist erforderlich';
    }
    if (!formData.type?.trim()) {
      newErrors.type = 'Gerätetyp ist erforderlich';
    }
    if (!formData.location?.trim()) {
      newErrors.location = 'Standort ist erforderlich';
    }
    if (!formData.manufacturer?.trim()) {
      newErrors.manufacturer = 'Hersteller ist erforderlich';
    }
    if (!formData.model?.trim()) {
      newErrors.model = 'Modell ist erforderlich';
    }
    if (!formData.serialNumber?.trim()) {
      newErrors.serialNumber = 'InventarNr ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const equipmentData: Equipment = {
      id: uuidv4(),
      name: formData.name!,
      type: formData.type!,
      location: formData.location!,
      manufacturer: formData.manufacturer!,
      model: formData.model!,
      serialNumber: formData.serialNumber!,
      purchaseDate: formData.purchaseDate!,
      status: formData.status!,
      notes: formData.notes || '',
      images: []
    };

    onSave(equipmentData);
  };

  const handleInputChange = (field: keyof Equipment, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="card-modern">
      <div className="flex items-center mb-8">
        <button
          onClick={onCancel}
          className="btn-modern btn-secondary mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Neues Gerät anlegen
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-modern grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group-modern">
            <label className="form-label-modern">Gerätename *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.name ? 'border-red-500' : ''}`}
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="z.B. Wasseraufbereitungsanlage"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Gerätetyp *</label>
            <select
              className={`form-select-modern ${errors.type ? 'border-red-500' : ''}`}
              value={formData.type || ''}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              <option value="">Bitte wählen Sie einen Typ aus...</option>
              <option value="Wasseraufbereitung">Wasseraufbereitung</option>
              <option value="Chemie-Dosierung">Chemie-Dosierung</option>
              <option value="Pumptechnik">Pumptechnik</option>
              <option value="Filtration">Filtration</option>
              <option value="Lüftungstechnik">Lüftungstechnik</option>
              <option value="Heiztechnik">Heiztechnik</option>
              <option value="Elektrotechnik">Elektrotechnik</option>
              <option value="Sanitär">Sanitär</option>
              <option value="Sicherheit">Sicherheit</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Standort *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.location ? 'border-red-500' : ''}`}
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="z.B. Technikraum Hauptgebäude"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Hersteller *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.manufacturer ? 'border-red-500' : ''}`}
              value={formData.manufacturer || ''}
              onChange={(e) => handleInputChange('manufacturer', e.target.value)}
              placeholder="z.B. AquaTech GmbH"
            />
            {errors.manufacturer && <p className="text-red-500 text-sm mt-1">{errors.manufacturer}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Modell *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.model ? 'border-red-500' : ''}`}
              value={formData.model || ''}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="z.B. WT-2000"
            />
            {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">InventarNr *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.serialNumber ? 'border-red-500' : ''}`}
              value={formData.serialNumber || ''}
              onChange={(e) => handleInputChange('serialNumber', e.target.value)}
              placeholder="z.B. AT-2023-001"
            />
            {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Kaufdatum</label>
            <input
              type="date"
              className="form-input-modern"
              value={formData.purchaseDate || ''}
              onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Status</label>
            <select
              className="form-select-modern"
              value={formData.status || 'active'}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
              <option value="maintenance">Wartung</option>
            </select>
          </div>

          <div className="form-group-modern md:col-span-2">
            <label className="form-label-modern">Notizen</label>
            <textarea
              className="form-input-modern h-24"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Zusätzliche Notizen zum Gerät..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="btn-modern btn-secondary"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="btn-modern btn-primary"
          >
            <Save className="h-4 w-4" />
            Gerät anlegen
          </button>
        </div>
      </form>
    </div>
  );
};

function App() {
  // Beim Start Geräte aus localStorage laden, falls vorhanden
  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const savedEquipment = localStorage.getItem('equipment');
    if (savedEquipment) {
      return JSON.parse(savedEquipment);
    }
    return mockEquipment;
  });
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [currentView, setCurrentView] = useState<'dashboard' | 'equipment' | 'equipment-new' | 'inspections' | 'inspections-new'>('dashboard');

  const deleteEquipment = (id: string) => {
    setEquipment(prev => {
      const updatedEquipment = prev.filter(eq => eq.id !== id);
      // In localStorage speichern
      localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
      return updatedEquipment;
    });
    // Auch zugehörige Prüfungen löschen
    setInspections(prev => prev.filter(insp => insp.equipmentId !== id));
  };

  const addEquipment = (newEquipment: Equipment[]) => {
    setEquipment(prev => [...prev, ...newEquipment]);
  };



  const deleteInspection = (id: string) => {
    setInspections(prev => prev.filter(insp => insp.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <nav className="nav-modern bg-gray-900 shadow-lg border-b border-gray-700">
          <div className="container mx-auto px-2">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className="flex items-center space-x-3 pl-0 text-white hover:text-gray-200 transition-colors"
              >
                <Package className="h-8 w-8" />
                <span className="text-2xl font-bold">Freizeitbad LA OLA</span>
              </button>
              
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setCurrentView('dashboard')} 
                  className="nav-link"
                >
                  <Package className="h-4 w-4" />
                  Dashboard
                </button>

                <button 
                  onClick={() => setCurrentView('equipment')} 
                  className="nav-link"
                >
                  <Package className="h-4 w-4" />
                  Geräte
                </button>

                <button 
                  onClick={() => setCurrentView('inspections')} 
                  className="nav-link"
                >
                  <CheckSquare className="h-4 w-4" />
                  Prüfungen & Wartung
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
          {currentView === 'dashboard' && (
            <Dashboard 
              equipment={equipment} 
              inspections={inspections} 
              onDeleteEquipment={deleteEquipment} 
              onAddEquipment={addEquipment}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'equipment' && (
            <EquipmentList 
              equipment={equipment}
              onDelete={deleteEquipment}
              onAddNew={() => setCurrentView('equipment-new')}
            />
          )}

          {currentView === 'equipment-new' && (
            <EquipmentForm 
              onSave={(newEquipment) => {
                addEquipment([newEquipment]);
                setCurrentView('equipment');
              }}
              onCancel={() => setCurrentView('equipment')}
            />
          )}

          {currentView === 'inspections' && (
            <InspectionList 
              inspections={inspections}
              equipment={equipment}
              onDelete={deleteInspection}
            />
          )}
        </main>
      </div>
  );
}

export default App;