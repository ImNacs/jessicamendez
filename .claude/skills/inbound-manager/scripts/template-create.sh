#!/bin/bash
# Crear template
# Uso: ./template-create.sh <name> <subject> <html_content>
# Ejemplo: ./template-create.sh "Bienvenida" "Bienvenido!" "<h1>Hola {{name}}</h1>"

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
    echo "Uso: ./template-create.sh <name> <subject> <html_content>"
    echo ""
    echo "Ejemplo:"
    echo "  ./template-create.sh \"Bienvenida\" \"Bienvenido!\" \"<h1>Hola {{name}}</h1>\""
    exit 1
fi

NAME="$1"
SUBJECT="$2"
HTML="$3"

# Escapar HTML para JSON
HTML_ESCAPED=$(echo "$HTML" | sed 's/"/\\"/g' | tr -d '\n')

curl -s -X POST "https://api.resend.com/templates" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$NAME\",\"subject\":\"$SUBJECT\",\"html\":\"$HTML_ESCAPED\"}" | jq
