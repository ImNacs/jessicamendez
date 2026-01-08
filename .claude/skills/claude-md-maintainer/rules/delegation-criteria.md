# Criterios de Delegación

Reglas para determinar qué contenido debe moverse de CLAUDE.md a archivos separados.

---

## 🎯 Criterio 1: Longitud de Sección

### Regla
```
if sección >= 30 líneas:
  → Candidato para delegación
  → Analizar contenido con otros criterios
```

### Acciones por Tamaño

| Líneas | Acción | Destino Sugerido |
|--------|--------|------------------|
| < 10 | ✅ Mantener en CLAUDE.md | N/A |
| 10-29 | ⚠️ Monitorear, optimizar si es verboso | N/A |
| 30-49 | 🟡 Delegar si es técnico/cambia frecuentemente | `.claude/docs/[categoría]/` |
| >= 50 | 🔴 Delegar obligatorio | `.claude/docs/[categoría]/` |

### Ejemplos

**❌ Delegar** (43 líneas):
```markdown
### Sistema de Traces de Inventario

El sistema de traces extrae información estructurada...

#### Arquitectura Simplificada
...
[40 líneas más de detalles técnicos]
```

**✅ Mantener** (3 líneas después de delegación):
```markdown
### Sistema de Traces
Extracción automatizada con 4 modos (static/dynamic para listings/vehicles).
**Detalles**: Ver `.claude/docs/architecture/traces-system.md`
```

---

## 📦 Criterio 2: Tipo de Contenido

### Categorías de Contenido

#### A) Detalles Técnicos Extensos
**Indicadores**:
- Describe arquitectura interna
- Explica algoritmos o implementación
- Incluye LOC (lines of code) counts
- Detalla flujos de datos

**Destino**: `.claude/docs/architecture/`

**Ejemplo**:
```markdown
❌ En CLAUDE.md:
### Sistema de Traces
1. get-listing-trace.ts (381 LOC)
   - Extrae listados desde HTML estático
   - Reduce contenido HTML 75-85%
   - Usa Cheerio para parsing rápido
   [más detalles...]

✅ En .claude/docs/architecture/traces-system.md:
[Toda la documentación técnica detallada]

✅ En CLAUDE.md (resumen):
### Sistema de Traces
Extracción con 4 modos. Ver `.claude/docs/architecture/traces-system.md`
```

#### B) Schemas y Especificaciones
**Indicadores**:
- Schemas de DB (tablas, columnas, tipos)
- Especificaciones de API (endpoints, payloads)
- Estructuras de datos complejas

**Destino**: Skill específica o `.claude/docs/reference/`

**Ejemplo**:
```markdown
❌ En CLAUDE.md:
## Base de Datos
Tablas:
- agencies: id, place_id, name, website, extraction_data (JSONB)
- vehicles: id, agency_id, make, model, year, price, ...
- reviews: id, agency_id, rating, text, ...
[20 líneas más de schema]

✅ Delegar a: `supabase-query` skill (ya contiene schema completo)

✅ En CLAUDE.md:
## Base de Datos
Proyecto: `hsaupyrpeywjghirnehk`
**Schema detallado**: Usa skill `supabase-query`
```

#### C) Ejemplos de Código Extensos
**Indicadores**:
- Code blocks > 10 líneas
- Múltiples ejemplos de código
- Snippets de configuración complejos

**Destino**: `.claude/docs/examples/` o README de componente

**Ejemplo**:
```markdown
❌ En CLAUDE.md:
## Ejemplo de Tool Creation
```typescript
export const myTool = createTool({
  id: 'my-tool',
  description: '...',
  inputSchema: z.object({...}),
  execute: async ({context, input}) => {
    // 30 líneas de implementación
  }
})
```

✅ En .claude/docs/examples/tool-creation.md:
[Ejemplo completo con explicaciones]

✅ En CLAUDE.md:
## Tools de Mastra
Usa skill `tool-builder` para generar tools siguiendo mejores prácticas.
**Ejemplos**: `.claude/docs/examples/tool-creation.md`
```

#### D) Información que Cambia Frecuentemente
**Indicadores**:
- Lista de variables de entorno
- Versiones de dependencias
- Configuraciones que evolucionan

**Destino**: Archivo de configuración existente con link/import

**Ejemplo**:
```markdown
❌ En CLAUDE.md:
## Variables de Entorno
OPENAI_API_KEY=...
DEEPSEEK_API_KEY=...
GOOGLE_PLACES_API_KEY=...
[20 variables más]

✅ En CLAUDE.md:
## Variables de Entorno
**Críticas**: DATABASE_URL, SUPABASE_PROJECT_ID, OPENAI_API_KEY
**Lista completa**: Ver `.env.example`
```

---

## 🔄 Criterio 3: Frecuencia de Cambio

### Regla
```
if contenido cambia > 1 vez/mes:
  → Mover a archivo separado
  → Usar link o @import desde CLAUDE.md
```

### Clasificación

| Frecuencia | Estrategia |
|------------|-----------|
| **Estático** (no cambia) | ✅ Mantener en CLAUDE.md |
| **Ocasional** (< 1 vez/mes) | ⚠️ Mantener pero monitorear |
| **Frecuente** (> 1 vez/mes) | 🔴 Delegar a archivo separado |
| **Muy frecuente** (semanal) | 🔴 Delegar con @import o link |

### Ejemplos

**Estático** (mantener):
```markdown
## Idioma y Comunicación
**IMPORTANTE**: Todas las respuestas en ESPAÑOL
```

