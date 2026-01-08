#!/bin/bash
# Umami Analytics Reporter
# Script para consultar métricas de Umami v3
# Uso: ./umami-report.sh [comando] [días]

set -e

# Cargar variables de entorno
if [ -f ".env.local" ]; then
    export $(grep -E '^UMAMI' .env.local | xargs)
fi

# Verificar variables requeridas
if [ -z "$UMAMI_URL" ] || [ -z "$UMAMI_USERNAME" ] || [ -z "$UMAMI_PASSWORD" ] || [ -z "$UMAMI_WEBSITE_ID" ]; then
    echo "Error: Variables de entorno UMAMI_* no configuradas"
    echo "Requeridas: UMAMI_URL, UMAMI_USERNAME, UMAMI_PASSWORD, UMAMI_WEBSITE_ID"
    exit 1
fi

# Obtener token
get_token() {
    curl -s -X POST "$UMAMI_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"username\":\"$UMAMI_USERNAME\",\"password\":\"$UMAMI_PASSWORD\"}" | jq -r '.token'
}

# Calcular timestamps
DAYS=${2:-30}
START=$(($(date -d "$DAYS days ago" +%s) * 1000))
END=$(($(date +%s) * 1000))
SITE="$UMAMI_WEBSITE_ID"

# Comandos disponibles
case "${1:-help}" in
    stats|estadisticas)
        TOKEN=$(get_token)
        echo "=== Estadísticas Generales (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/stats?startAt=$START&endAt=$END" \
            -H "Authorization: Bearer $TOKEN" | jq '{
                pageviews: .pageviews,
                visitors: .visitors,
                visits: .visits,
                bounces: .bounces,
                "tiempo_total_seg": .totaltime
            }'
        ;;

    pages|paginas)
        TOKEN=$(get_token)
        echo "=== Páginas Más Visitadas (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=path" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn | head -20
        ;;

    blog)
        TOKEN=$(get_token)
        echo "=== Posts del Blog Más Visitados (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=path" \
            -H "Authorization: Bearer $TOKEN" | jq '[.[] | select(.value | startswith("/blog/")) | select(.value != "/blog/")] | sort_by(-.count) | .[] | "\(.count)\t\(.value)"' -r
        ;;

    referrers|fuentes)
        TOKEN=$(get_token)
        echo "=== Fuentes de Tráfico (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=referrer" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    countries|paises)
        TOKEN=$(get_token)
        echo "=== Visitas por País (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=country" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    cities|ciudades)
        TOKEN=$(get_token)
        echo "=== Visitas por Ciudad (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=city" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    devices|dispositivos)
        TOKEN=$(get_token)
        echo "=== Visitas por Dispositivo (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=device" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    browsers|navegadores)
        TOKEN=$(get_token)
        echo "=== Visitas por Navegador (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=browser" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    os|sistemas)
        TOKEN=$(get_token)
        echo "=== Visitas por Sistema Operativo (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=os" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    utm|campanas)
        TOKEN=$(get_token)
        echo "=== Campañas UTM (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=query" \
            -H "Authorization: Bearer $TOKEN" | jq '[.[] | select(.value | contains("utm_"))] | .[] | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    events|eventos)
        TOKEN=$(get_token)
        echo "=== Eventos Personalizados (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=event" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | select(.value != null) | "\(.count)\t\(.value)"' -r | sort -rn
        ;;

    active|activos)
        TOKEN=$(get_token)
        echo "=== Usuarios Activos (tiempo real) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/active" \
            -H "Authorization: Bearer $TOKEN" | jq
        ;;

    daily|diario)
        TOKEN=$(get_token)
        echo "=== Pageviews por Día (últimos $DAYS días) ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/pageviews?startAt=$START&endAt=$END&unit=day" \
            -H "Authorization: Bearer $TOKEN" | jq '.pageviews[] | "\(.x | split("T")[0])\t\(.y) pageviews"' -r
        ;;

    full|completo)
        TOKEN=$(get_token)
        echo "========================================"
        echo "  REPORTE COMPLETO - Últimos $DAYS días"
        echo "========================================"
        echo ""

        echo "=== ESTADÍSTICAS GENERALES ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/stats?startAt=$START&endAt=$END" \
            -H "Authorization: Bearer $TOKEN" | jq '{
                pageviews: .pageviews,
                visitors: .visitors,
                visits: .visits,
                bounces: .bounces,
                "tiempo_total_seg": .totaltime
            }'
        echo ""

        echo "=== TOP 10 PÁGINAS ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=path" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn | head -10
        echo ""

        echo "=== POR PAÍS ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=country" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        echo ""

        echo "=== POR DISPOSITIVO ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=device" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn
        echo ""

        echo "=== FUENTES DE TRÁFICO ==="
        curl -s "$UMAMI_URL/api/websites/$SITE/values?startAt=$START&endAt=$END&type=referrer" \
            -H "Authorization: Bearer $TOKEN" | jq '.[] | "\(.count)\t\(.value)"' -r | sort -rn | head -10
        ;;

    help|*)
        echo "Umami Analytics Reporter"
        echo ""
        echo "Uso: ./umami-report.sh [comando] [días]"
        echo ""
        echo "Comandos disponibles:"
        echo "  stats, estadisticas  - Estadísticas generales"
        echo "  pages, paginas       - Páginas más visitadas"
        echo "  blog                 - Posts del blog más visitados"
        echo "  referrers, fuentes   - Fuentes de tráfico"
        echo "  countries, paises    - Visitas por país"
        echo "  cities, ciudades     - Visitas por ciudad"
        echo "  devices, dispositivos- Visitas por dispositivo"
        echo "  browsers, navegadores- Visitas por navegador"
        echo "  os, sistemas         - Visitas por sistema operativo"
        echo "  utm, campanas        - Campañas UTM"
        echo "  events, eventos      - Eventos personalizados"
        echo "  active, activos      - Usuarios activos (tiempo real)"
        echo "  daily, diario        - Pageviews por día"
        echo "  full, completo       - Reporte completo"
        echo ""
        echo "Ejemplos:"
        echo "  ./umami-report.sh stats         # Últimos 30 días"
        echo "  ./umami-report.sh blog 7        # Blog últimos 7 días"
        echo "  ./umami-report.sh full 14       # Reporte completo 14 días"
        ;;
esac
