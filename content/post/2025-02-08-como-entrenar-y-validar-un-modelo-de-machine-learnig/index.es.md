---
title: "Como entrenar y validar un modelo de machine learnig"
author: 'Maicel Monzón'
date: '2024-02-08'
categories:
  - R
  - Ciencia de Datos
tags:
  - machine learning
slug: como-entrenar-y-validar-un-modelo-de-machine-learnig
summary: "Guía práctica con R para desarrollar modelos predictivos robustos en entornos clínicos, siguiendo la metodología de Steyerberg"
featured: true  # Destacar en la página principal
language: es
related_posts: [eda]  # Slug de tu post sobre EDA
---

🎧 **Escucha el podcast de esta publicación**  
{{< audio src="https://ia600607.us.archive.org/24/items/articulo-steyember/_Articulo_Steyember.mp3" controls="yes" >}}  


# Estrategia de modelado

Contar con una estrategia de modelado correcta es esencial para desarrollar y validar modelos de predicción. En este artículo, exploraremos las siete etapas clave del proceso de modelado propuesto por Ewout Steyerberg en su artículo . 

## 1. Definición del problema e inspección de datos {#sec-1}

El primer paso en cualquier proyecto de modelado es definir claramente el problema de investigación y seleccionar la variable de resultado adecuada. 

Durante esta fase, también realizamos un análisis exploratorio de datos (EDA) para comprender las características de las variables y detectar posibles problemas, como datos atípicos o valores faltantes. 



``` r
# Instalación y Carga de Librerías
library(caret)
```

```
## Loading required package: ggplot2
```

```
## Loading required package: lattice
```

``` r
library(MLDataR) # para utilizar la biblioteca diabetes_data
library(dplyr)
```

```
## 
## Attaching package: 'dplyr'
```

```
## The following objects are masked from 'package:stats':
## 
##     filter, lag
```

```
## The following objects are masked from 'package:base':
## 
##     intersect, setdiff, setequal, union
```

``` r
library(dlookr) # para EDA
```

```
## Registered S3 methods overwritten by 'dlookr':
##   method          from  
##   plot.transform  scales
##   print.transform scales
```

```
## 
## Attaching package: 'dlookr'
```

```
## The following object is masked from 'package:base':
## 
##     transform
```

``` r
library(predtools)
# Cargar el conjunto de datos
data("gusto")
gusto <- gusto
# EDA
descripcion <- overview(gusto)
summary(descripcion) # descripción general del conjunto de datos
```

```
## ── Data Scale ────────────────────────────────────────────── 
## • Number of observations            :     40,830
## • Number of variables               :         29
## • Number of values                  :  1,184,070
## • Size of located memory(bytes)     :  5,241,552 
## 
## ── Duplicated Data ───────────────────────────────────────── 
## • Number of duplicated observations :          4 (0.01%) 
## 
## ── Missing Data ──────────────────────────────────────────── 
## • Number of completed observations  :     30,510
## • Number of observations with NA    :     10,320 (25.28%)
## • Number of variables with NA       :          1
## • Number of NA                      :     10,320 
## 
## ── Data Type ─────────────────────────────────────────────── 
## • Number of numeric variables       :          1
## • Number of integer variables       :         13
## • Number of factors variables       :          0
## • Number of character variables     :          0
## • Number of Date variables          :          0
## • Number of POSIXct variables       :          0
## • Number of other variables         :         15 
## 
## ── Individual variables ──────────────────────────────────── 
##    Variables Data Type
## 1      day30   integer
## 2        sho   integer
## 3        hig   integer
## 4        dia  labelled
## 5        hyp   integer
## 6        hrt   integer
## 7        ttr  labelled
## 8        sex  labelled
## 9     Killip  labelled
## 10       age   numeric
## 11       ste  labelled
## 12     pulse  labelled
## 13     sysbp  labelled
## 14       ant   integer
## 15     miloc  labelled
## 16    height  labelled
## 17    weight  labelled
## 18       pmi  labelled
## 19       htn  labelled
## 20       smk  labelled
## 21       pan   integer
## 22       fam  labelled
## 23   prevcvd   integer
## 24  prevcabg   integer
## 25      regl   integer
## 26      grpl   integer
## 27      grps   integer
## 28       tpa   integer
## 29        tx  labelled
```

Para conocer más detalles sobre el proceso de ¨Exploratory Data Analysis (EDA)¨ ver la publicación dedicada a este tema.


## 2. Codificación de las Variables Predictoras {#sec-2}

La codificación adecuada de las variables predictoras es fundamental para construir modelos robustos. En este estudio, se utilizaron técnicas como la agrupación de categorías poco frecuentes y la creación de predictores resúmenes para simplificar información correlacionada. Además, cuando las relaciones entre variables no son lineales, aplicamos herramientas como splines cúbicos restringidos , que permiten capturar patrones complejos sin comprometer la precisión del modelo.


## 3 .Especificación del Tipo de Modelo {#sec-3}

La elección del modelo depende del tipo de relación que queremos capturar entre las variables. En este estudio, combinamos dos enfoques: regresión logística binaria múltiple y árboles de clasificación . Mientras que la regresión logística es ideal para modelar relaciones lineales y proporcionar probabilidades, los árboles de clasificación son útiles para identificar interacciones complejas y establecer indicadores de riesgo.

Un aspecto clave fue la selección de predictores finales, que se basó en criterios como la plausibilidad biológica , el respaldo de la literatura científica y métodos computacionales avanzados. Esto nos permitió evitar el uso exclusivo de valores p, que pueden ser engañosos en algunos contextos.

## 4. Estimación del Modelo {#sec-4}

Para ajustar los parámetros del modelo, utilizamos el método de máxima verosimilitud (MLE) , reconocido por su versatilidad y eficiencia computacional. Además, evaluamos cuidadosamente las interacciones entre variables predictoras, incluyéndolas solo cuando había evidencia empírica y teórica que respaldaba su relevancia. Un modelo más simple suele ser más robusto y fácil de interpretar, lo que es crucial en entornos clínicos.

## 5. Evaluación del Rendimiento del Modelo {#sec-5}

El rendimiento del modelo se evalúa mediante métricas como calibración y discriminación . La calibración mide la concordancia entre las predicciones y los resultados observados, mientras que la discriminación evalúa la capacidad del modelo para distinguir entre pacientes con diferentes resultados. Herramientas como las rectas de calibración y la validación cruzada de 10 pliegues fueron fundamentales para asegurar la calidad del modelo.

## 6. Evaluación de la Validez del Modelo {#sec-6}

La validación del modelo es un paso crítico para garantizar su aplicabilidad en diferentes contextos. En este estudio, utilizamos tanto validación interna como externa , empleando particiones temporales y geográficas para reflejar escenarios reales. Este enfoque nos permitió evaluar la robustez del modelo frente a cambios en el tiempo y variaciones regionales.

## 7. Presentación del Modelo {#sec-7}

La presentación del modelo puede ser a través de un nomograma o aplicación.

# Bibliografía

1.  Steyerberg EW, Vergouwe Y. Towards better clinical prediction models: seven steps for development and an ABCD for validation. European Heart Journal [Internet]. 1 de agosto de 2014 [citado 9 de mayo de 2021];35(29):1925-31. Disponible en: https://academic.oup.com/eurheartj/article-lookup/doi/10.1093/eurheartj/ehu207