**Frecuente** (delegar):
```markdown
❌ En CLAUDE.md (requiere actualización constante):
## Agentes y Workflows Implementados
- customer-support-agent (creado 2025-10-01)
- inventory-updater-workflow (creado 2025-10-15)
- vehicle-qa-agent (creado 2025-10-22)
[se agregan nuevos semanalmente]

✅ Delegar a: `project-analyst` agent

✅ En CLAUDE.md:
## Agentes y Workflows
**Lista actualizada**: Consulta `project-analyst` agent
```

---

## 📊 Criterio 4: Nivel de Detalle

### Niveles de Información

#### Nivel 1: Overview (1-3 líneas)
**Mantener** en CLAUDE.md
```markdown
## Stack Principal
- Frontend: Next.js 14 + Tailwind v4
- Backend IA: Mastra + CopilotKit
- Base de Datos: Supabase (PostgreSQL + pgvector)
```

#### Nivel 2: Summary (3-10 líneas)
**Mantener** en CLAUDE.md si es relevante frecuentemente
```markdown
## Comandos de Desarrollo
```bash
pnpm dev        # Next.js solo
pnpm dev:all    # Next.js + Mastra Panel (RECOMENDADO)
pnpm dev:mastra # Solo Mastra Panel
pnpm build      # Construcción
pnpm start      # Producción
```
```

#### Nivel 3: Detailed (10-30 líneas)
**Considerar delegar** si es técnico o cambia frecuentemente
```markdown
Ejemplo: Explicación de 15 líneas sobre sistema de memoria
→ Delegar a `.claude/docs/architecture/memory-system.md`
```

#### Nivel 4: Comprehensive (>30 líneas)
**Delegar obligatorio**
```markdown
Ejemplo: Documentación completa de sistema de traces (43 líneas)
→ Delegar a `.claude/docs/architecture/traces-system.md`
```

---

## 🎯 Criterio 5: Duplicación

### Regla
```
if contenido ya existe en otro archivo:
  if archivo es autoritativo (.env.example, package.json):
    → Referenciar, no duplicar
  else:
    → Consolidar en ubicación más apropiada
```

### Ejemplos de Duplicación

**❌ Duplicación innecesaria**:
```markdown
# En CLAUDE.md
## Variables de Entorno
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
[duplica .env.example]

# En .env.example
OPENAI_API_KEY=
DATABASE_URL=
[mismo contenido]
```

**✅ Referencia sin duplicar**:
```markdown
# En CLAUDE.md
## Variables de Entorno
**Críticas**: DATABASE_URL, OPENAI_API_KEY
**Lista completa**: Ver `.env.example`
```

---

## 🗂️ Destinos de Delegación

### Estructura Recomendada

```
.claude/docs/
├── architecture/          # Detalles técnicos, arquitectura
│   ├── traces-system.md
│   ├── memory-system.md
│   └── optimizations.md
├── setup/                 # Setup y configuración
│   ├── env-vars.md
│   └── development.md
├── reference/             # Referencias técnicas
│   ├── database-schema.md
│   └── api-endpoints.md
└── examples/              # Ejemplos de código
    ├── tool-creation.md
    └── agent-patterns.md
```

### Mapeo de Contenido → Destino

| Tipo de Contenido | Destino |
|------------------|---------|
| Arquitectura interna | `.claude/docs/architecture/` |
| Setup y configuración | `.claude/docs/setup/` |
| Schemas y APIs | Skill específica o `.claude/docs/reference/` |
| Ejemplos de código | `.claude/docs/examples/` |
| Workflows y procesos | README del componente o skill específica |
| Variables de entorno | Link a `.env.example` |

---

## ✅ Checklist de Delegación

Antes de delegar contenido, verificar:

- [ ] **Longitud**: ¿Sección >= 30 líneas?
- [ ] **Tipo**: ¿Es detalle técnico, schema, o ejemplo extenso?
- [ ] **Frecuencia**: ¿Cambia > 1 vez/mes?
- [ ] **Nivel**: ¿Es nivel 3 (detailed) o 4 (comprehensive)?
- [ ] **Duplicación**: ¿Ya existe en otro archivo?
- [ ] **Destino claro**: ¿Hay ubicación apropiada para delegarlo?
- [ ] **Mantiene valor**: ¿CLAUDE.md mantendrá referencia útil?

**Si >= 3 checkmarks** → Delegar

---

## 🔄 Proceso de Delegación

### Pasos

1. **Identificar sección** que cumple criterios
2. **Crear archivo de destino** en ubicación apropiada
3. **Mover contenido** con header explicativo
4. **Actualizar CLAUDE.md** con referencia compacta
5. **Validar links** funcionan correctamente

### Template de Referencia

```markdown
# En CLAUDE.md (después de delegar)

### [Título de Sección]
[1-2 líneas de resumen ejecutivo]
**Detalles**: Ver `[path/to/delegated-file.md]`
```

### Template de Archivo Delegado

```markdown
# [Título]

> **Nota**: Documentación extraída de CLAUDE.md para mantener el archivo principal conciso.
> **Última actualización**: [fecha]
> **Origen**: CLAUDE.md líneas [X-Y]

[Contenido movido desde CLAUDE.md]
```

---

## 📈 Métricas de Éxito

### Objetivo
- **Reducir CLAUDE.md**: De >250 líneas a 100-200 líneas
- **Mantener utilidad**: Todas las referencias esenciales presentes
- **Mejorar navegabilidad**: Fácil encontrar información delegada

### Indicadores
- ✅ 0 secciones > 30 líneas
- ✅ 0 contenido técnico extenso inline
- ✅ 0 duplicación de archivos de configuración
- ✅ 100% de contenido delegado tiene link funcional
