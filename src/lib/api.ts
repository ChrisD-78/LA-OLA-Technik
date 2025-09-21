import { supabase } from './supabase'
import { Equipment, Inspection } from '../types'
import { localEquipmentApi, localInspectionsApi } from './localApi'

// Prüfe ob wir im lokalen Modus sind
const isLocalMode = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://dummy.supabase.co';
  return supabaseUrl.includes('dummy');
};

// Equipment API Functions
export const equipmentApi = {
  // Alle Geräte abrufen
  async getAll(): Promise<Equipment[]> {
    if (isLocalMode()) {
      return localEquipmentApi.getAll();
    }

    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fehler beim Laden der Geräte:', error)
      throw error
    }

    // Konvertiere Supabase-Format zu unserem Equipment-Format
    return data?.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      location: item.location,
      manufacturer: item.manufacturer,
      model: item.model,
      serialNumber: item.serial_number,
      purchaseDate: item.purchase_date,
      status: item.status,
      notes: item.notes,
      images: item.images || []
    })) || []
  },

  // Einzelnes Gerät abrufen
  async getById(id: string): Promise<Equipment | null> {
    if (isLocalMode()) {
      return localEquipmentApi.getById(id);
    }

    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Fehler beim Laden des Geräts:', error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      location: data.location,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serial_number,
      purchaseDate: data.purchase_date,
      status: data.status,
      notes: data.notes,
      images: data.images || []
    }
  },

  // Neues Gerät erstellen
  async create(equipment: Omit<Equipment, 'id'>): Promise<Equipment> {
    if (isLocalMode()) {
      return localEquipmentApi.create(equipment);
    }

    const { data, error } = await supabase
      .from('equipment')
      .insert({
        name: equipment.name,
        type: equipment.type,
        location: equipment.location,
        manufacturer: equipment.manufacturer,
        model: equipment.model,
        serial_number: equipment.serialNumber,
        purchase_date: equipment.purchaseDate,
        status: equipment.status,
        notes: equipment.notes,
        images: equipment.images
      })
      .select()
      .single()

    if (error) {
      console.error('Fehler beim Erstellen des Geräts:', error)
      throw error
    }

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      location: data.location,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serial_number,
      purchaseDate: data.purchase_date,
      status: data.status,
      notes: data.notes,
      images: data.images || []
    }
  },

  // Gerät aktualisieren
  async update(id: string, equipment: Partial<Equipment>): Promise<Equipment> {
    if (isLocalMode()) {
      return localEquipmentApi.update(id, equipment);
    }

    const { data, error } = await supabase
      .from('equipment')
      .update({
        name: equipment.name,
        type: equipment.type,
        location: equipment.location,
        manufacturer: equipment.manufacturer,
        model: equipment.model,
        serial_number: equipment.serialNumber,
        purchase_date: equipment.purchaseDate,
        status: equipment.status,
        notes: equipment.notes,
        images: equipment.images,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Fehler beim Aktualisieren des Geräts:', error)
      throw error
    }

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      location: data.location,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serial_number,
      purchaseDate: data.purchase_date,
      status: data.status,
      notes: data.notes,
      images: data.images || []
    }
  },

  // Gerät löschen
  async delete(id: string): Promise<void> {
    if (isLocalMode()) {
      return localEquipmentApi.delete(id);
    }

    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Fehler beim Löschen des Geräts:', error)
      throw error
    }
  }
}

// Inspections API Functions
export const inspectionsApi = {
  // Alle Prüfungen abrufen
  async getAll(): Promise<Inspection[]> {
    if (isLocalMode()) {
      return localInspectionsApi.getAll();
    }

    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fehler beim Laden der Prüfungen:', error)
      throw error
    }

    return data?.map(item => ({
      id: item.id,
      equipmentId: item.equipment_id,
      type: item.type,
      scheduledDate: item.scheduled_date,
      inspector: item.inspector,
      status: item.status,
      notes: item.notes,
      inspectionInterval: item.inspection_interval,
      result: item.result,
      findings: item.findings,
      documents: item.documents || [],
      completedDate: item.completed_date
    })) || []
  },

  // Einzelne Prüfung abrufen
  async getById(id: string): Promise<Inspection | null> {
    if (isLocalMode()) {
      return localInspectionsApi.getById(id);
    }

    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Fehler beim Laden der Prüfung:', error)
      return null
    }

    return {
      id: data.id,
      equipmentId: data.equipment_id,
      type: data.type,
      scheduledDate: data.scheduled_date,
      inspector: data.inspector,
      status: data.status,
      notes: data.notes,
      inspectionInterval: data.inspection_interval,
      result: data.result,
      findings: data.findings,
      documents: data.documents || [],
      completedDate: data.completed_date
    }
  },

  // Neue Prüfung erstellen
  async create(inspection: Omit<Inspection, 'id'>): Promise<Inspection> {
    if (isLocalMode()) {
      return localInspectionsApi.create(inspection);
    }

    const { data, error } = await supabase
      .from('inspections')
      .insert({
        equipment_id: inspection.equipmentId,
        type: inspection.type,
        scheduled_date: inspection.scheduledDate,
        inspector: inspection.inspector,
        status: inspection.status,
        notes: inspection.notes,
        inspection_interval: inspection.inspectionInterval,
        result: inspection.result,
        findings: inspection.findings,
        documents: inspection.documents,
        completed_date: inspection.completedDate
      })
      .select()
      .single()

    if (error) {
      console.error('Fehler beim Erstellen der Prüfung:', error)
      throw error
    }

    return {
      id: data.id,
      equipmentId: data.equipment_id,
      type: data.type,
      scheduledDate: data.scheduled_date,
      inspector: data.inspector,
      status: data.status,
      notes: data.notes,
      inspectionInterval: data.inspection_interval,
      result: data.result,
      findings: data.findings,
      documents: data.documents || [],
      completedDate: data.completed_date
    }
  },

  // Prüfung aktualisieren
  async update(id: string, inspection: Partial<Inspection>): Promise<Inspection> {
    if (isLocalMode()) {
      return localInspectionsApi.update(id, inspection);
    }

    const { data, error } = await supabase
      .from('inspections')
      .update({
        equipment_id: inspection.equipmentId,
        type: inspection.type,
        scheduled_date: inspection.scheduledDate,
        inspector: inspection.inspector,
        status: inspection.status,
        notes: inspection.notes,
        inspection_interval: inspection.inspectionInterval,
        result: inspection.result,
        findings: inspection.findings,
        documents: inspection.documents,
        completed_date: inspection.completedDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Fehler beim Aktualisieren der Prüfung:', error)
      throw error
    }

    return {
      id: data.id,
      equipmentId: data.equipment_id,
      type: data.type,
      scheduledDate: data.scheduled_date,
      inspector: data.inspector,
      status: data.status,
      notes: data.notes,
      inspectionInterval: data.inspection_interval,
      result: data.result,
      findings: data.findings,
      documents: data.documents || [],
      completedDate: data.completed_date
    }
  },

  // Prüfung löschen
  async delete(id: string): Promise<void> {
    if (isLocalMode()) {
      return localInspectionsApi.delete(id);
    }

    const { error } = await supabase
      .from('inspections')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Fehler beim Löschen der Prüfung:', error)
      throw error
    }
  }
}
