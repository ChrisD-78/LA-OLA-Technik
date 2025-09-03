-- LA OLA Technik-Doku Datenbank Setup
-- Führen Sie dieses Script in Supabase SQL Editor aus

-- Equipment Tabelle erstellen
CREATE TABLE IF NOT EXISTS equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  serial_number TEXT NOT NULL UNIQUE,
  purchase_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  notes TEXT DEFAULT '',
  images JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inspections Tabelle erstellen
CREATE TABLE IF NOT EXISTS inspections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  inspector TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  notes TEXT DEFAULT '',
  inspection_interval INTEGER DEFAULT 90,
  result TEXT CHECK (result IN ('passed', 'failed', 'conditional')),
  findings TEXT DEFAULT '',
  documents JSONB DEFAULT '[]',
  completed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_equipment_status ON equipment(status);
CREATE INDEX IF NOT EXISTS idx_equipment_serial_number ON equipment(serial_number);
CREATE INDEX IF NOT EXISTS idx_inspections_equipment_id ON inspections(equipment_id);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);
CREATE INDEX IF NOT EXISTS idx_inspections_scheduled_date ON inspections(scheduled_date);

-- Trigger-Funktion für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für Equipment
DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
CREATE TRIGGER update_equipment_updated_at 
    BEFORE UPDATE ON equipment
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger für Inspections
DROP TRIGGER IF EXISTS update_inspections_updated_at ON inspections;
CREATE TRIGGER update_inspections_updated_at 
    BEFORE UPDATE ON inspections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) aktivieren
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Policies für öffentlichen Zugriff (für Demo-Zwecke)
-- In Produktion sollten Sie diese durch sicherere Policies ersetzen
DROP POLICY IF EXISTS "Enable all operations for all users" ON equipment;
CREATE POLICY "Enable all operations for all users" ON equipment
FOR ALL USING (true);

DROP POLICY IF EXISTS "Enable all operations for all users" ON inspections;
CREATE POLICY "Enable all operations for all users" ON inspections
FOR ALL USING (true);

-- Beispiel-Daten einfügen (optional)
INSERT INTO equipment (name, type, location, manufacturer, model, serial_number, purchase_date, status, notes) VALUES
('Wasseraufbereitungsanlage', 'Wasseraufbereitung', 'Technikraum Hauptgebäude', 'AquaTech GmbH', 'WT-2000', 'AT-2023-001', '2023-01-15', 'active', 'Hauptanlage für Wasseraufbereitung'),
('Chlor-Dosieranlage', 'Chemie-Dosierung', 'Chemieraum Untergeschoss', 'ChemDos Systems', 'CD-500', 'CDS-2022-089', '2022-08-20', 'active', 'Automatische Chlordosierung'),
('Umwälzpumpe', 'Pumptechnik', 'Schwimmbecken 1, Technikschacht', 'Grundfos', 'UP 100', 'GF-2021-456', '2021-05-12', 'active', 'Hauptumwälzpumpe')
ON CONFLICT (serial_number) DO NOTHING;

-- Beispiel-Prüfungen einfügen
INSERT INTO inspections (equipment_id, type, scheduled_date, inspector, status, notes, inspection_interval, result, findings) 
SELECT 
  e.id,
  'maintenance',
  NOW() + INTERVAL '30 days',
  'Techniker',
  'pending',
  'Regelmäßige Wartung geplant',
  90,
  NULL,
  ''
FROM equipment e
WHERE e.serial_number IN ('AT-2023-001', 'CDS-2022-089', 'GF-2021-456')
ON CONFLICT DO NOTHING;
