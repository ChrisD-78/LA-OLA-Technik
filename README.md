# 🏊‍♂️ Freizeitbad LA OLA - Technik-Dokumentation

Eine moderne Webanwendung zur Verwaltung und Dokumentation aller technischen Anlagen und Geräte im Freizeitbad LA OLA.

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

## 🚀 Online-Version

**Live-Anwendung**: [https://la-ola-technik.netlify.app](https://la-ola-technik.netlify.app)

## 🔑 Anmeldedaten

- **Benutzername**: `techik`
- **Passwort**: `technik1`

## 🗄️ Datenbank

Die Anwendung verwendet **Supabase** als Backend-Datenbank:
- **URL**: https://toeskuoixedornrqrvzm.supabase.co
- **PostgreSQL** mit Row Level Security
- **Automatische Backups** und Skalierung

## 🚀 Lokale Entwicklung

### Voraussetzungen
- Node.js (Version 18 oder höher)
- npm oder yarn
- Supabase-Projekt (siehe SUPABASE_SETUP.md)

### Setup
```bash
# Repository klonen
git clone [repository-url]
cd technik-doku

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen setzen (.env Datei erstellen)
REACT_APP_SUPABASE_URL=https://toeskuoixedornrqrvzm.supabase.co
REACT_APP_SUPABASE_ANON_KEY=ihr-supabase-anon-key

# Entwicklungsserver starten
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

## 📱 Verwendung

### **Dashboard**
- Übersicht aller wichtigen Kennzahlen
- Schnellzugriff auf häufig genutzte Funktionen
- Anstehende Prüfungen und Wartungen

### **Anlagen & Geräte**
- Neue Anlagen hinzufügen
- Bestehende Anlagen bearbeiten
- Bilder hochladen und verwalten
- Anlagen löschen

### **Prüfungen & Wartung**
- Neue Prüfungen planen
- Prüfungsergebnisse dokumentieren
- Wartungsprotokolle erstellen
- Prüfungsverlauf einsehen

## 🛠️ Technischer Stack

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

## 📋 Lizenz

Dieses Projekt ist für den internen Gebrauch des Freizeitbads LA OLA bestimmt.

---

**🏊‍♂️ LA OLA - Wo Technik auf Spaß trifft! ✨** # Test Update Tue Sep  2 08:22:16 CEST 2025
