---
name: analytics-reporter
description: Consulta métricas de Umami Analytics. Usa con "analytics", "métricas", "visitas", "tráfico", "reportes", "fuentes de tráfico", "campañas UTM", "eventos", "posts populares", "usuarios activos", "estadísticas del sitio".
allowed-tools: Bash, Read
---

# Analytics Reporter (Umami v3)

Skill para consultar métricas desde Umami Analytics via API.

## Cuándo Usar Esta Skill

- Usuario pregunta sobre visitas, tráfico o métricas del sitio
- Usuario quiere saber los posts/páginas más visitados
- Usuario necesita reporte de fuentes de tráfico o referrers
- Usuario pregunta por campañas UTM o marketing
- Usuario quiere ver eventos personalizados
- Usuario pide estadísticas por país, dispositivo o navegador

## Instrucciones

### Paso 1: Usar el Script Helper (Recomendado)

El script `umami-report.sh` ejecuta las consultas más comunes:

```bash
.claude/skills/analytics-reporter/scripts/umami-report.sh [comando] [días]
```

**Comandos disponibles**:

| Comando | Descripción |
|---------|-------------|
| `stats` | Estadísticas generales |
| `pages` | Páginas más visitadas |
| `blog` | Posts del blog más visitados |
| `referrers` | Fuentes de tráfico |
| `countries` | Visitas por país |
| `cities` | Visitas por ciudad |
| `devices` | Visitas por dispositivo |
| `browsers` | Visitas por navegador |
| `os` | Visitas por sistema operativo |
| `utm` | Campañas UTM |
| `events` | Eventos personalizados |
| `active` | Usuarios activos (tiempo real) |
| `daily` | Pageviews por día |
| `full` | Reporte completo |

**Ejemplos**:
```bash
# Estadísticas últimos 30 días (default)
.claude/skills/analytics-reporter/scripts/umami-report.sh stats

# Posts del blog últimos 7 días
.claude/skills/analytics-reporter/scripts/umami-report.sh blog 7

# Reporte completo últimos 14 días
.claude/skills/analytics-reporter/scripts/umami-report.sh full 14
```

### Paso 2: Consultas Manuales (Si el Script No Aplica)

Para consultas personalizadas, usar el patrón base:

```bash
export $(grep -E '^UMAMI' .env.local | xargs) && \
TOKEN=$(curl -s -X POST "$UMAMI_URL/api/auth/login" -H "Content-Type: application/json" -d "{\"username\":\"$UMAMI_USERNAME\",\"password\":\"$UMAMI_PASSWORD\"}" | jq -r '.token') && \
START=$(($(date -d "30 days ago" +%s) * 1000)) && \
END=$(($(date +%s) * 1000)) && \
curl -s "$UMAMI_URL/api/websites/$UMAMI_WEBSITE_ID/[ENDPOINT]" \
  -H "Authorization: Bearer $TOKEN" | jq
```

**Endpoints principales**:
- `/stats` - Estadísticas generales
- `/values?type=path` - Páginas visitadas
- `/values?type=referrer` - Fuentes de tráfico
- `/values?type=country` - Por país
- `/active` - Usuarios activos

Para la lista completa de endpoints y tipos, ver [REFERENCE.md](REFERENCE.md).

### Paso 3: Formatear y Presentar Resultados

1. Mostrar métricas en tabla markdown
2. Ordenar por count descendente
3. Incluir período consultado en el título
4. Si hay pocos datos, mencionar que el tracking es reciente

**Ejemplo de output**:
```markdown
## Métricas del Sitio (últimos 30 días)

| Métrica | Valor |
|---------|-------|
| Pageviews | 100 |
| Visitantes | 50 |
| Sesiones | 60 |

## Páginas Más Visitadas

| Visitas | Página |
|---------|--------|
| 30 | / |
| 20 | /blog/ |
| 10 | /blog/mi-post/ |
```

## Configuración

Variables requeridas en `.env.local`:

```bash
UMAMI_URL=https://data.jessicamendez.bio
UMAMI_USERNAME=admin
UMAMI_PASSWORD=<configurado>
UMAMI_WEBSITE_ID=b7135bbc-1556-405c-97f7-2f50efc87437
```

## Manejo de Errores

### Error: "401 Unauthorized"
Token expirado. El script re-autentica automáticamente en cada ejecución.

### Error: "400 Bad Request" en consulta manual
1. Verificar que `type` es válido (ver [REFERENCE.md](REFERENCE.md))
2. Verificar timestamps en milisegundos (multiplicar segundos × 1000)

### Error: Sin datos
- Tracking configurado recientemente
- Rango de fechas sin visitas
- Verificar que el script de tracking está en el sitio

### Error: Variables de entorno no configuradas
```bash
# Verificar que existen
grep -E '^UMAMI' .env.local
```

## Recursos

- **Dashboard**: https://data.jessicamendez.bio
- **API Reference**: [REFERENCE.md](REFERENCE.md)
- **Docs investigación**: `docs/investigacion-umami-analytics.md`
