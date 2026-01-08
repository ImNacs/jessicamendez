# Template: Archivo de Delegación

Usa este template al crear archivos separados con contenido movido desde CLAUDE.md.

---

## Template Básico

```markdown
# [Título de la Sección]

> **Nota**: Documentación extraída de CLAUDE.md para mantener el archivo principal conciso.
> **Última actualización**: [YYYY-MM-DD]
> **Origen**: CLAUDE.md líneas [X-Y]

---

[Contenido movido desde CLAUDE.md]

---

## Referencias

- **CLAUDE.md**: Ver resumen en sección "[Sección Original]"
- **Código relacionado**: [Path a código si aplica]
```

---

## Ejemplo Real: Sistema de Traces

**Archivo**: `.claude/docs/architecture/traces-system.md`

```markdown
# Sistema de Traces de Inventario

> **Nota**: Documentación extraída de CLAUDE.md para mantener el archivo principal conciso.
> **Última actualización**: 2025-11-05
> **Origen**: CLAUDE.md líneas 236-279

---

## Arquitectura General

El sistema de traces extrae información estructurada de sitios web automotrices. Implementado en `mastra/tools/fetcher/modes/`.

### Arquitectura Simplificada
```
Workflow → Agent → Modo de Fetcher → Trace (JSON)
```

## Modos de Fetcher Disponibles

### 1. get-listing-trace.ts (381 LOC)
- Extrae listados de vehículos desde HTML estático
- Reduce contenido HTML 75-85% mediante técnicas de limpieza
- Usa Cheerio para parsing rápido
- **Uso**: Sitios web tradicionales sin renderizado JavaScript pesado

### 2. get-listing-trace-dynamic.ts (460 LOC)
- Extrae listados desde SPAs con JavaScript pesado
- Usa Puppeteer + Chrome DevTools para renderizado completo
- Maneja lazy loading e infinite scroll
- **Uso**: Aplicaciones React/Vue/Angular con carga dinámica

### 3. get-vehicle-trace.ts (371 LOC)
- Extrae detalles individuales de vehículos desde HTML estático
- Optimizado para páginas de detalle de vehículos
- Estructura datos: precio, marca, modelo, año, características
- **Uso**: Páginas de producto estáticas

### 4. get-vehicle-trace-dynamic.ts (379 LOC)
- Extrae detalles de vehículos desde páginas dinámicas
- Usa Puppeteer para contenido generado por JavaScript
- Maneja galerías, especificaciones dinámicas, pop-ups
- **Uso**: Páginas de producto con JavaScript pesado

## Integración en Workflows

Los modos de fetcher se utilizan en estos workflow steps:
- `trace-listing-step` → `listing-trace-agent` → `get-listing-trace[|dynamic].ts`
- `trace-vehicle-step` → `vehicle-trace-agent` → `get-vehicle-trace[|dynamic].ts`

**Estrategia de selección**: Los agentes determinan automáticamente si usar modo estático o dinámico basándose en el análisis inicial del sitio.

---

## Referencias

- **CLAUDE.md**: Ver resumen en sección "Arquitectura del Sistema"
- **Código fuente**: `mastra/tools/fetcher/modes/`
- **Documentación de agentes**:
  - `mastra/agents/listing-trace-agent/`
  - `mastra/agents/vehicle-trace-agent/`
```

---

## Ubicaciones por Tipo de Contenido

### Arquitectura y Diseño Técnico
**Ubicación**: `.claude/docs/architecture/`

**Ejemplos**:
- `traces-system.md` - Sistema de traces de inventario
- `memory-system.md` - Sistema de memoria y PostgresStore
- `optimizations.md` - Optimizaciones del sistema

### Setup y Configuración
**Ubicación**: `.claude/docs/setup/`

**Ejemplos**:
- `env-vars.md` - Variables de entorno detalladas
- `development.md` - Setup de entorno de desarrollo
- `deployment.md` - Guía de deployment

### Referencias Técnicas
**Ubicación**: `.claude/docs/reference/`

**Ejemplos**:
- `database-schema.md` - Schema completo de DB
- `api-endpoints.md` - Endpoints disponibles
- `mcp-tools.md` - Lista de herramientas MCP

### Ejemplos de Código
**Ubicación**: `.claude/docs/examples/`

**Ejemplos**:
- `tool-creation.md` - Ejemplo de crear tool Mastra
- `agent-patterns.md` - Patrones comunes de agentes
- `workflow-setup.md` - Setup de workflows

---

## Checklist de Creación

Antes de crear archivo de delegación:

- [ ] Título claro y descriptivo
- [ ] Header con nota de extracción + fecha + origen (líneas)
- [ ] Contenido completo movido desde CLAUDE.md
- [ ] Sección "Referencias" al final
- [ ] Ubicación apropiada según tipo de contenido
- [ ] CLAUDE.md actualizado con link a este archivo

---

## Actualización de CLAUDE.md

Después de crear archivo de delegación, actualizar CLAUDE.md:

**Antes** (43 líneas):
```markdown
### Sistema de Traces de Inventario

El sistema de traces extrae información estructurada...
[40 líneas más de detalles]
```

**Después** (3 líneas):
```markdown
### Sistema de Traces
Extracción automatizada con 4 modos (static/dynamic para listings/vehicles).
**Detalles**: Ver `.claude/docs/architecture/traces-system.md`
```

**Reducción**: -40 líneas (-93%)

---

## Mantenimiento de Archivos Delegados

### Cuándo Actualizar

1. **Cambios en implementación** → Actualizar contenido + fecha
2. **Reorganización de código** → Actualizar referencias
3. **Nueva información** → Agregar sección sin inflar
4. **Contenido obsoleto** → Eliminar y documentar cambio

### Indicador de Obsolescencia

Si archivo delegado no se actualiza en >6 meses, considerar:
- ¿Sigue siendo relevante?
- ¿Debe consolidarse con otro documento?
- ¿Debe moverse a README de componente?

---

## Versionado

Para archivos que cambian frecuentemente, incluir sección de changelog:

```markdown
## Changelog

### 2025-11-05
- Agregado modo `get-vehicle-trace-dynamic.ts`
- Actualizada estrategia de selección automática

### 2025-10-22
- Documentación inicial extraída de CLAUDE.md
- Creadas secciones de arquitectura e integración
```
