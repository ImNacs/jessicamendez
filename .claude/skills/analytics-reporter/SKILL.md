---
name: analytics-reporter
description: Consulta métricas de Umami Analytics. Usa con "analytics", "métricas", "visitas", "tráfico", "reportes", "fuentes de tráfico", "campañas UTM", "eventos", "posts populares", "usuarios activos", "estadísticas del sitio".
allowed-tools: Bash, Read
---

# Analytics Reporter (Umami)

Skill para consultar métricas y generar reportes desde Umami Analytics via API.

## Cuándo Usar Esta Skill

- Usuario pregunta sobre visitas, tráfico o métricas del sitio
- Usuario quiere saber los posts/páginas más visitados
- Usuario necesita reporte de fuentes de tráfico o referrers
- Usuario pregunta por campañas UTM o marketing
- Usuario quiere ver eventos personalizados
- Usuario pide estadísticas por país, dispositivo o navegador

## Configuración

| Campo | Valor |
|-------|-------|
| **URL** | `https://data.jessicamendez.bio` |
| **Website ID** | `b7135bbc-1556-405c-97f7-2f50efc87437` |
| **Credenciales** | Usuario: `admin` (cambiar contraseña en primer login) |
| **API Token** | Obtener via `/api/auth/login` |

## Autenticación

Antes de consultar, obtener token JWT:

```bash
# Obtener token (guardar para usar en queries)
TOKEN=$(curl -s -X POST "https://data.jessicamendez.bio/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"TU_PASSWORD"}' | jq -r '.token')

echo "Token: ${TOKEN:0:30}..."
```

## Consultas Comunes

### Estadísticas Generales (últimos 30 días)

```bash
START=$(($(date -d "30 days ago" +%s) * 1000))
END=$(($(date +%s) * 1000))
SITE="b7135bbc-1556-405c-97f7-2f50efc87437"

curl -s "https://data.jessicamendez.bio/api/websites/$SITE/stats?startAt=$START&endAt=$END" \
  -H "Authorization: Bearer $TOKEN" | jq
```

**Respuesta**: `pageviews`, `visitors`, `visits`, `bounces`, `totaltime`

### Páginas/Posts Más Visitados

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=url&limit=10" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Fuentes de Tráfico (Referrers)

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=referrer&limit=10" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Por País

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=country" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Por Dispositivo

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=device" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Por Navegador

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=browser" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Campañas UTM

```bash
# Parámetros de query (incluye UTM)
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=query" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Eventos Personalizados

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/metrics?startAt=$START&endAt=$END&type=event" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Pageviews por Día (gráfica)

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/pageviews?startAt=$START&endAt=$END&unit=day&timezone=America/Mexico_City" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Usuarios Activos (tiempo real)

```bash
curl -s "https://data.jessicamendez.bio/api/websites/$SITE/active" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Datos en Tiempo Real

```bash
curl -s "https://data.jessicamendez.bio/api/realtime/$SITE" \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Tipos de Métricas Disponibles

| Tipo | Descripción |
|------|-------------|
| `url` | URLs/páginas visitadas |
| `title` | Títulos de páginas |
| `referrer` | Fuentes de tráfico |
| `browser` | Navegadores |
| `os` | Sistemas operativos |
| `device` | Dispositivos (desktop, mobile, tablet) |
| `country` | Países |
| `region` | Regiones/estados |
| `city` | Ciudades |
| `language` | Idiomas |
| `event` | Eventos personalizados |
| `query` | Parámetros de query (UTM) |

## Parámetros de Tiempo

| Rango | Cálculo |
|-------|---------|
| Hoy | `START=$(($(date -d "today 00:00" +%s) * 1000))` |
| Últimos 7 días | `START=$(($(date -d "7 days ago" +%s) * 1000))` |
| Últimos 30 días | `START=$(($(date -d "30 days ago" +%s) * 1000))` |
| Este mes | `START=$(($(date -d "$(date +%Y-%m-01)" +%s) * 1000))` |
| Mes anterior | Calcular primer y último día del mes anterior |

## Filtros Adicionales

Agregar a cualquier query:
- `&url=/blog/post-especifico` - Filtrar por URL
- `&referrer=google.com` - Filtrar por referrer
- `&country=MX` - Filtrar por país
- `&device=mobile` - Filtrar por dispositivo
- `&browser=Chrome` - Filtrar por navegador

## Flujo para Reportes

### Reporte Semanal Básico

1. Obtener token de autenticación
2. Calcular timestamps (últimos 7 días)
3. Consultar stats generales
4. Consultar top 10 páginas
5. Consultar fuentes de tráfico
6. Formatear y presentar resultados

### Reporte de Campaña

1. Obtener token
2. Consultar métricas tipo `query` para ver UTMs
3. Filtrar por `utm_campaign` específico si es necesario
4. Comparar con período anterior

## Tracking de Eventos en el Sitio

Para trackear eventos personalizados en el sitio:

**HTML (data attributes)**:
```html
<button data-umami-event="CTA Click" data-umami-event-ubicacion="hero">
  Contactar
