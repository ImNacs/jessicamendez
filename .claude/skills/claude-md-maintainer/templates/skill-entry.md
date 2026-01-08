# Template: Entrada de Skill (Formato Compacto)

Usa este template para agregar o actualizar skills en CLAUDE.md.

---

## Formato Compacto (3 líneas)

```markdown
#### `[skill-name]`
**Triggers**: [trigger1], [trigger2], [trigger3], [trigger4]
**Ubicación**: `.claude/skills/[skill-name]/` | [Resumen de 1 línea]
```

---

## Ejemplo Real

```markdown
#### `supabase-query`
**Triggers**: database, supabase, sql, migration, schema, vehicles, agencies, threads
**Ubicación**: `.claude/skills/supabase-query/` | 21 MCP tools + Schema completo
```

---

## Campos

### `[skill-name]`
- Nombre exacto de la skill (debe coincidir con directorio)
- Formato: lowercase con guiones

### `**Triggers**`
- Palabras clave que invocan la skill automáticamente
- Separadas por comas
- 3-8 triggers recomendados
- Incluir: verbos de acción + sustantivos clave + términos técnicos

### `**Ubicación**`
- Path relativo desde raíz del proyecto
- Formato: `.claude/skills/[nombre]/`
- Seguido de `|` y resumen breve

### Resumen (después de |)
- Máximo 1 línea
- Describe qué contiene o hace la skill
- Ejemplos:
  - "21 MCP tools + Schema completo"
  - "Genera especificaciones de agentes"
  - "Sistema de 6 fases con validación iterativa"

---

## Comparación: Formato Anterior vs Compacto

### ❌ Formato Anterior (6 líneas)
```markdown
#### `supabase-query`
**Cuándo usar**: Consultas DB, schema, migraciones, análisis de datos
**Triggers**: database, supabase, sql, query, migration, schema
**Contiene**: 21 herramientas MCP de Supabase + Schema completo + Queries comunes
**Propósito**: Acceso a datos legacy y análisis de calidad de distribuidores
**Ubicación**: `.claude/skills/supabase-query/`
```

**Problemas**:
- Demasiado verboso (96 palabras)
- Información redundante ("Cuándo usar" vs "Propósito")
- Ocupa espacio innecesario

### ✅ Formato Compacto (3 líneas)
```markdown
#### `supabase-query`
**Triggers**: database, supabase, sql, migration, schema, vehicles, agencies, threads
**Ubicación**: `.claude/skills/supabase-query/` | 21 MCP tools + Schema completo
```

**Ventajas**:
- Conciso (21 palabras)
- Mantiene información esencial
- 50% menos líneas
- Más fácil de escanear visualmente

---

## Checklist de Validación

Antes de agregar skill a CLAUDE.md, verificar:

- [ ] Nombre coincide exactamente con directorio `.claude/skills/[nombre]/`
- [ ] Triggers incluyen palabras clave que usuario mencionaría
- [ ] Ubicación es correcta y archivo SKILL.md existe
- [ ] Resumen es <= 10 palabras
- [ ] No hay información redundante
- [ ] Total de entrada <= 3 líneas

---

## Proceso de Actualización

### Agregar Nueva Skill

1. Crear skill en `.claude/skills/[nombre]/`
2. Copiar template de este archivo
3. Llenar campos con información de la skill
4. Insertar en sección "Skills" de CLAUDE.md (orden alfabético recomendado)
5. Ejecutar `claude-md-maintainer` para validar

### Actualizar Skill Existente

1. Leer SKILL.md de la skill para obtener triggers actualizados
2. Actualizar solo los campos que cambiaron
3. Mantener formato compacto (3 líneas)
4. Validar con `claude-md-maintainer`

---

## Ejemplo Completo en Contexto

```markdown
## 📚 Sistema de Delegación

### 🤖 Skills (Invocación Automática)

Claude invoca estas skills automáticamente según el contexto:

#### `agent-builder`
**Triggers**: crear agente, nuevo agente, generar agente, agent spec
**Ubicación**: `.claude/skills/agent-builder/` | Genera specs de agentes

#### `command-builder`
**Triggers**: crear comando, slash command, nuevo comando, generar comando
**Ubicación**: `.claude/skills/command-builder/` | Genera slash commands

#### `generate-inventory-trace-skill`
**Triggers**: generar traces, crear traces, extraction script, guardar traces
**Ubicación**: `.claude/skills/generate-inventory-trace-skill/` | Sistema de 6 fases automático

#### `nocodb-query`
**Triggers**: nocodb, dealers, agencies nocodb, base de conocimiento
**Ubicación**: `.claude/skills/nocodb-query/` | 11 tablas + API NocoDB

#### `skill-builder`
**Triggers**: crear skill, nueva skill, generar skill
**Ubicación**: `.claude/skills/skill-builder/` | Genera skills con carga progresiva

#### `supabase-query`
**Triggers**: database, supabase, sql, migration, schema, vehicles, agencies
**Ubicación**: `.claude/skills/supabase-query/` | 21 MCP tools + Schema completo

#### `tool-builder`
**Triggers**: crear tool, nuevo tool, generar tool, createTool
**Ubicación**: `.claude/skills/tool-builder/` | Genera tools Mastra con Zod
```
