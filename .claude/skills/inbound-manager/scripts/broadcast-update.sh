#!/bin/bash
# Actualizar broadcast
# Uso: ./broadcast-update.sh <broadcast_id> <json_data>
# Ejemplo: ./broadcast-update.sh abc123 '{"subject":"Nuevo asunto"}'

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
    echo "Uso: ./broadcast-update.sh <broadcast_id> <json_data>"
    echo "Ejemplo: ./broadcast-update.sh abc123 '{\"subject\":\"Nuevo asunto\"}'"
    exit 1
fi

BROADCAST_ID="$1"
DATA="$2"

curl -s -X PATCH "https://api.resend.com/broadcasts/$BROADCAST_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$DATA" | jq
