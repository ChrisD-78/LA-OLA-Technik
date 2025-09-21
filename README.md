# 🏊‍♂️ Freizeitbad LA OLA - Technik-Dokumentation

Eine moderne Webanwendung zur Verwaltung und Dokumentation aller technischen Anlagen und Geräte im Freizeitbad LA OLA.

## 🚀 Online-Version

**Live-Anwendung**: [https://laola-technik.netlify.app](https://laola-technik.netlify.app)

### 🔄 Automatisches Deployment
- **GitHub Repository**: [https://github.com/ChrisD-78/LA-OLA-Technik](https://github.com/ChrisD-78/LA-OLA-Technik)
- **Auto-Deploy**: Jeder Push zum `main` Branch löst automatisch ein neues Deployment aus
- **Build-Status**: Wird in GitHub Commits angezeigt

## ✨ Features

### 🏗️ **Anlagen & Geräte-Verwaltung**
- ✅ **Vollständige Dokumentation** aller technischen Anlagen
- ✅ **Bildverwaltung** mit Galerie und Hauptbild-Funktion
- ✅ **Standort-Tracking** für alle Anlagen
- ✅ **Hersteller- und Modell-Informationen**
- ✅ **Seriennummern und Kaufdaten**
- ✅ **Status-Verwaltung** (Aktiv, Inaktiv, Wartung)

### 🔍 **Prüfungen & Wartung**
- ✅ **Prüfungsplanung** mit Terminverwaltung
- ✅ **Wartungsprotokolle** und -historie
- ✅ **Sicherheitsprüfungen** nach TÜV-Standards
- ✅ **Kalibrierung** von Messgeräten
- ✅ **Zertifizierungen** und Abnahmen
- ✅ **Prüfer-Zuordnung** und Verantwortlichkeiten

### 📊 **Dashboard & Übersicht**
- ✅ **Statistiken** aller Anlagen und Prüfungen
- ✅ **Überfällige Prüfungen** mit Warnungen
- ✅ **Schnellaktionen** für häufige Aufgaben
- ✅ **Neueste Anlagen** und anstehende Prüfungen
- ✅ **Responsive Design** für alle Geräte

### 🎨 **Moderne Benutzeroberfläche**
- ✅ **Glassmorphism-Design** mit modernen Effekten
- ✅ **Responsive Layout** für Desktop, Tablet und Mobile
- ✅ **Intuitive Navigation** mit klarer Struktur
- ✅ **Professionelle Darstellung** aller Daten
- ✅ **Hover-Animationen** und Smooth Transitions

## 🔑 Anmeldedaten

- **Benutzername**: `techik`
- **Passwort**: `technik1`

## 🗄️ Datenbank

Die Anwendung verwendet **Supabase** als Backend-Datenbank:
- **URL**: https://toeskuoixedornrqrvzm.supabase.co
- **PostgreSQL** mit Row Level Security
- **Automatische Backups** und Skalierung

## 🛠️ Technologie-Stack

- **Frontend**: React 18 mit TypeScript
- **Styling**: Moderne CSS mit Glassmorphism-Effekten
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Datenverwaltung**: Supabase (PostgreSQL) mit React Hooks
- **Bildverwaltung**: HTML5 File API mit Vorschau
- **Authentication**: Custom Login-System
- **Deployment**: Netlify mit automatischen Deployments
- **Database**: Supabase mit Row Level Security
- **API**: RESTful API mit Supabase Client

## 🚀 Lokale Entwicklung

### Voraussetzungen
- Node.js (Version 18 oder höher)
- npm oder yarn
- Supabase-Projekt (siehe SUPABASE_SETUP.md)

### Setup

```bash
# Repository klonen
git clone https://github.com/ChrisD-78/LA-OLA-Technik.git
cd LA-OLA-Technik

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen setzen (.env Datei erstellen)
cp .env.example .env
```

Tragen Sie Ihre Supabase-Credentials ein:
```env
REACT_APP_SUPABASE_URL=https://toeskuoixedornrqrvzm.supabase.co
REACT_APP_SUPABASE_ANON_KEY=ihr-supabase-anon-key
```

### Datenbank einrichten
1. Erstellen Sie ein neues Supabase-Projekt
2. Führen Sie das SQL-Script `database-setup.sql` im Supabase SQL Editor aus
3. Die Tabellen und Beispieldaten werden automatisch erstellt

### Anwendung starten
```bash
npm start
```

Die Anwendung ist unter `http://localhost:3000` verfügbar.

## 🏊‍♂️ **Anlagentypen im Freizeitbad**

### **Wasseraufbereitung**
- Filteranlagen
- Umwälzpumpen
- UV-Desinfektion
- pH-Regelung

### **Chemie-Dosierung**
- Chlor-Dosieranlagen
- pH-Wert-Regelung
- Flockungsmittel-Dosierung
- Desinfektionsmittel

### **Lüftungstechnik**
- Schwimmhallen-Lüftung
- Luftentfeuchtung
- Wärmerückgewinnung
- Klimatisierung

### **Heiztechnik**
- Pool-Heizung
- Wärmepumpen
- Solarthermie
- Fernwärme-Anschluss

### **Sicherheitstechnik**
- Rutschbahn-Sicherheit
- Notstromversorgung
- Brandschutz
- Überwachungssysteme

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

Dieses Projekt ist für den internen Gebrauch des Freizeitbads LA OLA bestimmt.

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an das Technik-Team.

---

**🏊‍♂️ LA OLA - Wo Technik auf Spaß trifft! ✨**