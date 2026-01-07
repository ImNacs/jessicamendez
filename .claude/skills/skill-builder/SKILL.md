---
name: Skill Builder
description: Crea skills de Claude Code. Usa con "crear skill", "nueva skill", "generar skill" o "diseñar capacidad reutilizable".
allowed-tools: Read, Write, Edit, Bash
---

# Skill Builder

## Cuándo Usar Esta Skill

Usa esta Skill cuando el usuario necesite:
- Crear una nueva skill de Claude Code desde cero
- Generar el archivo SKILL.md con la estructura correcta
- Diseñar una skill siguiendo mejores prácticas
- Convertir un workflow existente en una skill reutilizable
- Organizar archivos de soporte para una skill compleja

## Instrucciones

### Paso 1: Recopilar Información del Usuario

Pregunta al usuario:

1. **Nombre de la skill**: ¿Cómo se llamará? (ej: "PDF Processor", "Database Manager")
2. **Propósito**: ¿Qué problema resuelve? ¿Qué tareas automatiza?
3. **Trigger terms**: ¿Qué palabras clave debe detectar Claude? (ej: "PDF", "migration", "backup")
4. **Casos de uso**: ¿Cuándo debe activarse automáticamente?
5. **Herramientas necesarias**: ¿Qué tools usará? (Read, Write, Bash, etc.)
6. **Scope**: ¿Personal (`~/.claude/skills/`) o Project (`.claude/skills/`)?
7. **Complejidad**: ¿Necesita archivos de referencia adicionales?

### Paso 2: Generar Metadata (Frontmatter YAML)

Crea el frontmatter con:

```yaml
---
name: [nombre-en-kebab-case]
description: [Descripción específica con trigger terms. Incluir casos de uso concretos. Máx 1024 chars.]
allowed-tools: [Lista de herramientas permitidas]
model: [Opcional - claude-sonnet-4-20250514, claude-opus-4-5-20251101, etc.]
---
```

**Campos del frontmatter**:
- `name`: Lowercase, números, hyphens (máx 64 caracteres)
- `description`: CRÍTICA para auto-activación (máx 1024 caracteres)
- `allowed-tools`: Lista de herramientas permitidas sin confirmación
- `model`: Opcional - fuerza un modelo específico para esta skill

**Reglas críticas**:
- Descripción DEBE incluir trigger terms específicos
- Mantener descripción bajo **1024 caracteres** (límite oficial)
- Usar `allowed-tools` restrictivo si es skill de terceros
- Campo `model` opcional para especificar modelo
- NO usar tabs en YAML (solo espacios)

### Paso 3: Estructura del SKILL.md

Genera el cuerpo del archivo siguiendo esta plantilla:

```markdown
# [Nombre de la Skill]

## Cuándo Usar Esta Skill

Lista clara de situaciones:
- Usuario pregunta sobre X
- Usuario menciona Y o Z
- Usuario necesita hacer W

## Instrucciones

### Paso 1: [Primer Paso]
Descripción clara y específica
- Sub-tarea A
- Sub-tarea B

### Paso 2: [Segundo Paso]
Instrucciones paso a paso

### Paso 3: [Tercer Paso]
...

## Manejo de Errores

### Error: "[Mensaje de error común]"
1. Acción correctiva específica
2. Comando a ejecutar
3. Validación

## Recursos

Para [tema específico], ver [REFERENCIA.md](REFERENCIA.md).
```

**Reglas de redacción**:
- Mantener SKILL.md bajo 500 líneas
- Solo incluir contexto que Claude NO posee por defecto
- Ser específico, no vago (evitar "handle appropriately")
- Usar terminología consistente
- Incluir ejemplos concretos de código cuando sea útil

### Paso 4: Optimizar para Progressive Disclosure

Si la skill es compleja (>300 líneas en borrador):

1. **Separar referencias largas**:
   - `REFERENCE.md` - Especificaciones técnicas
   - `EXAMPLES.md` - Ejemplos extensos
   - `TROUBLESHOOTING.md` - Guía de debugging

2. **Organizar scripts**:
   ```
   skill-name/
   ├── SKILL.md
   ├── REFERENCE.md
   ├── scripts/
   │   ├── helper.sh
   │   └── utils.py
   ```

3. **Referencias one-level deep**:
   ```markdown
   ✅ Ver [FORMS.md](FORMS.md) para formularios.
   ✅ Ver [ADVANCED.md](ADVANCED.md) para técnicas avanzadas.

   ❌ Ver [FORMS.md](FORMS.md), que referencia [ADVANCED.md]
   ```

