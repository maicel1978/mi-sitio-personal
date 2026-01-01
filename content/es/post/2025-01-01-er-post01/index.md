---
title: "El Frankenstein Metodológico: La Bestia Silenciosa en los Ensayos Clínicos"
subtitle: "Cómo Protocolos Impecables Generan Evidencia Frágil y Decisiones Erróneas"
summary: "En los ensayos clínicos, un análisis correcto puede ocultar evidencia falsa si la pregunta clínica no se alinea con los estimandos reales. Exploramos este monstruo con un caso simulado en R."
author: "admin"
date: "2025-12-31"
categories: ["Evaluación Regulatoria"]
tags:
  - "evaluacion-regulatoria"
  - "ensayos-clínicos"
  - "simulacion-R"
  - "sesgo-ensayos"
slug: "er-01"
featured: true
draft: false
share: true
commentable: true
show_related: true
show_breadcrumb: true
type: post
---

## Introducción

Abres un informe de estudio clínico (CSR) o un artículo en *The Lancet* y todo brilla: estructura impecable, tablas claras, variables bien definidas y un plan de análisis estadístico (SAP) que parece inquebrantable.

Pero, debajo de esa fachada, a veces acecha el **Frankenstein metodológico**: piezas técnicamente correctas que, al ensamblarse, terminan respondiendo una pregunta que nadie formuló de manera explícita.

No es un error de principiante. Es un problema sistémico: la fricción entre la intención clínica y la realidad operativa del estudio.

Casos históricos como rofecoxib (Vioxx) recuerdan que un programa de ensayos puede presentar resultados convincentes en un aspecto y, al mismo tiempo, subestimar riesgos relevantes. Más allá del caso concreto, la lección general es clara: un informe puede ser “correcto” en lo técnico y, aun así, conducir a una lectura equivocada si la pregunta, los datos y el análisis no están alineados.

El núcleo del problema no es que “los números estén mal”, sino que **la señal estadística puede quedar desconectada del sentido clínico**. Y entonces la historia se sostiene en el papel, pero se desmorona cuando hay que tomar decisiones.


---

## Qué es el Frankenstein metodológico

Llamo **Frankenstein metodológico** a esta situación:

> El protocolo promete responder una pregunta clínica, pero el análisis final termina estimando otro efecto con implicaciones causales distintas (por cómo se manejan abandonos, tratamientos de rescate, cambios de tratamiento y datos faltantes), sin explicitarlo con claridad.

No es necesariamente fraude, ni siempre mala práctica individual. A menudo es el resultado de procesos bien intencionados que pierden coherencia entre etapas.

Suele aparecer cuando confluyen tres elementos:

1. **Promesa inicial:** el protocolo define la pregunta clínica y la operacionaliza mediante *estimandos* (según ICH E9(R1)).  
2. **Fricción inevitable:** desviaciones, pérdidas de seguimiento y **sucesos intercurrentes** (por ejemplo, discontinuación, rescate, cambio de tratamiento) alteran el escenario previsto.  
3. **Presentación confusa:** el informe conserva etiquetas (por ejemplo, «intención de tratar») aunque el análisis, en la práctica, esté estimando algo distinto, sin suficiente transparencia.

---

## Génesis del Monstruo: De la Teoría a la Tragedia


### 1. Traducción Traicionera: Clínica vs. Operacional


Los clínicos piensan en fenómenos (“mejorar la calidad de vida”, “reducir exacerbaciones”, “prolongar la supervivencia”), mientras que los equipos estadísticos necesitan variables medibles, reglas de medición y decisiones claras ante eventos que interrumpen el curso ideal del tratamiento.

Si ese diálogo no se cierra, el resultado es previsible: la pregunta clínica y el efecto que se termina estimando se separan. Un ejemplo típico es tratar la supervivencia libre de progresión como si fuera inmune a discontinuaciones por toxicidad o a tratamientos posteriores, cuando esos sucesos pueden sesgar la interpretación.

**Recomendación:** define explícitamente, en lenguaje operativo, los cuatro componentes del estimando: población, variable, manejo de sucesos intercurrentes y medida resumen, conforme a ICH E9(R1).


### 2. Etiquetas como Armadura Falsa

La expresión **«análisis por intención de tratar» (ITT)** evoca rigor, pero una etiqueta no sustituye una definición.

