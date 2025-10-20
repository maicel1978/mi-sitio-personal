---
title: "Cómo entrenar y validar un modelo de predicción clínica"
subtitle: "Tutorial para el desarrollo de un modelo de predicción clínica con ejemplos en R" 
summary: "Guía práctica con R para desarrollar modelos predictivos robustos en entornos clínicos"
authors: ["admin"]
date: "2024-02-08"
categories: ["Código Práctico en R o Python"]
tags: 
  - "entrenar modelo en R para predicciones clínicas"
  - "tutorial en r para modelos predictivos médicos"
  - "guía Steyerberg para modelos predictivos médicos"
  - "evitar overfitting en validación de ML"
  - "paso a paso R para machine learning en tesis"
slug: como-entrenar-y-validar-un-modelo-de-machine-learnig
featured: true  # Destacar en la página principal
languages:
  es: "/es/como-entrenar-y-validar-un-modelo-de-machine-learnig"
  en: "/en/como-entrenar-y-validar-un-modelo-de-machine-learnig"
related_posts:
  - "eda"  # Slug de tu post sobre EDA, luego añadir categoria superior para cluster
commentable: yes
draft: false
---


![](featured.png)


# Introducción

Si usted es Investigador en Salud o, peor aún, estudiante de posgrado, maestría o doctorado en el campo de las ciencias biomédicas... **¡bienvenido al club del estrés!**

Seguro que usted está enfocado en desarrollar esos geniales **modelos de predicción clínica** para el **diagnóstico** o el **pronóstico**. Y es casi seguro que ha llegado a esa fase donde la metodología se siente como un muro de ladrillos. Un día estás bien, y al siguiente te das cuenta de que no sabes qué pasos seguir, qué software usar, o lo peor: si tu modelo servirá para algo más allá de llenar un repositorio de tesis. Lo digo sin tapujos: esa frase lapidaria de **'Ese valor tan alto de la Curva Roc y la ausencia de métricas de calibración'** puede significar que tu modelo tiene el famoso **síndrome del "sobreajuste"**. En otras palabras, funciona espectacularmente bien... solo para la muestra que lo creó.

Es una locura, ¿verdad? Mientras las tesis de alto nivel giran en torno a crear estos modelos de predicción clínica, los cursos de Bioestadística (¡incluida la especialidad!) pasan de puntillas por el tema. Hay una brecha gigantesca, y la ansiedad de tener que aprenderlo todo YA es real. Pero respira. Este post es tu chaleco salvavidas: tu Traductor Metodológico no oficial y (casi) libre de lágrimas. Yo mismo pasé por ese infierno metodológico en mi tesis de doctorado, así que no solo doy consejos: comparto la experiencia de quien ya quemó sus pestañas por ti.

Olvida el código complejo y enrevesado. Aquí nos enfocamos en la lógica esencial para construir un modelo predictivo robusto y fiable. Desglosaremos el proceso paso a paso, quitándole el miedo a la estadística con un **Código Práctico en R**. Empezaremos con la **Estrategia de Modelado**; el código (y opciones para quienes prefieren SPSS) vendrá después. **¡Empecemos!**

# Estrategia de modelado

Contar con una estrategia de modelado adecuada es esencial para desarrollar y validar modelos de predicción. En este artículo exploraremos las siete etapas clave propuestas por Ewout Steyerberg en su trabajo (1).

## 1. Definición del problema e inspección de datos 

El primer paso en cualquier proyecto de modelado es **definir claramente el problema de investigación** y seleccionar la **variable de resultado** adecuada.

{{% callout note %}} La **variable de resultado** debe definirse con precisión: especifica **qué evento se predice**, **cómo y cuándo se mide**, y el **horizonte temporal de predicción** (por ejemplo, mortalidad a 30 días). Indica además el método de evaluación y si hubo **cegamiento** respecto a los predictores, para garantizar coherencia y validez del modelo. {{% /callout %}}

