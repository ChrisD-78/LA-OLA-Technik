import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  CheckSquare,
  Calendar,
  AlertTriangle,
  User,
  FileText,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  Download,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Equipment, Inspection } from './types';
import { mockEquipment, mockInspections } from './data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { equipmentApi, inspectionsApi } from './lib/api';
import { testSupabaseConnection } from './lib/supabase';

// Login Component
const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Debug: Konsolenausgabe der eingegebenen Werte
    console.log('Eingegebener Benutzername:', username);
    console.log('Eingegebenes Passwort:', password);
    console.log('Benutzername korrekt?', username === 'techik');
    console.log('Passwort korrekt?', password === 'technik1');

    // Simuliere eine kurze Ladezeit für bessere UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username.trim() === 'techik' && password.trim() === 'technik1') {
      onLogin();
    } else {
      setError('Ungültige Anmeldedaten. Bitte überprüfen Sie Benutzername und Passwort.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Wasserelemente Animationen */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Große Wasserblasen */}
        <div className="water-bubble water-bubble-1"></div>
        <div className="water-bubble water-bubble-2"></div>
        <div className="water-bubble water-bubble-3"></div>
        <div className="water-bubble water-bubble-4"></div>
        <div className="water-bubble water-bubble-5"></div>
        
        {/* Kleine Wasserblasen */}
        <div className="water-bubble-small water-bubble-small-1"></div>
        <div className="water-bubble-small water-bubble-small-2"></div>
        <div className="water-bubble-small water-bubble-small-3"></div>
        <div className="water-bubble-small water-bubble-small-4"></div>
        <div className="water-bubble-small water-bubble-small-5"></div>
        <div className="water-bubble-small water-bubble-small-6"></div>
        
        {/* Wellen */}
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="login-card">
          {/* Logo und Titel */}
          <div className="text-center mb-8">
            <div className="login-logo">
              <Package className="h-12 w-12 text-white" />
            </div>
            <h1 className="login-title">Freizeitbad LA OLA</h1>
            <p className="login-subtitle">Technische Dokumentation</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="login-error">
                <AlertTriangle className="h-5 w-5" />
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <User className="h-5 w-5" />
                Benutzername
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Benutzername eingeben"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock className="h-5 w-5" />
                Passwort
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
                  placeholder="Passwort eingeben"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="login-spinner"></div>
                  Anmeldung läuft...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Anmelden
                </>
              )}
            </button>
          </form>

          {/* Login Hinweise */}
          <div className="login-hints">
            <div className="hint-item">
              <span className="hint-label">Benutzername:</span>
              <span className="hint-value">techik</span>
            </div>
            <div className="hint-item">
              <span className="hint-label">Passwort:</span>
              <span className="hint-value">technik1</span>
            </div>
          </div>
        </div>
      </div>
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
CNC-Fräsmaschine,Technische Prüfungen,Halle A,Haas Automation,VF-2,HAAS-2023-001,2023-01-15,Hauptmaschine für Aluminium-Bearbeitung
Schweißgerät,Elektrische Prüfungen,Halle B,Fronius,TransPuls Synergic 5000,FRON-2022-045,2022-06-20,Für MIG/MAG-Schweißungen
Digitales Multimeter,Messgeräte,Labor,Fluke,87V,FLUKE-2023-012,2023-05-10,Präzisionsmessgerät für elektrische Messungen`;
    
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
const Dashboard = ({ equipment, inspections, onDeleteEquipment, onAddEquipment, onAddInspection, onNavigate }: { 
  equipment: Equipment[], 
  inspections: Inspection[],
  onDeleteEquipment: (id: string) => void,
  onAddEquipment: (equipment: Equipment[]) => void,
  onAddInspection: (inspection: Inspection) => void,
  onNavigate: (view: 'dashboard' | 'equipment' | 'equipment-new' | 'inspections' | 'inspections-new' | 'inspection-edit') => void
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
          <div className="flex space-x-3">
            <select 
              className="form-select-modern"
              onChange={(e) => {
                const selectedEquipmentId = e.target.value;
                if (selectedEquipmentId && selectedEquipmentId !== 'select') {
                  const equipmentItem = equipment.find(eq => eq.id === selectedEquipmentId);
                  if (equipmentItem) {
                    // Neue Prüfung für das ausgewählte Gerät erstellen
                    const newInspection: Inspection = {
                      id: uuidv4(),
                      equipmentId: selectedEquipmentId,
                      type: 'maintenance',
                      scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 Tage in der Zukunft
                      inspector: 'Techniker',
                      status: 'pending',
                      notes: `Neue Wartung für ${equipmentItem.name} geplant`
                    };
                    
                    // Prüfung zur Liste hinzufügen
                    onAddInspection(newInspection);
                    
                    // Bestätigung anzeigen
                    alert(`✅ Neue Prüfung erfolgreich erstellt!\n\nGerät: ${equipmentItem.name}\nTyp: Wartung\nGeplant für: ${newInspection.scheduledDate}\nPrüfer: ${newInspection.inspector}\n\nDie Prüfung wurde zur Liste hinzugefügt.`);
                    
                    // Select zurücksetzen
                    e.target.value = 'select';
                  }
                }
              }}
              defaultValue="select"
            >
              <option value="select">Neue Prüfung für Gerät planen...</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.serialNumber})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <CsvImport onEquipmentImport={onAddEquipment} />
        </div>
      </div>
    </div>
  );
};



// InspectionList Component  
const InspectionList = ({ inspections, equipment, onDelete, onAddInspection, onEditInspection }: { 
  inspections: Inspection[], 
  equipment: Equipment[],
  onDelete: (id: string) => void,
  onAddInspection: (inspection: Inspection) => void,
  onEditInspection: (inspection: Inspection) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Alle Geräte, die keine Prüfungen haben
  const equipmentWithoutInspections = equipment.filter(eq => 
    !inspections.some(insp => insp.equipmentId === eq.id)
  );

  const filteredInspections = inspections.filter(insp => {
    const equipmentItem = equipment.find(eq => eq.id === insp.equipmentId);
    const equipmentName = equipmentItem?.name || '';
    
    const matchesSearch = equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insp.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || insp.status === statusFilter;
    const matchesType = typeFilter === 'all' || insp.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });


  const getTypeBadge = (type: string) => {
    const typeMap = {
      measurement_devices: 'Messgeräte',
      maintenance: 'Wartung',
      technical_inspection: 'Technische Prüfung',
      electrical_inspection: 'Elektrische Prüfung',
      ventilation_systems: 'Lüftungsanlagen'
    };
    
    const label = typeMap[type as keyof typeof typeMap] || type;
    return <span className="text-sm text-gray-700">{label}</span>;
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
          {/* Deploy-Trigger: Kleine Änderung für Netlify-Update */}
        </div>

        <div className="grid-modern grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        </div>

        {/* Typ-Filter Buttons */}
        <div className="mb-6">
          <label className="form-label-modern">Typ</label>
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
            {['measurement_devices', 'maintenance', 'technical_inspection', 'electrical_inspection', 'ventilation_systems'].map(type => (
              <button
                key={type}
                className={`btn-modern ${
                  typeFilter === type 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
                onClick={() => setTypeFilter(type)}
              >
                {type === 'measurement_devices' ? 'Messgeräte' :
                 type === 'maintenance' ? 'Wartung' :
                 type === 'technical_inspection' ? 'Technische Prüfungen' :
                 type === 'electrical_inspection' ? 'Elektrische Prüfungen' :
                 'Lüftungsanlagen'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabelle mit allen Prüfungen */}
      <div className="card-modern max-w-[65%] mx-auto">
        {/* Fixer Header */}
        <div className="bg-gray-50 border-b-2 border-gray-300">
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
                <th className="text-left py-4 px-2 font-semibold text-gray-900">InventarNr</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Gerät</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Typ</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Geplant für</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Prüfer</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Intervall</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Ergebnis</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Dokumente</th>
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Aktionen</th>
              </tr>
            </thead>
          </table>
        </div>
        
        {/* Scrollbarer Body */}
        <div style={{ height: '400px', overflowY: 'auto', overflowX: 'auto' }}>
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
                        <div className="flex justify-center">
                          {(() => {
                            const today = new Date();
                            if (inspection.status === 'completed') {
                              return (
                                <div 
                                  className="w-24 h-24 rounded-full" 
                                  style={{ backgroundColor: '#10b981', border: '4px solid #059669' }}
                                  title="Abgeschlossen"
                                ></div>
                              );
                            }
                            if (inspection.status === 'overdue' || new Date(inspection.scheduledDate) < today) {
                              return (
                                <div 
                                  className="w-24 h-24 rounded-full" 
                                  style={{ backgroundColor: '#ef4444', border: '4px solid #dc2626' }}
                                  title="Überfällig"
                                ></div>
                              );
                            }
                            return (
                              <div 
                                className="w-24 h-24 rounded-full" 
                                style={{ backgroundColor: '#eab308', border: '4px solid #d97706' }}
                                title="Anstehend"
                              ></div>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex justify-center">
                          {(() => {
                            if (!inspection.result) {
                              return (
                                <div 
                                  className="w-24 h-24 rounded-full" 
                                  style={{ backgroundColor: '#9ca3af', border: '4px solid #6b7280' }}
                                  title="Noch kein Ergebnis"
                                ></div>
                              );
                            }
                            if (inspection.result === 'passed') {
                              return (
                                <div 
                                  className="w-24 h-24 rounded-full" 
                                  style={{ backgroundColor: '#10b981', border: '4px solid #059669' }}
                                  title="Bestanden"
                                ></div>
                              );
                            }
                            if (inspection.result === 'failed') {
                              return (
                                <div 
                                  className="w-24 h-24 rounded-full" 
                                  style={{ backgroundColor: '#ef4444', border: '4px solid #dc2626' }}
                                  title="Nicht bestanden"
                                ></div>
                              );
                            }
                            return (
                              <div 
                                className="w-24 h-24 rounded-full" 
                                style={{ backgroundColor: '#eab308', border: '4px solid #d97706' }}
                                title="Bedingt"
                              ></div>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex justify-center">
                          {inspection.documents && inspection.documents.length > 0 ? (
                            <button
                              onClick={() => {
                                // Öffne das erste Dokument
                                const doc = inspection.documents![0];
                                if (doc.url) {
                                  // Versuche das Dokument in einem neuen Tab zu öffnen
                                  window.open(doc.url, '_blank');
                                } else {
                                  alert(`Dokument: ${doc.filename}\nBeschreibung: ${doc.description || 'Keine Beschreibung verfügbar'}`);
                                }
                              }}
                              className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                              title={`${inspection.documents.length} Dokument(e) anzeigen`}
                            >
                              <FileText className="h-5 w-5" />
                              <span className="text-sm font-medium">{inspection.documents.length}</span>
                            </button>
                          ) : (
                            <div 
                              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                              title="Keine Dokumente"
                            >
                              <span className="text-gray-500 text-xs">-</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex space-x-1 min-w-0 justify-start">
                          <button
                            onClick={() => onEditInspection(inspection)}
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

      {/* Neue Tabelle: Geräte ohne Prüfungen */}
      <div className="card-modern">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Geräte ohne Prüfungen ({equipmentWithoutInspections.length})</h2>
        <p className="text-gray-600 mb-6">Diese Geräte haben noch keine Prüfungen oder Wartungsarbeiten geplant.</p>
        
        {equipmentWithoutInspections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Alle Geräte haben bereits Prüfungen geplant.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 w-[15%]">InventarNr</th>
                  <th className="text-left py-3 px-4 w-[25%]">Gerätename</th>
                  <th className="text-left py-3 px-4 w-[15%]">Typ</th>
                  <th className="text-left py-3 px-4 w-[20%]">Standort</th>
                  <th className="text-left py-3 px-4 w-[12%]">Status</th>
                  <th className="text-left py-3 px-4 w-[13%]">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {equipmentWithoutInspections.map(eq => (
                  <tr key={eq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono text-gray-600">{eq.serialNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{eq.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{eq.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{eq.location}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        eq.status === 'active' ? 'bg-green-100 text-green-800' :
                        eq.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {eq.status === 'active' ? 'Aktiv' :
                         eq.status === 'maintenance' ? 'Wartung' :
                         'Inaktiv'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '2px 4px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                        onClick={() => {
                          // Neue Prüfung für das Gerät anlegen
                          const newInspection: Inspection = {
                            id: uuidv4(),
                            equipmentId: eq.id,
                            type: 'maintenance',
                            scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 Tage in der Zukunft
                            inspector: 'Techniker',
                            status: 'pending',
                            notes: `Neue Wartung für ${eq.name} geplant`
                          };
                          
                          // Prüfung zur Liste hinzufügen
                          onAddInspection(newInspection);
                          
                          // Bestätigung anzeigen
                          alert(`✅ Neue Prüfung erfolgreich erstellt!\n\nGerät: ${eq.name}\nTyp: Wartung\nGeplant für: ${newInspection.scheduledDate}\nPrüfer: ${newInspection.inspector}\n\nDas Gerät wird jetzt aus der Liste "Geräte ohne Prüfungen" entfernt.`);
                        }}
                      >
                        <Plus className="h-2 w-2 mr-0.5" />
                        Prüfung planen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
              {['Wartung', 'Messgeräte', 'Technische Prüfungen', 'Elektrische Prüfungen', 'Lüftungsanlagen'].map(type => (
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
                
                {/* Bildanzeige unterhalb des Gerätenamens */}
                {eq.images && eq.images.length > 0 && eq.images[0].url && (
                  <div className="card-image mb-3">
                    <img 
                      src={eq.images[0].url} 
                      alt={eq.images[0].description || 'Gerätebild'} 
                      style={{
                        width: '160px',
                        height: '96px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                  </div>
                )}
                
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
  const [formData, setFormData] = useState<Partial<Equipment> & { imageFile?: File, imagePreview?: string }>({
    name: '',
    location: '',
    serialNumber: '',
    status: 'active' as const,
    notes: '',
    imageFile: undefined,
    imagePreview: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.serialNumber?.trim()) {
      newErrors.serialNumber = 'InventarNr ist erforderlich';
    }
    if (!formData.name?.trim()) {
      newErrors.name = 'Gerätename ist erforderlich';
    }
    if (!formData.location?.trim()) {
      newErrors.location = 'Standort ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dateigröße prüfen (max. 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Bild ist zu groß. Maximale Größe: 5MB');
        return;
      }

      // Bild als Base64 konvertieren
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ 
          ...prev, 
          imageFile: file,
          imagePreview: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const equipmentData: Equipment = {
      id: uuidv4(),
      name: formData.name!,
      type: 'Sonstiges', // Standardwert setzen
      location: formData.location!,
      manufacturer: '', // Leerer Standardwert
      model: '', // Leerer Standardwert
      serialNumber: formData.serialNumber!,
      purchaseDate: new Date().toISOString().split('T')[0], // Aktuelles Datum als Standard
      status: formData.status!,
      notes: formData.notes || '',
      images: formData.imagePreview ? [{
        id: uuidv4(),
        filename: formData.imageFile?.name || 'gerätebild.jpg',
        url: formData.imagePreview,
        description: 'Gerätebild',
        uploadedAt: new Date().toISOString(),
        isMainImage: true
      }] : []
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
            <label className="form-label-modern">Gerätename *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.name ? 'border-red-500' : ''}`}
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="z.B. CNC-Fräsmaschine"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
            <label className="form-label-modern">Bild</label>
            <input
              type="file"
              accept="image/*"
              className="form-input-modern file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">Unterstützte Formate: JPG, PNG, GIF (max. 5MB)</p>
            
            {/* Bildvorschau */}
            {formData.imagePreview && (
              <div className="mt-3">
                <img 
                  src={formData.imagePreview} 
                  alt="Bildvorschau" 
                  className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Vorschau des ausgewählten Bildes</p>
              </div>
            )}
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

// InspectionForm Component
const InspectionForm = ({ equipment, inspection, onSave, onCancel }: { 
  equipment: Equipment[],
  inspection?: Inspection,
  onSave: (inspection: Inspection) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Partial<Inspection> & { documentFile?: File, documentPreview?: string }>({
    equipmentId: inspection?.equipmentId || '',
    type: inspection?.type || 'maintenance',
    scheduledDate: inspection?.scheduledDate || new Date().toISOString().split('T')[0],
    inspector: inspection?.inspector || '',
    status: inspection?.status || 'pending',
    notes: inspection?.notes || '',
    inspectionInterval: inspection?.inspectionInterval || 90,
    result: inspection?.result,
    findings: inspection?.findings || '',
    documents: inspection?.documents || [],
    documentFile: undefined,
    documentPreview: undefined
  });

  // Aktualisiere formData wenn sich die inspection ändert
  useEffect(() => {
    if (inspection) {
      setFormData({
        equipmentId: inspection.equipmentId,
        type: inspection.type,
        scheduledDate: inspection.scheduledDate,
        inspector: inspection.inspector,
        status: inspection.status,
        notes: inspection.notes || '',
        inspectionInterval: inspection.inspectionInterval || 90,
        result: inspection.result,
        findings: inspection.findings || '',
        documents: inspection.documents || [],
        documentFile: undefined,
        documentPreview: undefined
      });
    } else {
      // Bei neuen Prüfungen zurücksetzen
      setFormData({
        equipmentId: '',
        type: 'maintenance',
        scheduledDate: new Date().toISOString().split('T')[0],
        inspector: '',
        status: 'pending',
        notes: '',
        inspectionInterval: 90,
        result: undefined,
        findings: '',
        documents: [],
        documentFile: undefined,
        documentPreview: undefined
      });
    }
  }, [inspection]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Nur bei neuen Prüfungen das Gerät validieren
    if (!inspection && !formData.equipmentId?.trim()) {
      newErrors.equipmentId = 'Gerät ist erforderlich';
    }
    if (!formData.scheduledDate?.trim()) {
      newErrors.scheduledDate = 'Datum ist erforderlich';
    }
    if (!formData.inspector?.trim()) {
      newErrors.inspector = 'Prüfer ist erforderlich';
    }
    if (!formData.status?.trim()) {
      newErrors.status = 'Status ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dateigröße prüfen (max. 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Bild ist zu groß. Maximale Größe: 5MB');
        return;
      }

      // Bild als Base64 konvertieren
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ 
          ...prev, 
          documentFile: file,
          documentPreview: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const inspectionData: Inspection = {
      id: inspection?.id || uuidv4(),
      equipmentId: formData.equipmentId || '',
      type: formData.type!,
      scheduledDate: formData.scheduledDate!,
      inspector: formData.inspector!,
      status: formData.status!,
      notes: formData.notes || '',
      inspectionInterval: formData.inspectionInterval,
      result: formData.result!,
      findings: formData.findings || '',
      documents: formData.documentPreview ? [{
        id: uuidv4(),
        filename: formData.documentFile?.name || 'prüfungsdokument.pdf',
        url: formData.documentPreview,
        description: 'Prüfungsdokument',
        uploadedAt: new Date().toISOString(),
        fileSize: formData.documentFile?.size || 0
      }] : []
    };

    onSave(inspectionData);
  };

  const handleInputChange = (field: keyof Inspection, value: string) => {
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
          {inspection ? 'Prüfung bearbeiten' : 'Neue Prüfung anlegen'}
        </h1>
      </div>

      {/* Gerätename anzeigen, wenn eine bestehende Prüfung bearbeitet wird */}
      {inspection && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-900">
            {equipment.find(eq => eq.id === inspection.equipmentId)?.name || 'Unbekanntes Gerät'}
          </h2>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid-modern grid-cols-1 md:grid-cols-2 gap-6">
          {/* Geräteauswahl nur bei neuen Prüfungen anzeigen */}
          {!inspection && (
            <div className="form-group-modern">
              <label className="form-label-modern">Gerät *</label>
              <select
                className="form-select-modern"
                value={formData.equipmentId || ''}
                onChange={(e) => handleInputChange('equipmentId', e.target.value)}
              >
                <option value="">Bitte wählen Sie ein Gerät aus</option>
                {equipment.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name} ({eq.serialNumber})
                  </option>
                ))}
              </select>
              {!formData.equipmentId && (
                <p className="text-red-500 text-sm mt-1">Bitte wählen Sie ein Gerät aus</p>
              )}
            </div>
          )}

          <div className="form-group-modern">
            <label className="form-label-modern">Typ *</label>
            <select
              className="form-select-modern"
              value={formData.type || 'maintenance'}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              <option value="measurement_devices">Messgeräte</option>
              <option value="maintenance">Wartung</option>
              <option value="technical_inspection">Technische Prüfung</option>
              <option value="electrical_inspection">Elektrische Prüfung</option>
              <option value="ventilation_systems">Lüftungsanlagen</option>
            </select>
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Datum *</label>
            <input
              type="datetime-local"
              className={`form-input-modern ${errors.scheduledDate ? 'border-red-500' : ''}`}
              value={formData.scheduledDate || ''}
              onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
            />
            {errors.scheduledDate && <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Prüfer *</label>
            <input
              type="text"
              className={`form-input-modern ${errors.inspector ? 'border-red-500' : ''}`}
              value={formData.inspector || ''}
              onChange={(e) => handleInputChange('inspector', e.target.value)}
              placeholder="z.B. Hans Mueller"
            />
            {errors.inspector && <p className="text-red-500 text-sm mt-1">{errors.inspector}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Status *</label>
            <select
              className="form-select-modern"
              value={formData.status || 'pending'}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="pending">Anstehend</option>
              <option value="completed">Abgeschlossen</option>
              <option value="cancelled">Abgebrochen</option>
            </select>
          </div>

          <div className="form-group-modern md:col-span-2">
            <label className="form-label-modern">Notizen</label>
            <textarea
              className="form-input-modern h-24"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Zusätzliche Notizen zur Prüfung..."
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Intervall *</label>
            <input
              type="number"
              className={`form-input-modern ${errors.inspectionInterval ? 'border-red-500' : ''}`}
              value={formData.inspectionInterval || ''}
              onChange={(e) => handleInputChange('inspectionInterval', e.target.value)}
              placeholder="Tage"
            />
            {errors.inspectionInterval && <p className="text-red-500 text-sm mt-1">{errors.inspectionInterval}</p>}
          </div>

          <div className="form-group-modern md:col-span-2">
            <label className="form-label-modern">Ergebnis *</label>
            <select
              className="form-select-modern"
              value={formData.result || 'pending'}
              onChange={(e) => handleInputChange('result', e.target.value)}
            >
              <option value="pending">In Bearbeitung</option>
              <option value="passed">Bestanden</option>
              <option value="failed">Nicht bestanden</option>
              <option value="conditional">Bedingt</option>
            </select>
          </div>

          <div className="form-group-modern md:col-span-2">
            <label className="form-label-modern">Findings</label>
            <textarea
              className="form-input-modern h-24"
              value={formData.findings || ''}
              onChange={(e) => handleInputChange('findings', e.target.value)}
              placeholder="Zusätzliche Findings..."
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Dokumente</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-input-modern file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">Unterstützte Formate: PDF (max. 5MB)</p>
            
            {/* Dokumentvorschau */}
            {formData.documentPreview && (
              <div className="mt-3">
                <iframe 
                  src={formData.documentPreview} 
                  title="Dokumentvorschau" 
                  className="w-full h-64 border border-gray-200 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Vorschau des ausgewählten Dokumentes</p>
              </div>
            )}
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
            {inspection ? 'Prüfung speichern' : 'Prüfung anlegen'}
          </button>
        </div>
      </form>
    </div>
  );
};

function App() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // State für Equipment und Inspections
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Daten beim App-Start laden
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Prüfe ob wir im lokalen Mock-Modus sind
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://dummy.supabase.co';
        const isLocalMode = supabaseUrl.includes('dummy');
        
        if (isLocalMode) {
          console.log('🏠 Lokaler Modus erkannt - verwende Mock-Daten direkt');
          console.log('📝 Lade lokale Beispieldaten...');
          
          // Simuliere kurze Ladezeit für realistische UX
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setEquipment(mockEquipment);
          setInspections(mockInspections);
          
          console.log('✅ Mock-Daten geladen:', {
            equipmentCount: mockEquipment.length,
            inspectionsCount: mockInspections.length
          });
          return;
        }
        
        // Nur wenn echte Supabase-URL konfiguriert ist
        console.log('🗄️ Versuche Supabase-Verbindung...');
        const connectionTest = await testSupabaseConnection();
        console.log('Connection test result:', connectionTest);
        
        if (!connectionTest.success) {
          throw new Error(`Supabase connection failed: ${connectionTest.error}`);
        }
        
        // Parallel Equipment und Inspections laden
        console.log('Loading data from Supabase...');
        const [equipmentData, inspectionsData] = await Promise.all([
          equipmentApi.getAll(),
          inspectionsApi.getAll()
        ]);
        
        console.log('Data loaded successfully:', {
          equipmentCount: equipmentData.length,
          inspectionsCount: inspectionsData.length
        });
        
        setEquipment(equipmentData);
        setInspections(inspectionsData);
      } catch (err: any) {
        console.error('Fehler beim Laden der Daten:', err);
        setError(`Fehler beim Laden der Daten: ${err.message || err}. Verwende lokale Beispieldaten.`);
        // Fallback auf Mock-Daten
        console.log('Falling back to mock data...');
        setEquipment(mockEquipment);
        setInspections(mockInspections);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  const [currentView, setCurrentView] = useState<'dashboard' | 'equipment' | 'equipment-new' | 'inspections' | 'inspections-new' | 'inspection-edit'>('dashboard');
  const [editingInspection, setEditingInspection] = useState<Inspection | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const deleteEquipment = async (id: string) => {
    try {
      await equipmentApi.delete(id);
      setEquipment(prev => prev.filter(eq => eq.id !== id));
      // Auch zugehörige Prüfungen löschen (durch CASCADE in der DB)
      setInspections(prev => prev.filter(insp => insp.equipmentId !== id));
    } catch (err) {
      console.error('Fehler beim Löschen des Geräts:', err);
      alert('Fehler beim Löschen des Geräts. Bitte versuchen Sie es erneut.');
    }
  };

  const addEquipment = async (newEquipment: Equipment[]) => {
    try {
      const createdEquipment = await Promise.all(
        newEquipment.map(eq => equipmentApi.create(eq))
      );
      setEquipment(prev => [...prev, ...createdEquipment]);
    } catch (err) {
      console.error('Fehler beim Erstellen der Geräte:', err);
      alert('Fehler beim Erstellen der Geräte. Bitte versuchen Sie es erneut.');
    }
  };

  const deleteInspection = async (id: string) => {
    try {
      await inspectionsApi.delete(id);
      setInspections(prev => prev.filter(insp => insp.id !== id));
    } catch (err) {
      console.error('Fehler beim Löschen der Prüfung:', err);
      alert('Fehler beim Löschen der Prüfung. Bitte versuchen Sie es erneut.');
    }
  };

  const addInspection = async (newInspection: Inspection) => {
    try {
      const createdInspection = await inspectionsApi.create(newInspection);
      setInspections(prev => [...prev, createdInspection]);
    } catch (err) {
      console.error('Fehler beim Erstellen der Prüfung:', err);
      alert('Fehler beim Erstellen der Prüfung. Bitte versuchen Sie es erneut.');
    }
  };

  const updateInspection = async (updatedInspection: Inspection) => {
    try {
      const updated = await inspectionsApi.update(updatedInspection.id, updatedInspection);
      setInspections(prev => prev.map(insp => 
        insp.id === updatedInspection.id ? updated : insp
      ));
    } catch (err) {
      console.error('Fehler beim Aktualisieren der Prüfung:', err);
      alert('Fehler beim Aktualisieren der Prüfung. Bitte versuchen Sie es erneut.');
    }
  };

  const startEditInspection = (inspection: Inspection) => {
    setEditingInspection(inspection);
    setCurrentView('inspection-edit');
  };

  const cancelEditInspection = () => {
    setEditingInspection(null);
    setCurrentView('inspections');
  };

  const saveInspection = (inspection: Inspection) => {
    if (editingInspection) {
      updateInspection(inspection);
    } else {
      addInspection(inspection);
    }
    setEditingInspection(null);
    setCurrentView('inspections');
  };

  // Zeige Login-Seite wenn nicht angemeldet
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Zeige Loading-Spinner während Daten geladen werden
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-modern mb-4"></div>
          <p className="text-white text-lg">Daten werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* Fehler-Banner anzeigen */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
        <nav className="nav-modern bg-blue-400/30 backdrop-blur-md shadow-lg border-b border-blue-300/50">
          <div className="container mx-auto px-0">
            <div className="flex items-center justify-start w-full">
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className="flex items-center space-x-3 text-white hover:text-blue-100 transition-colors ml-0"
              >
                <Package className="h-8 w-8" />
                <span className="text-2xl font-bold">Freizeitbad LA OLA</span>
              </button>
              
              <div className="logo-spacer"></div>
              
              <div className="flex items-center">
                <div className="header-button-container">
                  <button 
                    onClick={() => setCurrentView('dashboard')} 
                    className="nav-link bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Package className="h-4 w-4" />
                    Dashboard
                  </button>
                </div>

                <div className="header-button-container">
                  <button 
                    onClick={() => setCurrentView('equipment')} 
                    className="nav-link bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Package className="h-4 w-4" />
                    Geräte-Übersicht
                  </button>
                </div>

                <div className="header-button-container">
                  <button 
                    onClick={() => setCurrentView('inspections')} 
                    className="nav-link bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Prüfungen & Wartung
                  </button>
                </div>

                <div className="header-button-container">
                  <button 
                    onClick={handleLogout} 
                    className="nav-link bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Lock className="h-4 w-4" />
                    Abmelden
                  </button>
                </div>
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
              onAddInspection={addInspection}
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
              onAddInspection={addInspection}
              onEditInspection={startEditInspection}
            />
          )}

          {currentView === 'inspections-new' && (
            <InspectionForm 
              equipment={equipment}
              onSave={saveInspection}
              onCancel={() => setCurrentView('inspections')}
            />
          )}

          {currentView === 'inspection-edit' && editingInspection && (
            <InspectionForm 
              inspection={editingInspection}
              equipment={equipment}
              onSave={saveInspection}
              onCancel={cancelEditInspection}
            />
          )}
        </main>
      </div>
  );
}

export default App;