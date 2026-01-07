# Investigación: Mejores Prácticas UX/UI para Brochures Digitales en PDF

## 1. Optimización para Lectura en Pantalla vs Impresión

### Para Pantalla (Digital-First)
- **Orientación horizontal (landscape)**: Aprovecha mejor las pantallas widescreen
- **Formato 16:9 o 4:3**: Más compatible con monitores y tablets
- **Colores RGB**: Espacio de color nativo para pantallas
- **Resolución 72-150 PPI**: Suficiente para pantalla, reduce peso del archivo
- **Páginas individuales**: Facilita la navegación y el scroll

### Para Impresión
- **Orientación vertical (portrait)**: Estándar para documentos impresos
- **Formato A4 o Letter**: Tamaños estándar de papel
- **Colores CMYK**: Espacio de color para impresión
- **Resolución 300 PPI**: Calidad profesional de impresión
- **Spreads (doble página)**: Si el diseño lo requiere

### Solución Híbrida
- Crear dos versiones: digital e imprimible
- O usar formato A4 landscape que funciona aceptablemente en ambos casos
- Incluir marcas de impresión solo en versión print

---

## 2. Interactividad en PDFs

### Links y Navegación
- **Tabla de contenidos interactiva**: Con links a cada sección
- **Links externos**: URLs clickeables con indicador visual (subrayado, color diferente)
- **Links de email**: mailto: para contacto directo
- **Botones de navegación**: Siguiente, anterior, volver al inicio
- **Bookmarks/Marcadores**: Panel lateral para navegación rápida

### Elementos Interactivos Avanzados
- **Botones con estados**: Normal, hover, pressed
- **Formularios rellenables**: Si se requiere captura de datos
- **Videos embebidos**: Usar con precaución (aumenta peso)
- **Audio**: Para versiones accesibles o presentaciones
- **Animaciones**: Transiciones entre páginas (PDF interactivo)

### Buenas Prácticas de Links
```
Correcto:  "Visita nuestro sitio web" [link en texto descriptivo]
Incorrecto: "Click aquí" o mostrar URL completa sin formato
```

---

## 3. Accesibilidad en Documentos PDF (WCAG 2.1 / PDF/UA)

### Estructura del Documento
- **Documento etiquetado (Tagged PDF)**: Fundamental para lectores de pantalla
- **Orden de lectura lógico**: Verificar que coincida con el orden visual
- **Idioma del documento**: Especificar en propiedades
- **Título del documento**: Definir en metadatos

### Texto y Contenido
- **Texto real, no imágenes de texto**: Seleccionable y buscable
- **Alt text para imágenes**: Descripciones significativas
- **Figuras decorativas**: Marcar como "artifact" para ignorar
- **Encabezados jerárquicos**: H1, H2, H3 correctamente anidados

### Formularios y Links
- **Etiquetas en campos de formulario**: Asociadas correctamente
- **Texto descriptivo en links**: No "click aquí"
- **Indicadores no solo por color**: Usar también forma o texto

### Verificación
- Usar Adobe Acrobat Accessibility Checker
- Probar con lector de pantalla (NVDA, JAWS, VoiceOver)
- Verificar navegación solo con teclado

---

## 4. Tamaños de Fuente Óptimos para Digital

### Recomendaciones por Elemento
| Elemento | Tamaño Mínimo | Tamaño Recomendado |
|----------|---------------|-------------------|
| Cuerpo de texto | 10pt | 11-12pt |
| Subtítulos | 14pt | 16-18pt |
| Títulos principales | 18pt | 24-36pt |
| Pies de foto/Notas | 8pt | 9-10pt |
| CTAs/Botones | 12pt | 14-16pt |

### Consideraciones
- **Pantallas móviles**: Considerar mínimo 12pt para cuerpo
- **Interlineado (leading)**: 120-145% del tamaño de fuente
- **Longitud de línea**: 50-75 caracteres por línea óptimo
- **Espaciado entre párrafos**: Al menos 1.5x el interlineado

### Tipografías Recomendadas para Pantalla
- **Sans-serif para cuerpo**: Open Sans, Roboto, Lato, Source Sans Pro
- **Serif para títulos**: Georgia, Merriweather, Playfair Display
- **Evitar**: Fuentes muy finas (light/thin) en tamaños pequeños

---

## 5. Contraste y Legibilidad

### Ratios de Contraste WCAG
- **Texto normal**: Mínimo 4.5:1 (AA), 7:1 (AAA)
- **Texto grande (18pt+ o 14pt bold)**: Mínimo 3:1 (AA), 4.5:1 (AAA)
- **Elementos gráficos**: Mínimo 3:1