4. **Table of Contents para archivos >100 líneas**:
   ```markdown
   ## Contenido
   1. [Sección A](#seccion-a)
   2. [Sección B](#seccion-b)
   ```

### Paso 5: Crear Estructura de Archivos

Ejecuta comandos para crear la estructura:

```bash
# Para skill de proyecto
mkdir -p .claude/skills/[nombre-skill]

# Para skill personal
mkdir -p ~/.claude/skills/[nombre-skill]

# Crear archivos
touch .claude/skills/[nombre-skill]/SKILL.md
```

Si hay archivos de soporte:
```bash
mkdir -p .claude/skills/[nombre-skill]/scripts
touch .claude/skills/[nombre-skill]/REFERENCE.md
```

### Paso 6: Validaciones Finales

Antes de finalizar, ejecutar validation loop:

**Validation Loop (OBLIGATORIO)**:
```
WHILE validación falla:
  1. Ejecutar validaciones de sintaxis
  2. Leer errores específicos
  3. Corregir error encontrado
  4. Re-ejecutar validación
  REPEAT hasta que todas pasen
```

**Validación de Sintaxis**:
```bash
# 1. Verificar que el archivo existe
ls -la .claude/skills/[nombre-skill]/SKILL.md

# 2. Validar que no tiene tabs (solo espacios)
grep -P '\t' .claude/skills/[nombre-skill]/SKILL.md
# Si retorna algo → ERROR: reemplazar tabs por espacios

# 3. Validar frontmatter YAML
head -20 .claude/skills/[nombre-skill]/SKILL.md | grep -E '^---$'
# Debe retornar exactamente 2 líneas

# 4. Contar líneas (debe ser <500)
wc -l .claude/skills/[nombre-skill]/SKILL.md

# 5. Verificar descripción <1024 caracteres
head -10 .claude/skills/[nombre-skill]/SKILL.md | grep 'description:' | wc -c
# Si >1024 → acortar descripción

# 6. Verificar nombre válido (kebab-case)
head -5 .claude/skills/[nombre-skill]/SKILL.md | grep 'name:' | grep -E '^name: [a-z0-9-]+$'
# Debe matchear (solo lowercase, números, hyphens)
```

**Checklist de Calidad** (verificar manualmente):
- [ ] Nombre en kebab-case (lowercase, números, hyphens)
- [ ] Descripción tiene trigger terms específicos
- [ ] Descripción bajo 1024 caracteres
- [ ] SKILL.md bajo 500 líneas
- [ ] Instrucciones son específicas (no vagas)
- [ ] Sección "Manejo de Errores" incluida
- [ ] `allowed-tools` definido (máx 3-5 tools críticos)
- [ ] Campo `model` solo si es necesario
- [ ] No hay magic numbers sin justificación
- [ ] No hay credenciales hardcodeadas
- [ ] Terminología consistente en todo el documento
- [ ] Referencias son one-level deep
- [ ] Si usa subdirectorios, namespacing correcto

### Paso 7: Sugerir Testing

Recomendar al usuario:

1. **Test de activación**:
   ```
   Pregunta a Claude usando los trigger terms de la descripción.
   Ejemplo: "Can you help me with [trigger term]?"
   ```

2. **Test de ejecución**:
   - Crear 2-3 casos de prueba representativos
   - Ejecutar la skill con cada caso
   - Verificar que sigue las instrucciones correctamente

3. **Test multi-modelo** (opcional):
   - Probar con diferentes modelos (Haiku, Sonnet, Opus)
   - Ajustar nivel de detalle si falla en modelos más pequeños

### Paso 8: Documentar Next Steps

Informar al usuario:

```markdown
✅ Skill creada exitosamente en: [ruta]

**Próximos pasos**:
1. Probar la skill: "[ejemplo de pregunta que la activa]"
2. Refinar según resultados
3. [Si es project skill] Commit a git:
   ```bash
   git add .claude/skills/[nombre-skill]/
   git commit -m "feat(skills): Agregar [nombre-skill]"
   ```
```

## Patrones Comunes de Skills

### Skill de Solo Lectura (Análisis)

```yaml
allowed-tools: Read, Grep, Glob
```
**Uso**: Análisis de código, auditorías, reportes
**Ventaja**: No requiere permisos del usuario

### Skill de Ejecución (Testing, Build)

```yaml
allowed-tools: Bash, Read
```
**Uso**: Ejecutar comandos, parsear output
**Ventaja**: Controlado, sin modificaciones de código

### Skill de Modificación (Refactoring, Generación)

```yaml
allowed-tools: Read, Write, Edit, Bash
```
**Uso**: Implementar features, refactorizar, generar código
**Ventaja**: Máxima flexibilidad

