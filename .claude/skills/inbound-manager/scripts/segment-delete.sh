#!/bin/bash
# Eliminar segmento
# Uso: ./segment-delete.sh <segment_id>

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
    echo "Uso: ./segment-delete.sh <segment_id>"
    exit 1
fi

SEGMENT_ID="$1"

curl -s -X DELETE "https://api.resend.com/segments/$SEGMENT_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" | jq
