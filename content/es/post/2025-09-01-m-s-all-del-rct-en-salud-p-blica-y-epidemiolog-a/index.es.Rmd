---
title: Desvelando la Lógica Matemática Detrás de Causa y Efecto
authors: ["admin"]
date: '2025-09-01'
slug: m-s-all-del-rct-en-salud-p-blica-y-epidemiolog-a
summary: 'Este blog explora cómo la inferencia causal permite ir más allá de la correlación, aplicando "principios metodológicos" para analizar datos observacionales en salud pública. A partir del desafío de la ausencia del contrafactual, se presentan herramientas avanzadas como el Propensity Score, Diferencias-en-Diferencias y Variables Instrumentales. El enfoque es riguroso, práctico y dirigido a profesionales que buscan complementar la evidencia de los ensayos clínicos.'
categories:
  - ensayos clinicos
tags:
  - diseños alternativos
  - ensayos clínicos
  - estadística
---

# Inferencia Causal :

El **marco de resultados potenciales** se mantiene como la piedra angular del pensamiento causal, proporcionando el andamiaje conceptual para diferenciar la mera correlación de la causalidad. Ante la imposibilidad de llevar a cabo **ensayos controlados aleatorizados (RCT)**, la investigación se ha nutrido de **métodos robustos** que permiten extraer inferencias causales creíbles de datos observacionales. En este contexto, herramientas como el **Propensity Score** y los **estimadores doblemente robustos** (DR) se utilizan para controlar los sesgos de selección a partir de covariables observables, mientras que los **Efectos de Tratamiento Promedio Condicionales (CATE)**, apoyados en machine learning, permiten explorar la heterogeneidad del efecto entre subpoblaciones. Asimismo, un conjunto de estrategias cuasi-experimentales ha abierto nuevos horizontes en la investigación, incluyendo el uso de **Variables Instrumentales (IV)** para corregir la confusión no observada, el **Diferencias-en-Diferencias (DID)** y el **Control Sintético (SC)** para comparar trayectorias temporales, y la **Regresión Discontinua (RDD)** para explotar umbrales de asignación, todas ellas permitiendo identificar efectos causales en contextos donde la aleatorización no es factible.

------------------------------------------------------------------------

## 1. El desafío central: solo vemos un lado de la moneda

Imagina que quieres evaluar el impacto de una nueva política de vacunación. Para cada persona, podríamos definir dos mundos posibles: uno donde recibe la vacuna y otro donde no. Pero en la práctica solo observamos un mundo: el que ocurrió. Ese es el **“problema fundamental de la inferencia causal”**.


El **marco de resultados potenciales** formaliza esta idea:


{{< math >}}
$$
\tau_{\text{sample}} = \frac{1}{N} \sum_{i=1}^{N} (Y_i(1) - Y_i(0))
$$
{{< /math >}}


En un ensayo controlado aleatorizado (RCT), la aleatorización nos permite estimar este efecto promedio simplemente comparando medias. Pero ¿qué pasa cuando los RCT no son factibles por razones éticas, logísticas o económicas?

------------------------------------------------------------------------

## 2. Estudios observacionales: cuando no hay azar, pero sí ingenio

En contextos reales —salud pública, economía, políticas sociales— dependemos de datos observacionales. Allí, la clave es suponer que, condicional en ciertas variables previas (\$X_i\$), la asignación al tratamiento es “tan buena como aleatoria”.

-   **Propensity Score (Rosenbaum & Rubin, 1983):** condensa múltiples covariables en una única probabilidad de recibir tratamiento, facilitando el emparejamiento y la ponderación.
-   **Estimadores doblemente robustos:** combinan modelos de resultado y de asignación al tratamiento; basta con que uno esté bien especificado para obtener estimaciones consistentes.
-   **CATE (Conditional Average Treatment Effect):** con machine learning, hoy podemos explorar cómo los efectos varían entre subpoblaciones (ej. políticas de empleo más efectivas en jóvenes que en adultos mayores).

⚠️ Cuando sospechamos de confusión no observada, entran en juego **análisis de sensibilidad** (Manski bounds, métodos de Rosenbaum).

------------------------------------------------------------------------

