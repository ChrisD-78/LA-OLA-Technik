# 🗄️ Supabase Datenbank Setup für LA OLA Technik-Doku

## ✅ Was bereits konfiguriert ist:

- ✅ Supabase-Client installiert und konfiguriert
- ✅ API-Funktionen für Equipment und Inspections erstellt
- ✅ App.tsx auf Supabase umgestellt
- ✅ Fehlerbehandlung und Loading-States implementiert

## 🚀 Nächste Schritte:

### 1. Datenbank-Tabellen erstellen

1. **Gehen Sie zu Ihrem Supabase-Dashboard**: https://supabase.com/dashboard
2. **Wählen Sie Ihr Projekt aus**: `toeskuoixedornrqrvzm`
3. **Gehen Sie zum SQL Editor** (linke Seitenleiste)
4. **Kopieren Sie den Inhalt der Datei `database-setup.sql`**
5. **Führen Sie das SQL-Script aus**

### 2. Datenbank-Schema

Das Script erstellt folgende Tabellen:

#### `equipment` Tabelle:
- `id` (UUID, Primary Key)
- `name` (Text, Name des Geräts)
- `type` (Text, Gerätetyp)
- `location` (Text, Standort)
- `manufacturer` (Text, Hersteller)
- `model` (Text, Modell)
- `serial_number` (Text, Eindeutige Seriennummer)
- `purchase_date` (Date, Kaufdatum)
- `status` (Text: 'active', 'inactive', 'maintenance')
- `notes` (Text, Notizen)
- `images` (JSONB, Bilder-Array)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### `inspections` Tabelle:
- `id` (UUID, Primary Key)
- `equipment_id` (UUID, Foreign Key zu equipment)
- `type` (Text, Prüfungstyp)
- `scheduled_date` (Timestamp, Geplantes Datum)
- `inspector` (Text, Prüfer)
- `status` (Text: 'pending', 'completed', 'cancelled')
- `notes` (Text, Notizen)
- `inspection_interval` (Integer, Intervall in Tagen)
- `result` (Text: 'passed', 'failed', 'conditional')
- `findings` (Text, Befunde)
- `documents` (JSONB, Dokumente-Array)
- `completed_date` (Timestamp, Abgeschlossen am)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 3. Sicherheit (Row Level Security)

- ✅ RLS ist aktiviert
- ✅ Öffentliche Policies für Demo-Zwecke erstellt
- ⚠️ **Für Produktion**: Ersetzen Sie die Policies durch sicherere Versionen

### 4. Beispiel-Daten

Das Script fügt automatisch 3 Beispiel-Geräte und entsprechende Prüfungen ein:
- Wasseraufbereitungsanlage
- Chlor-Dosieranlage  
- Umwälzpumpe

## 🔧 Technische Details:

### API-Funktionen:
- `equipmentApi.getAll()` - Alle Geräte laden
- `equipmentApi.create(equipment)` - Neues Gerät erstellen
- `equipmentApi.update(id, equipment)` - Gerät aktualisieren
- `equipmentApi.delete(id)` - Gerät löschen
- `inspectionsApi.getAll()` - Alle Prüfungen laden
- `inspectionsApi.create(inspection)` - Neue Prüfung erstellen
- `inspectionsApi.update(id, inspection)` - Prüfung aktualisieren
- `inspectionsApi.delete(id)` - Prüfung löschen

### Fehlerbehandlung:
- ✅ Automatischer Fallback auf Mock-Daten bei Verbindungsfehlern
- ✅ Benutzerfreundliche Fehlermeldungen
- ✅ Loading-States während API-Aufrufen

### Performance:
- ✅ Indizes für häufige Abfragen
- ✅ Automatische `updated_at` Updates
- ✅ CASCADE-Löschung (Gerät löschen → Prüfungen werden automatisch gelöscht)

## 🎯 Nach dem Setup:

1. **Starten Sie die Anwendung**: `npm start`
2. **Melden Sie sich an**: `techik` / `technik1`
3. **Testen Sie die Funktionen**:
   - Geräte hinzufügen/bearbeiten/löschen
   - Prüfungen erstellen/bearbeiten/löschen
   - CSV-Import von Geräten

## 🔍 Überprüfung:

Nach dem SQL-Script sollten Sie in Supabase sehen:
- 2 neue Tabellen: `equipment` und `inspections`
- 3 Beispiel-Geräte in der `equipment` Tabelle
- 3 Beispiel-Prüfungen in der `inspections` Tabelle
- Indizes und Trigger sind aktiv

## 🚨 Wichtige Hinweise:

1. **Backup**: Erstellen Sie regelmäßig Backups Ihrer Daten
2. **Sicherheit**: Für Produktion sollten Sie die RLS-Policies anpassen
3. **Monitoring**: Überwachen Sie die API-Nutzung in Supabase
4. **Skalierung**: Supabase skaliert automatisch mit Ihren Anforderungen

## 📞 Support:

Bei Problemen:
1. Überprüfen Sie die Browser-Konsole auf Fehler
2. Schauen Sie in das Supabase-Dashboard → Logs
3. Testen Sie die API-Verbindung im Supabase-Dashboard → API

---

**Viel Erfolg mit Ihrer neuen Datenbank! 🎉**
