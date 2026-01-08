# Investigación: Umami Analytics - Funcionalidades Básicas

> **Fecha**: Enero 2026
> **Propósito**: Documentar las funcionalidades básicas de Umami Analytics para implementación en jessicamendez.bio

## Descripción General

Umami es una plataforma de analítica web open-source, enfocada en privacidad y simplicidad. Es una alternativa ligera a Google Analytics que no utiliza cookies ni recopila datos personales, siendo compatible con GDPR de forma nativa.

**Características principales**:
- Script de tracking ultra-ligero (< 2 KB)
- No requiere cookies
- Anonimización de IPs automática
- Dashboard en tiempo real
- Múltiples sitios desde una instalación

---

## 1. Dashboard y Métricas Principales

### 1.1 Métricas del Dashboard

El dashboard de Umami presenta las métricas esenciales de forma clara e intuitiva:

| Métrica | Definición | Ejemplo de uso |
|---------|------------|----------------|
| **Views** | Número total de eventos/páginas vistas | "El blog tuvo 1,500 views este mes" |
| **Visitors** | Visitantes únicos (hash con sal mensual) | "450 personas diferentes visitaron el sitio" |
| **Visits** | Sesiones únicas (hash con sal horaria) | "Hubo 800 visitas/sesiones totales" |
| **Bounce Rate** | Porcentaje de visitas con solo 1 evento | "60% de visitantes vieron solo una página" |
| **Visit Duration** | Tiempo promedio por sesión | "Promedio de 2:30 minutos por visita" |

### 1.2 Métricas en Tiempo Real

Umami ofrece visualización en tiempo real del tráfico:

- **Visitantes activos**: Número de usuarios en el sitio en los últimos 5 minutos
- **Páginas actuales**: Qué páginas están viendo los visitantes activamente
- **Ubicaciones en vivo**: Distribución geográfica de visitantes actuales
- **Intervalo configurable**: Actualización cada 30 segundos a 30 minutos

**Ejemplo práctico**:
```
Dashboard en tiempo real muestra:
- 5 visitantes activos ahora
- 3 en /blog/diseno-sostenible
- 1 en /proyectos
- 1 en /contacto
```

### 1.3 Cálculo de Métricas

**Bounce Rate**: Se calcula dividiendo el total de "bounces" (visitas con solo 1 evento) entre el número único de visitas.

**Visit Duration**: Tiempo total de todas las visitas dividido por el número único de visitas. Nota: Los visitantes de una sola página se excluyen del cálculo.

**Identificación de visitantes**: Umami usa un método de hashing para anonimizar usuarios. La sal rota:
- Cada hora para visitas/sesiones
- Cada mes para visitantes únicos

---

## 2. Reportes Estándar

### 2.1 Reporte por Página/URL

Muestra las páginas más visitadas del sitio:

| Campo | Descripción |
|-------|-------------|
| URL Path | Ruta de la página visitada |
| Views | Número de visualizaciones |
| Visitors | Visitantes únicos por página |

**Ejemplo**:
```
Top páginas (últimos 30 días):
1. /blog/materiales-sostenibles    - 450 views
2. /proyectos/casa-verde           - 320 views
3. /sobre-mi                       - 280 views
4. /contacto                       - 150 views
```

### 2.2 Reporte por Referrer/Fuente

Identifica de dónde proviene el tráfico:

| Fuente | Descripción |
|--------|-------------|
| Direct | Acceso directo (sin referrer) |
| Search Engines | Google, Bing, etc. |
| Social Media | Instagram, LinkedIn, etc. |
| Other Websites | Enlaces de otros sitios |

**Campos disponibles**:
- `referrer_path`: Ruta del referrer
- `referrer_domain`: Dominio de origen
- `referrer_query`: Parámetros de query del referrer

### 2.3 Reporte por País/Región

Datos geográficos de los visitantes:

| Campo | Estándar | Ejemplo |
|-------|----------|---------|
| Country | ISO-3166 | "Mexico", "Spain" |
| Region | ISO-3166-2 | "Ciudad de México", "Cataluña" |
| City | Nombre | "CDMX", "Barcelona" |

**Fuente de datos**: Se obtiene de encabezados HTTP (Cloudflare, Vercel) o bases de datos geográficas (MaxMind).

