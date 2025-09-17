import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  CheckSquare, 
  Save, 
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Package
} from 'lucide-react';
import { Equipment, Inspection } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface InspectionFormProps {
  equipment: Equipment[];
  inspections?: Inspection[];
  onSave: (inspection: Inspection) => void;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ equipment, inspections, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Inspection>>({
    equipmentId: '',
    type: 'measurement_devices',
    scheduledDate: '',
    inspector: '',
    status: 'pending',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && inspections) {
      const inspectionToEdit = inspections.find(insp => insp.id === id);
      if (inspectionToEdit) {
        setFormData(inspectionToEdit);
      }
    }
  }, [id, inspections, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Gerät ist erforderlich';
    }
    if (!formData.type) {
      newErrors.type = 'Prüfungstyp ist erforderlich';
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Geplantes Datum ist erforderlich';
    }
    if (!formData.inspector?.trim()) {
      newErrors.inspector = 'Prüfer ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const inspectionData: Inspection = {
      id: isEditing ? id! : uuidv4(),
      equipmentId: formData.equipmentId!,
      type: formData.type!,
      scheduledDate: formData.scheduledDate!,
      inspector: formData.inspector!,
      status: formData.status || 'pending',
      notes: formData.notes,
      completedDate: formData.completedDate,
      result: formData.result,
      findings: formData.findings,
      nextInspectionDate: formData.nextInspectionDate
    };

    onSave(inspectionData);
    navigate('/inspections');
  };

  const handleInputChange = (field: keyof Inspection, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getEquipmentById = (id: string) => {
    return equipment.find(eq => eq.id === id);
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/inspections')}
          className="btn btn-secondary mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Prüfung bearbeiten' : 'Neue Prüfung planen'}
        </h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckSquare className="h-5 w-5 mr-2" />
                Prüfungsinformationen
              </h2>
            </div>

            <div className="form-group">
              <label className="form-label">Gerät *</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className={`form-select pl-10 ${errors.equipmentId ? 'border-red-500' : ''}`}
                  value={formData.equipmentId || ''}
                  onChange={(e) => handleInputChange('equipmentId', e.target.value)}
                >
                  <option value="">Gerät auswählen</option>
                  {equipment.map(eq => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name} - {eq.location}
                    </option>
                  ))}
                </select>
              </div>
              {errors.equipmentId && <p className="text-red-500 text-sm mt-1">{errors.equipmentId}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Prüfungstyp *</label>
              <select
                className={`form-select ${errors.type ? 'border-red-500' : ''}`}
                value={formData.type || ''}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <option value="measurement_devices">Messgeräte</option>
                <option value="maintenance">Wartung</option>
                <option value="technical_inspection">Technische Prüfung</option>
                <option value="electrical_inspection">Elektrische Prüfung</option>
                <option value="ventilation_systems">Lüftungsanlagen</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Geplantes Datum *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className={`form-input pl-10 ${errors.scheduledDate ? 'border-red-500' : ''}`}
                  value={formData.scheduledDate || ''}
                  onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                />
              </div>
              {errors.scheduledDate && <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Prüfer *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className={`form-input pl-10 ${errors.inspector ? 'border-red-500' : ''}`}
                  value={formData.inspector || ''}
                  onChange={(e) => handleInputChange('inspector', e.target.value)}
                  placeholder="z.B. Max Mustermann"
                />
              </div>
              {errors.inspector && <p className="text-red-500 text-sm mt-1">{errors.inspector}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status || 'pending'}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="pending">Anstehend</option>
                <option value="completed">Abgeschlossen</option>
                <option value="cancelled">Abgebrochen</option>
              </select>
            </div>

            {/* Completion Information (only show if status is completed) */}
            {formData.status === 'completed' && (
              <>
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Abschlussinformationen</h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Abschlussdatum</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="form-input pl-10"
                      value={formData.completedDate || ''}
                      onChange={(e) => handleInputChange('completedDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ergebnis</label>
                  <select
                    className="form-select"
                    value={formData.result || ''}
                    onChange={(e) => handleInputChange('result', e.target.value)}
                  >
                    <option value="">Ergebnis auswählen</option>
                    <option value="passed">Bestanden</option>
                    <option value="failed">Nicht bestanden</option>
                    <option value="conditional">Bedingt bestanden</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nächste Prüfung</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="form-input pl-10"
                      value={formData.nextInspectionDate || ''}
                      onChange={(e) => handleInputChange('nextInspectionDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">Befunde</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={formData.findings || ''}
                    onChange={(e) => handleInputChange('findings', e.target.value)}
                    placeholder="Detaillierte Befunde der Prüfung..."
                  />
                </div>
              </>
            )}

            {/* Notes */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notizen
              </h2>
            </div>

            <div className="form-group md:col-span-2">
              <label className="form-label">Notizen</label>
              <textarea
                className="form-input"
                rows={4}
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Zusätzliche Informationen zur Prüfung..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/inspections')}
              className="btn btn-secondary"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Aktualisieren' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionForm; 