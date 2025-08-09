---
title: '¿Explicar o predecir? La elección metodológica entre enfoques tradicionales
  y machine learning en salud pública'
author: ["admin"]
date: '2025-06-19'
categories:
  - IA
  - R
tags:
  - Bioestadística
  - Inferencia
  - Machine Learning
  - Modelos Predictivos
  - R
  - Validación
slug: sue-an-las-m-quinas-con-cerebros-el-ctricos
bibliography: references.bib
commentable: yes
summary: Comparamos los enfoque explicativo de la bioestadística y el predictivo del
  machine learning usando un caso práctico en R para predecir la diabetes.
---

## El Debate Central: ¿Explicar o Predecir?

En el campo de la bioestadística, un debate metodológico fundamental gira en torno a la distinción entre dos propósitos principales del modelado: los modelos diseñados para **explicar** fenómenos en una población,y aquellos orientados a **predecir** características o eventos futuros en un individuo. Estos últimos se conocen comúnmente como Modelos de Predicción Clínica (Steyerberg 2009).

Mientras que los modelos explicativos priorizan la inferencia causal y la interpretabilidad de los resultados, lo que se alinea con el propósito general de la investigación científica de comprender mecanismos subyacentes(Silva Aycaguer 1998), los modelos predictivos están más vinculados al desarrollo de tecnologías (Steyerberg 2009) . Por ejemplo, su objetivo es construir herramientas fiables para estimar la probabilidad de que ciertas enfermedades estén presentes (modelos diagnósticos) o predecir resultados futuros (modelos pronósticos), lo cual es crucial para la toma de decisiones clínicas.

Los modelos de predicción clínica se puden enmarcar dentro del enfoque de **aprendizaje automático** (machine learning), ya que comparten objetivos y metodologías clave(Ryu and Han 2022) .

![](ML.png)

Este artículo no busca ser una comparativa técnica exhaustiva entre la **“bioestadística clásica”** y el **“machine learning”** aplicado a la salud. En cambio, es una exploración breve de los dos paradigmas fundamentales que subyacen al modelado en salud pública: uno centrado en la **generación de conocimiento** y otro en el **desarrollo y validación de tecnologías** para la toma de decisiones informadas. Además, se incluirán algunos ejemplos en código R que podrían ser útiles para los lectores interesados en implementar problemas similares.

------------------------------------------------------------------------

## La implementación del modelo

Antes de escribir una sola línea de código, debemos definir el objetivo fundamental del modelo y el problema.

Esta decisión dicta toda la metodología subsecuente.

1.  **El enfoque explicativo:** Buscamos **entender relaciones** y cuantificar la asociación entre predictores y un resultado en una población específica. El modelo es una herramienta para generar hipótesis y explicar mecanismos. La pregunta clave es: *¿Cuál es la magnitud y la incertidumbre de la asociación entre X e Y?*

2.  **El enfoque predictivo:** Buscamos crear una herramienta que **generalice bien a datos nuevos y no vistos**. El modelo es un medio para tomar decisiones informadas sobre individuos en otros contextos. La pregunta clave es: Para un nuevo paciente con estas características, *¿cuál es la probabilidad de que ocurra Y, y qué tan fiable es esa predicción?*

Existe una percepción errónea de que el **machine learning** se limita a los algoritmos de “caja negra” más avanzados, como los Bosques Aleatorios, las Redes Neuronales Profundas (DNNs) y los Gradient Boosting Machines (GBM).

Sin embargo, el panorama del machine learning es mucho más amplio e incluye tambien modelos altamente interpretables. Para ilustrarlo con un ejemplo práctico, consideremos la regresión logística binaria múltiple. Este es un algoritmo ampliamente reconocido y utilizado en campos como el análisis causal y el diseño de modelos de predicción clínica, precisamente por su transparencia. Permite entender claramente cómo cada variable influye en el resultado.

