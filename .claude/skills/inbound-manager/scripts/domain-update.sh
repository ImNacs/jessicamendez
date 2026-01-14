#!/bin/bash
# Actualizar dominio
# Uso: ./domain-update.sh <domain_id> <json_data>
# Ejemplo: ./domain-update.sh abc123 '{"clickTracking":true,"openTracking":true}'

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
    echo "Uso: ./domain-update.sh <domain_id> <json_data>"
    echo "Ejemplo: ./domain-update.sh abc123 '{\"clickTracking\":true,\"openTracking\":true}'"
    exit 1
fi

DOMAIN_ID="$1"
DATA="$2"

curl -s -X PATCH "https://api.resend.com/domains/$DOMAIN_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA" | jq
