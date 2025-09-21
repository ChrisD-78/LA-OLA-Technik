import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Package, 
  Save, 
  ArrowLeft,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { Equipment } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface EquipmentFormProps {
  equipment?: Equipment[];
  onSave: (equipment: Equipment) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ equipment, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    type: '',
    location: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'active',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && equipment) {
      const equipmentToEdit = equipment.find(eq => eq.id === id);
      if (equipmentToEdit) {
        setFormData(equipmentToEdit);
      }
    }
  }, [id, equipment, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    if (!formData.type?.trim()) {
      newErrors.type = 'Typ ist erforderlich';
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
      newErrors.serialNumber = 'Seriennummer ist erforderlich';
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Kaufdatum ist erforderlich';
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
      id: isEditing ? id! : uuidv4(),
      name: formData.name!,
      type: formData.type!,
      location: formData.location!,
      manufacturer: formData.manufacturer!,
      model: formData.model!,
      serialNumber: formData.serialNumber!,
      purchaseDate: formData.purchaseDate!,
      status: formData.status || 'active',
      notes: formData.notes,
      lastInspection: formData.lastInspection,
      nextInspection: formData.nextInspection
    };

    onSave(equipmentData);
    navigate('/equipment');
  };

  const handleInputChange = (field: keyof Equipment, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/equipment')}
          className="btn btn-secondary mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Gerät bearbeiten' : 'Neues Gerät hinzufügen'}
        </h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Grundinformationen
              </h2>
            </div>

            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="z.B. CNC-Fräsmaschine Haas VF-2"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Typ *</label>
              <div className="flex flex-wrap justify-center gap-6">
                {['Wartung', 'Messgeräte', 'Technische Prüfungen', 'Elektrische Prüfungen', 'Lüftungsanlagen'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`btn-modern ${
                      formData.type === type 
                        ? 'btn-primary' 
                        : 'btn-secondary'
                    } ${errors.type ? 'ring-2 ring-red-500' : ''}`}
                    onClick={() => handleInputChange('type', type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Standort *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className={`form-input pl-10 ${errors.location ? 'border-red-500' : ''}`}
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="z.B. Halle A, Arbeitsplatz 1"
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status || 'active'}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="active">Aktiv</option>
                <option value="inactive">Inaktiv</option>
                <option value="maintenance">Wartung</option>
              </select>
            </div>

            {/* Manufacturer Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Herstellerinformationen</h2>
            </div>

            <div className="form-group">
              <label className="form-label">Hersteller *</label>
              <input
                type="text"
                className={`form-input ${errors.manufacturer ? 'border-red-500' : ''}`}
                value={formData.manufacturer || ''}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                placeholder="z.B. Haas Automation"
              />
              {errors.manufacturer && <p className="text-red-500 text-sm mt-1">{errors.manufacturer}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Modell *</label>
              <input
                type="text"
                className={`form-input ${errors.model ? 'border-red-500' : ''}`}
                value={formData.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="z.B. VF-2"
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Seriennummer *</label>
              <input
                type="text"
                className={`form-input ${errors.serialNumber ? 'border-red-500' : ''}`}
                value={formData.serialNumber || ''}
                onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                placeholder="z.B. HAAS-2023-001"
              />
              {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Kaufdatum *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className={`form-input pl-10 ${errors.purchaseDate ? 'border-red-500' : ''}`}
                  value={formData.purchaseDate || ''}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                />
              </div>
              {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
            </div>

            {/* Inspection Dates */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Prüfungsinformationen</h2>
            </div>

            <div className="form-group">
              <label className="form-label">Letzte Prüfung</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="form-input pl-10"
                  value={formData.lastInspection || ''}
                  onChange={(e) => handleInputChange('lastInspection', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nächste Prüfung</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="form-input pl-10"
                  value={formData.nextInspection || ''}
                  onChange={(e) => handleInputChange('nextInspection', e.target.value)}
                />
              </div>
            </div>

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
                placeholder="Zusätzliche Informationen, Besonderheiten, Hinweise..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/equipment')}
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

export default EquipmentForm; 