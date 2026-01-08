---
name: do-manager
description: Gestiona recursos de DigitalOcean con doctl. Usa con "crear droplet", "listar droplets", "DO", "DigitalOcean", "servidor", "VPS", "kubernetes", "database DO", "firewall DO", "SSH keys DO".
allowed-tools: Read, Bash, Write, Edit
---

# DigitalOcean Manager

## Cuándo Usar Esta Skill

Usa esta skill cuando el usuario necesite:
- Crear, listar, eliminar o gestionar droplets (VPS)
- Gestionar SSH keys en DigitalOcean
- Configurar firewalls cloud
- Crear o gestionar bases de datos managed
- Gestionar clusters de Kubernetes (DOKS)
- Trabajar con App Platform
- Gestionar volúmenes de almacenamiento
- Crear snapshots o backups
- Configurar load balancers
- Cualquier operación relacionada con DigitalOcean

---

## Infraestructura Actual

### Droplet: jessica-mendez

| Campo | Valor |
|-------|-------|
| **ID** | 542544146 |
| **Nombre** | jessica-mendez |
| **IP Pública** | 165.227.201.91 |
| **IP Secundaria** | 167.172.14.128 |
| **IP Privada** | 10.116.0.2 |
| **Región** | nyc1 (New York 1) |
| **Size** | s-1vcpu-1gb |
| **RAM** | 1GB |
| **vCPUs** | 1 |
| **Disco** | 25GB |
| **OS** | Ubuntu 24.04 LTS |
| **Precio** | $6/mes |
| **Estado** | active |

### Stack en el Droplet

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **Nginx** | 80, 443 | Reverse proxy (SSL termination) |
| **Node.js 22** | - | Runtime para Astro SSR |
| **PM2** | - | Process manager para Node.js |
| **Astro SSR** | 4321 (interno) | Sitio web (hybrid mode) |
| **Docker** | - | Container runtime |
| **NocoDB** | 8080 (interno) | Base de datos NoCode (Docker) |
| **Umami** | 3001 (interno) | Analytics (Docker) |
| **Certbot** | - | SSL/Let's Encrypt |

### Dominios y DNS (jessicamendez.bio)

| Tipo | Nombre | IP | Uso |
|------|--------|-----|-----|
| A | @ | 167.172.14.128 | Sitio principal |
| A | admin | 167.172.14.128 | Panel admin (sin uso actual) |
| A | hub | 167.172.14.128 | NocoDB |
| A | data | 165.227.201.91 | Umami Analytics |

**URLs activas**:
- https://jessicamendez.bio → Sitio web (Nginx → PM2/Node.js:4321)
- https://hub.jessicamendez.bio → NocoDB (Nginx → Docker:8080)
- https://data.jessicamendez.bio → Umami Analytics (Nginx → Docker:3001)

### SSH Keys

| ID | Nombre | Uso |
|----|--------|-----|
| 53118039 | nacs-local | Key principal |
| 42753913 | Nacs | Key secundaria |

### Configuración del Sitio Web (PM2)

| Archivo | Ruta | Descripción |
|---------|------|-------------|
| **Build** | `/root/jessicamendez/web/dist/` | Archivos de producción |
| **Entry** | `/root/jessicamendez/web/dist/server/entry.mjs` | Punto de entrada Node.js |
| **Env vars** | `/root/jessicamendez/.env` | Variables de entorno |
| **PM2 dump** | `/root/.pm2/dump.pm2` | Estado guardado de PM2 |

**Variables en `/root/jessicamendez/.env`**:
```bash
RESEND_API_KEY=re_xxx
RESEND_AUDIENCE_ID=xxx-xxx
HOST=0.0.0.0
PORT=4321
```

### Servicios Externos

| Servicio | Uso | Conexión |
|----------|-----|----------|
| **Neon PostgreSQL** | DB para NocoDB y Umami | `ep-bitter-grass-ahzvhhrs-pooler.c-3.us-east-1.aws.neon.tech` |
| **GitHub Actions** | CI/CD | Deploys automáticos a `/root/jessicamendez/web/dist` |
| **Resend** | Emails transaccionales | API Key en droplet `.env` y local `.env.local` |

---

## Configuración

### Token de Acceso

El token se almacena en `.env.local` del proyecto:

```bash
# Leer token del proyecto
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

# Usar en comandos doctl
doctl <comando> --access-token $TOKEN
```

**IMPORTANTE**: Siempre usar `--access-token` con el token del proyecto. NUNCA hardcodear el token.

### Verificar Conexión

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl account get --access-token $TOKEN
```

---

## Operaciones Comunes

### SSH al Droplet

```bash
# Conexión directa
ssh root@165.227.201.91

# Via doctl
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh jessica-mendez --access-token $TOKEN
```

### Gestionar Servicios en el Droplet

```bash
# === PM2 (Sitio web) ===
# Estado de PM2
ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 status'

# Logs del sitio
ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 logs jessicamendez --lines 50'

# Reiniciar sitio
ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 restart jessicamendez'

# Reload sin downtime
ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 reload jessicamendez'

# === Nginx ===
# Estado de Nginx
ssh root@165.227.201.91 "systemctl status nginx"

# Reiniciar Nginx
ssh root@165.227.201.91 "systemctl restart nginx"

