# 📘 Manual de Usuario — ClinTrialSuite v3.0

## Suite de Evaluación de Ensayos Clínicos

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Interfaz General](#3-interfaz-general)
4. [Módulo 1: Auditoría Estadística](#4-módulo-1-auditoría-estadística)
   - 4.1 [Selección del tipo de desenlace](#41-selección-del-tipo-de-desenlace)
   - 4.2 [Ingreso de datos — Formulario](#42-ingreso-de-datos--formulario)
   - 4.3 [Ingreso de datos — CSV](#43-ingreso-de-datos--csv)
   - 4.4 [Valores reportados en la publicación](#44-valores-reportados-en-la-publicación)
   - 4.5 [Opciones de cálculo](#45-opciones-de-cálculo)
   - 4.6 [Ejecución y resultados](#46-ejecución-y-resultados)
   - 4.7 [Métricas calculadas](#47-métricas-calculadas)
   - 4.8 [Tabla de comparación](#48-tabla-de-comparación)
   - 4.9 [Gráficos generados](#49-gráficos-generados)
   - 4.10 [Alertas e interpretación](#410-alertas-e-interpretación)
5. [Módulo 2: Sensibilidad Inferencial](#5-módulo-2-sensibilidad-inferencial)
   - 5.1 [Parámetros configurables](#51-parámetros-configurables)
   - 5.2 [Mapa de robustez (Heatmap)](#52-mapa-de-robustez-heatmap)
   - 5.3 [Curva de potencia](#53-curva-de-potencia)
   - 5.4 [Gráfico de conclusión vs tamaño muestral](#54-gráfico-de-conclusión-vs-tamaño-muestral)
   - 5.5 [Interpretación del análisis](#55-interpretación-del-análisis)
6. [Módulo 3: Metodología y Limitaciones](#6-módulo-3-metodología-y-limitaciones)
7. [Exportación de Resultados](#7-exportación-de-resultados)
8. [Ejemplos de Uso Paso a Paso](#8-ejemplos-de-uso-paso-a-paso)
   - 8.1 [Ejemplo 1: Auditoría de un ensayo con desenlace binario](#81-ejemplo-1-auditoría-de-un-ensayo-con-desenlace-binario)
   - 8.2 [Ejemplo 2: Auditoría de un ensayo con desenlace continuo](#82-ejemplo-2-auditoría-de-un-ensayo-con-desenlace-continuo)
   - 8.3 [Ejemplo 3: Análisis de sensibilidad de superioridad](#83-ejemplo-3-análisis-de-sensibilidad-de-superioridad)
   - 8.4 [Ejemplo 4: Análisis de no-inferioridad](#84-ejemplo-4-análisis-de-no-inferioridad)
9. [Glosario de Términos](#9-glosario-de-términos)
10. [Preguntas Frecuentes (FAQ)](#10-preguntas-frecuentes-faq)
11. [Limitaciones Conocidas](#11-limitaciones-conocidas)
12. [Referencias Bibliográficas](#12-referencias-bibliográficas)
13. [Aviso Legal y Regulatorio](#13-aviso-legal-y-regulatorio)

---

## 1. Introducción

**ClinTrialSuite v3.0** es una herramienta educativa interactiva diseñada para la evaluación rápida de resultados publicados de ensayos clínicos. Permite:

- **Verificar la consistencia estadística** entre los datos crudos y las métricas reportadas en una publicación (Módulo 1).
- **Explorar la robustez de las conclusiones** bajo diferentes supuestos metodológicos (Módulo 2).
- **Consultar las fórmulas, limitaciones y referencias** que sustentan los cálculos (Módulo 3).

### ¿Para quién es esta herramienta?

| Perfil | Uso principal |
|--------|---------------|
| Estudiantes de bioestadística | Aprender cómo se calculan OR, IC, p-valores, NNT |
| Revisores de artículos | Verificar rápidamente si los números reportados son coherentes |
| Profesionales de asuntos regulatorios | Screening inicial de consistencia antes de revisión profunda |
| Investigadores clínicos | Explorar sensibilidad de resultados a cambios de supuestos |

> **⚠️ Aviso importante:** Esta herramienta es exclusivamente educativa. No sustituye la revisión completa de datos clínicos individuales (IPD) para decisiones regulatorias ante FDA, EMA, ANVISA u otros organismos.

---

## 2. Requisitos del Sistema

| Requisito | Detalle |
|-----------|---------|
| Navegador | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Conexión a internet | Necesaria para cargar librerías CDN (Tailwind CSS, Chart.js, Google Fonts) |
| Resolución mínima | 360px de ancho (responsive, se adapta a móvil) |
| Instalación | No requiere. Abrir el archivo `index.html` directamente en el navegador |

### Librerías externas utilizadas (vía CDN)

- **Tailwind CSS v4** — Framework de estilos
- **Chart.js v4.4.7** — Gráficos interactivos
- **Google Fonts (Inter)** — Tipografía

---

## 3. Interfaz General

Al abrir la aplicación, se presenta:

### Cabecera (Header)

- **Logo y nombre**: ClinTrialSuite con versión actual
- **Etiqueta "Herramienta educativa"**: Recordatorio permanente del carácter no regulatorio
- **Botón "Exportar CSV"**: Descarga todos los resultados calculados en formato CSV

### Barra de advertencia

Banner amarillo bajo la cabecera con aviso regulatorio permanente.

### Pestañas de navegación

Tres pestañas principales:

| Pestaña | Contenido |
|---------|-----------|
| **Módulo 1: Auditoría Estadística** | Ingreso de datos y verificación de consistencia |
| **Módulo 2: Sensibilidad Inferencial** | Exploración de robustez bajo diferentes supuestos |
| **Módulo 3: Metodología y Limitaciones** | Documentación de fórmulas, limitaciones y referencias |

Para cambiar de módulo, haga clic en la pestaña correspondiente. La pestaña activa se resalta en azul.

### Comportamiento inicial

- La aplicación **no ejecuta ningún análisis automáticamente** al cargar
- Se muestra únicamente el formulario de entrada de datos, limpio y sin resultados
- Los resultados aparecen solo después de presionar los botones de ejecución

---

## 4. Módulo 1: Auditoría Estadística

Este módulo permite ingresar los datos de un ensayo clínico de dos brazos y comparar los valores reportados en la publicación con los valores calculados a partir de los datos crudos.

### 4.1 Selección del tipo de desenlace

En la parte superior del formulario, seleccione uno de los dos tipos:

#### Desenlace Binario (proporciones)

Apropiado cuando el resultado se mide como evento/no-evento:
- Respuesta al tratamiento (sí/no)
- Mortalidad (sí/no)
- Evento adverso grave (sí/no)

#### Desenlace Continuo (medias)

Apropiado cuando el resultado es una medición numérica:
- Presión arterial (mmHg)
- Puntuación de dolor (escala 0–10)
- Nivel de hemoglobina (g/dL)

> Al cambiar el tipo de desenlace, los campos del formulario se actualizan automáticamente.

---

### 4.2 Ingreso de datos — Formulario

#### Para desenlace binario

Se presentan dos paneles:

**Brazo Tratamiento (azul):**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Nombre | Nombre identificador del brazo | "Tratamiento A" |
| n (tamaño) | Número total de participantes | 50 |
| Eventos | Número de participantes con el evento | 30 |
| Proporción | Se calcula automáticamente (solo lectura) | 60.0% |

**Brazo Control (verde):**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Nombre | Nombre identificador del brazo | "Control" |
| n (tamaño) | Número total de participantes | 50 |
| Eventos | Número de participantes con el evento | 20 |
| Proporción | Se calcula automáticamente (solo lectura) | 40.0% |

#### Para desenlace continuo

**Brazo Tratamiento:**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| n | Número de participantes | 50 |
| Media | Media aritmética del desenlace | 12.5 |
| DE (SD) | Desviación estándar | 4.2 |

**Brazo Control:**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| n | Número de participantes | 50 |
| Media | Media aritmética del desenlace | 10.8 |
| DE (SD) | Desviación estándar | 3.9 |

#### Validación en tiempo real

Los campos se validan automáticamente mientras escribe:

- 🔴 **Borde rojo**: el valor ingresado es inválido (eventos > n, valores negativos)
- Los mensajes de error aparecen debajo de los campos
- El botón "Ejecutar Auditoría" se desactiva si hay errores de validación

---

### 4.3 Ingreso de datos — CSV

Alternativamente, puede pegar datos en formato CSV:

1. Haga clic en el botón **"CSV / Texto"** en la esquina superior derecha del formulario
2. Pegue sus datos en el área de texto
3. Haga clic en **"Importar CSV"**

#### Formato esperado

```csv
brazo,n,eventos,OR_reportado,IC_low,IC_high,p_valor
Tratamiento,50,30,1.5,1.1,1.9,0.045
Control,50,20,,,,
```

#### Headers aceptados

La herramienta acepta headers en español e inglés:

| Español | Inglés |
|---------|--------|
| `n` | `sample_size` |
| `eventos` | `events` |
| `or_reportado` | `reported_or` |
| `ic_low` | `ci_low` |
| `ic_high` | `ci_high` |
| `p_valor` | `p_value` |

> Tras importar, los datos se cargan en el formulario y se cambia automáticamente al modo formulario para revisión.

---

### 4.4 Valores reportados en la publicación

Debajo de los datos de los brazos, ingrese los valores tal como aparecen en la publicación:

#### Para desenlace binario

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| OR reportado | Odds Ratio reportado por los autores | 1.5 |
| IC 95% Inferior | Límite inferior del intervalo de confianza | 1.1 |
| IC 95% Superior | Límite superior del intervalo de confianza | 1.9 |
| p-valor reportado | p-valor reportado | 0.045 |

#### Para desenlace continuo

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Dif. medias reportada | Diferencia de medias entre brazos | 1.7 |
| IC 95% Inferior | Límite inferior del IC | 0.1 |
| IC 95% Superior | Límite superior del IC | 3.3 |
| p-valor reportado | p-valor reportado | 0.038 |

> La herramienta validará que IC Inferior < IC Superior. Si no se cumple, ambos campos se marcan en rojo.

---

### 4.5 Opciones de cálculo

#### Corrección de Yates

- **Casilla de verificación**: "Aplicar corrección de continuidad de Yates"
- **Cuándo activarla**: Cuando alguna celda de la tabla 2×2 tiene menos de 40 observaciones
- **Efecto**: Produce p-valores más conservadores (más grandes)
- **Referencia**: Se aplica tanto al χ² principal como al cálculo del índice de fragilidad

---

### 4.6 Ejecución y resultados

#### Botones disponibles

| Botón | Función |
|-------|---------|
| **Ejecutar Auditoría** | Calcula todas las métricas y muestra resultados |
| **Ejemplo Binario** | Carga datos de ejemplo para desenlace binario |
| **Ejemplo Continuo** | Carga datos de ejemplo para desenlace continuo |
| **Limpiar** | Oculta todos los resultados y gráficos |

#### Flujo de trabajo recomendado

1. Seleccione el tipo de desenlace
2. Ingrese los datos del ensayo (o cargue un ejemplo)
3. Ingrese los valores reportados en la publicación
4. (Opcional) Active la corrección de Yates si aplica
5. Haga clic en **"Ejecutar Auditoría"**
6. Revise las alertas, métricas, tabla de comparación y gráficos
7. (Opcional) Exporte los resultados a CSV

---

### 4.7 Métricas calculadas

Al ejecutar la auditoría, se muestran 6 tarjetas de métricas:

#### 1. Odds Ratio Calculado (binario) / Diferencia de Medias (continuo)

- **Fórmula binaria**: `OR = (a × d) / (b × c)`
  - a = eventos tratamiento, b = no-eventos tratamiento
  - c = eventos control, d = no-eventos control
- **Fórmula continua**: `Dif = media₁ - media₂`
- También muestra el RR calculado (binario) o Cohen's d (continuo)

#### 2. IC 95% Calculado

- **Método**: Wald (aproximación normal en escala logarítmica)
- **Fórmula binaria**: `IC = exp(ln(OR) ± 1.96 × SE)`
  - `SE = √(1/a + 1/b + 1/c + 1/d)` (método de Woolf)
- **Fórmula continua**: `IC = Dif ± 1.96 × SE`
  - `SE = √(SD₁²/n₁ + SD₂²/n₂)`
- Corrección de Haldane (+0.5) si alguna celda = 0

#### 3. p-valor Calculado

- **Método binario**: Chi-cuadrado con 1 grado de libertad
  - `χ² = N(ad-bc)² / [(a+b)(c+d)(a+c)(b+d)]`
  - Con corrección de Yates opcional
- **Método continuo**: Test Z bilateral
  - `z = Dif / SE`, `p = 2 × (1 - Φ(|z|))`
- Color verde si p < 0.05, rojo si p ≥ 0.05

#### 4. NNT (Número Necesario a Tratar)

- **Fórmula**: `NNT = 1 / |p₁ - p₂|`
- **Interpretación**:
  - NNT positivo = **beneficio** (el tratamiento es mejor)
  - NNT negativo = **daño** (NNTH — Number Needed to Harm)
- Solo disponible para desenlaces binarios
- Muestra "—" para desenlaces continuos

#### 5. Potencia Post-Hoc

- **Fórmula**: Basada en el efecto observado y los tamaños de muestra
- **⚠️ ADVERTENCIA IMPORTANTE**: Esta métrica es una transformación directa del p-valor observado (Hoenig & Heisey, 2001). Un p-valor significativo **siempre** producirá potencia > 50%. No aporta información independiente.
- Se muestra con advertencia visual permanente
- Para planificación de estudios futuros, use la curva de potencia a priori del Módulo 2

#### 6. Índice de Fragilidad

- **Método**: Iterativo — reclasifica eventos uno a uno hasta que p ≥ 0.05
- **Referencia**: Walsh et al. (2014)
- **Interpretación del color**:
  - 🔴 Rojo (≤ 3): Resultado muy frágil
  - 🟡 Ámbar (4–8): Resultado moderadamente frágil
  - 🟢 Verde (> 8): Resultado relativamente robusto
- Solo disponible para desenlaces binarios

---

### 4.8 Tabla de comparación

Tabla detallada que compara cada parámetro reportado con su valor calculado:

| Columna | Descripción |
|---------|-------------|
| **Parámetro** | Nombre de la métrica (OR, IC inferior, IC superior, p-valor) |
| **Reportado** | Valor según la publicación |
| **Calculado** | Valor recalculado por la herramienta |
| **Diferencia** | Diferencia absoluta o relativa |
| **Tolerancia** | Umbral de variabilidad aceptable entre métodos |
| **Estado** | "Consistente" (verde) o "Inconsistente" (rojo) |

#### Tolerancias aplicadas

| Parámetro | Tolerancia | Justificación |
|-----------|------------|---------------|
| OR | ±15% relativo | Variabilidad esperada entre métodos (Wald, exacto, perfil) |
| IC 95% (ambos límites) | ±0.3 absoluto | Diferencias entre métodos de cálculo del IC |
| p-valor | ±0.5 en escala log₁₀ | Sensibilidad a métodos diferentes (χ², Fisher, regresión) |
| Dif. medias | ±0.3 absoluto | Redondeo y métodos de ajuste |
| p-valor (continuo) | ±0.02 absoluto | Diferencias t-test vs z-test |

---

### 4.9 Gráficos generados

#### Gráfico 1: Efecto — Reportado vs Calculado

- **Tipo**: Barras agrupadas verticales
- **Contenido**: Tres pares de barras (medida de efecto, IC inferior, IC superior)
- **Colores**: Azul = reportado, Naranja = calculado
- **Propósito**: Visualizar rápidamente las discrepancias

#### Gráfico 2: Diagrama de Efecto con IC 95%

- **Tipo**: Barras horizontales con líneas de error
- **Contenido**: Dos barras separadas (reportado arriba, calculado abajo)
- **Características**:
  - Líneas horizontales representan los intervalos de confianza
  - Marcadores de diamante en el punto estimado
  - Caps (terminaciones verticales) en los extremos del IC
  - **Línea roja punteada**: Valor de nulidad (OR = 1 para binario, Dif = 0 para continuo)
- **Las barras NO están superpuestas**: Se visualizan claramente por separado

#### Gráfico 3: p-valores — Reportado vs Calculado

- **Tipo**: Barras verticales
- **Escala**: Propia, independiente de las medidas de efecto
- **Colores**:
  - Verde si p < 0.05 (significativo)
  - Rojo si p ≥ 0.05 (no significativo)
- **Línea roja punteada**: Umbral α = 0.05
- **Propósito**: Comparar p-valores sin contaminar con otras escalas

---

### 4.10 Alertas e interpretación

Las alertas aparecen como banners coloreados encima de las métricas:

| Tipo | Color | Significado | Ejemplo |
|------|-------|-------------|---------|
| **Error** | 🔴 Rojo | Inconsistencia grave | "OR reportado difiere del calculado en 25%" |
| **Advertencia** | 🟡 Ámbar | Posible inconsistencia o limitación | "Celda mínima = 3, aproximaciones poco fiables" |
| **Éxito** | 🟢 Verde | Valor consistente | "OR consistente: 1.5 vs 1.5 (dif. 0%)" |
| **Información** | 🔵 Azul | Nota contextual | "Cohen's d = 0.42 (medio)" |

#### Detecciones automáticas

La herramienta detecta automáticamente:

1. **Discrepancia OR/RR**: Si el OR reportado coincide mejor con el RR calculado (confusión frecuente en publicaciones)
2. **Cambio de significancia**: Si el p-valor reportado y calculado caen en lados opuestos de α = 0.05
3. **Muestras pequeñas**: Advierte cuando celdas < 5 hacen poco fiables las aproximaciones asintóticas
4. **Fragilidad alta**: Resultados que pierden significancia con ≤ 3 reclasificaciones de eventos
5. **Corrección de Yates**: Informa cuando se aplica y su efecto conservador

---

## 5. Módulo 2: Sensibilidad Inferencial

Este módulo permite explorar cómo cambia la conclusión del ensayo bajo diferentes supuestos metodológicos y tamaños de muestra.

### 5.1 Parámetros configurables

#### Sliders (controles deslizantes)

| Parámetro | Rango | Default | Descripción |
|-----------|-------|---------|-------------|
| **Riesgo Relativo (RR) observado** | 0.5 – 3.0 | 1.50 | Efecto del tratamiento sobre el control |
| **Riesgo basal (control)** | 5% – 80% | 0.20 | Proporción de eventos en el grupo control |
| **Factor dilución ITT** | 50% – 100% | 0.85 | Reducción del efecto por no-adherencia en ITT |

> Los valores se actualizan en la etiqueta azul junto al slider mientras lo mueve.

#### Selectores

| Parámetro | Opciones | Default | Descripción |
|-----------|----------|---------|-------------|
| **Nivel α** | 0.01, 0.025, 0.05, 0.10 | 0.05 | Umbral de significancia estadística |
| **Tipo de análisis** | ITT, PP | ITT | Intención de tratar vs Por protocolo |
| **Framework de prueba** | Superioridad, No-inferioridad | Superioridad | Hipótesis que se evalúa |

#### Relación entre parámetros

- **ITT + Dilución**: En análisis ITT, el efecto se reduce multiplicando `(RR - 1) × factor_dilución + 1`. Esto simula la dilución por no-adherencia.
- **PP**: Usa el RR completo sin dilución.
- **Superioridad**: Evalúa si el tratamiento es mejor que el control (p bilateral < α).
- **No-inferioridad**: Evalúa si el límite superior del IC del RR es menor que el margen δ.

#### Botones

| Botón | Función |
|-------|---------|
| **Generar Análisis** | Calcula y muestra todos los resultados |
| **Cargar Ejemplo** | Establece valores predeterminados y ejecuta |

> **Comportamiento inteligente**: Los sliders y selectores solo actualizan los gráficos si ya se ejecutó un análisis previo. Mover los controles antes de presionar "Generar Análisis" no dispara cálculos.

---

### 5.2 Mapa de Robustez (Heatmap)

#### Estructura

- **Filas**: Tamaños de muestra por brazo (30, 50, 75, 100, 150, 200, 300, 500)
- **Columnas**: Valores de δ — efecto mínimo o margen de no-inferioridad (1.0, 1.1, 1.15, 1.2, 1.25, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0)
- **Total**: 88 combinaciones evaluadas

#### Código de colores

| Color | Etiqueta | Significado |
|-------|----------|-------------|
| 🟢 Verde | "Sig" / "NI" | Resultado favorable (significativo o no-inferior) |
| 🟡 Ámbar | "Bord" | Resultado borderline (cercano al umbral) |
| 🔴 Rojo | "NS" / "Falla" | Resultado no favorable |

#### Tooltips interactivos

Pase el cursor sobre cualquier celda para ver detalles:

**Superioridad:**
```
n=100, δ=1.3
p_sup=0.0023
Pot=85%
Significativo
```

**No-inferioridad:**
```
n=100, δ=1.3
RR_sup=1.24
IC=[0.98, 1.24]
No-inferior ✓
```

#### Indicador de estabilidad global

Debajo del heatmap se muestra:
- **Porcentaje de estabilidad**: Proporción de celdas favorables sobre el total
- **Código de color**: Verde (>60%), Ámbar (30–60%), Rojo (<30%)
- **Detalles**: Conteo de celdas, RR efectivo, tipo de análisis y framework

---

### 5.3 Curva de Potencia

- **Tipo**: Gráfico de línea con área sombreada
- **Eje X**: Tamaño de muestra por brazo (20 a 500)
- **Eje Y**: Potencia estadística (0% a 100%)
- **Línea roja punteada**: Umbral del 80% (estándar regulatorio)
- **⚠️ IMPORTANTE**: Esta es potencia **a priori** — usa el efecto ESPECIFICADO por el usuario, NO el efecto observado. Es la potencia correcta para planificación de estudios.

#### Lectura del gráfico

- Busque el punto donde la curva cruza la línea del 80%
- El valor de n en ese punto es el tamaño muestral mínimo recomendado
- Curvas más empinadas = el efecto es más fácil de detectar

---

### 5.4 Gráfico de Conclusión vs Tamaño Muestral

Este gráfico cambia según el framework seleccionado:

#### Framework: Superioridad

- **Título**: "p-valor de Superioridad vs N"
- **Eje X**: Tamaño de muestra por brazo
- **Eje Y**: p-valor (0 a 1)
- **Línea roja punteada**: Umbral α
- **Lectura**: El punto donde la curva cruza α hacia abajo es el n mínimo para significancia

#### Framework: No-Inferioridad

- **Título**: "Límite Superior IC vs Margen δ"
- **Eje X**: Margen δ (1.0 a 2.0)
- **Eje Y**: Valor de RR
- **Línea azul**: Límite superior del IC 95% del RR (fija para n=100)
- **Línea roja punteada**: Diagonal δ = y (umbral de no-inferioridad)
- **Lectura**: La no-inferioridad se demuestra cuando la línea azul está por debajo de la roja

---

### 5.5 Interpretación del Análisis

Al final de los resultados se muestra un panel interpretativo con:

1. **Nivel de estabilidad**: ALTA (>70%), MODERADA (40–70%), BAJA (<40%)
2. **Resumen del análisis**: ITT vs PP con explicación de implicaciones
3. **Resumen del framework**: Superioridad vs No-inferioridad con hipótesis
4. **Nota interpretativa**: Guía sobre qué significan los porcentajes

---

## 6. Módulo 3: Metodología y Limitaciones

### Secciones incluidas

#### Fórmulas Utilizadas

Documentación completa de cada fórmula empleada:
- Odds Ratio
- Error estándar del ln(OR) — Método de Woolf
- IC 95% del OR (Wald)
- Chi-cuadrado (1 gl)
- NNT
- Índice de Fragilidad

#### Limitaciones Conocidas

Lista exhaustiva de lo que la herramienta **no** puede hacer:
- Solo 2 brazos
- Sin corrección por multiplicidad
- IC Wald con cobertura sub-óptima en muestras pequeñas
- Aproximación normal (no exacta)
- Potencia post-hoc como función del p-valor
- Sin time-to-event (Hazard Ratios)
- Sin análisis bayesiano
- Fragilidad simplificada (una sola dirección)

#### Cuándo NO Usar Esta Herramienta

Situaciones en las que la herramienta es inapropiada:
- Decisiones regulatorias de aprobación
- Único método de verificación de integridad
- Datos con estructura compleja
- Sustituto de auditorías formales con IPD
- Meta-análisis

#### Referencias Bibliográficas

Lista completa de fuentes académicas.

#### Changelog

Historial detallado de cambios entre versiones.

---

## 7. Exportación de Resultados

### Botón "Exportar CSV"

Ubicado en la cabecera superior derecha. Genera un archivo `ClinTrialSuite_v3_resultados.csv` que incluye:

#### Contenido del CSV

```
ClinTrialSuite v3.0 - Exportación
Generado, [fecha y hora]

MÓDULO 1: AUDITORÍA ESTADÍSTICA
Parámetro,Reportado,Calculado,Diferencia,Tolerancia,Estado
[tabla de comparación completa]

NNT, [valor]
Potencia Post-Hoc, [valor]
Fragilidad, [valor]

MÓDULO 2: SENSIBILIDAD INFERENCIAL
[resumen de estabilidad]
RR, [valor]
Riesgo basal, [valor]
Alpha, [valor]
Análisis, [ITT/PP]
Framework, [superioridad/no-inferioridad]
Dilución ITT, [valor]
```

### Notas sobre exportación

- El archivo usa codificación UTF-8 con BOM para compatibilidad con Excel en español
- Los valores con comas internas se sustituyen por punto y coma
- Solo se exportan datos de módulos que hayan sido ejecutados
- Los gráficos no se exportan (solo datos numéricos)

---

## 8. Ejemplos de Uso Paso a Paso

### 8.1 Ejemplo 1: Auditoría de un ensayo con desenlace binario

**Escenario**: Un artículo publica un ensayo de dos brazos comparando un nuevo fármaco vs placebo para prevención de eventos cardiovasculares.

**Datos reportados**:
- Tratamiento: 50 pacientes, 30 eventos
- Control: 50 pacientes, 20 eventos
- OR reportado: 1.5, IC 95% [1.1 – 1.9], p = 0.045

**Pasos**:

1. Abra ClinTrialSuite en el navegador
2. Asegúrese de estar en **Módulo 1** y seleccione **"Desenlace Binario"**
3. Ingrese los datos:
   - Brazo Tratamiento: n = 50, Eventos = 30
   - Brazo Control: n = 50, Eventos = 20
4. En "Valores Reportados":
   - OR = 1.5, IC Inferior = 1.1, IC Superior = 1.9, p-valor = 0.045
5. Haga clic en **"Ejecutar Auditoría"**

**Qué buscar en los resultados**:
- ¿El OR calculado coincide con 1.5?
- ¿El IC calculado coincide con [1.1 – 1.9]?
- ¿El p-valor calculado coincide con 0.045?
- ¿El índice de fragilidad es preocupantemente bajo?

> **Atajo**: Haga clic en "Ejemplo Binario" para cargar estos datos automáticamente.

---

### 8.2 Ejemplo 2: Auditoría de un ensayo con desenlace continuo

**Escenario**: Ensayo clínico que compara un analgésico vs placebo, midiendo reducción del dolor en escala numérica.

**Datos reportados**:
- Tratamiento: n = 50, media = 12.5, DE = 4.2
- Control: n = 50, media = 10.8, DE = 3.9
- Diferencia reportada: 1.7, IC 95% [0.1 – 3.3], p = 0.038

**Pasos**:

1. Seleccione **"Desenlace Continuo"**
2. Ingrese los datos de ambos brazos
3. Ingrese los valores reportados
4. Haga clic en **"Ejecutar Auditoría"**

**Qué buscar**:
- ¿La diferencia de medias calculada (12.5 - 10.8 = 1.7) coincide?
- ¿El Cohen's d indica un tamaño de efecto clínicamente relevante?
- ¿El IC calculado es compatible con el reportado?

> **Atajo**: Haga clic en "Ejemplo Continuo" para cargar estos datos automáticamente.

---

### 8.3 Ejemplo 3: Análisis de sensibilidad de superioridad

**Escenario**: Quiere explorar cuán robusto es un resultado de superioridad con RR = 1.5 y riesgo basal del 20%.

**Pasos**:

1. Cambie a **Módulo 2**
2. Configure:
   - RR = 1.50 (slider)
   - Riesgo basal = 0.20 (slider)
   - α = 0.05
   - Framework = Superioridad
   - Análisis = ITT
   - Dilución = 0.85
3. Haga clic en **"Generar Análisis"**

**Qué buscar**:
- En el **heatmap**: ¿A partir de qué n las celdas son consistentemente verdes?
- En la **curva de potencia**: ¿Con qué n se alcanza 80% de potencia?
- En el **gráfico p vs n**: ¿A partir de qué n se cruza α = 0.05?
- **Estabilidad global**: ¿Es > 70% (alta)?

> **Atajo**: Haga clic en "Cargar Ejemplo" para configurar y ejecutar automáticamente.

---

### 8.4 Ejemplo 4: Análisis de no-inferioridad

**Escenario**: Quiere evaluar si un genérico es no-inferior al original con margen δ = 1.3.

**Pasos**:

1. En Módulo 2, cambie Framework a **"No-inferioridad"**
2. Ajuste RR cerca de 1.0 (el genérico debería ser similar)
3. Observe:
   - En el heatmap: celdas verdes ("NI") indican combinaciones donde se demuestra no-inferioridad
   - En el gráfico IC vs δ: la línea azul (IC superior) debe estar por debajo de la roja (δ)

---

## 9. Glosario de Términos

| Término | Definición |
|---------|------------|
| **α (alfa)** | Probabilidad de error tipo I. Umbral para declarar significancia estadística. Convencionalmente 0.05. |
| **ARD** | Absolute Risk Difference. Diferencia absoluta de riesgos: p₁ - p₂. |
| **Chi-cuadrado (χ²)** | Test estadístico para asociación entre variables categóricas. Aquí se usa con 1 grado de libertad para tablas 2×2. |
| **Cohen's d** | Tamaño de efecto estandarizado para desenlaces continuos. Pequeño (<0.2), medio (0.5), grande (>0.8). |
| **Corrección de Haldane** | Suma de 0.5 a todas las celdas de una tabla 2×2 cuando alguna celda = 0. Permite el cálculo del OR. |
| **Corrección de Yates** | Corrección de continuidad para el test χ² que reduce el estadístico y produce p-valores más conservadores. |
| **DE / SD** | Desviación Estándar. Medida de dispersión de los datos alrededor de la media. |
| **δ (delta)** | Margen de no-inferioridad. Diferencia máxima aceptable para declarar que un tratamiento no es peor que el comparador. |
| **IC 95%** | Intervalo de Confianza al 95%. Rango de valores que, con 95% de confianza, contiene el verdadero valor del parámetro. |
| **Índice de Fragilidad** | Número mínimo de eventos que, al reclasificarse, harían perder la significancia estadística. Valores bajos (≤3) indican fragilidad. |
| **IPD** | Individual Patient Data. Datos individuales de cada participante (vs datos agregados/resumidos). |
| **ITT** | Intention-to-Treat. Análisis que incluye a todos los participantes aleatorizados, independientemente de la adherencia al protocolo. |
| **NI** | No-Inferioridad. Diseño de ensayo que busca demostrar que un tratamiento no es peor que el comparador por más que un margen δ. |
| **NNT** | Number Needed to Treat. Número de pacientes que deben recibir el tratamiento para prevenir un evento adicional. |
| **NNTH** | Number Needed to Harm. NNT negativo: número de pacientes tratados para causar un evento adverso adicional. |
| **OR** | Odds Ratio. Cociente de odds entre dos grupos. OR > 1 indica mayor probabilidad en el grupo de tratamiento. |
| **PP** | Per Protocol. Análisis que incluye solo a los participantes que completaron el protocolo según las reglas definidas. |
| **Potencia (1-β)** | Probabilidad de detectar un efecto real cuando existe. El estándar regulatorio es ≥ 80%. |
| **Potencia post-hoc** | Potencia calculada con el efecto observado. Es una función directa del p-valor y no aporta información independiente. |
| **RR** | Risk Ratio (Riesgo Relativo). Cociente de proporciones entre dos grupos. |
| **SE** | Standard Error (Error Estándar). Medida de la precisión de una estimación. |
| **Superioridad** | Diseño de ensayo que busca demostrar que un tratamiento es mejor que el comparador. |
| **Tabla 2×2** | Tabla de contingencia con 2 filas (tratamiento/control) y 2 columnas (evento/no-evento). Base del cálculo de OR, RR y χ². |
| **Wald** | Método de aproximación para intervalos de confianza basado en la distribución normal asintótica. |

---

## 10. Preguntas Frecuentes (FAQ)

### ¿Por qué el OR que calcula la herramienta no coincide con el de mi artículo?

Posibles razones:
1. **Método de cálculo diferente**: La herramienta usa OR crudo de tabla 2×2. Los artículos frecuentemente reportan OR ajustado por covariables (regresión logística).
2. **Confusión OR/RR**: Es un error frecuente en publicaciones. La herramienta lo detecta automáticamente.
3. **Datos incompletos**: Si faltan datos o hay exclusiones, los números de la tabla 2×2 pueden diferir.
4. **Diferentes definiciones de evento**: Verifique que la definición del evento sea la misma.

### ¿Cuándo debo activar la corrección de Yates?

Active la corrección cuando alguna celda de la tabla 2×2 tenga menos de 5 observaciones. En la práctica, para celdas < 40 ya puede considerarse. Con muestras muy pequeñas (celdas < 5), es preferible usar el test exacto de Fisher (no disponible en esta herramienta).

### ¿La potencia post-hoc del Módulo 1 es útil?

**No para tomar decisiones.** Es una transformación directa del p-valor: si p < 0.05, la potencia será > 50%; si p < 0.01, será aún mayor. No aporta información nueva. Se incluye solo como indicador pedagógico con advertencia explícita.

### ¿Qué diferencia hay entre la potencia del Módulo 1 y la del Módulo 2?

| | Módulo 1 | Módulo 2 |
|---|---------|---------|
| Tipo | Post-hoc | A priori |
| Basada en | Efecto observado | Efecto especificado por el usuario |
| Útil para | Nada (es falacia) | Planificación de estudios futuros |
| Referencia | Hoenig & Heisey (2001) | Cálculo de muestra estándar |

### ¿Qué significan los colores del heatmap?

- 🟢 **Verde**: La combinación de n y δ produce un resultado favorable (significativo en superioridad, o no-inferior en NI).
- 🟡 **Ámbar**: Resultado borderline — cercano al umbral pero sin cruzarlo.
- 🔴 **Rojo**: Resultado no favorable — no se puede demostrar la hipótesis con esa combinación.

### ¿Por qué algunos p-valores son diferentes en la columna "Calculado"?

El p-valor depende del test estadístico. La herramienta usa χ² (con o sin Yates). Los artículos pueden haber usado:
- Regresión logística (OR ajustado)
- Test exacto de Fisher
- Test de Cochran-Mantel-Haenszel
- Modelos mixtos

Cada método produce p-valores ligeramente distintos.

### ¿Puedo usar esta herramienta para meta-análisis?

**No.** La herramienta analiza un solo estudio a la vez. Un meta-análisis requiere modelos de efectos fijos o aleatorios, evaluación de heterogeneidad (I², Q de Cochran), y gráficos de funnel plot. Use software especializado (RevMan, R/metafor, Stata).

### ¿Los datos ingresados se envían a algún servidor?

**No.** Todo el procesamiento es local en su navegador. Ningún dato sale de su computadora. El archivo HTML es completamente autónomo (excepto las librerías CDN que se cargan al abrir la página).

---

## 11. Limitaciones Conocidas

### Limitaciones estadísticas

| Limitación | Impacto | Alternativa recomendada |
|------------|---------|-------------------------|
| Solo 2 brazos | No soporta ensayos multi-brazo, factoriales ni crossover | Software especializado (SAS, R) |
| Sin corrección por multiplicidad | No ajusta por comparaciones múltiples | Aplicar Bonferroni, Holm o FDR manualmente |
| IC Wald | Cobertura sub-óptima con n < 30 o proporciones extremas | IC de perfil de verosimilitud o exacto |
| Aproximación normal | Inexacta para muestras muy pequeñas | Test exacto de Fisher |
| Sin time-to-event | No soporta HR, KM, sobrevida | R/survival, SAS PROC LIFETEST |
| Sin análisis bayesiano | Todo es frecuentista | R/brms, Stan, JAGS |
| Fragilidad unidireccional | Solo reclasifica en una dirección | Implementación completa bidireccional |
| Sin ajuste por covariables | OR/RR crudos solamente | Regresión logística/lineal |

### Limitaciones técnicas

| Limitación | Detalle |
|------------|---------|
| Requiere internet | Para cargar CDN de Tailwind, Chart.js, Fonts |
| Sin persistencia | Los datos se pierden al cerrar/recargar |
| Export limitado | Solo CSV, no PDF ni imágenes |
| Sin tests automáticos | El código no tiene suite de testing |
| Precisión numérica | JavaScript usa IEEE 754 double (15-16 dígitos significativos) |

---

## 12. Referencias Bibliográficas

1. **Walsh M, et al. (2014)**. The statistical significance of randomized controlled trial results is frequently fragile: a case for a Fragility Index. *Journal of Clinical Epidemiology*, 67(6), 622-628.

2. **Hoenig JM, Heisey DM (2001)**. The abuse of power: the pervasive fallacy of power calculations for data analysis. *The American Statistician*, 55(1), 19-24.

3. **Agresti A (2002)**. *Categorical Data Analysis*. 2nd ed. Wiley.

4. **Altman DG (1998)**. Confidence intervals for the number needed to treat. *BMJ*, 317(7168), 1309-1312.

5. **Abramowitz M, Stegun IA (1964)**. *Handbook of Mathematical Functions with Formulas, Graphs, and Mathematical Tables*. National Bureau of Standards. [Algoritmo normalCDF utilizado en la herramienta]

6. **Woolf B (1955)**. On estimating the relation between blood group and disease. *Annals of Human Genetics*, 19(4), 251-253. [Método SE del ln(OR)]

7. **ICH E9 (1998)**. Statistical Principles for Clinical Trials. International Council for Harmonisation.

8. **FDA Guidance (2016)**. Non-Inferiority Clinical Trials to Establish Effectiveness.

---

## 13. Aviso Legal y Regulatorio

> **ClinTrialSuite v3.0** es una herramienta de carácter exclusivamente **educativo y exploratorio**.

### No debe utilizarse para:

- ❌ Tomar decisiones regulatorias de aprobación, rechazo o modificación de medicamentos
- ❌ Sustituir revisiones estadísticas formales con acceso a datos individuales (IPD)
- ❌ Reemplazar software certificado y validado (SAS, R validado, Stata)
- ❌ Emitir juicios definitivos sobre la integridad de datos de un ensayo clínico
- ❌ Realizar auditorías regulatorias oficiales

### Puede utilizarse para:

- ✅ Formación en bioestadística y lectura crítica de artículos
- ✅ Screening rápido de consistencia como paso previo a revisión profunda
- ✅ Exploración pedagógica de conceptos (fragilidad, potencia, NNT)
- ✅ Sensibilización sobre la robustez de conclusiones estadísticas
- ✅ Preparación de preguntas informadas para comités de revisión

### Precisión de los cálculos

Todos los cálculos están basados en **aproximaciones asintóticas** (distribución normal). Para decisiones críticas, los resultados deben validarse con software certificado y métodos exactos cuando sea apropiado.

---

*Manual actualizado para ClinTrialSuite v3.0*
*Última revisión: 2025*
