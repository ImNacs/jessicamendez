# Umami API Reference (v3)

Documentación técnica de los endpoints de la API de Umami v3.

## Autenticación

```bash
TOKEN=$(curl -s -X POST "$UMAMI_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$UMAMI_USERNAME\",\"password\":\"$UMAMI_PASSWORD\"}" | jq -r '.token')
```

## Endpoints

### GET /api/websites/{websiteId}/stats

Estadísticas generales del sitio.

**Parámetros**:
- `startAt` (required): Timestamp en milisegundos
- `endAt` (required): Timestamp en milisegundos

**Respuesta**:
```json
{
  "pageviews": 100,
  "visitors": 50,
  "visits": 60,
  "bounces": 10,
  "totaltime": 3600,
  "comparison": { ... }
}
```

### GET /api/websites/{websiteId}/values

Métricas agrupadas por tipo.

**Parámetros**:
- `startAt` (required): Timestamp en milisegundos
- `endAt` (required): Timestamp en milisegundos
- `type` (required): Tipo de métrica

**Tipos disponibles**:

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `path` | URLs visitadas | `/blog/mi-post/` |
| `title` | Títulos de páginas | `Mi Post - Blog` |
| `referrer` | Fuentes de tráfico | `google.com` |
| `browser` | Navegadores | `chrome`, `firefox` |
| `os` | Sistemas operativos | `Windows 10`, `macOS` |
| `device` | Dispositivos | `desktop`, `mobile`, `tablet` |
| `country` | Código de país | `MX`, `US`, `ES` |
| `region` | Región/estado | `MX-CMX` |
| `city` | Ciudad | `Mexico City` |
| `language` | Idioma | `es-MX`, `en-US` |
| `event` | Eventos custom | `CTA Click` |
| `query` | Query params (UTM) | `utm_source=google` |
| `hostname` | Hostname | `jessicamendez.bio` |
| `tag` | Tags | `production` |

**Respuesta**:
```json
[
  { "value": "/", "count": 50 },
  { "value": "/blog/", "count": 30 }
]
```

### GET /api/websites/{websiteId}/pageviews

Pageviews agrupados por período.

**Parámetros**:
- `startAt` (required): Timestamp en milisegundos
- `endAt` (required): Timestamp en milisegundos
- `unit`: `hour`, `day`, `week`, `month`, `year`

**Respuesta**:
```json
{
  "pageviews": [{ "x": "2026-01-01T00:00:00Z", "y": 10 }],
  "sessions": [{ "x": "2026-01-01T00:00:00Z", "y": 5 }]
}
```

### GET /api/websites/{websiteId}/events

Lista paginada de eventos (pageviews y custom).

**Parámetros**:
- `startAt` (required): Timestamp en milisegundos
- `endAt` (required): Timestamp en milisegundos

**Respuesta**:
```json
{
  "data": [
    {
      "urlPath": "/blog/post/",
      "pageTitle": "Mi Post",
      "country": "MX",
      "device": "desktop",
      "browser": "chrome"
    }
  ],
  "count": 100,
  "page": 1,
  "pageSize": 20
}
```

### GET /api/websites/{websiteId}/sessions

Lista paginada de sesiones.

**Parámetros**:
- `startAt` (required): Timestamp en milisegundos
- `endAt` (required): Timestamp en milisegundos

**Respuesta**:
```json
{
  "data": [
    {
      "browser": "chrome",
      "os": "Windows 10",
      "device": "desktop",
      "country": "MX",
      "city": "Mexico City",
      "views": 5,
      "visits": 1
    }
  ]
}
```

### GET /api/websites/{websiteId}/active

Usuarios activos en tiempo real.

**Respuesta**:
```json
{ "visitors": 3 }
```

## Cálculo de Timestamps

```bash
# Hoy
START=$(($(date -d "today 00:00" +%s) * 1000))

# Últimos 7 días
START=$(($(date -d "7 days ago" +%s) * 1000))

# Últimos 30 días
START=$(($(date -d "30 days ago" +%s) * 1000))

# Este mes
START=$(($(date -d "$(date +%Y-%m-01)" +%s) * 1000))

# Fin siempre es ahora
END=$(($(date +%s) * 1000))
```

## API de Links

```bash
# Listar links
curl -s "$UMAMI_URL/api/links" -H "Authorization: Bearer $TOKEN"

# Crear link
curl -s -X POST "$UMAMI_URL/api/links" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mi Link","url":"https://destino.com","slug":"mi-link"}'
```

**Uso**: `https://data.jessicamendez.bio/l/{slug}`

## API de Pixels

```bash
# Listar pixels
curl -s "$UMAMI_URL/api/pixels" -H "Authorization: Bearer $TOKEN"
```

**Embeber**:
```html
<img src="https://data.jessicamendez.bio/p/{slug}" width="1" height="1" style="display:none" alt="">
```

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| 401 Unauthorized | Token expirado | Re-autenticar |
| 400 Bad Request en /values | `type` inválido | Usar tipo de la tabla |
| 400 Bad Request | Timestamps en segundos | Multiplicar por 1000 |
| Sin datos | Tracking reciente | Esperar o verificar script |
