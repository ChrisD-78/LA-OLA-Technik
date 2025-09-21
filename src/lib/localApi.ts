import { Equipment, Inspection } from '../types';
import { v4 as uuidv4 } from 'uuid';

// LocalStorage-Keys
const EQUIPMENT_KEY = 'la-ola-equipment';
const INSPECTIONS_KEY = 'la-ola-inspections';

// Helper-Funktionen für LocalStorage
const getFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn(`Fehler beim Laden von ${key}:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Fehler beim Speichern von ${key}:`, error);
  }
};

// Lokale Equipment API
export const localEquipmentApi = {
  // Alle Geräte abrufen
  async getAll(): Promise<Equipment[]> {
    console.log('📱 LocalAPI: Loading equipment from localStorage');
    const equipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
    console.log(`📱 LocalAPI: Loaded ${equipment.length} equipment items`);
    return equipment;
  },

  // Einzelnes Gerät abrufen
  async getById(id: string): Promise<Equipment | null> {
    const equipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
    return equipment.find(item => item.id === id) || null;
  },

  // Neues Gerät erstellen
  async create(equipment: Omit<Equipment, 'id'>): Promise<Equipment> {
    console.log('📱 LocalAPI: Creating new equipment:', equipment.name);
    
    const newEquipment: Equipment = {
      ...equipment,
      id: uuidv4(),
    };

    const existingEquipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
    const updatedEquipment = [...existingEquipment, newEquipment];
    
    saveToStorage(EQUIPMENT_KEY, updatedEquipment);
    
    console.log('✅ LocalAPI: Equipment created successfully:', newEquipment.id);
    return newEquipment;
  },

  // Gerät aktualisieren
  async update(id: string, equipment: Partial<Equipment>): Promise<Equipment> {
    console.log('📱 LocalAPI: Updating equipment:', id);
    
    const existingEquipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
    const index = existingEquipment.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error('Gerät nicht gefunden');
    }

    const updatedEquipment = {
      ...existingEquipment[index],
      ...equipment,
      id, // ID darf nicht überschrieben werden
    };

    existingEquipment[index] = updatedEquipment;
    saveToStorage(EQUIPMENT_KEY, existingEquipment);
    
    console.log('✅ LocalAPI: Equipment updated successfully:', id);
    return updatedEquipment;
  },

  // Gerät löschen
  async delete(id: string): Promise<void> {
    console.log('📱 LocalAPI: Deleting equipment:', id);
    
    const existingEquipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
    const filteredEquipment = existingEquipment.filter(item => item.id !== id);
    
    saveToStorage(EQUIPMENT_KEY, filteredEquipment);
    
    // Auch zugehörige Inspektionen löschen
    const existingInspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    const filteredInspections = existingInspections.filter(item => item.equipmentId !== id);
    saveToStorage(INSPECTIONS_KEY, filteredInspections);
    
    console.log('✅ LocalAPI: Equipment and related inspections deleted:', id);
  }
};

// Lokale Inspections API
export const localInspectionsApi = {
  // Alle Prüfungen abrufen
  async getAll(): Promise<Inspection[]> {
    console.log('📱 LocalAPI: Loading inspections from localStorage');
    const inspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    console.log(`📱 LocalAPI: Loaded ${inspections.length} inspections`);
    return inspections;
  },

  // Einzelne Prüfung abrufen
  async getById(id: string): Promise<Inspection | null> {
    const inspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    return inspections.find(item => item.id === id) || null;
  },

  // Neue Prüfung erstellen
  async create(inspection: Omit<Inspection, 'id'>): Promise<Inspection> {
    console.log('📱 LocalAPI: Creating new inspection for equipment:', inspection.equipmentId);
    
    const newInspection: Inspection = {
      ...inspection,
      id: uuidv4(),
    };

    const existingInspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    const updatedInspections = [...existingInspections, newInspection];
    
    saveToStorage(INSPECTIONS_KEY, updatedInspections);
    
    console.log('✅ LocalAPI: Inspection created successfully:', newInspection.id);
    return newInspection;
  },

  // Prüfung aktualisieren
  async update(id: string, inspection: Partial<Inspection>): Promise<Inspection> {
    console.log('📱 LocalAPI: Updating inspection:', id);
    
    const existingInspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    const index = existingInspections.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error('Prüfung nicht gefunden');
    }

    const updatedInspection = {
      ...existingInspections[index],
      ...inspection,
      id, // ID darf nicht überschrieben werden
    };

    existingInspections[index] = updatedInspection;
    saveToStorage(INSPECTIONS_KEY, existingInspections);
    
    console.log('✅ LocalAPI: Inspection updated successfully:', id);
    return updatedInspection;
  },

  // Prüfung löschen
  async delete(id: string): Promise<void> {
    console.log('📱 LocalAPI: Deleting inspection:', id);
    
    const existingInspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);
    const filteredInspections = existingInspections.filter(item => item.id !== id);
    
    saveToStorage(INSPECTIONS_KEY, filteredInspections);
    
    console.log('✅ LocalAPI: Inspection deleted:', id);
  }
};

// Initialisierung mit Mock-Daten falls LocalStorage leer ist
export const initializeLocalData = async (mockEquipment: Equipment[], mockInspections: Inspection[]): Promise<void> => {
  const existingEquipment = getFromStorage<Equipment>(EQUIPMENT_KEY, []);
  const existingInspections = getFromStorage<Inspection>(INSPECTIONS_KEY, []);

  if (existingEquipment.length === 0) {
    console.log('📱 LocalAPI: Initializing with mock equipment data');
    saveToStorage(EQUIPMENT_KEY, mockEquipment);
  }

  if (existingInspections.length === 0) {
    console.log('📱 LocalAPI: Initializing with mock inspection data');
    saveToStorage(INSPECTIONS_KEY, mockInspections);
  }
};