</button>
```

**JavaScript**:
```javascript
umami.track('Formulario Enviado', { tipo: 'contacto' });
```

## Links (URLs Trackeadas)

URLs cortas que redirigen a un destino, con tracking de clicks.

**Casos de uso**:
- Medir clicks en enlaces de campañas
- Trackear descargas de archivos
- URLs cortas para redes sociales

### Crear Link (UI)

1. Ir a https://data.jessicamendez.bio/links
2. Click "Add link"
3. Configurar: nombre, URL destino, slug personalizado

### API de Links

```bash
# Listar todos los links
curl -s "https://data.jessicamendez.bio/api/links" \
  -H "Authorization: Bearer $TOKEN" | jq

# Obtener un link específico
curl -s "https://data.jessicamendez.bio/api/links/{linkId}" \
  -H "Authorization: Bearer $TOKEN" | jq

# Actualizar link
curl -s -X POST "https://data.jessicamendez.bio/api/links/{linkId}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo nombre","url":"https://destino.com","slug":"mi-enlace"}' | jq

# Eliminar link
curl -s -X DELETE "https://data.jessicamendez.bio/api/links/{linkId}" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Usar Link Trackeado

```
https://data.jessicamendez.bio/l/{slug}
```

Ejemplo: `https://data.jessicamendez.bio/l/curso-esg`

## Pixels (Tracking sin JavaScript)

Imágenes invisibles para trackear donde no se puede usar JavaScript.

**Casos de uso**:
- Medir aperturas de emails/newsletters
- Trackear en sitios externos
- Medir descargas de PDFs

### Crear Pixel (UI)

1. Ir a https://data.jessicamendez.bio/pixels
2. Click "Add pixel"
3. Configurar: nombre, slug

### API de Pixels

```bash
# Listar todos los pixels
curl -s "https://data.jessicamendez.bio/api/pixels" \
  -H "Authorization: Bearer $TOKEN" | jq

# Obtener un pixel específico
curl -s "https://data.jessicamendez.bio/api/pixels/{pixelId}" \
  -H "Authorization: Bearer $TOKEN" | jq

# Actualizar pixel
curl -s -X POST "https://data.jessicamendez.bio/api/pixels/{pixelId}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Newsletter Enero","slug":"news-enero"}' | jq

# Eliminar pixel
curl -s -X DELETE "https://data.jessicamendez.bio/api/pixels/{pixelId}" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Embeber Pixel en Email

```html
<!-- En el HTML del email -->
<img src="https://data.jessicamendez.bio/p/{slug}"
     width="1" height="1"
     style="display:none"
     alt="">
```

### Embeber en Sitio Externo

```html
<img src="https://data.jessicamendez.bio/p/{slug}" width="1" height="1" alt="">
```

## Manejo de Errores

### Error: "401 Unauthorized"
Token expirado o inválido. Obtener nuevo token:
```bash
TOKEN=$(curl -s -X POST "https://data.jessicamendez.bio/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"TU_PASSWORD"}' | jq -r '.token')
```

### Error: "400 Bad Request"
Verificar que `startAt` y `endAt` están en milisegundos (no segundos).

### Error: "404 Not Found"
Verificar el Website ID: `b7135bbc-1556-405c-97f7-2f50efc87437`

### Sin datos
- Verificar que el tracking code está instalado en el sitio
- Esperar unos minutos después de visitas para que se registren
- Verificar rango de fechas (puede estar consultando período sin datos)

## Recursos

- **Dashboard**: https://data.jessicamendez.bio
- **Documentación**: `docs/investigacion-umami-analytics.md`
- **API avanzada**: `docs/investigacion-umami-avanzado.md`
