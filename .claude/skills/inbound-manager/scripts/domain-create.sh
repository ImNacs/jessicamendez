#!/bin/bash
# Crear dominio
# Uso: ./domain-create.sh <name>
# Ejemplo: ./domain-create.sh "jessicamendez.bio"

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
    echo "Uso: ./domain-create.sh <name>"
    echo "Ejemplo: ./domain-create.sh \"jessicamendez.bio\""
    exit 1
fi

NAME="$1"

curl -s -X POST "https://api.resend.com/domains" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$NAME\"}" | jq
