import { createClient } from '@supabase/supabase-js'

// Supabase-Konfiguration für LA OLA Technik-Doku
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://toeskuoixedornrqrvzm.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZXNrdW9peGVkb3JuZ3FydnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MjMwMzgsImV4cCI6MjA3MjQ5OTAzOH0.YOxx9UwFBwziOI81SJnIAeZI4wM71wkF3Y7e950CMlg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Typen für unsere Datenbank-Tabellen
export interface Database {
  public: {
    Tables: {
      equipment: {
        Row: {
          id: string
          name: string
          type: string
          location: string
          manufacturer: string
          model: string
          serial_number: string
          purchase_date: string
          status: 'active' | 'inactive' | 'maintenance'
          notes: string
          images: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          location: string
          manufacturer: string
          model: string
          serial_number: string
          purchase_date: string
          status?: 'active' | 'inactive' | 'maintenance'
          notes?: string
          images?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          location?: string
          manufacturer?: string
          model?: string
          serial_number?: string
          purchase_date?: string
          status?: 'active' | 'inactive' | 'maintenance'
          notes?: string
          images?: any[]
          created_at?: string
          updated_at?: string
        }
      }
      inspections: {
        Row: {
          id: string
          equipment_id: string
          type: string
          scheduled_date: string
          inspector: string
          status: 'pending' | 'completed' | 'cancelled'
          notes: string
          inspection_interval: number
          result: 'passed' | 'failed' | 'conditional' | null
          findings: string
          documents: any[]
          completed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          equipment_id: string
          type: string
          scheduled_date: string
          inspector: string
          status?: 'pending' | 'completed' | 'cancelled'
          notes?: string
          inspection_interval?: number
          result?: 'passed' | 'failed' | 'conditional' | null
          findings?: string
          documents?: any[]
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          equipment_id?: string
          type?: string
          scheduled_date?: string
          inspector?: string
          status?: 'pending' | 'completed' | 'cancelled'
          notes?: string
          inspection_interval?: number
          result?: 'passed' | 'failed' | 'conditional' | null
          findings?: string
          documents?: any[]
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