Pero, es importante destacar que otros algoritmos, como las redes bayesianas y las redes neuronales de una sola capa (lineales, sin capas ocultas no lineales), también ofrecen un alto grado de interpretabilidad y explicabilidad. Estos modelos pueden ser utilizados eficazmente en lugar de la regresión logística para abordar problemas tradicionales, especialmente cuando comprender el “porqué” de las predicciones es tan importante como la predicción misma.

Vamos a explorar ambos mundos con un caso práctico: predecir el riesgo de diabetes utilizando el conjunto de datos *PimaIndiansDiabetes2* , incluido en el paquete **mlbench** (Leisch and Dimitriadou, n.d.). La “Base de Datos de Diabetes de Indígenas PIMA” es un conjunto de datos ampliamente utilizado para la evaluación del riesgo de diabetes y la elaboración de modelos predictivos.

``` r
#  bibliotecas
library(tidyverse)
library(gtsummary)
library(missRanger)
library(mlbench)
data(PimaIndiansDiabetes2) 


# lectura y transformación de datos 
datos <- 
  PimaIndiansDiabetes2  %>% 
  missRanger(num.trees = 100,verbose = 0) %>% # imputación múltiple
  mutate(diabetes=if_else(diabetes=="pos",1,0)) %>% # transformación del resultado
  select(diabetes,age,pedigree,pregnant,mass,glucose,pressure) 
```

## Enfoque 1: El Enfoque explicativo

Cuando el objetivo es la **explicación**, nuestro foco está en la estimación de efectos y su incertidumbre.

**El “Porqué”:** Queremos cuantificar las asociaciones en nuestra muestra para generar conocimiento. Por ejemplo, ¿cuál es la fuerza de la asociación entre la predisposición genética (pedigree) y la diabetes?

``` r
# Ajuste del modelo de regresión logística
modelo_explicativo <- glm(diabetes ~ ., data = datos, family = "binomial")

tbl_regression(modelo_explicativo, exponentiate = TRUE) %>%
  as_gt() %>%
  gt::tab_header(title = "Factores de riesgo para la diabetes en mujeres de la etnia PIMA")
```

