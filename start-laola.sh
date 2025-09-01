#!/bin/bash

# Freizeitbad LA OLA - Technik Dokumentation Starter (Alternative)
# Für den Fall, dass das .command Script nicht funktioniert

echo "🏊‍♂️ Freizeitbad LA OLA - Technik Dokumentation"
echo "=================================================="

# Stoppe eventuell laufende Prozesse
pkill -f "react-scripts" 2>/dev/null
pkill -f "npm start" 2>/dev/null
sleep 2

# Starte die Anwendung
echo "🚀 Starte Anwendung..."
npm start
