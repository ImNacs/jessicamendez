# Límites de Tamaño y Scoring

Reglas para determinar si CLAUDE.md está dentro de límites óptimos y calcular score de calidad.

---

## 📏 Límites Recomendados

### Líneas Totales

| Rango | Estado | Acción |
|-------|--------|--------|
| **0-100** | 🟢 Excelente | Mantener, puede agregar más contenido |
| **100-150** | 🟢 Óptimo | Ideal, mantener |
| **151-200** | 🟡 Aceptable | Monitorear, evitar crecer más |
| **201-250** | 🟠 Límite | Considerar optimización |
| **251-300** | 🔴 Exceso | Optimizar pronto |
| **>300** | 🔴 Crítico | Optimizar urgentemente |

**Target del proyecto Karmatic**: 150-180 líneas

### Secciones Nivel 2 (##)

| Cantidad | Estado | Acción |
|----------|--------|--------|
| **4-6** | 🟢 Óptimo | Ideal |
| **7-8** | 🟡 Aceptable | Considerar consolidar |
| **9-10** | 🟠 Límite | Consolidar secciones relacionadas |
| **>10** | 🔴 Exceso | Reestructurar obligatorio |

**Actual Karmatic**: 12 secciones (⚠️ reducir a 8)

### Líneas por Sección

| Líneas | Estado | Acción |
|--------|--------|--------|
| **1-10** | 🟢 Ideal | Mantener |
| **11-20** | 🟡 Bueno | Aceptable |
| **21-30** | 🟠 Largo | Considerar simplificar |
| **31-50** | 🔴 Muy largo | Delegar contenido |
| **>50** | 🔴 Crítico | Delegar obligatorio |

### Líneas por Skill/Agente

| Líneas | Formato | Acción |
|--------|---------|--------|
| **2-3** | 🟢 Compacto | Formato recomendado |
| **4-5** | 🟡 Aceptable | Considerar compactar |
| **6-8** | 🔴 Verboso | Compactar obligatorio |

**Target**: 3 líneas por entrada (triggers + ubicación + resumen)

---

## 📊 Cálculo de Score de Calidad

### Fórmula General

```
Score = (
  line_score +
  section_score +
  consistency_score +
  delegation_score
) / 4
```

**Rango**: 0-100 puntos

### 1. Line Score (Penalización por Exceso)

```python
line_score = 100 - line_excess_penalty

Donde:
line_excess_penalty = max(0, (total_lines - 200) / 2)

Ejemplos:
- 150 líneas: penalty = 0     → score = 100
- 200 líneas: penalty = 0     → score = 100
- 250 líneas: penalty = 25    → score = 75
- 300 líneas: penalty = 50    → score = 50
- 368 líneas: penalty = 84    → score = 16
```

**Interpretación**:
- 90-100: Excelente tamaño
- 70-89: Aceptable, considerar optimizar
- 50-69: Necesita optimización
- <50: Urgente optimización

### 2. Section Score (Penalización por Sobrecarga)

```python
section_score = 100 - section_bloat_penalty

Donde:
section_bloat_penalty = max(0, (total_sections - 8) * 10)

Ejemplos:
- 6 secciones: penalty = 0    → score = 100
- 8 secciones: penalty = 0    → score = 100
- 10 secciones: penalty = 20  → score = 80
- 12 secciones: penalty = 40  → score = 60
- 15 secciones: penalty = 70  → score = 30
```

**Interpretación**:
- 90-100: Estructura óptima
- 70-89: Aceptable
- 50-69: Reestructurar
- <50: Consolidar urgente

### 3. Consistency Score (Validación de Existencia)

```python
consistency_score = (
  (skills_consistent / total_skills_mentioned) +
  (agents_consistent / total_agents_mentioned) +
  (refs_valid / total_refs)
) / 3 * 100

Donde:
- skills_consistent: Skills documentadas que existen
- agents_consistent: Agentes documentados que existen
- refs_valid: Referencias a archivos que son válidas

Ejemplo:
- Skills: 7/7 existen = 100%
- Agentes: 4/5 existen = 80%
- Referencias: 12/12 válidas = 100%

consistency_score = (100 + 80 + 100) / 3 = 93.3
```

**Penalizaciones adicionales**:
- -10 puntos por cada skill/agente existente no documentado
- -20 puntos por cada skill/agente documentado que no existe

### 4. Delegation Score (Contenido Apropiado)

```python
delegation_score = (1 - (sections_over_30_lines / total_sections)) * 100

Ejemplo:
- Total secciones: 12
- Secciones >30 líneas: 3
delegation_score = (1 - 3/12) * 100 = 75
```