### Combinaciones de Color Recomendadas
```
Alta legibilidad:
- Negro (#000000) sobre blanco (#FFFFFF) - Ratio 21:1
- Azul oscuro (#1a1a2e) sobre blanco - Ratio ~16:1
- Blanco sobre azul oscuro (#003366) - Ratio ~12:1

Evitar:
- Texto claro sobre fondo claro
- Colores complementarios puros (rojo sobre verde)
- Texto sobre imágenes sin overlay
```

### Herramientas de Verificación
- WebAIM Contrast Checker
- Colour Contrast Analyser (CCA)
- Adobe Color Accessibility Tools

### Fondos e Imágenes
- Usar overlay oscuro (50-70% opacidad) bajo texto sobre imágenes
- Evitar fondos con patrones bajo texto
- Asegurar consistencia de contraste en todo el documento

---

## 6. Estructura para Escaneo Rápido (Scannable Layout)

### Patrón F de Lectura
Los usuarios escanean en forma de F:
1. Primera línea horizontal (título)
2. Segunda línea horizontal más abajo
3. Línea vertical hacia abajo por el lado izquierdo

### Jerarquía Visual
```
Nivel 1: Título principal (más grande, más peso)
Nivel 2: Subtítulos de sección
Nivel 3: Subtítulos de subsección
Nivel 4: Cuerpo de texto
Nivel 5: Notas y pies de página
```

### Técnicas de Escaneo
- **Bullets y listas**: Fragmentar información densa
- **Negritas estratégicas**: Resaltar palabras clave (no párrafos enteros)
- **Cajas de destacado**: Pull quotes, estadísticas clave
- **Iconografía**: Guía visual rápida
- **Espacio en blanco**: No temer al espacio vacío

### Estructura Recomendada por Página
```
+----------------------------------+
|  Título de Sección (H1/H2)       |
+----------------------------------+
|  Subtítulo o intro breve         |
+----------------------------------+
|  [Imagen/Gráfico]  |  Contenido  |
|                    |  - Bullet 1 |
|                    |  - Bullet 2 |
+----------------------------------+
|  CTA o siguiente paso            |
+----------------------------------+
```

---

## 7. Metadatos y SEO para PDFs

### Metadatos Esenciales
```
Título: Nombre descriptivo del documento
Autor: Nombre de empresa/persona
Asunto: Descripción breve del contenido
Palabras clave: 5-10 términos relevantes separados por comas
```

### Optimización para Buscadores
- **Nombre de archivo**: Usar guiones, palabras clave relevantes
  - Correcto: `guia-servicios-biotecnologia-2024.pdf`
  - Incorrecto: `brochure_final_v3_FINAL.pdf`
- **Texto real indexable**: No imágenes de texto
- **Primer párrafo optimizado**: Google muestra las primeras líneas
- **Links internos al PDF**: Desde página web relacionada

### Consideraciones Técnicas
- PDFs son indexados por Google
- El título del documento aparece en resultados de búsqueda
- Incluir URL del sitio web dentro del PDF
- Crear landing page que enlace al PDF

---

## 8. Peso del Archivo vs Calidad de Imagen

### Tamaño Objetivo
| Tipo de Brochure | Tamaño Recomendado |
|------------------|-------------------|
| Email attachment | < 5 MB |
| Web download | < 10 MB |
| Print-ready | 20-50 MB (aceptable) |

### Optimización de Imágenes
- **Formato JPEG**: Para fotos (80-85% calidad)
- **Formato PNG**: Para gráficos con transparencia
- **Resolución**: 150 PPI para digital, 300 PPI para print
- **Compresión**: Usar compresión ZIP para PDF

### Técnicas de Reducción
1. Redimensionar imágenes al tamaño real de uso
2. Eliminar capas y objetos ocultos
3. Aplanar transparencias
4. Usar "Save as Reduced Size PDF" en Acrobat
5. Optimizar con herramientas como Acrobat Pro Optimizer

### Balance Recomendado
```
Imagen de fondo full-page: 1920x1080px, JPEG 80%
Imágenes de contenido: 800-1200px ancho, JPEG 85%
Iconos y logos: Vector (SVG embebido) o PNG optimizado
```

---

## 9. Mobile-Friendly Considerations

### Diseño Responsivo para PDF
- **Tamaño de touch targets**: Mínimo 44x44 pixels para botones
- **Márgenes amplios**: Evitar contenido en bordes
- **Columna única**: Más fácil de leer en móvil
- **Páginas cortas**: Menos scroll por página

