---
name: nocodb-manager
description: Gestiona NocoDB (bases, tablas, registros). Usa con "NocoDB", "hub", "base de datos", "crear tabla", "insertar registros", "listar tablas", "query", "API NocoDB".
allowed-tools: Read, Bash, Write, Edit
---

# NocoDB Manager

## Cuándo Usar Esta Skill

Usa esta skill cuando el usuario necesite:
- Listar, crear o eliminar bases de datos (bases)
- Gestionar tablas (crear, modificar, eliminar)
- Operaciones CRUD en registros (insertar, leer, actualizar, eliminar)
- Exportar datos a CSV
- Gestionar vistas y columnas
- Crear o modificar webhooks
- Administrar usuarios y permisos
- Cualquier operación relacionada con NocoDB

---

## Infraestructura Actual

| Campo | Valor |
|-------|-------|
| **URL** | https://hub.jessicamendez.bio |
| **API Base** | https://hub.jessicamendez.bio/api/v2 |
| **Backend** | Neon PostgreSQL |
| **Container** | Docker en droplet jessica-mendez |

---

## Configuración

### Token de Acceso

El token se almacena en `.env.local` del proyecto:

```bash
# Leer variables del proyecto
export $(grep -E '^NOCODB' .env.local | xargs)

# Usar en comandos curl
curl -H "xc-token: $NOCODB_API_TOKEN" "$NOCODB_URL/api/v2/..."
```

**IMPORTANTE**: NUNCA hardcodear el token. Siempre usar variables de entorno.

### Verificar Conexión

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" "$NOCODB_URL/api/v2/meta/bases" | head -c 200
```

---

## Identificadores

| Tipo | Prefijo | Ejemplo |
|------|---------|---------|
| Base ID | `p` | `pXXXXXX` |
| Table ID | `m` | `mXXXXXX` |
| View ID | `v` | `vXXXXXX` |
| Column ID | `c` | `cXXXXXX` |
| Record ID | numérico | `1`, `2`, `3` |

---

## Operaciones de Bases (Meta API)

### Listar Bases

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/bases" | jq
```

### Obtener Base por ID

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/bases/{baseId}" | jq
```

### Crear Base

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/meta/bases" \
  -d '{"title": "Mi Nueva Base"}' | jq
```

### Listar Tablas de una Base

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/bases/{baseId}/tables" | jq
```

---

## Operaciones de Tablas

### Crear Tabla

**IMPORTANTE**: Siempre incluir una columna `Id` como clave primaria (PK) con auto-increment.

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/meta/bases/{baseId}/tables" \
  -d '{
    "table_name": "proyectos",
    "title": "Proyectos",
    "columns": [
      {"column_name": "id", "title": "Id", "uidt": "ID", "pk": true, "ai": true},
      {"column_name": "titulo", "title": "Titulo", "uidt": "SingleLineText"},
      {"column_name": "descripcion", "title": "Descripcion", "uidt": "LongText"},
      {"column_name": "estado", "title": "Estado", "uidt": "SingleSelect", "dtxp": "activo,completado,pausado"}
    ]
  }' | jq
```

> **Regla crítica**: Las tablas sin PK causan errores en operaciones CRUD. SIEMPRE agregar:
> ```json
> {"column_name": "id", "title": "Id", "uidt": "ID", "pk": true, "ai": true}
> ```

### Obtener Tabla

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}" | jq
```

### Eliminar Tabla

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X DELETE \
  -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}"
```

---

## Operaciones de Columnas

### Listar Columnas

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}/columns" | jq
```

### Crear Columna

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}/columns" \
  -d '{"column_name": "fecha", "title": "Fecha", "uidt": "Date"}' | jq
```

### Tipos de Columna (uidt)

| uidt | Descripción |
|------|-------------|
| `ID` | Clave primaria auto-increment (usar con `pk: true, ai: true`) |
| `SingleLineText` | Texto corto |
| `LongText` | Texto largo |
| `Number` | Número |
| `Decimal` | Decimal |
| `Checkbox` | Checkbox |
| `Date` | Fecha |
| `DateTime` | Fecha y hora |
| `Email` | Email |
| `URL` | URL |
| `SingleSelect` | Selección única |
| `MultiSelect` | Selección múltiple |
| `Attachment` | Archivos adjuntos |
| `Rating` | Calificación |
| `Currency` | Moneda |

---

## Operaciones de Registros (Data API)

### Listar Registros

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records?limit=25&offset=0" | jq
```

### Listar con Filtros

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
# Filtrar por estado activo, ordenar por fecha descendente
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records?where=(estado,eq,activo)&sort=-created_at" | jq
```

### Obtener Registro por ID

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records/{recordId}" | jq
```

### Crear Registro

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records" \
  -d '{"titulo": "Proyecto Ejemplo", "descripcion": "Descripcion aqui", "estado": "activo"}' | jq
```

