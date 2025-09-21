# 🔧 LA OLA Technik-Doku

Eine moderne Web-Anwendung zur Verwaltung von technischen Geräten und deren Prüfungen für LA OLA.

## 🚀 Features

- ✅ **Geräte-Verwaltung**: Vollständige CRUD-Operationen für technische Geräte
- ✅ **Prüfungs-Management**: Planung und Verwaltung von Inspektionen
- ✅ **Dashboard**: Übersichtliche Darstellung aller wichtigen Informationen
- ✅ **Kategorien**: Wartung, Messgeräte, Technische & Elektrische Prüfungen
- ✅ **Responsive Design**: Optimiert für Desktop und Mobile
- ✅ **Datenbank-Integration**: Supabase für sichere Datenspeicherung

## 🛠️ Technologie-Stack

- **Frontend**: React 18 mit TypeScript
- **Styling**: CSS3 mit modernem Design
- **Datenbank**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **Build Tool**: Create React App

## 🏗️ Installation & Setup

### 1. Repository klonen
```bash
git clone https://github.com/IHR-USERNAME/la-ola-technik-doku.git
cd la-ola-technik-doku
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren
```bash
cp .env.example .env
```

Tragen Sie Ihre Supabase-Credentials ein:
```env
REACT_APP_SUPABASE_URL=https://ihr-projekt.supabase.co
REACT_APP_SUPABASE_ANON_KEY=ihr-anon-key
```

### 4. Datenbank einrichten
1. Erstellen Sie ein neues Supabase-Projekt
2. Führen Sie das SQL-Script `database-setup.sql` im Supabase SQL Editor aus
3. Die Tabellen und Beispieldaten werden automatisch erstellt

### 5. Anwendung starten
```bash
npm start
```

Die Anwendung ist unter `http://localhost:3000` erreichbar.

## 🔐 Anmeldung

- **Benutzername**: `technik`
- **Passwort**: `technik1`

## 📁 Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── Dashboard.tsx    # Haupt-Dashboard
│   ├── EquipmentList.tsx # Geräteliste
│   ├── InspectionList.tsx # Prüfungsliste
│   └── ...
├── lib/                 # Utility-Funktionen
│   ├── api.ts          # Supabase API-Funktionen
│   └── supabase.ts     # Supabase-Client
├── types.ts            # TypeScript-Typen
└── App.tsx             # Haupt-App-Komponente
```

## 🚀 Deployment

Die Anwendung wird automatisch über Netlify deployed:

1. **GitHub**: Code wird in GitHub-Repository gepusht
2. **Netlify**: Automatisches Build und Deployment
3. **Umgebungsvariablen**: Werden in Netlify Dashboard konfiguriert

### Netlify Environment Variables
```
REACT_APP_SUPABASE_URL=ihre-supabase-url
REACT_APP_SUPABASE_ANON_KEY=ihr-anon-key
```

## 📊 Datenbank-Schema

### Equipment Tabelle
- Geräte-Informationen (Name, Typ, Hersteller, etc.)
- Status-Tracking (aktiv, inaktiv, Wartung)
- Bilder und Notizen

### Inspections Tabelle
- Prüfungs-Planung und -Durchführung
- Befunde und Ergebnisse
- Dokumente-Anhänge

## 🔧 Entwicklung

### Build für Production
```bash
npm run build
```

### Code-Qualität
```bash
npm run lint
```

## 📝 Changelog

### Version 1.0.0
- ✅ Grundlegende Geräte-Verwaltung
- ✅ Prüfungs-Management
- ✅ Supabase-Integration
- ✅ Responsive Design
- ✅ Automatisches Deployment

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/neue-funktion`)
3. Commit deine Änderungen (`git commit -am 'Neue Funktion hinzugefügt'`)
4. Push zum Branch (`git push origin feature/neue-funktion`)
5. Erstelle einen Pull Request

## 📄 Lizenz

Dieses Projekt ist für den internen Gebrauch bei LA OLA bestimmt.

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an das Technik-Team.

---

**Entwickelt für LA OLA** 🏊‍♂️