### Optimizaciones Específicas
- **Zoom inicial**: Configurar apertura al 100% o "Fit Width"
- **Links grandes**: Área de tap generosa
- **Texto legible sin zoom**: 12pt mínimo
- **Evitar spreads**: Las dobles páginas no funcionan bien

### Alternativas a Considerar
- Crear versión mobile separada (single column)
- Ofrecer versión HTML responsive junto al PDF
- Usar flipbook/viewer responsivo en web

### Pruebas en Móvil
- Probar en iOS (Safari/Adobe Reader) y Android
- Verificar que links funcionen correctamente
- Comprobar legibilidad sin hacer zoom
- Evaluar tiempo de carga en conexión móvil

---

## Checklist de Optimización para Brochure PDF Profesional

### Pre-Diseño
- [ ] Definir propósito principal: digital, impreso o ambos
- [ ] Establecer audiencia objetivo y contexto de uso
- [ ] Seleccionar formato y orientación apropiados
- [ ] Elegir paleta de colores con contraste adecuado
- [ ] Seleccionar tipografías legibles y profesionales

### Estructura y Contenido
- [ ] Crear jerarquía clara de encabezados (H1, H2, H3)
- [ ] Implementar tabla de contenidos interactiva
- [ ] Usar listas y bullets para fragmentar contenido
- [ ] Incluir espacio en blanco estratégico
- [ ] Agregar números de página
- [ ] Diseñar para patrón de lectura F

### Tipografía
- [ ] Cuerpo de texto: mínimo 10-11pt (12pt para móvil)
- [ ] Títulos: claramente diferenciados por tamaño/peso
- [ ] Interlineado: 120-145% del tamaño de fuente
- [ ] Longitud de línea: 50-75 caracteres
- [ ] Fuentes embebidas en el documento

### Contraste y Color
- [ ] Verificar ratio de contraste 4.5:1 para texto normal
- [ ] Verificar ratio 3:1 para texto grande
- [ ] No depender solo del color para comunicar información
- [ ] Probar en escala de grises
- [ ] Verificar legibilidad de texto sobre imágenes

### Interactividad
- [ ] Agregar links externos funcionales
- [ ] Incluir links de email y teléfono
- [ ] Crear marcadores/bookmarks de navegación
- [ ] Agregar botones de navegación entre secciones
- [ ] Verificar que todos los links funcionan

### Accesibilidad
- [ ] Documento etiquetado (Tagged PDF)
- [ ] Orden de lectura verificado
- [ ] Alt text en todas las imágenes significativas
- [ ] Imágenes decorativas marcadas como artifact
- [ ] Idioma del documento especificado
- [ ] Título del documento definido
- [ ] Pasar Adobe Accessibility Checker
- [ ] Probar navegación con teclado

### Metadatos y SEO
- [ ] Título descriptivo en propiedades
- [ ] Autor/empresa definido
- [ ] Palabras clave relevantes agregadas
- [ ] Descripción/asunto completado
- [ ] Nombre de archivo optimizado (guiones, keywords)

### Imágenes y Peso
- [ ] Imágenes optimizadas para uso previsto
- [ ] Resolución apropiada (150 PPI digital, 300 PPI print)
- [ ] Tamaño total del archivo aceptable (< 10 MB web)
- [ ] Logos e iconos en vector cuando sea posible
- [ ] Compresión aplicada sin pérdida visible de calidad

### Mobile-Friendly
- [ ] Touch targets mínimo 44x44px
- [ ] Texto legible sin zoom (12pt+ cuerpo)
- [ ] Links con área de tap suficiente
- [ ] Probar en dispositivos iOS y Android
- [ ] Configurar vista inicial apropiada

### Control de Calidad Final
- [ ] Revisar ortografía y gramática
- [ ] Verificar consistencia de diseño
- [ ] Probar en múltiples visores PDF (Acrobat, Preview, Chrome)
- [ ] Validar todos los links funcionan
- [ ] Confirmar imágenes se ven correctamente
- [ ] Prueba final de accesibilidad
- [ ] Backup de archivo editable (.indd, .ai, etc.)

---

## Herramientas Recomendadas

### Diseño
- Adobe InDesign (estándar de industria)
- Canva (accesible, templates)
- Affinity Publisher (alternativa económica)
- Figma (con plugins de exportación)

### Optimización
- Adobe Acrobat Pro (completo)
- PDF Expert (Mac)
- Smallpdf (online)
- ILovePDF (online)

### Accesibilidad
- Adobe Acrobat Accessibility Checker
- PAC (PDF Accessibility Checker) - gratuito
- CommonLook PDF Validator
- axesPDF

### Verificación de Contraste
- WebAIM Contrast Checker
- Colour Contrast Analyser
- Stark (plugin Figma/Sketch)