### Skill Multi-dominio (Base de Datos, DevOps)

```markdown
## Instrucciones
Detectar contexto del usuario, luego cargar guía específica:
- Para migrations: Ver [MIGRATIONS.md](MIGRATIONS.md)
- Para queries: Ver [QUERIES.md](QUERIES.md)
- Para backups: Ver [BACKUPS.md](BACKUPS.md)
```
**Ventaja**: Progressive disclosure para skills complejas

### Skill con Modelo Específico

```yaml
---
name: complex-analysis
description: Análisis profundo de arquitectura. Usa cuando necesites razonamiento extenso.
allowed-tools: Read, Grep, Glob
model: claude-opus-4-5-20251101
---
```
**Uso**: Tareas que requieren razonamiento profundo
**Ventaja**: Fuerza el uso de Opus para mejor calidad

### Skill con MCP Tools

```yaml
allowed-tools:
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - mcp__playwright__browser_navigate
  - Read
```
**Uso**: Integrar servicios externos (bases de datos, browsers, APIs)
**Ventaja**: Acceso controlado a herramientas MCP específicas

## Integración de MCP Tools

Las Skills pueden usar herramientas de servidores MCP configurados en el proyecto.

### Sintaxis

```yaml
allowed-tools:
  - mcp__<servername>__<toolname>
```

**Componentes**:
- `mcp__` - Prefijo obligatorio
- `<servername>` - Nombre del servidor MCP registrado
- `__` - Separador doble guion bajo
- `<toolname>` - Nombre exacto de la herramienta

### Formatos Válidos

**Array (recomendado para múltiples tools)**:
```yaml
allowed-tools:
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - mcp__chrome-devtools__take_snapshot
  - Read
  - Bash
```

**Texto separado por comas**:
```yaml
allowed-tools: mcp__supabase__execute_sql, mcp__supabase__list_tables, Read
```

### Ejemplo Completo: Skill con Supabase MCP

```yaml
---
name: Database Query Helper
description: Ejecuta queries SQL y analiza schema de base de datos. Usa cuando necesites consultar tablas, ejecutar SQL, o inspeccionar migraciones.
allowed-tools:
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - mcp__supabase__list_migrations
  - mcp__supabase__get_logs
  - Read
---

# Database Query Helper

## Cuándo Usar Esta Skill
- Usuario pregunta sobre datos en la base de datos
- Usuario necesita ejecutar queries SQL
- Usuario quiere inspeccionar schema o migraciones

## Instrucciones
1. Usar `mcp__supabase__list_tables` para ver tablas disponibles
2. Usar `mcp__supabase__execute_sql` para ejecutar queries
3. NUNCA ejecutar DELETE/DROP sin confirmación del usuario
```

### Ejemplo: Skill con Chrome DevTools MCP

```yaml
---
name: Web Scraper Helper
description: Automatiza navegación web y extrae datos de páginas. Usa para scraping, testing visual, o automatización de browser.
allowed-tools:
  - mcp__chrome-devtools__navigate_page
  - mcp__chrome-devtools__take_snapshot
  - mcp__chrome-devtools__click
  - mcp__chrome-devtools__fill
  - Read
  - Write
---
```

### Restricciones Importantes

1. **Case-sensitive**: `mcp__supabase__execute_sql` ≠ `mcp__Supabase__Execute_SQL`
2. **Sin wildcards**: No puedes usar `mcp__supabase__*`, lista cada tool explícitamente
3. **Servidor debe existir**: Verifica con `claude mcp list` que el servidor está configurado
4. **Combinable con tools nativos**: Mezcla MCP tools con Read, Write, Bash, etc.

### Descubrir Tools MCP Disponibles

Para listar los tools de un servidor MCP:
```bash
claude mcp list              # Ver servidores configurados
claude mcp tools <servidor>  # Ver tools de un servidor específico
```

## Sistema de Plugins y Marketplace (Diciembre 2025)

### Skills Marketplace

Las skills ahora pueden distribuirse a través del marketplace oficial:

```bash
# Instalar skill desde marketplace
/plugin install anthropics/skills/<nombre-skill>

# Habilitar/deshabilitar plugins
/plugin enable <nombre>
/plugin disable <nombre>

# Explorar marketplace
/plugin marketplace
```

### Instalación Manual vs Marketplace

| Método | Ubicación | Uso |
|--------|-----------|-----|
| **Manual (personal)** | `~/.claude/skills/` | Skills propias |
| **Manual (proyecto)** | `.claude/skills/` | Skills del equipo |
| **Marketplace** | Gestionado por CLI | Skills de la comunidad |

