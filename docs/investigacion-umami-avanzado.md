# Umami Analytics: Funcionalidades Avanzadas

> Documentacion completa de las funcionalidades avanzadas de Umami Analytics para implementacion en jessicamendez.bio

## Tabla de Contenidos

1. [Gestion de Equipos y Usuarios](#1-gestion-de-equipos-y-usuarios)
2. [UTM y Campanas](#2-utm-y-campanas)
3. [Goals y Conversiones](#3-goals-y-conversiones)
4. [Reportes Avanzados](#4-reportes-avanzados)
5. [Integraciones y API](#5-integraciones-y-api)
6. [Configuracion Avanzada](#6-configuracion-avanzada)
7. [Consideraciones de Self-Hosting](#7-consideraciones-de-self-hosting)

---

## 1. Gestion de Equipos y Usuarios

### Roles y Permisos

Umami soporta cuatro roles de equipo con permisos diferenciados:

| Rol | Permisos |
|-----|----------|
| **Team Owner** | Todos los permisos (crear, editar, eliminar equipo) |
| **Team Manager** | Todos los permisos excepto eliminar el equipo |
| **Team Member** | Todos los permisos excepto eliminar o actualizar el equipo |
| **View Only** | Solo lectura de dashboards y reportes |

### Crear un Equipo

1. Navegar a **Settings > Teams**
2. Click en **Create Team**
3. Asignar nombre al equipo
4. Guardar

### Invitar Usuarios

1. Desde la pantalla de Teams, seleccionar el equipo
2. Navegar a la tabla de **Members**
3. Click en **Add Member**
4. Ingresar email del usuario
5. Seleccionar rol (Owner, Manager, Member, View Only)
6. El usuario recibira invitacion por email

### Gestionar Miembros

Desde la tabla de miembros:
- **Edit**: Actualizar el rol del miembro
- **Delete**: Remover miembro del equipo

### Transferir Sitios Web

Umami permite transferir un sitio web entre tu cuenta personal y un equipo que administres:
1. Ir a **Settings > Websites**
2. Seleccionar el sitio
3. Click en **Transfer**
4. Elegir el equipo destino

### Compartir Dashboards

Umami ofrece **Share Tokens** para acceso publico:

```
# El share token permite acceso anonimo a analytics especificos
# sin requerir autenticacion de usuario
```

Para crear un link publico:
1. Ir a **Settings > Websites**
2. Seleccionar sitio
3. Tab **Share**
4. Habilitar **Enable share URL**
5. Copiar el link generado

> **Nota**: Los links compartidos actualmente NO incluyen datos en tiempo real.

---

## 2. UTM y Campanas

### Parametros UTM Soportados

Umami detecta automaticamente los 5 parametros UTM estandar:

| Parametro | Proposito | Ejemplo |
|-----------|-----------|---------|
| `utm_source` | Origen del trafico | `google`, `newsletter`, `facebook` |
| `utm_medium` | Tipo de canal | `cpc`, `email`, `social` |
| `utm_campaign` | Identificador de campana | `black-friday-2024` |
| `utm_term` | Palabra clave (ads) | `diseno+sostenible` |
| `utm_content` | Variante de contenido | `banner-a`, `cta-verde` |

### Como Funciona

El script de tracking **detecta automaticamente** los parametros UTM en la URL:

```
https://jessicamendez.bio/?utm_source=instagram&utm_medium=social&utm_campaign=portfolio-2024
```

No requiere configuracion adicional - Umami extrae y categoriza cada parametro automaticamente.

### Mejores Practicas

1. **Usar minusculas consistentes**: `facebook` no `Facebook`
2. **Nombres estandarizados**: Evitar variaciones como `fb` vs `facebook`
3. **Campanas descriptivas**: `newsletter-enero-2024` mejor que `camp1`

### Reporte UTM

Para acceder al reporte:
1. Login en dashboard de Umami
2. Navegar a **Reports**
3. Seleccionar **UTM Report**
4. Elegir rango de fechas
5. Ejecutar reporte

El reporte muestra:
- Volumen de trafico por campana y canal
- Comparativas entre periodos
- Desglose por cada parametro UTM

### Ejemplo de URL con UTM

```html
<!-- Link para Instagram Bio -->
https://jessicamendez.bio/?utm_source=instagram&utm_medium=bio&utm_campaign=portfolio

<!-- Link para Newsletter -->
https://jessicamendez.bio/blog/diseno-sostenible?utm_source=newsletter&utm_medium=email&utm_campaign=enero-2025

<!-- Link para Google Ads -->
https://jessicamendez.bio/servicios?utm_source=google&utm_medium=cpc&utm_campaign=arquitectura-interior&utm_term=diseno+interiores
```

---

## 3. Goals y Conversiones

### Tipos de Objetivos

Umami soporta dos tipos de acciones para goals:

1. **Viewed Page**: Cuando usuarios visitan una URL especifica
2. **Triggered Event**: Cuando usuarios generan un evento personalizado

### Crear un Goal

1. Navegar a **Reports > Goals**
2. Click en **Add Goal**
3. Completar el formulario:
   - **Nombre**: Descripcion del objetivo
   - **Tipo**: Viewed Page o Triggered Event
   - **Accion**: URL o nombre del evento
4. Click **Save**
5. Ejecutar insight para ver metricas

### Ejemplos de Goals

```javascript
// Goal: Visita a pagina de contacto
// Tipo: Viewed Page
// Accion: /contacto

// Goal: Click en boton de WhatsApp
// Tipo: Triggered Event
// Accion: whatsapp-click

// Goal: Descarga de brochure
// Tipo: Triggered Event
// Accion: brochure-download
```

### Metricas de Conversion

El insight muestra:
- **Tasa de conversion**: Porcentaje de usuarios que completaron la accion
- **Total de conversiones**: Numero absoluto
- **Usuarios totales**: Base de calculo en el rango de fechas

---

## 4. Reportes Avanzados

### 4.1 Funnel Report (Embudos)

Visualiza el journey del usuario y puntos de abandono.

**Configuracion:**
1. Ir a **Reports > Funnel**
2. Click **Create Funnel**
3. Definir pasos (minimo 2, maximo 10):
   - Usar URLs, eventos personalizados o wildcards
4. Establecer parametros:
   - **Date Range**: Hasta 90 dias
   - **Time Window**: Minutos entre pasos para contar como conversion
5. Ejecutar reporte

**Ejemplo de Funnel:**
```
Paso 1: Visita Homepage (/)
Paso 2: Visita Portafolio (/portafolio)
Paso 3: Visita Proyecto (/portafolio/*)
Paso 4: Click Contacto (contact-click event)
Paso 5: Envio Formulario (form-submit event)
```

**Metricas mostradas:**
- Usuarios en cada etapa
- Porcentaje de drop-off entre pasos
- Indicadores visuales de progreso

### 4.2 Journey Report

Muestra como los usuarios navegan por el sitio.

**Uso:**
- Entender flujos de navegacion comunes
- Identificar paginas de entrada y salida
- Optimizar estructura del sitio

### 4.3 Retention Report

Mide la "stickiness" del sitio rastreando usuarios que regresan.

**Configuracion:**
- Seleccionar periodo de analisis
- Ver cohortes por semana/mes
- Identificar patrones de retencion

### 4.4 Cohorts (v3)

Agrupa usuarios basado en acciones especificas.

**Crear Cohort:**
1. Navegar a **Cohorts**
2. Click en boton de agregar
3. Seleccionar criterios:
   - Rango de fechas
   - URL visitada o evento disparado
4. Click **Save**

**Ejemplo:**
```
Cohort: "Visitantes Blog Enero 2025"
Criterio: Visito /blog/* entre 01/01/2025 y 31/01/2025
```

**Aplicar Cohort:**
1. Agregar filtro al analisis
2. Cambiar a tab **Cohorts**
3. Seleccionar cohort
4. Click **Apply**

### 4.5 Segments (v3)

Conjuntos de filtros guardados para reutilizar.

**Ejemplo:**
```
Segmento: "Usuarios Windows de Espana"
Filtros: OS = Windows AND Country = Spain
```

Los filtros en v3 se aplican universalmente via query string - puedes copiar la URL para compartir con el equipo.

---

## 5. Integraciones y API

### API REST

**Self-Hosted:**
```
Base URL: http://<tu-instancia-umami>/api
```

**Umami Cloud:**
```
Base URL: https://api.umami.is
```

### Autenticacion

Todas las llamadas requieren autenticacion:

```javascript
// Obtener token
const response = await fetch('https://tu-umami.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'tu-password'
  })
});
const { token } = await response.json();

// Usar token en requests
const websites = await fetch('https://tu-umami.com/api/websites', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Cliente API Oficial

```bash
npm install @umami/api-client
```

```javascript
import { client } from '@umami/api-client';

// Obtener sitios web
const websites = await client.getWebsites();

// Obtener estadisticas
const stats = await client.getWebsiteStats(websiteId, {
  startAt: Date.now() - 86400000, // 24 horas
  endAt: Date.now()
});
```

### Webhooks y Exportacion

**Enviar reportes via HTTP POST:**
```javascript
// Configurar output a URL
{
  "url": "https://tu-servidor.com/webhook",
  "output": "json" // o "text"
}
```

**Integracion con Telegram:**
```javascript
// Usando umami-report npm package
{
  "botToken": "tu-bot-token",
  "chatId": "tu-chat-id",
  "output": "text"
}
```

**Exportar a archivo:**
```javascript
{
  "path": "/ruta/al/archivo.json",
  "output": "json"
}
```

### Plugins Disponibles

- WordPress
- Gatsby
- Nuxt
- Docusaurus
- VuePress
- Next.js (via script)
- Astro (configuracion manual)

---

## 6. Configuracion Avanzada

### Variables de Entorno

#### Variables de Runtime

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `APP_SECRET` | Valor unico para la instalacion | `openssl rand 30 \| openssl base64 -A` |
| `DATABASE_URL` | Connection string (unica requerida) | `postgresql://user:pass@host:5432/umami` |
| `IGNORE_IP` | IPs a excluir (comma-separated) | `192.168.1.1,10.0.0.0/8` |
| `DISABLE_BOT_CHECK` | Deshabilitar filtro de bots | `1` |
| `CLIENT_IP_HEADER` | Header para IP del cliente (proxies) | `X-Forwarded-For` |
| `COLLECT_API_ENDPOINT` | Endpoint personalizado (evitar adblockers) | `/api/collect` |
| `TRACKER_SCRIPT_NAME` | Nombre del script (evitar adblockers) | `stats.js` |
| `CORS_MAX_AGE` | Duracion preflight CORS (segundos) | `86400` |
| `DISABLE_LOGIN` | Deshabilitar login | `1` |
| `DISABLE_UPDATES` | Deshabilitar check de updates | `1` |
| `DISABLE_TELEMETRY` | Deshabilitar telemetria | `1` |
| `PRIVATE_MODE` | Modo privado | `1` |

#### Variables de Build

| Variable | Descripcion |
|----------|-------------|
| `DATABASE_TYPE` | Tipo de base de datos |
| `BASE_PATH` | Ruta base de la aplicacion |
| `FORCE_SSL` | Forzar SSL |
| `SKIP_DB_CHECK` | Omitir verificacion de DB |
| `ALLOWED_FRAME_URLS` | URLs permitidas para iframes |

### Docker Compose con Variables

```yaml
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      DATABASE_URL: postgresql://umami:${DB_PASSWORD}@db:5432/umami
      APP_SECRET: ${APP_SECRET}
      IGNORE_IP: ${IGNORE_IP}
      COLLECT_API_ENDPOINT: /api/collect
      TRACKER_SCRIPT_NAME: stats.js
      DISABLE_TELEMETRY: 1
    ports:
      - "3000:3000"
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - umami-db:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  umami-db:
```

### Configuracion del Tracker

Atributos disponibles en el script:

```html
<script
  src="https://analytics.jessicamendez.bio/stats.js"
  data-website-id="tu-website-id"
  data-host-url="https://analytics.jessicamendez.bio"
  data-domains="jessicamendez.bio,www.jessicamendez.bio"
  data-auto-track="true"
  data-do-not-track="true"
  data-exclude-search="false"
  data-exclude-hash="false"
  data-tag="production"
  defer
></script>
```

| Atributo | Descripcion |
|----------|-------------|
| `data-website-id` | ID unico del sitio (requerido) |
| `data-host-url` | URL del servidor Umami |
| `data-domains` | Dominios permitidos (comma-separated) |
| `data-auto-track` | Tracking automatico (default: true) |
| `data-do-not-track` | Respetar DNT del browser |
| `data-exclude-search` | Excluir query params de URLs |
| `data-exclude-hash` | Excluir hash de URLs |
| `data-tag` | Tag para filtrar en dashboard |
| `data-before-send` | Funcion para interceptar datos |

### Tracking de Eventos Personalizados

**Metodo 1: Data Attributes**

```html
<!-- Evento simple -->
<button data-umami-event="Contacto Click">
  Contactar
</button>

<!-- Evento con datos adicionales -->
<button
  data-umami-event="Brochure Download"
  data-umami-event-type="pdf"
  data-umami-event-size="2mb"
>
  Descargar Brochure
</button>
```

**Metodo 2: JavaScript API**

```javascript
// Evento simple
umami.track('Newsletter Signup');

// Evento con datos (mantiene tipos de datos)
umami.track('Project View', {
  projectId: 123,
  category: 'residencial',
  value: 1500
});

// Tracking dinamico
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    umami.track('Project Click', {
      projectName: card.dataset.projectName,
      category: card.dataset.category
    });
  });
});
```

**Limitaciones:**
- Nombres de eventos: maximo 50 caracteres
- Datos de evento requieren nombre de evento

### Evitar Ad Blockers

```yaml
# docker-compose.yml
environment:
  COLLECT_API_ENDPOINT: /api/v1/collect
  TRACKER_SCRIPT_NAME: metrics.js
```

Usar subdominios genericos como `stats.` o `metrics.` en lugar de `analytics.`.

---

## 7. Consideraciones de Self-Hosting

### Requerimientos Minimos

| Recurso | Minimo | Recomendado |
|---------|--------|-------------|
| RAM | 500 MB | 1 GB |
| Almacenamiento | 1 GB | 5 GB |
| Database | PostgreSQL 12+ | PostgreSQL 15+ |

> **Nota**: Umami v3 solo soporta PostgreSQL (MySQL ya no es compatible)

### Backup de Base de Datos

**PostgreSQL:**
```bash
# Crear backup
docker exec -t umami-db pg_dump -U umami umami > umami_backup_$(date +%Y%m%d).sql

# Restaurar backup
docker exec -i umami-db psql -U umami umami < umami_backup_20250108.sql
```

**Backup automatizado (cron):**
```bash
# /etc/cron.daily/umami-backup
#!/bin/bash
BACKUP_DIR="/backups/umami"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

docker exec -t umami-db pg_dump -U umami umami | gzip > $BACKUP_DIR/umami_$TIMESTAMP.sql.gz

# Mantener solo ultimos 7 dias
find $BACKUP_DIR -name "umami_*.sql.gz" -mtime +7 -delete
```

### Actualizaciones

**Proceso recomendado:**

1. **Crear backup** antes de actualizar
2. **Detener contenedores**
3. **Pull nueva imagen**
4. **Iniciar contenedores**
5. **Verificar migraciones**

```bash
# 1. Backup
docker exec -t umami-db pg_dump -U umami umami > umami_pre_upgrade.sql

# 2-4. Actualizar
cd /ruta/umami
docker compose pull
docker compose up -d

# 5. Verificar logs
docker logs umami-app -f
# Buscar: "Database version check successful"
```

**Migracion v2 a v3:**
1. Actualizar primero a v2.19.0 (ultima v2)
2. Verificar funcionamiento
3. Actualizar a v3.x
4. Las migraciones se ejecutan automaticamente

### Seguridad

1. **Cambiar credenciales default:**
   ```
   Default: admin / umami
   ```
   - Crear nuevo usuario admin
   - Eliminar usuario default

2. **Generar APP_SECRET seguro:**
   ```bash
   openssl rand 30 | openssl base64 -A
   ```

3. **Usar reverse proxy con SSL:**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name analytics.jessicamendez.bio;

       ssl_certificate /etc/letsencrypt/live/analytics.jessicamendez.bio/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/analytics.jessicamendez.bio/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Aislar red de base de datos:**
   ```yaml
   networks:
     frontend:
     backend:
       internal: true

   services:
     umami:
       networks:
         - frontend
         - backend

     db:
       networks:
         - backend  # Solo accesible por umami
   ```

### Data Retention

> **Nota**: Umami actualmente NO tiene configuracion nativa de retencion de datos.

**Workaround manual:**
```sql
-- Eliminar datos mayores a 1 ano
DELETE FROM website_event
WHERE created_at < NOW() - INTERVAL '1 year';

-- Vacuum para recuperar espacio
VACUUM ANALYZE website_event;
```

**Cron job para limpieza:**
```bash
# /etc/cron.weekly/umami-cleanup
#!/bin/bash
docker exec -t umami-db psql -U umami -d umami -c "
  DELETE FROM website_event WHERE created_at < NOW() - INTERVAL '365 days';
  VACUUM ANALYZE website_event;
"
```

### Escalabilidad

1. **Multiples sitios**: Una instalacion puede trackear sitios ilimitados

2. **High Availability**:
   - Usar PostgreSQL replicado
   - Multiples instancias de Umami detras de load balancer
   - Redis para cache de sesiones

3. **Docker Swarm:**
   ```yaml
   deploy:
     replicas: 3
     resources:
       limits:
         memory: 512M
   ```

### Performance Tuning

1. **PostgreSQL:**
   ```sql
   -- Ajustar para analytics workload
   shared_buffers = 256MB
   effective_cache_size = 768MB
   work_mem = 16MB
   maintenance_work_mem = 128MB
   ```

2. **Indices adicionales:**
   ```sql
   CREATE INDEX idx_website_event_created
   ON website_event (website_id, created_at);
   ```

3. **Particionamiento** (para alto volumen):
   ```sql
   -- Particionar por mes para mejor rendimiento
   CREATE TABLE website_event (
     -- columnas
   ) PARTITION BY RANGE (created_at);
   ```

---

## Referencias

- [Documentacion Oficial Umami](https://umami.is/docs)
- [GitHub Umami](https://github.com/umami-software/umami)
- [API Reference](https://umami.is/docs/api)
- [Umami v3 Release Notes](https://github.com/umami-software/umami/releases/tag/v3.0.0)
- [Environment Variables](https://umami.is/docs/environment-variables)
- [Tracker Configuration](https://umami.is/docs/tracker-configuration)
- [Track Events](https://umami.is/docs/track-events)
- [Teams Documentation](https://docs.umami.is/docs/teams)
- [UTM Link Performance Blog](https://umami.is/blog/understanding-utm-link-performance)
- [Funnel Report Optimization](https://umami.is/blog/optimizing-conversion-paths-using-the-funnel-report)

---

*Documento creado: Enero 2025*
*Ultima actualizacion: Basado en Umami v3.x*
