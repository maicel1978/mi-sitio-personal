---
title: Como entrenar y validar un modelo de machine learnig
author: maicel monzon
date: '2025-02-08'
categories:
  - R
tags:
  - machine learnig
slug: como-entrenar-y-validar-un-modelo-de-machine-learnig
---

Contar con una estrategia de modelado correcta es esencial para desarrollar y validar modelos de predicción. En este artículo, exploraremos las etapas clave del proceso de modelado propuesto por Ewout Steyerberg. 

# Estrategia de modelado

## 1. Definición del Problema e Inspección de Datos

El primer paso en cualquier proyecto de modelado es definir claramente el problema de investigación y seleccionar la variable de resultado adecuada. 

Durante esta fase, también realizamos un análisis exploratorio de datos (EDA) para comprender las características de las variables y detectar posibles problemas, como datos atípicos o valores faltantes. 

Para el ejemplo se utilizará la base de datos diabetes de la biblioteca MLDataR. La variable de resultado será DiabeticClass que es una variable cualitativa nominal dicotómica con categorías negativo o positivo. La edad es un predictor cuantitativo y el resto son predictores cualitativos.


``` r
# Instalación y Carga de Librerías
library(caret)
library(MLDataR) # para utilizar la biblioteca diabetes_data
library(dplyr)
library(dlookr) # para EDA
# datos
data("diabetes_data")
datos <- diabetes_data
# EDA
descripcion <- overview(datos)
summary(descripcion) # descripción general del conjunto de datos
```

```
## ── Data Scale ────────────────────────────────────────────── 
## • Number of observations            :     520
## • Number of variables               :      17
## • Number of values                  :   8,840
## • Size of located memory(bytes)     :  84,744 
## 
## ── Duplicated Data ───────────────────────────────────────── 
## • Number of duplicated observations :     269 (51.73%) 
## 
## ── Missing Data ──────────────────────────────────────────── 
## • Number of completed observations  :     520
## • Number of observations with NA    :       0 (0%)
## • Number of variables with NA       :       0
## • Number of NA                      :       0 
## 
## ── Data Type ─────────────────────────────────────────────── 
## • Number of numeric variables       :       1
## • Number of integer variables       :       0
## • Number of factors variables       :       0
## • Number of character variables     :      16
## • Number of Date variables          :       0
## • Number of POSIXct variables       :       0
## • Number of other variables         :       0 
## 
## ── Individual variables ──────────────────────────────────── 
##           Variables Data Type
## 1               Age   numeric
## 2            Gender character
## 3   ExcessUrination character
## 4        Polydipsia character
## 5  WeightLossSudden character
## 6           Fatigue character
## 7        Polyphagia character
## 8     GenitalThrush character
## 9     BlurredVision character
## 10          Itching character
## 11     Irritability character
## 12     DelayHealing character
## 13 PartialPsoriasis character
## 14  MuscleStiffness character
## 15         Alopecia character
## 16          Obesity character
## 17    DiabeticClass character
```

Para conocer más detalles sobre el proceso de ¨Exploratory Data Analysis (EDA)¨ ver la publicación dedicada a este tema.


## 2. Codificación de las Variables Predictoras

La codificación adecuada de las variables predictoras es fundamental para construir modelos robustos. En este estudio, se utilizaron técnicas como la agrupación de categorías poco frecuentes y la creación de predictores resúmenes para simplificar información correlacionada. Además, cuando las relaciones entre variables no son lineales, aplicamos herramientas como splines cúbicos restringidos , que permiten capturar patrones complejos sin comprometer la precisión del modelo.


## 3 .Especificación del Tipo de Modelo

La elección del modelo depende del tipo de relación que queremos capturar entre las variables. En este estudio, combinamos dos enfoques: regresión logística binaria múltiple y árboles de clasificación . Mientras que la regresión logística es ideal para modelar relaciones lineales y proporcionar probabilidades, los árboles de clasificación son útiles para identificar interacciones complejas y establecer indicadores de riesgo.

Un aspecto clave fue la selección de predictores finales, que se basó en criterios como la plausibilidad biológica , el respaldo de la literatura científica y métodos computacionales avanzados. Esto nos permitió evitar el uso exclusivo de valores p, que pueden ser engañosos en algunos contextos.

## 4. Estimación del Modelo

Para ajustar los parámetros del modelo, utilizamos el método de máxima verosimilitud (MLE) , reconocido por su versatilidad y eficiencia computacional. Además, evaluamos cuidadosamente las interacciones entre variables predictoras, incluyéndolas solo cuando había evidencia empírica y teórica que respaldaba su relevancia. Un modelo más simple suele ser más robusto y fácil de interpretar, lo que es crucial en entornos clínicos.

## 5. Evaluación del Rendimiento del Modelo

El rendimiento del modelo se evalúa mediante métricas como calibración y discriminación . La calibración mide la concordancia entre las predicciones y los resultados observados, mientras que la discriminación evalúa la capacidad del modelo para distinguir entre pacientes con diferentes resultados. Herramientas como las rectas de calibración y la validación cruzada de 10 pliegues fueron fundamentales para asegurar la calidad del modelo.

## 6. Evaluación de la Validez del Modelo

La validación del modelo es un paso crítico para garantizar su aplicabilidad en diferentes contextos. En este estudio, utilizamos tanto validación interna como externa , empleando particiones temporales y geográficas para reflejar escenarios reales. Este enfoque nos permitió evaluar la robustez del modelo frente a cambios en el tiempo y variaciones regionales.

## 7. Presentación del Modelo

La presentación del modelo puede ser a través de un nomograma o aplicación.
