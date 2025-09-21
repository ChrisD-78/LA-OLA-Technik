import { createClient } from '@supabase/supabase-js'

// ⚠️ HINWEIS: Die ursprüngliche Supabase-Instanz existiert nicht mehr!
// Die App läuft jetzt im lokalen Modus mit Mock-Daten

// Supabase-Konfiguration für LA OLA Technik-Doku
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'dummy-key'

// Debug-Informationen
console.log('🔧 LA OLA Technik-Doku - Konfiguration:', {
  mode: supabaseUrl.includes('dummy') ? 'LOCAL_MOCK_DATA' : 'SUPABASE_CONNECTED',
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  environment: process.env.NODE_ENV,
  message: supabaseUrl.includes('dummy') ? 
    '📝 App läuft mit lokalen Mock-Daten (Supabase nicht konfiguriert)' : 
    '🗄️ App versucht Supabase-Verbindung'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test der Supabase-Verbindung
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection with URL:', supabaseUrl);
    
    // Einfacher Ping-Test
    const { data, error } = await supabase
      .from('equipment')
      .select('id')
      .limit(1);
    
    console.log('Supabase Connection Test Result:', { 
      success: !error, 
      dataReceived: !!data,
      dataLength: data?.length || 0,
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      } : null
    });
    
    if (error) {
      return { 
        success: false, 
        error: `${error.message} (Code: ${error.code})${error.hint ? ` - Hint: ${error.hint}` : ''}`
      };
    }
    
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Supabase Connection Test Exception:', {
      message: err?.message || 'Unknown error',
      name: err?.name,
      stack: err?.stack
    });
    
    return { 
      success: false, 
      error: err?.message || 'Network or configuration error'
    };
  }
};

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
