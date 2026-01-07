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

## Instrucciones

### Paso 1: Identificar Operación

Detectar qué recurso y acción necesita el usuario:

| Recurso | Comandos Base |
|---------|---------------|
| Droplets | `doctl compute droplet` |
| SSH Keys | `doctl compute ssh-key` |
| Firewalls | `doctl compute firewall` |
| Volumes | `doctl compute volume` |
| Databases | `doctl databases` |
| Kubernetes | `doctl kubernetes` |
| Apps | `doctl apps` |
| Load Balancers | `doctl compute load-balancer` |

### Paso 2: Ejecutar Operación

#### Droplets (VPS)

**Listar droplets**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet list --access-token $TOKEN
```

**Crear droplet**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet create <nombre> \
  --size s-1vcpu-1gb \
  --image ubuntu-24-04-x64 \
  --region nyc1 \
  --ssh-keys <key-id> \
  --wait \
  --access-token $TOKEN
```

**Obtener info de droplet**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet get <droplet-id> --access-token $TOKEN
```

**Eliminar droplet**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute droplet delete <droplet-id> --force --access-token $TOKEN
```

**Acciones en droplet**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
# Reiniciar
doctl compute droplet-action reboot <droplet-id> --access-token $TOKEN
# Apagar
doctl compute droplet-action power-off <droplet-id> --access-token $TOKEN
# Encender
doctl compute droplet-action power-on <droplet-id> --access-token $TOKEN
# Snapshot
doctl compute droplet-action snapshot <droplet-id> --snapshot-name "backup-$(date +%Y%m%d)" --access-token $TOKEN
# Resize
doctl compute droplet-action resize <droplet-id> --size s-2vcpu-4gb --access-token $TOKEN
```

**Conectar por SSH**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh <droplet-id-or-name> --access-token $TOKEN
```

#### SSH Keys

**Listar keys**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh-key list --access-token $TOKEN
```

**Importar key desde archivo**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh-key import <nombre> --public-key-file ~/.ssh/id_rsa.pub --access-token $TOKEN
```

**Crear key (texto directo)**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute ssh-key create <nombre> --public-key "ssh-rsa AAAA..." --access-token $TOKEN
```

#### Firewalls

**Listar firewalls**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute firewall list --access-token $TOKEN
```

**Crear firewall básico (SSH + HTTP + HTTPS)**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute firewall create \
  --name "web-firewall" \
  --inbound-rules "protocol:tcp,ports:22,address:0.0.0.0/0 protocol:tcp,ports:80,address:0.0.0.0/0 protocol:tcp,ports:443,address:0.0.0.0/0" \
  --outbound-rules "protocol:tcp,ports:all,address:0.0.0.0/0 protocol:udp,ports:all,address:0.0.0.0/0" \
  --droplet-ids <droplet-id> \
  --access-token $TOKEN
```

**Agregar droplet a firewall**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute firewall add-droplets <firewall-id> --droplet-ids <droplet-id> --access-token $TOKEN
```

#### Volumes (Almacenamiento)

**Listar volúmenes**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute volume list --access-token $TOKEN
```

**Crear volumen**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute volume create <nombre> \
  --size 100GiB \
  --region nyc1 \
  --access-token $TOKEN
```

#### Databases

**Listar bases de datos**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl databases list --access-token $TOKEN
```

**Crear base de datos PostgreSQL**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl databases create <nombre> \
  --engine pg \
  --version 16 \
  --size db-s-1vcpu-1gb \
  --region nyc1 \
  --num-nodes 1 \
  --access-token $TOKEN
```

**Crear base de datos MySQL**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl databases create <nombre> \
  --engine mysql \
  --version 8 \
  --size db-s-1vcpu-1gb \
  --region nyc1 \
  --num-nodes 1 \
  --access-token $TOKEN
```

**Obtener conexión**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl databases connection <database-id> --access-token $TOKEN
```

#### Kubernetes (DOKS)

**Listar clusters**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl kubernetes cluster list --access-token $TOKEN
```

**Crear cluster**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl kubernetes cluster create <nombre> \
  --region nyc1 \
  --version latest \
  --node-pool "name=default;size=s-2vcpu-4gb;count=2" \
  --access-token $TOKEN
```

**Obtener kubeconfig**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl kubernetes cluster kubeconfig save <cluster-id> --access-token $TOKEN
```

#### App Platform

**Listar apps**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl apps list --access-token $TOKEN
```

**Crear app desde spec**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl apps create --spec app-spec.yaml --access-token $TOKEN
```

**Ver logs**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl apps logs <app-id> --access-token $TOKEN
```

#### Load Balancers

**Listar load balancers**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute load-balancer list --access-token $TOKEN
```

**Crear load balancer**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute load-balancer create \
  --name "my-lb" \
  --region nyc1 \
  --forwarding-rules "entry_protocol:http,entry_port:80,target_protocol:http,target_port:80" \
  --droplet-ids <id1>,<id2> \
  --access-token $TOKEN
```

### Paso 3: Consultar Referencias

#### Regiones Disponibles

| Slug | Nombre | Disponible |
|------|--------|------------|
| nyc1 | New York 1 | Si |
| nyc3 | New York 3 | Si |
| sfo3 | San Francisco 3 | Si |
| ams3 | Amsterdam 3 | Si |
| fra1 | Frankfurt 1 | Si |
| lon1 | London 1 | Si |
| sgp1 | Singapore 1 | Si |
| blr1 | Bangalore 1 | Si |
| tor1 | Toronto 1 | Si |
| syd1 | Sydney 1 | Si |