En ensayos aleatorizados, ITT suele entenderse como “analizar según el grupo asignado al azar”, porque la aleatorización es la protección causal. En estudios no aleatorizados o de un solo brazo, esa protección no existe; usar «ITT» sin aclarar qué significa (y qué se hizo con abandonos, cambios de tratamiento o faltantes) puede inducir a error.

El problema central no es usar siglas, sino usarlas para evitar preguntas incómodas: ¿quién entró al análisis, bajo qué reglas, y qué supuestos sostienen la estimación?


### 3. Señal estadística frente a relevancia clínica

Un valor de *p* menor que 0,05 no es sinónimo de “impacto clínico”.

Es frecuente confundir significación estadística con relevancia clínica: se detecta un efecto, pero no se responde si ese efecto cambia decisiones. Por eso es preferible reportar magnitudes interpretables (por ejemplo, diferencias absolutas de riesgo, cocientes de riesgos, NNT) y contextualizar el balance entre beneficios, riesgos y cargas.

Además, cuando hay una proporción importante de datos faltantes (sobre todo si está desbalanceada entre brazos), la conclusión puede volverse muy dependiente de supuestos. En ese escenario, los análisis de sensibilidad dejan de ser un “extra” y se convierten en parte esencial de la evidencia.


---

## Anatomía del Frankenstein: etapas críticas


- **Planificación (la ilusión):** el protocolo promete un estimando (por ejemplo, bajo una estrategia tipo “política de tratamiento”), pero no define con precisión qué ocurrirá ante sucesos intercurrentes y faltantes.  
- **Ejecución (el caos):** pérdidas de seguimiento y faltantes cuyo mecanismo no es aleatorio distorsionan lo que realmente se observa.  
- **Presentación (la confusión):** el informe declara “éxito” sin mostrar con claridad la distancia entre lo planificado y lo efectivamente estimado.

**Recomendación práctica:** audita la robustez con análisis de sensibilidad. Modifica supuestos plausibles sobre datos faltantes y sucesos intercurrentes y verifica si la conclusión se mantiene.


---

## Caso práctico en R: Datos faltantes que revelan el monstruo

Simulamos un ensayo con desenlace binario (éxito/fracaso):

- 60 % de éxito en el grupo control,  
- 65 % de éxito en el grupo de tratamiento.

Introducimos **datos faltantes no al azar**: en el grupo de tratamiento, quienes no responden tienen mayor probabilidad de abandonar. El objetivo no es recomendar métodos, sino mostrar cómo decisiones analíticas distintas generan historias distintas si no se explicitan supuestos.



|estrategia           | controles| tratados| diferecia|
|:--------------------|---------:|--------:|---------:|
|Solo casos completos |      0.63|     0.75|      0.12|
|Imputación simplista |      0.67|     0.80|      0.13|
|Escenario pesimista  |      0.67|     0.60|     -0.07|

---

### Un gráfico, tres narrativas


<img src="{{< blogdown/postref >}}index_files/figure-html/grafico_faltantes-1.png" width="672" />

Con el mismo conjunto de datos, el análisis “solo casos completos” puede exagerar el beneficio, mientras que un escenario pesimista puede invertirlo. El punto central es este: **cada forma de manejar los faltantes introduce supuestos** y, en la práctica, puede acercarte o alejarte de la pregunta clínica original.


---


## Lista de verificación: cómo cazar al monstruo

1. **¿Coincide la pregunta clínica con el efecto objetivo (estimando) y con lo que realmente se estima en el análisis?**  
2. **¿Las etiquetas (por ejemplo, «ITT») están definidas con reglas operativas claras y conteos verificables?**  
3. **¿El manejo de sucesos intercurrentes está especificado (y no “resuelto” a posteriori)?**  
4. **¿Hay análisis de sensibilidad para datos faltantes y supuestos críticos?**  
5. **¿Se reporta relevancia clínica (por ejemplo, DMCI, diferencias absolutas, NNT) además de significación estadística?**  
6. **¿La conclusión depende de decisiones analíticas poco transparentes presentadas como detalles menores?**

Si la respuesta es “no” en dos o más, no basta con “mejorar el reporte”: hay que replantear el diseño o, al menos, el marco de inferencia.


---

## Conclusión: domar al Frankenstein para producir evidencia robusta