**Nota**: No se almacenan IPs; solo se registra la ubicación aproximada.

### 2.4 Reporte por Dispositivo/Navegador

Desglose técnico de los visitantes:

| Categoría | Ejemplos |
|-----------|----------|
| **Browser** | Chrome, Firefox, Safari, Edge |
| **OS** | Windows, macOS, Linux, Android, iOS |
| **Device** | Desktop, Mobile, Tablet |
| **Screen** | 1920x1080, 375x667, etc. |

**Detección**: Los datos de browser y OS se extraen del User-Agent. El tipo de dispositivo se determina combinando OS y resolución de pantalla.

### 2.5 Reporte por Sistema Operativo

| Sistema | Plataforma |
|---------|------------|
| Windows 10/11 | Desktop |
| macOS | Desktop |
| Android | Mobile |
| iOS | Mobile |
| Linux | Desktop |

---

## 3. Filtros y Rangos de Fecha

### 3.1 Sistema de Filtros

Umami v3 introdujo un sistema de filtros universal que se aplica en toda la aplicación:

**Características**:
- Filtros persistentes via query string (se pueden compartir URLs con filtros)
- Formulario mejorado para agregar/editar múltiples filtros a la vez
- Operaciones disponibles: "Is" (es) y "Is not" (no es)

**Campos filtrables**:

| Tipo | Campos |
|------|--------|
| Pageview | URL, título, query parameters |
| Session | Browser, OS, dispositivo, país, región, ciudad, idioma |
| Events | Nombre del evento, tipo de evento |
| UTM | source, medium, campaign, term, content |

**Ejemplo de filtro**:
```
Filtro: Country IS "Mexico" AND Device IS "Mobile"
Resultado: Solo tráfico móvil desde México
```

### 3.2 Segmentos

Los segmentos son conjuntos de filtros guardados para reutilizar:

**Beneficios**:
- Guardar combinaciones de filtros complejas
- Reutilizar en múltiples reportes y consultas
- Compartir con el equipo

**Ejemplo de segmento**:
```
Nombre: "Tráfico orgánico mobile México"
Filtros:
  - Referrer contains "google"
  - Device = Mobile
  - Country = Mexico
```

### 3.3 Cohorts

Un cohort es un grupo de usuarios que comparten una experiencia común en un período específico:

**Ejemplo**:
```
Cohort: "Usuarios que visitaron en Noviembre 2025"
Uso: Analizar retención o comportamiento a lo largo del tiempo
```

### 3.4 Rangos de Fecha

**Opciones de período**:
- Hoy
- Ayer
- Últimos 7 días
- Últimos 30 días
- Este mes
- Mes anterior
- Últimos 90 días
- Este año
- Rango personalizado

**Comparación de períodos**: Permite comparar rangos de fecha para descubrir tendencias clave en el tráfico.

### 3.5 Exportación de Datos

**Formato**: CSV exclusivamente

**Opciones de exportación**:
1. **Desde Overview**: Botón de descarga que exporta todas las estadísticas de la página actual
2. **Por sección**: Descargar estadísticas individuales de diferentes secciones
3. **Desde reportes**: Exportar datos de reportes específicos

**Ejemplo**:
```
Exportar: Top 100 páginas (últimos 30 días)
Formato: CSV
Campos: url, views, visitors, bounce_rate, avg_time
```

**Limitación**: La exportación está limitada a formato CSV. No hay soporte nativo para JSON, Excel u otros formatos.

---

## 4. Gestión de Sitios Web

### 4.1 Agregar un Sitio Web

**Proceso**:
1. Iniciar sesión en Umami (credenciales por defecto: `admin/umami`)
2. Ir a Settings → Websites
3. Clic en "Add Website"
4. Completar el formulario:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Name | Nombre descriptivo | "Jessica Méndez - Blog" |
| Domain | Dominio sin protocolo | "jessicamendez.bio" |
| Owner | Usuario propietario | "admin" |

### 4.2 Obtener el Tracking Code

Después de agregar el sitio:

1. Clic en "Edit" junto al sitio
2. Ir a la pestaña "Tracking Code"
3. Copiar el snippet de JavaScript