**Listar regiones actualizadas**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute region list --access-token $TOKEN
```

#### Tamaños Populares (Droplets)

| Slug | vCPUs | RAM | Disco | Precio/mes |
|------|-------|-----|-------|------------|
| s-1vcpu-512mb-10gb | 1 | 512MB | 10GB | $4 |
| s-1vcpu-1gb | 1 | 1GB | 25GB | $6 |
| s-1vcpu-2gb | 1 | 2GB | 50GB | $12 |
| s-2vcpu-2gb | 2 | 2GB | 60GB | $18 |
| s-2vcpu-4gb | 2 | 4GB | 80GB | $24 |
| s-4vcpu-8gb | 4 | 8GB | 160GB | $48 |

**Listar todos los tamaños**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
doctl compute size list --access-token $TOKEN
```

#### Imágenes Populares

| Slug | Descripción |
|------|-------------|
| ubuntu-24-04-x64 | Ubuntu 24.04 LTS |
| ubuntu-22-04-x64 | Ubuntu 22.04 LTS |
| debian-12-x64 | Debian 12 |
| centos-stream-9-x64 | CentOS Stream 9 |
| fedora-40-x64 | Fedora 40 |
| docker-20-04 | Docker on Ubuntu 20.04 |
| lamp-22-04 | LAMP on Ubuntu 22.04 |
| nodejs-22-04 | Node.js on Ubuntu 22.04 |

**Listar imágenes**:
```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)
# Distribuciones
doctl compute image list-distribution --access-token $TOKEN
# Aplicaciones 1-click
doctl compute image list-application --access-token $TOKEN
# Mis imágenes/snapshots
doctl compute image list-user --access-token $TOKEN
```

#### Tamaños de Base de Datos

| Slug | vCPUs | RAM | Precio/mes |
|------|-------|-----|------------|
| db-s-1vcpu-1gb | 1 | 1GB | $15 |
| db-s-1vcpu-2gb | 1 | 2GB | $30 |
| db-s-2vcpu-4gb | 2 | 4GB | $60 |

## Patrones Comunes

### Crear Droplet Web Completo

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

# 1. Obtener SSH key ID
SSH_KEY=$(doctl compute ssh-key list --access-token $TOKEN --format ID --no-header | head -1)

# 2. Crear droplet
doctl compute droplet create mi-servidor \
  --size s-1vcpu-2gb \
  --image ubuntu-24-04-x64 \
  --region nyc1 \
  --ssh-keys $SSH_KEY \
  --enable-monitoring \
  --wait \
  --access-token $TOKEN

# 3. Obtener IP
DROPLET_ID=$(doctl compute droplet list --access-token $TOKEN --format ID --no-header | head -1)
IP=$(doctl compute droplet get $DROPLET_ID --access-token $TOKEN --format PublicIPv4 --no-header)

echo "Droplet creado. IP: $IP"
```

### Crear Droplet con User Data (Script Inicial)

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

doctl compute droplet create mi-servidor \
  --size s-1vcpu-2gb \
  --image ubuntu-24-04-x64 \
  --region nyc1 \
  --ssh-keys $(doctl compute ssh-key list --access-token $TOKEN --format ID --no-header | head -1) \
  --user-data '#!/bin/bash
apt update && apt upgrade -y
apt install -y nginx
systemctl enable nginx
systemctl start nginx' \
  --wait \
  --access-token $TOKEN
```

### Backup Completo de Droplet

```bash
TOKEN=$(grep DIGITALOCEAN_ACCESS_TOKEN .env.local | cut -d= -f2)

# Crear snapshot
doctl compute droplet-action snapshot <droplet-id> \
  --snapshot-name "backup-$(date +%Y%m%d-%H%M%S)" \
  --wait \
  --access-token $TOKEN
```

## Manejo de Errores

### Error: "access token is required"
1. Verificar que `.env.local` existe y contiene `DIGITALOCEAN_ACCESS_TOKEN`
2. Verificar sintaxis: `cat .env.local | grep DIGITAL`
3. Asegurar que el token no tiene espacios extra

### Error: "You do not have access for the attempted action"
1. Token expirado o inválido
2. Regenerar token en: https://cloud.digitalocean.com/account/api/tokens
3. Verificar permisos del token (read/write)

### Error: "Droplet limit reached"
1. Verificar límite actual: `doctl account get --access-token $TOKEN`
2. Eliminar droplets no usados
3. Solicitar aumento de límite en panel de DO

### Error: "Region not available"
1. Listar regiones disponibles: `doctl compute region list --access-token $TOKEN`
2. Usar región alternativa
3. Algunas imágenes no están en todas las regiones

### Error: "Size not available in region"
1. Verificar tamaños en región: `doctl compute size list --access-token $TOKEN`
2. Usar tamaño alternativo o cambiar región

### Error: "SSH key not found"
1. Listar keys: `doctl compute ssh-key list --access-token $TOKEN`
2. Importar key si no existe
3. Usar ID numérico, no nombre

## Output Formats

Doctl soporta diferentes formatos de salida:

```bash
# Texto (default)
doctl compute droplet list --access-token $TOKEN

# JSON
doctl compute droplet list --access-token $TOKEN -o json

# Solo campos específicos
doctl compute droplet list --access-token $TOKEN --format ID,Name,PublicIPv4,Status

# Sin headers (útil para scripts)
doctl compute droplet list --access-token $TOKEN --format ID --no-header
```

## Recursos

- Documentación doctl: https://docs.digitalocean.com/reference/doctl/
- API Reference: https://docs.digitalocean.com/reference/api/
- Precios: https://www.digitalocean.com/pricing
