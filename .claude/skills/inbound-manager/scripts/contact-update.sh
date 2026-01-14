#!/bin/bash
# Actualizar contacto por ID o email
# Uso: ./contact-update.sh <id_or_email> <json_data>
# Ejemplo: ./contact-update.sh user@example.com '{"firstName":"Juan","unsubscribed":false}'

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: ./contact-update.sh <id_or_email> <json_data>"
    echo "Ejemplo: ./contact-update.sh user@example.com '{\"firstName\":\"Juan\",\"unsubscribed\":false}'"
    exit 1
fi

IDENTIFIER="$1"
DATA="$2"

curl -s -X PATCH "https://api.resend.com/contacts/$IDENTIFIER" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA" | jq