**Código de tracking básico**:
```html
<script
  defer
  src="https://analytics.ejemplo.com/script.js"
  data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
</script>
```

### 4.3 Configuración del Tracker

Atributos disponibles para personalizar el comportamiento:

| Atributo | Función | Valor |
|----------|---------|-------|
| `data-host-url` | Redirigir datos a otro destino | URL alternativa |
| `data-auto-track` | Deshabilitar tracking automático | `"false"` |
| `data-domains` | Restringir a dominios específicos | `"ejemplo.com,blog.ejemplo.com"` |
| `data-tag` | Asignar eventos a una categoría | `"marketing"` |
| `data-exclude-search` | No recopilar query params | `true` |
| `data-exclude-hash` | No recopilar hash de URL | `true` |
| `data-do-not-track` | Respetar DNT del navegador | `true` |

**Ejemplo con configuración avanzada**:
```html
<script
  defer
  src="https://analytics.jessicamendez.bio/script.js"
  data-website-id="abc123"
  data-domains="jessicamendez.bio"
  data-do-not-track="true"
  data-exclude-search="true">
</script>
```

### 4.4 Integración con Astro

Para proyectos Astro (como jessicamendez.bio), se puede condicionar el tracking solo a producción:

```astro
---
// En Layout.astro
const isProd = import.meta.env.PROD;
---

<head>
  {isProd && (
    <script
      defer
      src="https://analytics.jessicamendez.bio/script.js"
      data-website-id="tu-website-id">
    </script>
  )}
</head>
```

### 4.5 Compartir Dashboard Público

Umami permite generar URLs públicas para compartir estadísticas:

1. Editar el sitio web
2. Activar "Enable share URL"
3. Copiar la URL generada

**Uso**: Compartir estadísticas con clientes o stakeholders sin dar acceso al dashboard completo.

---

## 5. Tipos de Reportes Avanzados

Umami incluye reportes especializados (además de las métricas básicas):

| Reporte | Descripción |
|---------|-------------|
| **Insights** | Segmentación profunda con filtros |
| **Funnels** | Tasa de conversión y abandono |
| **Retention** | Frecuencia de retorno de usuarios |
| **UTM** | Seguimiento de campañas |
| **Goals** | Objetivos de pageviews/eventos |
| **Journey** | Navegación de usuarios por el sitio |

---

## 6. Tracking de Eventos Personalizados

Además de pageviews, Umami puede trackear eventos custom:

```javascript
// Tracking de evento básico
umami.track('button-click');

// Tracking con datos adicionales
umami.track('form-submit', {
  formName: 'contacto',
  source: 'footer'
});
```

**Visualización**: Los eventos se agrupan y visualizan en el dashboard, permitiendo medir interacciones específicas.

---

## 7. Limitaciones Conocidas

| Limitación | Descripción |
|------------|-------------|
| Reportes custom | No se pueden crear reportes personalizados |
| Exportación | Solo CSV, sin JSON/Excel |
| Heatmaps | No disponible |
| Session recordings | No disponible |
| Segmentación avanzada | Limitada comparada con GA |
| Captura automática de eventos | Requiere implementación manual |

---

## 8. Comparación con Google Analytics

| Característica | Umami | Google Analytics |
|----------------|-------|------------------|
| Privacidad | Sin cookies, GDPR-ready | Requiere consentimiento |
| Peso del script | < 2 KB | ~45 KB |
| Self-hosted | Sí | No |
| Costo | Gratis (self-hosted) | Gratis (con límites) |
| Curva de aprendizaje | Baja | Alta |
| Reportes avanzados | Básicos | Muy completos |
| Integración con Google Ads | No | Sí |

---

## Referencias

- [Umami Features](https://umami.is/features)
- [Umami Documentation](https://umami.is/docs)
- [Tracker Configuration](https://umami.is/docs/tracker-configuration)
- [Metric Definitions](https://umami.is/docs/metric-definitions)
- [Umami GitHub](https://github.com/umami-software/umami)
- [FreeCodeCamp - Umami Setup Guide](https://www.freecodecamp.org/news/how-to-set-up-your-own-google-analytics-alternative-using-umami/)
- [Umami Analytics Review 2025](https://www.simpleanalytics.com/resources/analytics-review/umami-analytics-review-and-a-better-alternative)