<div id="hrnxvrltcy" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#hrnxvrltcy table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#hrnxvrltcy thead, #hrnxvrltcy tbody, #hrnxvrltcy tfoot, #hrnxvrltcy tr, #hrnxvrltcy td, #hrnxvrltcy th {
  border-style: none;
}
&#10;#hrnxvrltcy p {
  margin: 0;
  padding: 0;
}
&#10;#hrnxvrltcy .gt_table {
  display: table;
  border-collapse: collapse;
  line-height: normal;
  margin-left: auto;
  margin-right: auto;
  color: #333333;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  background-color: #FFFFFF;
  width: auto;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #A8A8A8;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #A8A8A8;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#hrnxvrltcy .gt_title {
  color: #333333;
  font-size: 125%;
  font-weight: initial;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-color: #FFFFFF;
  border-bottom-width: 0;
}
&#10;#hrnxvrltcy .gt_subtitle {
  color: #333333;
  font-size: 85%;
  font-weight: initial;
  padding-top: 3px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-color: #FFFFFF;
  border-top-width: 0;
}
&#10;#hrnxvrltcy .gt_heading {
  background-color: #FFFFFF;
  text-align: center;
  border-bottom-color: #FFFFFF;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_col_headings {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_col_heading {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  overflow-x: hidden;
}
&#10;#hrnxvrltcy .gt_column_spanner_outer {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 4px;
  padding-right: 4px;
}
&#10;#hrnxvrltcy .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#hrnxvrltcy .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#hrnxvrltcy .gt_column_spanner {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow-x: hidden;
  display: inline-block;
  width: 100%;
}
&#10;#hrnxvrltcy .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#hrnxvrltcy .gt_group_heading {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  text-align: left;
}
&#10;#hrnxvrltcy .gt_empty_group_heading {
  padding: 0.5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: middle;
}
&#10;#hrnxvrltcy .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#hrnxvrltcy .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#hrnxvrltcy .gt_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 10px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  overflow-x: hidden;
}
&#10;#hrnxvrltcy .gt_stub {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#hrnxvrltcy .gt_stub_row_group {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
  vertical-align: top;
}
&#10;#hrnxvrltcy .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#hrnxvrltcy .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#hrnxvrltcy .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#hrnxvrltcy .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#hrnxvrltcy .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#hrnxvrltcy .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#hrnxvrltcy .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_footnotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#hrnxvrltcy .gt_sourcenotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}
&#10;#hrnxvrltcy .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#hrnxvrltcy .gt_left {
  text-align: left;
}
&#10;#hrnxvrltcy .gt_center {
  text-align: center;
}
&#10;#hrnxvrltcy .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#hrnxvrltcy .gt_font_normal {
  font-weight: normal;
}
&#10;#hrnxvrltcy .gt_font_bold {
  font-weight: bold;
}
&#10;#hrnxvrltcy .gt_font_italic {
  font-style: italic;
}
&#10;#hrnxvrltcy .gt_super {
  font-size: 65%;
}
&#10;#hrnxvrltcy .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#hrnxvrltcy .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#hrnxvrltcy .gt_indent_1 {
  text-indent: 5px;
}
&#10;#hrnxvrltcy .gt_indent_2 {
  text-indent: 10px;
}
&#10;#hrnxvrltcy .gt_indent_3 {
  text-indent: 15px;
}
&#10;#hrnxvrltcy .gt_indent_4 {
  text-indent: 20px;
}
&#10;#hrnxvrltcy .gt_indent_5 {
  text-indent: 25px;
}
&#10;#hrnxvrltcy .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#hrnxvrltcy div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="4" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>Factores de riesgo para la diabetes en mujeres de la etnia PIMA</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="label"><span class='gt_from_md'><strong>Characteristic</strong></span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_center" rowspan="1" colspan="1" scope="col" id="estimate"><span class='gt_from_md'><strong>OR</strong></span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_center" rowspan="1" colspan="1" scope="col" id="conf.low"><span class='gt_from_md'><strong>95% CI</strong></span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_center" rowspan="1" colspan="1" scope="col" id="p.value"><span class='gt_from_md'><strong>p-value</strong></span></th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="label" class="gt_row gt_left">age</td>
<td headers="estimate" class="gt_row gt_center">1.01</td>
<td headers="conf.low" class="gt_row gt_center">0.99, 1.03</td>
<td headers="p.value" class="gt_row gt_center">0.2</td></tr>
    <tr><td headers="label" class="gt_row gt_left">pedigree</td>
<td headers="estimate" class="gt_row gt_center">2.37</td>
<td headers="conf.low" class="gt_row gt_center">1.33, 4.26</td>
<td headers="p.value" class="gt_row gt_center">0.004</td></tr>
    <tr><td headers="label" class="gt_row gt_left">pregnant</td>
<td headers="estimate" class="gt_row gt_center">1.13</td>
<td headers="conf.low" class="gt_row gt_center">1.06, 1.21</td>
<td headers="p.value" class="gt_row gt_center"><0.001</td></tr>
    <tr><td headers="label" class="gt_row gt_left">mass</td>
<td headers="estimate" class="gt_row gt_center">1.10</td>
<td headers="conf.low" class="gt_row gt_center">1.07, 1.13</td>
<td headers="p.value" class="gt_row gt_center"><0.001</td></tr>
    <tr><td headers="label" class="gt_row gt_left">glucose</td>
<td headers="estimate" class="gt_row gt_center">1.04</td>
<td headers="conf.low" class="gt_row gt_center">1.03, 1.04</td>
<td headers="p.value" class="gt_row gt_center"><0.001</td></tr>
    <tr><td headers="label" class="gt_row gt_left">pressure</td>
<td headers="estimate" class="gt_row gt_center">0.99</td>
<td headers="conf.low" class="gt_row gt_center">0.98, 1.01</td>
<td headers="p.value" class="gt_row gt_center">0.4</td></tr>
  </tbody>
  <tfoot class="gt_sourcenotes">
    <tr>
      <td class="gt_sourcenote" colspan="4"><span class='gt_from_md'>Abbreviations: CI = Confidence Interval, OR = Odds Ratio</span></td>
    </tr>
  </tfoot>
  &#10;</table>