### Publicar Skills al Marketplace

Para contribuir skills al repositorio `anthropics/skills`:

1. Crear skill siguiendo estructura estándar
2. Incluir `README.md` con documentación
3. Agregar ejemplos de uso
4. Submit PR al repositorio oficial

## Namespacing de Subdirectorios

Las skills en subdirectorios generan nombres con namespace automático:

```
.claude/skills/
├── database/
│   ├── query/SKILL.md     → skill: database:query
│   └── migrate/SKILL.md   → skill: database:migrate
├── frontend/
│   └── component/SKILL.md → skill: frontend:component
└── simple-skill/SKILL.md  → skill: simple-skill
```

**Regla**: El path del subdirectorio se convierte en namespace con `:` como separador.

**Beneficios**:
- Organización lógica de skills relacionadas
- Evita colisiones de nombres
- Agrupación por dominio/función

## Skills vs Slash Commands vs Subagents

### Tabla Comparativa

| Aspecto | Skills | Slash Commands | Subagents |
|---------|--------|----------------|-----------|
| **Activación** | Automática por contexto | Manual (`/comando`) | Manual o delegada |
| **Trigger** | Descripción matchea query | Usuario escribe `/` | Task tool o prompt |
| **Archivos** | `SKILL.md` + recursos | Solo `.md` | `AGENT.md` + config |
| **Complejidad** | Media-Alta | Baja | Alta |
| **Contexto** | Hereda conversación | Hereda conversación | Contexto aislado |
| **Herramientas** | `allowed-tools` | Todas disponibles | Configurables |
| **Mejor para** | Capacidades especializadas | Prompts rápidos | Tareas paralelas |

### Cuándo Usar Cada Uno

**Usa Skills cuando**:
- Claude debe detectar automáticamente cuándo aplicar
- Necesitas capacidades especializadas recurrentes
- Quieres limitar herramientas disponibles

**Usa Slash Commands cuando**:
- Usuario debe invocar explícitamente
- Es un prompt/template reutilizable
- No requiere lógica compleja

**Usa Subagents cuando**:
- Necesitas contexto aislado
- Tareas paralelas independientes
- Procesos largos en background

### Skills y Subagents

**IMPORTANTE**: Las skills NO se heredan automáticamente en subagents.

Para dar acceso a skills desde un subagent:
```yaml
# .claude/agents/mi-agente/AGENT.md
---
name: mi-agente
description: Descripción del agente
skills: skill-a, skill-b, skill-c
---
```

**Limitación**: Los built-in agents (Explore, Plan, Verify) y Task tool NO tienen acceso a skills personalizadas.

## Patrones Avanzados de Tool Use

### Defer Loading para Tools Infrecuentes

Cuando una skill tiene muchos MCP tools pero solo usa algunos frecuentemente:

```yaml
---
name: database-admin
description: Administración completa de base de datos. Queries, backups, migrations.
allowed-tools:
  # Tools críticos (siempre disponibles)
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - Read
  # Tools infrecuentes (documentar para carga manual)
---

# En el SKILL.md:
## Tools Adicionales (cargar cuando sea necesario)
Para operaciones avanzadas, solicitar al usuario habilitar:
- `mcp__supabase__apply_migration` - Migraciones
- `mcp__supabase__get_logs` - Debugging
```

### Regla 3-5 Tools Críticos

Mantener solo **3-5 herramientas críticas** siempre accesibles:

```yaml
# ✅ Óptimo: 4 tools críticos
allowed-tools:
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - Read
  - Write

# ❌ Subóptimo: 15 tools (context bloat)
allowed-tools:
  - mcp__supabase__execute_sql
  - mcp__supabase__list_tables
  - mcp__supabase__apply_migration
  # ... 12 más
```

**Razón**: Demasiadas herramientas en `allowed-tools` causan "context bloat" y reducen precisión.

### Progressive Disclosure con MCP

Organizar MCP tools como filesystem para carga bajo demanda:

```markdown
## Instrucciones

### Operaciones Básicas (tools pre-cargados)
Usar `mcp__supabase__execute_sql` para queries directos.

### Operaciones Avanzadas
Para migraciones, ver [MIGRATIONS.md](MIGRATIONS.md) que documenta:
- Cuándo usar `mcp__supabase__apply_migration`
- Patrones de rollback
- Validaciones pre-migración
```

**Beneficio**: Reduce tokens 98%+ al cargar solo lo necesario.

## Mejores Prácticas

### Hacer

1. **Descripciones accionables**:
   ```yaml
   description: Extract text from PDFs, fill forms, merge documents. Use when working with PDF files or document automation.
   ```

