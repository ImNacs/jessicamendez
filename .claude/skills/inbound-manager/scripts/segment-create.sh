#!/bin/bash
# Crear segmento
# Uso: ./segment-create.sh <name> [description]
# Ejemplo: ./segment-create.sh "Profesionales ESG" "Consultores y profesionales del sector"

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
    echo "Uso: ./segment-create.sh <name> [description]"
    echo "Ejemplo: ./segment-create.sh \"Profesionales ESG\" \"Consultores del sector\""
    exit 1
fi

NAME="$1"
DESCRIPTION="${2:-}"

JSON="{\"name\":\"$NAME\""
[ -n "$DESCRIPTION" ] && JSON="$JSON,\"description\":\"$DESCRIPTION\""
JSON="$JSON}"

curl -s -X POST "https://api.resend.com/segments" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$JSON" | jq