**Penalizaciones adicionales**:
- -5 puntos por cada sección de 30-50 líneas no delegada
- -10 puntos por cada sección >50 líneas no delegada
- -5 puntos por duplicación detectada

---

## 🎯 Scores Objetivo

### Por Métrica

| Métrica | Mínimo Aceptable | Target | Excelente |
|---------|-----------------|--------|-----------|
| **Line Score** | 70 | 85 | 95+ |
| **Section Score** | 70 | 90 | 100 |
| **Consistency Score** | 90 | 100 | 100 |
| **Delegation Score** | 80 | 90 | 100 |

### Score Total

| Rango | Clasificación | Acción |
|-------|--------------|--------|
| **95-100** | 🟢 Excelente | Mantener, revisar mensualmente |
| **85-94** | 🟢 Muy bueno | Mantener, revisar trimestralmente |
| **70-84** | 🟡 Aceptable | Optimizar cuando sea conveniente |
| **50-69** | 🟠 Necesita mejora | Planear optimización pronto |
| **<50** | 🔴 Crítico | Optimizar urgentemente |

**Target Proyecto Karmatic**: >= 85

---

## 📈 Ejemplo de Cálculo Completo

### Estado Actual de Karmatic

**Métricas**:
- Total líneas: 368
- Secciones nivel 2: 12
- Skills documentadas: 7 (todas existen)
- Agentes documentados: 5 (todas existen)
- Referencias: 0 rotas
- Secciones >30 líneas: 3

**Cálculo**:

1. **Line Score**:
```
penalty = (368 - 200) / 2 = 84
line_score = 100 - 84 = 16
```

2. **Section Score**:
```
penalty = (12 - 8) * 10 = 40
section_score = 100 - 40 = 60
```

3. **Consistency Score**:
```
skills = 7/7 = 100%
agents = 5/5 = 100%
refs = 100%
consistency_score = (100 + 100 + 100) / 3 = 100
```

4. **Delegation Score**:
```
base = (1 - 3/12) * 100 = 75
penalizaciones = -15 (3 secciones >30 líneas)
delegation_score = 75 - 15 = 60
```

**Score Total**:
```
Score = (16 + 60 + 100 + 60) / 4 = 59
```

**Clasificación**: 🟠 Necesita mejora (Target: 85)

---

## 🎯 Proyección Post-Optimización

### Objetivos de Optimización

**Reducciones target**:
- Líneas: 368 → 180 (-188, -51%)
- Secciones: 12 → 8 (-4, consolidación)
- Secciones >30 líneas: 3 → 0 (delegación)

**Cálculo proyectado**:

1. **Line Score**: 100 - (180 - 200) / 2 = 100 (sin penalty)
2. **Section Score**: 100 - 0 = 100
3. **Consistency Score**: 100 (mantener)
4. **Delegation Score**: (1 - 0/8) * 100 = 100

**Score Proyectado**: (100 + 100 + 100 + 100) / 4 = **100** ✅

---

## 📊 Tracking de Progreso

### Template de Reporte

```markdown
## Score de CLAUDE.md

**Fecha**: [YYYY-MM-DD]

### Métricas
| Métrica | Actual | Target | Status |
|---------|--------|--------|--------|
| Líneas totales | [X] | 150-180 | [emoji] |
| Secciones nivel 2 | [X] | 6-8 | [emoji] |
| Skills documentadas | [X/X] | 100% | [emoji] |
| Agentes documentados | [X/X] | 100% | [emoji] |
| Secciones >30 líneas | [X] | 0 | [emoji] |

### Scores
| Componente | Score | Target |
|------------|-------|--------|
| Line Score | [X] | >= 85 |
| Section Score | [X] | >= 90 |
| Consistency Score | [X] | 100 |
| Delegation Score | [X] | >= 90 |
| **TOTAL** | **[X]** | **>= 85** |

### Clasificación: [Excelente/Muy bueno/Aceptable/Necesita mejora/Crítico]

### Recomendaciones
1. [Acción recomendada 1]
2. [Acción recomendada 2]
```

---

## 🔄 Historial de Scores

Mantener registro para tracking de mejoras:

```markdown
## Historial de Scores

| Fecha | Líneas | Secciones | Score Total | Cambios Principales |
|-------|--------|-----------|-------------|---------------------|
| 2025-11-05 | 368 | 12 | 59 | Estado inicial |
| 2025-11-06 | 187 | 8 | 92 | Delegación de 3 secciones extensas |
| 2025-11-10 | 180 | 8 | 100 | Optimización de descripciones |
```

Este historial ayuda a:
- Ver progreso de optimización
- Identificar regresiones
- Justificar cambios arquitecturales
