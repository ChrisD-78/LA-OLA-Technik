# 🗄️ Neue Supabase-Datenbank Setup

## ⚠️ WICHTIG: Alte Datenbank nicht mehr verfügbar

Die ursprüngliche Supabase-Datenbank `toeskuoixedornrqrvzm.supabase.co` existiert nicht mehr.

## 🚀 Neue Datenbank einrichten

### 1. Neues Supabase-Projekt erstellen

1. **Gehen Sie zu**: https://supabase.com/dashboard
2. **Klicken Sie auf "New Project"**
3. **Projekt-Details:**
   - **Name**: `la-ola-technik-doku`
   - **Database Password**: Wählen Sie ein sicheres Passwort
   - **Region**: `Central EU` (oder nächstgelegene)

### 2. API-Schlüssel abrufen

Nach der Erstellung:
1. **Gehen Sie zu**: `Settings` → `API`
2. **Kopieren Sie:**
   - **Project URL** (z.B. `https://xyzabc123.supabase.co`)
   - **anon public key** (beginnt mit `eyJ...`)

### 3. .env Datei aktualisieren

Ersetzen Sie in der `.env` Datei:
```bash
REACT_APP_SUPABASE_URL=https://IHR-NEUE-SUPABASE-URL.supabase.co
REACT_APP_SUPABASE_ANON_KEY=IHR-NEUE-ANON-KEY
```

### 4. Datenbank-Tabellen erstellen

1. **Gehen Sie zum SQL Editor** in Supabase
2. **Kopieren Sie den Inhalt von `database-setup.sql`**
3. **Führen Sie das Script aus**

### 5. Entwicklungsserver neu starten

```bash
npm start
```

## ✅ Nach dem Setup

Die Anwendung sollte wieder funktionieren mit:
- ✅ Neue Supabase-Datenbank
- ✅ Alle Tabellen erstellt
- ✅ Beispiel-Daten eingefügt
- ✅ Vollständige CRUD-Operationen

## 🔧 Bei Problemen

Falls die Verbindung immer noch nicht funktioniert:
1. Überprüfen Sie die .env Datei
2. Starten Sie den Entwicklungsserver neu
3. Überprüfen Sie die Browser-Konsole auf Fehler
4. Testen Sie die Supabase-Verbindung im Dashboard
