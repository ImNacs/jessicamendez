#!/bin/bash
# Crear propiedad de contacto
# Uso: ./property-create.sh <key> <type> [fallback_value]
# type: string | number | boolean
# Ejemplo: ./property-create.sh "sector" "string" "General"

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
    echo "Uso: ./property-create.sh <key> <type> [fallback_value]"
    echo "type: string | number | boolean"
    echo ""
    echo "Ejemplo:"
    echo "  ./property-create.sh \"sector\" \"string\" \"General\""
    exit 1
fi

KEY="$1"
TYPE="$2"
FALLBACK="${3:-}"

JSON="{\"key\":\"$KEY\",\"type\":\"$TYPE\""
[ -n "$FALLBACK" ] && JSON="$JSON,\"fallbackValue\":\"$FALLBACK\""
JSON="$JSON}"

curl -s -X POST "https://api.resend.com/contact-properties" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$JSON" | jq