# === Docker (NocoDB, Umami) ===
# Ver contenedores
ssh root@165.227.201.91 "docker ps"

# Logs de NocoDB
ssh root@165.227.201.91 "docker logs nocodb --tail 50"

# Reiniciar NocoDB
ssh root@165.227.201.91 "docker restart nocodb"

# === Sistema ===
# Uso de memoria
ssh root@165.227.201.91 "free -h"

# Verificar puerto del sitio
ssh root@165.227.201.91 "ss -tlnp | grep 4321"
```

### Crear Registro DNS

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

# Crear registro A
doctl compute domain records create jessicamendez.bio \
  --record-type A \
  --record-name subdominio \
  --record-data 165.227.201.91 \
  --record-ttl 3600 \
  --access-token $TOKEN
```

### Resize del Droplet (si se necesita más RAM)

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

# Upgrade a 2GB RAM ($12/mes)
doctl compute droplet-action resize 542544146 \
  --size s-1vcpu-2gb \
  --access-token $TOKEN
```

### Crear Snapshot/Backup

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

doctl compute droplet-action snapshot 542544146 \
  --snapshot-name "jessica-mendez-$(date +%Y%m%d)" \
  --wait \
  --access-token $TOKEN
```

---

## Instrucciones por Recurso

### Droplets

**Listar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet list --access-token $TOKEN
```

**Crear**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet create <nombre> \
  --size s-1vcpu-1gb \
  --image ubuntu-24-04-x64 \
  --region nyc1 \
  --ssh-keys 53118039 \
  --wait \
  --access-token $TOKEN
```

**Eliminar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet delete <droplet-id> --force --access-token $TOKEN
```

### DNS Records

**Listar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute domain records list jessicamendez.bio --access-token $TOKEN
```

**Crear**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute domain records create jessicamendez.bio \
  --record-type A \
  --record-name <subdominio> \
  --record-data 165.227.201.91 \
  --record-ttl 3600 \
  --access-token $TOKEN
```

**Eliminar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute domain records delete jessicamendez.bio <record-id> --force --access-token $TOKEN
```

### SSH Keys

**Listar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh-key list --access-token $TOKEN
```

**Importar**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh-key import <nombre> \
  --public-key-file ~/.ssh/id_rsa.pub \
  --access-token $TOKEN
```

---

## Referencias Rápidas

### Tamaños Populares

| Slug | vCPUs | RAM | Disco | Precio/mes |
|------|-------|-----|-------|------------|
| s-1vcpu-512mb-10gb | 1 | 512MB | 10GB | $4 |
| s-1vcpu-1gb | 1 | 1GB | 25GB | $6 |
| s-1vcpu-2gb | 1 | 2GB | 50GB | $12 |
| s-2vcpu-2gb | 2 | 2GB | 60GB | $18 |
| s-2vcpu-4gb | 2 | 4GB | 80GB | $24 |

### Regiones

| Slug | Nombre |
|------|--------|
| nyc1 | New York 1 |
| nyc3 | New York 3 |
| sfo3 | San Francisco 3 |
| ams3 | Amsterdam 3 |
| fra1 | Frankfurt 1 |
| lon1 | London 1 |
| sgp1 | Singapore 1 |

---

## Manejo de Errores

### Error: "access token is required"
1. Verificar que `.env.local` existe
2. Verificar sintaxis: `grep DIGITALOCEAN_ACCESS_TOKEN .env.local`
3. Asegurar que el token no tiene espacios extra

### Error: "You do not have access for the attempted action"
1. Token expirado o inválido
2. Regenerar en: https://cloud.digitalocean.com/account/api/tokens

### Error: "Droplet limit reached"
1. Verificar límite: `doctl account get --access-token $TOKEN`
2. Eliminar droplets no usados

### Error: NocoDB no responde
1. Verificar contenedor: `ssh root@165.227.201.91 "docker ps"`
2. Ver logs: `ssh root@165.227.201.91 "docker logs nocodb --tail 100"`
3. Reiniciar: `ssh root@165.227.201.91 "docker restart nocodb"`

### Error: Sitio web no actualiza
1. Verificar GitHub Actions: `gh run list --repo ImNacs/jessicamendez --limit 3`
2. Verificar archivos: `ssh root@165.227.201.91 "ls -la /root/jessicamendez/web/dist"`
3. Verificar PM2: `ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 status'`
4. Ver logs PM2: `ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 logs jessicamendez --lines 20'`
5. Reiniciar PM2: `ssh root@165.227.201.91 'export PATH="$HOME/.bun/bin:$PATH" && pm2 restart jessicamendez'`

### Error: 502 Bad Gateway
1. Verificar que Node escucha en puerto 4321: `ssh root@165.227.201.91 "ss -tlnp | grep 4321"`
2. Si no hay proceso, verificar PM2 status
3. Verificar que escucha en 0.0.0.0 (no solo IPv6): debe mostrar `0.0.0.0:4321`
4. Verificar env vars: `ssh root@165.227.201.91 "cat /root/jessicamendez/.env"` (debe tener HOST=0.0.0.0)

---

## Recursos

- Panel DO: https://cloud.digitalocean.com
- Documentación doctl: https://docs.digitalocean.com/reference/doctl/
- API Reference: https://docs.digitalocean.com/reference/api/