2. **Instrucciones específicas**:
   ```markdown
   1. Run: `pnpm exec prisma generate`
   2. Verify output contains: "✔ Generated Prisma Client"
   3. If step 2 fails, DO NOT proceed—report error
   ```

3. **Scripts pre-escritos**:
   ```markdown
   Run: python scripts/fill_form.py --input form.pdf --output result.pdf
   ```

4. **Validation loops**:
   ```markdown
   WHILE lint errors exist:
     1. Read error output
     2. Fix specific error
     3. Re-run lint
   ```

5. **Checklists copiables**:
   ```markdown
   - [ ] Run tests
   - [ ] Build production
   - [ ] Update CHANGELOG
   ```

### Evitar

1. **Descripciones vagas**:
   ```yaml
   description: Helps with stuff
   ```

2. **Delegación vaga**:
   ```markdown
   Handle errors appropriately.
   ```

3. **Generar código innecesariamente**:
   ```markdown
   Generate a script that does X...
   (Mejor: incluir el script pre-escrito)
   ```

4. **Repetir conocimiento de Claude**:
   ```markdown
   Python uses indentation for blocks...
   (Claude ya sabe esto)
   ```

5. **Fechas o información temporal**:
   ```markdown
   If before January 2025, use old pattern.
   (Mejor: sección "Old Patterns" para legacy code)
   ```

## Manejo de Errores

### Error: "Skill no se activa automáticamente"
1. Verificar que la descripción incluye trigger terms específicos
2. Revisar que el archivo se llama exactamente `SKILL.md` (mayúsculas)
3. Confirmar ubicación correcta: `.claude/skills/[nombre]/SKILL.md`
4. Reiniciar Claude Code para recargar skills

### Error: "YAML inválido en frontmatter"
1. Verificar que usa `---` al inicio y fin del frontmatter
2. Ejecutar: `grep -P '\t' SKILL.md` - no debe retornar nada (tabs prohibidos)
3. Validar indentación consistente (solo espacios)
4. Verificar que `allowed-tools` usa formato correcto (array o comma-separated)

### Error: "Tool not found" con MCP tools
1. Verificar nombre exacto: `mcp__<server>__<tool>` (case-sensitive)
2. Confirmar servidor configurado: `claude mcp list`
3. Listar tools disponibles: `claude mcp tools <servidor>`

### Error: "Skill demasiado larga / context overflow"
1. Verificar que SKILL.md tiene <500 líneas
2. Mover contenido extenso a archivos separados (REFERENCE.md, EXAMPLES.md)
3. Usar referencias one-level deep, no anidadas
4. Aplicar regla 3-5 tools críticos en `allowed-tools`

### Error: "Model not found" o modelo inválido
1. Verificar nombre exacto del modelo: `claude-sonnet-4-20250514`, `claude-opus-4-5-20251101`
2. El campo `model` es opcional - remover si no es necesario
3. Modelos válidos: sonnet-4, opus-4.5, haiku (verificar versiones actuales)

### Error: "Skill no aparece con namespace correcto"
1. Verificar estructura de subdirectorios
2. Path `.claude/skills/a/b/SKILL.md` → skill name `a:b`
3. Reiniciar Claude Code para recargar skills

### Error: "Referencias no encontradas"
1. Verificar que archivos referenciados existen en el mismo directorio
2. Usar rutas relativas: `[REFERENCE.md](REFERENCE.md)` no absolutas
3. Confirmar nombres exactos (case-sensitive en Linux)

## Recursos

Para la guía completa de Skills con ejemplos extensos, ver [GUIA-COMPLETA.md](GUIA-COMPLETA.md).

## Glosario de Términos

- **Trigger terms**: Palabras clave en la descripción que activan la skill
- **Progressive disclosure**: Cargar contenido bajo demanda (metadata → instructions → resources)
- **allowed-tools**: Lista de herramientas que la skill puede usar sin confirmación
- **Scope**: Dónde vive la skill (personal, project, marketplace)
- **One-level deep**: Referencias que no anidan (archivo A → B, no A → B → C)
- **Validation loop**: Patrón de ejecutar → validar → corregir → repetir
- **Namespacing**: Prefijo automático basado en subdirectorios (ej: `database:query`)
- **Context bloat**: Sobrecarga de contexto por demasiados tools/definiciones
- **Defer loading**: Cargar tools bajo demanda en lugar de pre-cargar todos
- **Marketplace**: Repositorio oficial `anthropics/skills` para distribuir skills
- **Subagent**: Agente secundario que puede o no heredar skills
