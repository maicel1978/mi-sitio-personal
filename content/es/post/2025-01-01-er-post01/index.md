---
title: "El Frankenstein Metodológico: La Bestia Silenciosa en los Ensayos Clínicos"
subtitle: "Cómo Protocolos Impecables Generan Evidencia Frágil y Decisiones Erróneas"
summary: "En los ensayos clínicos, un análisis correcto puede ocultar evidencia falsa si la pregunta clínica no se alinea con los estimandos reales. Exploramos este monstruo con un caso simulado en R."
author: "admin"
date: "2025-12-12"
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

## Caso práctico en R: faltantes que revelan el monstruo

Simulamos un ensayo con desenlace binario (éxito/fracaso):

- 60 % de éxito en el grupo control,  
- 65 % de éxito en el grupo de tratamiento.

Introducimos **datos faltantes no al azar**: en el grupo de tratamiento, quienes no responden tienen mayor probabilidad de abandonar. El objetivo no es recomendar métodos, sino mostrar cómo decisiones analíticas distintas generan historias distintas si no se explicitan supuestos.



|estrategia           | p_control| p_trat|  diff|
|:--------------------|---------:|------:|-----:|
|Solo casos completos |      0.63|   0.75|  0.12|
|Imputación simplista |      0.67|   0.80|  0.13|
|Escenario pesimista  |      0.67|   0.60| -0.07|

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

## Cierre: cuéntame tu caso (sin datos sensibles)

Si trabajas con protocolos, SAP o CSR, me interesa un ejemplo real (anónimo) para futuros posts.

Copia y pega esto en comentarios y completa lo que puedas:

- **Tipo de estudio / área terapéutica:** ___  
- **Variable principal:** ___  
- **Pregunta clínica (1 frase):** ___  
- **Estimando que se está usando (o el que debería usarse):** ___  
- **Suceso intercurrente que más te preocupa** (abandono, rescate, cambio de tratamiento, etc.): ___  
- **% de datos faltantes** (observado o esperado): ___  
- **Dónde “nace el Frankenstein” en tu caso:** (diseño / ejecución / análisis / reporte) ___  
- **Qué sensibilidad te gustaría ver sí o sí:** ___  

Responderé con una sugerencia concreta de sensibilidad o de redacción del estimando (sin asesoría clínica individual, solo enfoque metodológico).


## Suscripción: 

[**Suscríbete a bioestadísticaedu**]({{< relref "/subscribe/" >}}) y recibe directamente en tu bandeja de entrada:

- Caja de Herramientas Anti‑Frankenstein


<!-- Protocolos impecables. Análisis correctos. Conclusiones equivocadas. -->

<!-- En ensayos clínicos, el problema no siempre está en los números. -->
<!-- A veces está en la pregunta que realmente se terminó respondiendo. -->

<!-- Es posible tener: -->
<!-- – un protocolo bien escrito, -->
<!-- – un SAP formalmente correcto, -->
<!-- – valores de p convincentes, -->

<!-- y aun así generar evidencia frágil para la toma de decisiones. -->

<!-- A este fenómeno lo llamo el Frankenstein metodológico: -->
<!-- piezas técnicamente válidas que, al ensamblarse, estiman un efecto distinto del que la pregunta clínica sugería. -->

<!-- No es fraude. -->
<!-- No suele ser mala fe. -->
<!-- Es una desalineación inferencial entre intención clínica, estimando y análisis. -->

<!-- En el blog muestro: -->
<!-- – por qué ocurre (incluso en equipos experimentados), -->
<!-- – cómo las etiquetas clásicas (“ITT”, “análisis principal”) pueden ocultar supuestos críticos, -->
<!-- – y un ejemplo en R donde el mismo conjunto de datos cuenta tres historias distintas según cómo se manejen los faltantes. -->

<!-- 📌 Si tu conclusión depende más de decisiones analíticas implícitas que de la pregunta clínica original, el problema no es de reporte: es de diseño inferencial. -->

<!-- 👉 El análisis completo está aquí: -->
<!-- [https://bioestadisticaedu.com/post/er-01/] -->

<!-- ¿Tu estudio resistiría una auditoría de coherencia entre pregunta, estimando y análisis? -->
