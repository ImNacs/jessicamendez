#!/bin/bash
# Enviar email transaccional
# Uso: ./email-send.sh <to> <subject> <html_content> [from]
# from: default "Jessica Méndez <contacto@jessicamendez.bio>"
# Ejemplo: ./email-send.sh "user@example.com" "Bienvenido" "<h1>Hola!</h1>"

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Uso: ./email-send.sh <to> <subject> <html_content> [from]"
    echo ""
    echo "Ejemplo:"
    echo "  ./email-send.sh \"user@example.com\" \"Bienvenido\" \"<h1>Hola!</h1>\""
    exit 1
fi

TO="$1"
SUBJECT="$2"
HTML="$3"
FROM="${4:-Jessica Méndez <contacto@jessicamendez.bio>}"

# Escapar HTML para JSON
HTML_ESCAPED=$(echo "$HTML" | sed 's/"/\\"/g' | tr -d '\n')

curl -s -X POST "https://api.resend.com/emails" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"from\":\"$FROM\",\"to\":\"$TO\",\"subject\":\"$SUBJECT\",\"html\":\"$HTML_ESCAPED\"}" | jq
