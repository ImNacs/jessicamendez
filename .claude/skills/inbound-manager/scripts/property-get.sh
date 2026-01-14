#!/bin/bash
# Obtener propiedad de contacto por ID
# Uso: ./property-get.sh <property_id>

set -e
cd "$(dirname "$0")/../../../.." 2>/dev/null || cd /nacs/proyectos/jessicamendez.bio

if [ -f ".env.local" ]; then
    export $(grep -E '^RESEND_API_KEY' .env.local | xargs)
fi

if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

if [ -z "$1" ]; then
    echo "Uso: ./property-get.sh <property_id>"
    exit 1
fi

PROPERTY_ID="$1"

curl -s "https://api.resend.com/contact-properties/$PROPERTY_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" | jq
