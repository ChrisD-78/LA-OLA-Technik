# 🚨 Supabase-Instanz nicht mehr verfügbar

## ⚠️ Problem
Die ursprüngliche Supabase-Instanz `toeskuoixedornrqrvzm.supabase.co` **existiert nicht mehr**.

Die Anwendung läuft derzeit im **lokalen Modus** mit Mock-Daten.

## 🏠 Aktueller Zustand
- ✅ **App funktioniert** mit lokalen Beispieldaten
- ✅ **Alle Features verfügbar** (nur Daten werden nicht persistent gespeichert)
- ✅ **Automatisches Deployment** funktioniert
- ❌ **Datenbank-Persistierung** nicht verfügbar

## 🗄️ Neue Supabase-Instanz einrichten

### 1. Neues Supabase-Projekt erstellen
1. Gehen Sie zu: https://supabase.com/dashboard
2. Klicken Sie auf **"New Project"**
3. Projekt-Details:
   - **Name**: `la-ola-technik-doku`
   - **Database Password**: Sicheres Passwort wählen
   - **Region**: `Central EU` (Frankfurt)

### 2. Datenbank-Schema einrichten
1. Gehen Sie zum **SQL Editor** in Supabase
2. Kopieren Sie den Inhalt von `database-setup.sql`
3. Führen Sie das Script aus
4. Überprüfen Sie dass beide Tabellen erstellt wurden:
   - `equipment`
   - `inspections`

### 3. API-Schlüssel abrufen
Nach der Erstellung:
1. Gehen Sie zu: **Settings** → **API**
2. Kopieren Sie:
   - **Project URL** (z.B. `https://abcd1234.supabase.co`)
   - **anon public key** (beginnt mit `eyJ...`)

### 4. Anwendung konfigurieren

#### Option A: Netlify Environment Variables (Empfohlen)
1. Gehen Sie zu Ihrem **Netlify Dashboard**
2. Wählen Sie Ihr Projekt: `la-ola-technik-doku`
3. **Site settings** → **Environment variables**
4. Fügen Sie hinzu:
   ```
   REACT_APP_SUPABASE_URL = https://IHR-NEUES-PROJEKT.supabase.co
   REACT_APP_SUPABASE_ANON_KEY = IHR-NEUER-ANON-KEY
   ```
5. **Save** und **Deploy** auslösen

#### Option B: netlify.toml aktualisieren
Bearbeiten Sie `netlify.toml`:
```toml
[build.environment]
  NODE_VERSION = "18"
  REACT_APP_SUPABASE_URL = "https://IHR-NEUES-PROJEKT.supabase.co"
  REACT_APP_SUPABASE_ANON_KEY = "IHR-NEUER-ANON-KEY"
```

### 5. Deployment testen
1. Pushen Sie Änderungen zu GitHub (falls Option B gewählt)
2. Warten Sie auf automatisches Netlify-Deployment
3. Öffnen Sie die App: https://laola-technik.netlify.app
4. Öffnen Sie Browser-Konsole
5. Suchen Sie nach: `🗄️ App versucht Supabase-Verbindung`

## 🔍 Debugging
Nach dem Setup sehen Sie in der Browser-Konsole:
```
🔧 LA OLA Technik-Doku - Konfiguration:
  mode: "SUPABASE_CONNECTED"
  url: "https://ihr-projekt.supabase.co"
  message: "🗄️ App versucht Supabase-Verbindung"
```

Bei Erfolg:
```
✅ Connection successful!
Data loaded successfully: { equipmentCount: 3, inspectionsCount: 3 }
```

## 🎯 Nach dem Setup
- **Persistent**: Alle Daten werden in Supabase gespeichert
- **Sync**: Änderungen zwischen Sessions verfügbar
- **Backup**: Automatische Supabase-Backups
- **Skalierung**: Automatisch mit Nutzung

## 🚨 Bis zur neuen Einrichtung
Die App funktioniert **vollständig** mit lokalen Daten:
- ✅ Geräte hinzufügen/bearbeiten/löschen
- ✅ Prüfungen erstellen/verwalten
- ✅ Dashboard-Statistiken
- ✅ Alle UI-Features

**Nur Einschränkung**: Daten gehen bei Browser-Reload verloren.

## 📞 Support
Bei Problemen:
1. Browser-Konsole prüfen
2. Supabase Dashboard → Logs prüfen
3. Netlify Deploy-Logs prüfen

---

**Die App ist einsatzbereit - mit oder ohne neue Supabase-Instanz! 🎉**