</div>

Una vez aplicada la regresión logística, se observa que por cada unidad de cambio en la variable **pedigree**, es 2.37 veces más probable que la mujer sea diabética si se mantienen el resto de las variables constantes. Dado que este intervalo de confianza no incluye el valor uno del Odds Ratio (OR), tenemos evidencia para sugerir una asociación estadística entre los antecedentes familiares de diabetes y la presencia de la enfermedad.

Si bien, este resultado del modelo no es garantía de significación clínica, puede sugerir una explicación causal y, además, nos proporciona un rango plausible para la magnitud del efecto.

En este caso, el foco de la modelación no es una herramienta para el diagnóstico y el pronóstico , sino la estimación del efecto y la cuantificación de nuestra incertidumbre sobre él (explicación).

## Enfoque 2: El Enfoque predictivo

Aquí, la interpretabilidad de un coeficiente aislado pierde protagonismo frente a la predición del modelo y al rendimiento global frente a nuevos datos. Como diría Frank Harrell, *“la predicción sin una validación honesta es una fantasía”* (Harrell Jr 2015).

**El “Porqué”**: Queremos una herramienta que, al recibir los datos de una nueva paciente, nos dé una probabilidad de riesgo de diabetes que sea precisa y fiable.

A continuación se muestra como el modelo se entrena en una partición de los datos (conjunto de entrenamiento) y se evalúa su despeño en un nuevos datos (conjunto de prueba).

``` r
# bibliotecas
library(rms,verbose = F)
library(CalibrationCurves)

# 1. Partición de datos
set.seed(1353)
split <- initial_split(datos, strata = "diabetes")
entrenamiento <- training(split)
prueba <- testing(split)
# 2. Ajuste del modelo en el conjunto de ENTRENAMIENTO
# Usamos lrm del paquete rms, diseñado para modelado predictivo
modelo_predictivo <- lrm(diabetes ~ ., data = entrenamiento, x = TRUE, y = TRUE)
# 3. Predicción en el conjunto de PRUEBA (el momento de la verdad)
predicciones <- predict(modelo_predictivo, newdata = prueba, type = "fitted")
# 4. Evaluación del rendimiento: ¿Funciona la bola de cristal?
# La siguiente línea imprimirá las métricas de texto y generará el gráfico de calibración
val.prob(predicciones, prueba$diabetes)
```

<img src="{{< blogdown/postref >}}index.es_files/figure-html/machine_learnig-1.png" width="672" style="display: block; margin: auto;" />

    ##          Dxy      C (ROC)           R2            D     D:Chi-sq          D:p 
    ##  0.714865672  0.857432836  0.457300264  0.398065790 77.428631681  0.000000000 
    ##            U     U:Chi-sq          U:p            Q        Brier    Intercept 
    ## -0.006821292  0.690311985  0.708109885  0.404887082  0.145035245 -0.155198552 
    ##        Slope         Emax          E90         Eavg          S:z          S:p 
    ##  1.006770568  0.054652568  0.043820595  0.024518474 -0.163093305  0.870444971

Interpretación de la Validación:

Nuestro foco se desplaza a las métricas de rendimiento en el conjunto de prueba, mostradas en el texto que precede al gráfico:

- **Discriminación (c-statistic / AUC):** Nuestro C (o c-statistic) de 0.86 indica una excelente capacidad para distinguir entre pacientes que desarrollarán la enfermedad y los que no.

- **Calibración:** Este es el aspecto más crítico y a menudo ignorado. El gráfico de calibración (Figura 2) nos muestra si las predicciones del modelo son fiables. Una desviación de la línea diagonal “Ideal” indica descalibración, lo que significa que el modelo es sistemáticamente demasiado optimista o pesimista. Un modelo con alta discriminación pero mala calibración es peligroso en la práctica clínica.

## El Fantasma en la Máquina: Descalibración y Validez Temporal

Un modelo predictivo no es una escultura de mármol; es más como un coche que requiere mantenimiento. El mayor error en la implementación de modelos es asumir que su rendimiento inicial se mantendrá en el tiempo. Como advierte Ewout Steyerberg, los modelos se degradan(Steyerberg 2009).