Durante esta fase, también realizamos un análisis exploratorio de datos (EDA) para comprender las características de las variables y detectar posibles problemas, como **datos atípicos** o **valores faltantes**.


``` r
# Realiza una descripción general del conjunto de datos
# Instala y Carga de Librerías útiles 
library(caret)
library(MLDataR) # para utilizar la biblioteca diabetes_data
library(dplyr)
library(dlookr) # para EDA
library(predtools)
# Cargar el conjunto de datos
data("gusto")
gusto <- gusto
# EDA
descripcion <- overview(gusto)
summary(descripcion) # descripción general del conjunto de datos
```

<!-- Para conocer más detalles sobre el proceso de ¨Exploratory Data Analysis (EDA)¨ [ver la publicación dedicada a este tema](es/post/2025-02-11-eda/_index.Rmd) -->

## 2. Codificación de las variables predictoras 

La **codificación** adecuada de las **variables predictoras** es fundamental para construir modelos robustos.

Es probable que debas utilizar técnicas como la agrupación de categorías poco frecuentes y la creación de predictores resúmenes para simplificar información correlacionada. Si el algoritmo seleccionado es la **regresión logística**, es posible que le haga falta aplicar técnicas como los **splines cúbicos restringidos** para relajar el supuesto de linealidad entre la variable dependiente y el resultado.

{{% callout note %}} Cada variable predictora debe definirse con su método de medición y momento. Las variables continuas deben reportarse con sus unidades; si se categorizan, debe justificarse los puntos de corte. Las variables categóricas deben listar todas sus categorías y especificar la categoría de referencia. El modelo final debe presentar la codificación completa utilizada para cada predictor. {{% /callout %}}

💡 **Tip:** Dicotomizar predictores cuantitativos (por ejemplo, transformar una variable continua como la edad o la presión arterial en una variable binaria, como “≥65 años = 1” y “\<65 = 0”) es considerada una mala práctica metodológica por pérdida de información, menos poder estadístico, puntos de corte arbitrarios y riesgo de sobreajuste.

## 3 .Especificación del tipo de modelo

En esta etapa se define la estructura formal del modelo, lo que incluye el tipo de relación entre variables (p. ej., lineal, no lineal) y, de manera crucial, la selección de los predictores finales que lo integrarán.

![](modelos_elecion.png)

La elección de predictores no debe basarse en la aplicación mecánica de métodos algorítmicos como la **Regresión Paso a Paso (RPP)**, ya que suelen producir modelos inestables y sobreajustados, especialmente en contextos biomédicos y sociales. En su lugar, se recomienda:

-   Priorizar el **juicio clínico, la revisión sistemática de la literatura y la experiencia previa.**

-   Evitar la preselección de variables basada únicamente en valores *p* de análisis bivariados.

-   Optar por un conjunto reducido de predictores clínicamente relevantes definidos a priori, o incluir todos los candidatos en el modelo multivariable inicial sin filtrado estadístico previo.

## 4. Estimación del Modelo 

Una vez especificado el modelo (es decir, definidos los predictores y la estructura funcional), el paso de estimación tiene como objetivo calcular los coeficientes o parámetros que mejor se ajusten a los datos de entrenamiento.

En modelos de regresión, esto implica típicamente el uso de métodos como la **máxima verosimilitud**. Sin embargo, cuando el número de eventos es limitado o el de predictores es alto, el riesgo de sobreajuste es elevado, lo que genera predicciones extremas y poco generalizables. Para mitigarlo, se emplean técnicas de **regularización, penalización o shrinkage**, que ajustan los coeficientes hacia cero para mejorar la estabilidad y la calibración en nuevas poblaciones.

El objetivo final no es maximizar el rendimiento aparente en la muestra de desarrollo, sino obtener un modelo con **predicciones estables, bien calibradas y clínicamente útiles**.

{{% callout note %}} Es recomendable aplicar siempre una validación interna (como bootstrapping o cross-validation) para cuantificar y corregir el optimismo en las métricas de rendimiento. La ecuación final del modelo debe presentarse de forma completa —incluyendo todos los coeficientes, el intercepto y, si corresponde, la supervivencia basal—, reportando métricas de calibración y discriminación con sus intervalos de confianza. {{% /callout %}}