## 3. Estrategias avanzadas cuando la confusión no puede ignorarse

### a) Variables Instrumentales (IV)

Si un confusor no observado afecta tanto al tratamiento como al resultado, un **instrumento válido** (\$Z\$) puede rescatar el análisis. Ejemplo clásico: la distancia a una universidad como instrumento para estudiar el impacto de la educación en ingresos.

Bajo ciertos supuestos, identificamos el **LATE (Local Average Treatment Effect)** para quienes cambian su estado de tratamiento debido al instrumento.

------------------------------------------------------------------------

### b) Diferencias-en-Diferencias (DID) y Control Sintético (SC)

-   **DID**: compara tendencias pre y post en grupos tratados y no tratados. Ejemplo: medir el impacto de un aumento del salario mínimo sobre el empleo.
-   **SC**: construye un “gemelo sintético” de la unidad tratada combinando unidades no tratadas. Ejemplo: evaluar el impacto de una ley antitabaco en California comparando con un control sintético formado por otros estados.

------------------------------------------------------------------------

### c) Regresión Discontinua (RDD)

Aprovecha umbrales de asignación. Ejemplo: un programa de becas asignado a estudiantes con notas ≥ 8.0. Comparar resultados justo por encima y por debajo del corte estima el efecto del programa en los “marginales”.

------------------------------------------------------------------------

## 4. Horizontes emergentes: combinar evidencia

Dos líneas prometedoras:

-   **Surrogacy:** usar resultados a corto plazo como sustitutos de resultados de largo plazo.
-   **Integración de experimentos y observacionales:** Athey et al. (2020) proponen usar experimentos para identificar y corregir confusores en estudios observacionales.

------------------------------------------------------------------------

## 📊 Tabla comparativa de métodos de inferencia causal

| Método | Supuesto clave | Ventajas | Limitaciones | Ejemplo típico |
|---------------|---------------|---------------|---------------|---------------|
| **RCT** | Asignación aleatoria | Estimador insesgado, alta validez interna | Costoso, a veces poco ético, baja validez externa | Ensayo clínico de un fármaco |
| **Propensity Score / DR** | Confusión controlada por covariables observadas | Flexibilidad, usa datos observacionales grandes | Vulnerable a confusión no observada | Impacto de programas sociales |
| **IV** | Relevancia + exclusión + exogeneidad | Corrige confusión no observada | Difícil encontrar instrumentos válidos | Educación → ingresos |
| **DID** | Tendencias paralelas | Simple, interpretable | Frágil si tendencias difieren | Políticas laborales |
| **SC** | Unidades control combinan bien la pre-tendencia | Más creíble que DID en casos individuales | Requiere datos ricos pre-tratamiento | Leyes de salud pública |
| **RDD** | Continuidad de potenciales en el umbral | Interpretación clara, diseño cuasi-experimental | Válido solo cerca del umbral | Programas de becas |

------------------------------------------------------------------------

## 5. Conclusión práctica

La inferencia causal no es una caja negra: es un conjunto de **herramientas matemáticas y conceptuales** que, bien aplicadas, permiten a responsables de políticas, clínicos y científicos sociales responder la pregunta clave: *¿qué pasaría si?*

La frontera actual está en combinar evidencia, explotar machine learning para heterogeneidad y desarrollar métodos más robustos frente a confusión no observada.

------------------------------------------------------------------------

## 📚 Referencias recomendadas

-   Rosenbaum PR, Rubin DB. *The central role of the propensity score…* Biometrika. 1983. [PubMed PMID: 12009849](https://pubmed.ncbi.nlm.nih.gov/12009849/)
-   Hernán MA, Robins JM. *Causal Inference: What If*. 2020. [PubMed PMID: 33290294](https://pubmed.ncbi.nlm.nih.gov/33290294/)
-   Imbens GW, Rubin DB. *Causal Inference for Statistics, Social, and Biomedical Sciences*. 2015.
-   Athey S, Imbens GW. *Design-based analysis in difference-in-differences settings.* J Econometrics. 2022. [PubMed PMID: 36212825](https://pubmed.ncbi.nlm.nih.gov/36212825/)
-   Abadie A. *Using synthetic controls.* J Econometrics. 2021.