La evidencia clínica rara vez colapsa por errores burdos. Más a menudo se debilita por incoherencias elegantes: un protocolo que promete una cosa, una ejecución que fuerza concesiones y un informe que no explicita cómo esas concesiones cambiaron la pregunta.

Un buen antídoto combina:

- alineación rigurosa entre pregunta clínica, estimando y análisis;  
- transparencia sobre datos faltantes y sucesos intercurrentes;  
- un cambio de enfoque: de “estadística como fin” a “estadística como herramienta para decidir”.

Leer ICH E9(R1), hacer pilotos internos y entrenar a los equipos en trazabilidad inferencial ayuda a que el ensayo responda, de verdad, la pregunta que importa.

¿Tu estudio resiste esta auditoría? Si no, mejor detectarlo hoy que defenderlo mañana.

---

## Cuéntame tu caso (sin datos sensibles)

**Una sola pregunta (y por qué importa)**

Si este post te resultó incómodo, probablemente ya viste un Frankenstein metodológico en la práctica.

La pregunta clave es esta:

>¿En qué punto de tu estudio la pregunta clínica dejó de coincidir con lo que realmente se estaba estimando?

No hace falta que respondas todo. Con un solo punto mal alineado basta para que el monstruo aparezca.

**Si quieres concretar (opcional)**

Si te resulta más fácil, puedes responder usando uno o dos de estos ítems.
No es un cuestionario: es una guía para pensar con claridad.

Área terapéutica o tipo de estudio:

Qué se prometía responder en el protocolo (1 frase):

Qué terminó estimándose en la práctica:

El suceso intercurrente que más distorsionó la inferencia
(abandono, rescate, cambio de tratamiento, faltantes, otro):

Dónde nació el problema: diseño / ejecución / análisis / reporte

No incluyas datos sensibles ni identificables.

**¿Qué haré con estos comentarios?**

Los usaré (anonimizados) para detectar patrones reales, no ejemplos de manual.

Algunos casos se transformarán en:

nuevos posts técnicos,

ejemplos comparativos,

o capítulos del libro (si el patrón lo justifica).

No responderé con “opiniones generales”, sino con una observación metodológica concreta cuando sea pertinente.

**Nota práctica**

Si comentar en el blog te resulta incómodo, puedes dejar tu respuesta en LinkedIn.
Yo me encargo de traer la discusión de vuelta al sistema.

---

## Suscripción: 

[**Suscríbete a bioestadísticaedu**]({{< relref "/subscribe/" >}}) y recibe directamente en tu bandeja de entrada:

- Caja de Herramientas Anti‑Frankenstein

---

## Bibliografía

- International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use (ICH). ICH E9 (R1) addendum on estimands and sensitivity analysis in clinical trials to the guideline on statistical principles for clinical trials. Geneva: ICH; 2019. Available from: https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf

- Kahan BC, Morris TP, White IR, Carpenter J. The estimands framework: a primer on the ICH E9(R1) addendum. BMJ. 2024;384:e076316. doi:10.1136/bmj-2023-076316. Available from: https://www.bmj.com/content/384/bmj-2023-076316

- Cro S, Morris TP, Kenward MG, Carpenter JR. Choosing Estimands in Clinical Trials: Putting the ICH E9(R1) Into Practice. Ther Innov Regul Sci. 2020;54(2):324-341. doi:10.1007/s43441-019-00061-x. Available from: https://pubmed.ncbi.nlm.nih.gov/32072573/

- Ioannidis JPA, Greenland S, Hlatky MA, et al. Methodology over metrics: current scientific standards are a disservice to patients and society. J Clin Epidemiol. 2021;138:219-226. doi:10.1016/j.jclinepi.2021.05.018. Available from: https://pubmed.ncbi.nlm.nih.gov/34077797/


- Topol EJ. Failing the public health--rofecoxib, Merck, and the FDA. N Engl J Med. 2004;351(17):1707-1709. doi:10.1056/NEJMp048286. Available from: https://www.nejm.org/doi/full/10.1056/NEJMp048286

- Krumholz HM, Ross JS, Presler AH, Egilman DS. What have we learnt from Vioxx? BMJ. 2007;334(7585):120-123. doi:10.1136/bmj.39024.487720.68. Available from: https://pubmed.ncbi.nlm.nih.gov/17235089/