## 5. Evaluación del Rendimiento del Modelo 

Una vez desarrollado el modelo, es esencial cuantificar su capacidad predictiva antes de su validación. Esta evaluación se centra en tres aspectos clave:

-   **Calibración:** Mide la concordancia entre las probabilidades predichas y las observadas. Por ejemplo, ¿un 10% de riesgo predicho se corresponde con un 10% de eventos observados? Se evalúa visualmente con curvas de calibración y cuantitativamente con parámetros como el intercepto (A, calibración-in-the-large) y la pendiente de calibración (B).

-   **Discriminación:** Evalúa la capacidad del modelo para distinguir entre pacientes que experimentan el evento y aquellos que no. La métrica más común es el estadístico C (o AUC-ROC), que representa la probabilidad de que un paciente con el evento tenga una puntuación de riesgo más alta que uno sin él.

-   **Utilidad Clínica:** Determina si el modelo es útil para la toma de decisiones. El análisis de curvas de decisión y el Beneficio Neto (NB) permiten evaluar si el uso del modelo conduce a mejores resultados clínicos netos en comparación con estrategias alternativas (como tratar a todos o a ninguno).

## 6. Evaluación de la Validez del Modelo 

La evaluación del rendimiento en los datos de desarrollo suele ser optimista. Por ello, es crucial evaluar la validez del modelo en datos no utilizados para su construcción, un proceso que se divide en:

**Validación Interna:** Evalúa la reproducibilidad del modelo, es decir, su rendimiento en múltiples muestras de la misma población subyacente. Técnicas como el bootstrapping o la validación cruzada son superiores a la división simple de la muestra, ya que cuantifican y corrigen el optimismo en las métricas de rendimiento sin reducir el tamaño de la muestra de desarrollo.

**Validación Externa:** Es la prueba definitiva de la generalizabilidad o transportabilidad del modelo. Consiste en aplicar el modelo a una población completamente independiente, lo que puede incluir:

-   **Validación Temporal:** Usar pacientes reclutados en un período posterior.

-   **Validación Geográfica:** Aplicar el modelo en pacientes de otros centros u hospitales.

-   **Validación Fuerte:** Probar el modelo en un entorno clínico o una población con características diferentes a las originales.

Este paso es fundamental para confirmar que el modelo mantiene su calibración, discriminación y utilidad clínica en la práctica real.

## 7. Presentación del modelo 

La presentación efectiva es crucial para la adopción clínica. Un modelo perfecto es inútil si los médicos no pueden interpretarlo fácilmente. Considera:

- **Nomogramas**: Ideales para uso rápido en consulta
- **Aplicaciones web/móviles**: Para integración en flujos de trabajo clínicos
- **Puntuaciones de riesgo**: Simplificadas para triaje rápido
- **Documentación clara**: Incluyendo limitaciones y casos de uso

Recuerda: la transparencia en la presentación favorece la confianza clínica.

¿Has aplicado estas técnicas en tus proyectos de Machine Learning? ¿Qué estrategias usas para entrenar y validar tus modelos? Déjame tus comentarios 💬: comparte tus experiencias, dificultades o tips contigo. ¡Juntos podemos enriquecer este conocimiento!

# Recursos adicionales

🎧 **Escucha el podcast de esta publicación**

{{< audio src="https://ia600607.us.archive.org/24/items/articulo-steyember/_Articulo_Steyember.mp3" controls="yes" >}}


# Bibliografía

1.  Steyerberg EW, Vergouwe Y. Towards better clinical prediction models: seven steps for development and an ABCD for validation. European Heart Journal [Internet]. 1 de agosto de 2014 [citado 9 de mayo de 2021];35(29):1925-31. Disponible en: <https://academic.oup.com/eurheartj/article-lookup/doi/10.1093/eurheartj/ehu207>