- **Cambios en la Prevalencia:** Si la prevalencia de la diabetes varian en la población, las predicciones del modelo pueden descalibrarse.

- **Cambios en las Características de los Pacientes:** La población de pacientes cambia, las prácticas de medición evolucionan.

- **Cambios en la Práctica Clínica:** Nuevos tratamientos pueden alterar la relación entre los predictores y el resultado.

Esto implica que un modelo predictivo requiere monitorización continua y recalibración periódica. La validación no es un evento único, sino un proceso continuo.

## Frente a Frente: Una Comparación Matizada

| **Dimensión** | **Modelo Explicativo (Inferencia)** | **Modelo Predictivo (Generalización)** |
|----|----|----|
| **Pregunta Clave** | ¿Cuál es la relación entre X e Y? | ¿Cuál es el riesgo de Y para un nuevo individuo? |
| **Uso de Datos** | Típicamente, todo el dataset para maximizar la precisión de la estimación. | **Separación estricta Train/Test**. La validación es la métrica de éxito. |
| **Output** | Estimaciones de efectos (OR, HR) y sus Intervalos de Confianza. | Métricas de rendimiento (AUC, Calibración, Brier Score) en datos no vistos. |
| **Peligro Principal** | **Sobreinterpretación causal**: A partir de datos observacionales. Confundir asociación con causa. | **Sobreajuste (Overfitting)** y falsa sensación de rendimiento si la validación no es rigurosa. |

# Conclusión: Más Allá de las Herramientas, una Filosofía de Trabajo

La discusión no debería ser glm vs. xgboost, sino inferencia vs. predicción. La bioestadística moderna y la ciencia de datos responsable no son antagonistas; son dos caras de la misma moneda del conocimiento basado en datos.

- Para el epidemiólogo o investigador clínico, el rigor inferencial sigue siendo el pilar para generar hipótesis.

- Para el clínico o gestor de salud que busca una herramienta de apoyo a la decisión, la validación predictiva rigurosa no es negociable.

El profesional de datos en salud del siglo XXI debe ser bilingüe. Debe entender la cautela de la inferencia causal y, al mismo tiempo, dominar el proceso de desarrollo y validación de modelos predictivos que sean robustos, fiables y, sobre todo, honestos sobre su propia incertidumbre y limitaciones.

Nuestro rol es ser, como diría un estadístico sabio, tanto escépticos como constructores. Escépticos de nuestras propias suposiciones y constructores de herramientas que, aunque no sueñen, nos ayuden a tomar decisiones más inteligentes.

# Bibliografía y Lecturas Recomendadas

<div id="refs" class="references csl-bib-body hanging-indent" entry-spacing="0">

<div id="ref-harrelljr2015" class="csl-entry">

Harrell Jr, Frank E. 2015. *Regression Modeling Strategies*. 1era ed. New York: Springer.

</div>

<div id="ref-leisch" class="csl-entry">

Leisch, Friedrich, and Evgenia Dimitriadou. n.d. “Mlbench: Machine Learning Benchmark Problems.” <https://doi.org/10.32614/CRAN.package.mlbench>.

</div>

<div id="ref-ryu2022" class="csl-entry">

Ryu, Leeha, and Kyunghwa Han. 2022. “Machine Learning vs. Statistical Model for Prediction Modelling: Application in Medical Imaging Research.” *Journal of the Korean Society of Radiology* 83 (6): 1219. <https://doi.org/10.3348/jksr.2022.0111>.

</div>

<div id="ref-silvaaycaguer1998" class="csl-entry">

Silva Aycaguer, Patricio Suárez. 1998. *Cultura Estadística e Investigación Científica En El Campo de La Salud: Una Mirada Crítica*. Madrid: Diaz de Santos.

</div>

<div id="ref-steyerbergLibro2009" class="csl-entry">

Steyerberg, E. 2009. *Clinical Prediction Models*. 1th ed. Statistics for Biology and Health. USA: Springer.

</div>

</div>