### Crear Múltiples Registros (Bulk)

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records/bulk" \
  -d '[
    {"titulo": "Proyecto 1", "estado": "activo"},
    {"titulo": "Proyecto 2", "estado": "pausado"}
  ]' | jq
```

### Actualizar Registro

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X PATCH \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records/{recordId}" \
  -d '{"estado": "completado"}' | jq
```

### Eliminar Registro

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X DELETE \
  -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records/{recordId}"
```

---

## Parámetros de Query

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `limit` | Máximo registros | `limit=25` |
| `offset` | Desplazamiento | `offset=0` |
| `where` | Filtros | `where=(status,eq,active)` |
| `sort` | Ordenamiento (- DESC) | `sort=-created_at` |
| `fields` | Campos a retornar | `fields=id,title` |

### Operadores de Filtro

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `eq` | Igual | `(estado,eq,activo)` |
| `neq` | No igual | `(estado,neq,pausado)` |
| `gt` | Mayor que | `(precio,gt,100)` |
| `lt` | Menor que | `(precio,lt,500)` |
| `like` | Contiene | `(titulo,like,proyecto)` |
| `is` | Es null/not null | `(fecha,is,null)` |

### Combinar Filtros

```bash
# AND: múltiples condiciones
where=(estado,eq,activo)~and(precio,gt,100)

# OR: cualquier condición
where=(estado,eq,activo)~or(estado,eq,pausado)
```

---

## Exportar Datos

### Exportar a CSV

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/tables/{tableId}/records/csv" > datos.csv
```

---

## Webhooks

### Listar Webhooks

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -H "xc-token: $NOCODB_API_TOKEN" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}/hooks" | jq
```

### Crear Webhook

```bash
export $(grep -E '^NOCODB' .env.local | xargs)
curl -s -X POST \
  -H "xc-token: $NOCODB_API_TOKEN" \
  -H "Content-Type: application/json" \
  "$NOCODB_URL/api/v2/meta/tables/{tableId}/hooks" \
  -d '{
    "title": "Nuevo registro",
    "event": "after.insert",
    "operation": "insert",
    "notification": {
      "type": "URL",
      "payload": {
        "method": "POST",
        "body": "{{ json data }}",
        "headers": [{"name": "Content-Type", "value": "application/json"}],
        "path": "https://mi-endpoint.com/webhook"
      }
    }
  }' | jq
```

---

## Scripts de Utilidad

### Script: Listar Todas las Bases y Tablas

```bash
#!/bin/bash
export $(grep -E '^NOCODB' .env.local | xargs)

echo "=== Bases de Datos ==="
bases=$(curl -s -H "xc-token: $NOCODB_API_TOKEN" "$NOCODB_URL/api/v2/meta/bases")
echo "$bases" | jq -r '.list[] | "\(.id): \(.title)"'

echo ""
echo "=== Tablas por Base ==="
for base_id in $(echo "$bases" | jq -r '.list[].id'); do
  base_title=$(echo "$bases" | jq -r ".list[] | select(.id==\"$base_id\") | .title")
  echo "Base: $base_title ($base_id)"
  curl -s -H "xc-token: $NOCODB_API_TOKEN" \
    "$NOCODB_URL/api/v2/meta/bases/$base_id/tables" | \
    jq -r '.list[] | "  - \(.id): \(.title)"'
done
```

---

## Manejo de Errores

### Error: "Unauthorized" (401)
1. Verificar que el token existe: `grep NOCODB_API_TOKEN .env.local`
2. Verificar que el token no tiene espacios extra
3. Regenerar token en NocoDB: Account Settings → Tokens

### Error: "Not Found" (404)
1. Verificar que el ID de base/tabla/registro es correcto
2. Usar endpoint de listar para obtener IDs válidos
3. Verificar formato de ID (bases: `pXXX`, tablas: `mXXX`)

### Error: "Bad Request" (400)
1. Verificar estructura JSON del body
2. Verificar nombres de columnas exactos
3. Validar tipos de datos (uidt)

### Error: Rate Limit (429)
1. Límite: 5 requests/segundo
2. Esperar 30 segundos antes de reintentar
3. Usar operaciones bulk cuando sea posible

### Error: NocoDB no responde
1. Verificar contenedor: `ssh root@165.227.201.91 "docker ps | grep nocodb"`
2. Ver logs: `ssh root@165.227.201.91 "docker logs nocodb --tail 50"`
3. Reiniciar: `ssh root@165.227.201.91 "docker restart nocodb"`

---

## Recursos

- **NocoDB UI**: https://hub.jessicamendez.bio
- **Swagger**: https://hub.jessicamendez.bio/api/v2/meta/bases/{baseId}/swagger
- **Documentación oficial**: https://nocodb.com/docs
- **API Reference**: https://nocodb.com/apis/v2
