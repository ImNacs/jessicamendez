#!/bin/bash
# Crear API key
# Uso: ./apikey-create.sh <name> [permission]
# permission: full_access | sending_access (default: full_access)
# Ejemplo: ./apikey-create.sh "Production Key" "sending_access"

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
    echo "Uso: ./apikey-create.sh <name> [permission]"
    echo "permission: full_access | sending_access (default: full_access)"
    echo ""
    echo "Ejemplo:"
    echo "  ./apikey-create.sh \"Production Key\" \"sending_access\""
    exit 1
fi

NAME="$1"
PERMISSION="${2:-full_access}"

curl -s -X POST "https://api.resend.com/api-keys" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$NAME\",\"permission\":\"$PERMISSION\"}" | jq
