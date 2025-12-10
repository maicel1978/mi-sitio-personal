---
title: "Experimento en el aula: ¿Pueden los estudiantes engañar a un bioestadístico? Un concurso de análisis forense de datos"
subtitle: "Donde tres residentes intentaron engañar a la estadística (y perdieron espectacularmente)"
author: "admin"
date: 2025-10-15
categories: ["Metodología de Investigación"]
tags: 
  - "fraude científico"
  - "estadística forence"
  - "detección de datos falsos"
  - "educación médica"
slug: concurso-mientele-profesor
summary: "Pedí a mis residentes que inventaran datos de hemoglobina en 60 segundos. Usé seis técnicas forenses para atraparlos. Spoiler: La estadística siempre gana."
featured: true
draft: true# True para un borrador
---
<script src="{{< blogdown/postref >}}index_files/kePrint/kePrint.js"></script>
<link href="{{< blogdown/postref >}}index_files/lightable/lightable.css" rel="stylesheet" />
<script src="{{< blogdown/postref >}}index_files/kePrint/kePrint.js"></script>
<link href="{{< blogdown/postref >}}index_files/lightable/lightable.css" rel="stylesheet" />
<script src="{{< blogdown/postref >}}index_files/kePrint/kePrint.js"></script>
<link href="{{< blogdown/postref >}}index_files/lightable/lightable.css" rel="stylesheet" />



## Acto I: El Experimento

### El momento en que supieron que habían perdido

A las 11:07 de la mañana, aula de postgrado de la [Universidad de Ciencias Médicas de la Habana  (UCMH)](https://ucmh.sld.cu/), **La Confiada** dejó caer el bolígrafo.

En la pantalla del retroproyector, el histograma de sus datos mostraba un patrón inusual. Sus valores de hemoglobina *—42 números cuidadosamente inventados usando su conocimiento de fisiología humana—* acababan de ser expuestos como **falsos**.

Junto a ella, **La Prudente** miraba su propio veredicto: una **varianza inexplicable**.

**La Entusiasta**, que había escrito 50 valores en 60 segundos apostando
por la cantidad sobre la calidad, tenía la expresión de quien acaba de
descubrir que su estrategia era la *menos mala*.

**Todo había comenzado media hora antes con una instrucción simple:**

{{% callout warning %}} 

Tienen 60 segundos. Escriban todos los valores de **concentración de hemoglobina en sangre de  mujeres adultas (15-49 años)** que puedan inventar. Sin referencias. Sin calculadora. El  que engañe mejor a las pruebas estadísticas, gana.

{{% /callout %}}

Lo que no sabían es que **los humanos somos terribles inventado datos**. No porque seamos honestos, sino porque nuestro cerebro produce errores predecibles al generar datos aparentemente aleatorios.

Y yo tenía exactamente las herramientas para encontrarlos.


### Los Sospechosos y su Coartada

Antes de la autopsia, conozcamos a nuestros participantes, médicos residentes de áreas básicas (fisiología, embriología, farmacología, etc.) que cursaban la asignatura de *"Metodología de la investigación y estadística"* en el curso 2022-2023:


| Participante | Estrategia Declarada |
|------------|---------------------|
| **Luidmila** *(La Prudente)* | *"Voy a quedarme en el rango seguro, nada muy extremo."* |
| **Betsy** *(La Entusiasta)* | *"Voy a escribir muchos números para que parezca más real y ganar por cantidad de valores."* |
| **Melissa** *(La Confiada)* | *"Sé fisiología. Esto va a ser fácil."* |


{{% callout warning %}}
**Spoiler:** casi ninguna estrategia funcionó.
{{% /callout %}}

------------------------------------------------------------------------

### La escena del crimen: Mucha sangre

En la escena había mucha sangre... o al menos uno de sus componentes: la Hemoglobina.

Es una proteína vital en la respiración celular, pero aquí no nos interesa su biología, sino su comportamiento estadístico.

Porque para que una mentira sea creíble, primero hay que conocer la verdad:

{{% callout note %}} 

### Valores de referencia de la concentración de hemoglobina en sangre (mujer adulta) en g/L

| Parámetro           | Valor poblacional           |
|---------------------|-----------------------------|
| Rango normal (min- max) | 121 – 151 g/L           |
| Media poblacional   | 136 g/L                     |
| Desviación estándar | 7.5 g/L                     |

{{% /callout %}}

Armadas con este conocimiento —o su vaga memoria de él—, las participantes escribieron furiosamente durante 60 segundos en sus archivos de Excel todas las cifras que pudieron.

{{% callout note %}}
**El resultado:** *127 valores inventados* listos para el **análisis forense**.
{{% /callout %}}

------------------------------------------------------------------------

## Acto II: La autopsia estadística (Las 5 Pruebas)

### Primera prueba: El Anclaje (La Media)

Empecemos por lo fácil. **¿La media aritmética del conjunto de datos inventados se parecen al valor real?**


<table class="table table-striped" style="margin-left: auto; margin-right: auto;border-bottom: 0;">
 <thead>
  <tr>
   <th style="text-align:left;"> Participante </th>
   <th style="text-align:right;"> Valores </th>
   <th style="text-align:right;"> Media aritmética </th>
   <th style="text-align:right;"> Error de estimación </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> La Confiada </td>
   <td style="text-align:right;"> 18 </td>
   <td style="text-align:right;"> 119.4 </td>
   <td style="text-align:right;"> -16.6 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> La Entusiasta </td>
   <td style="text-align:right;"> 50 </td>
   <td style="text-align:right;"> 125.9 </td>
   <td style="text-align:right;"> -10.1 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> La Prudente </td>
   <td style="text-align:right;"> 42 </td>
   <td style="text-align:right;"> 125.3 </td>
   <td style="text-align:right;"> -10.7 </td>
  </tr>
</tbody>
<tfoot><tr><td style="padding: 0; " colspan="100%">
<span style="font-style: italic;">nota:</span> <sup></sup> Error de estimación= Parámetro estimado (Media aritmética (Hb g/l)) - Parámetro poblacional (Hb: 136 g/l)</td></tr></tfoot>
</table>

#### Resultado

{{% callout note %}}
**Resultado | Fase I (Sin Información Previa):**
Una ligera tendencia a subestimar la media —una suerte de 'anemia estadística'— se manifestó bajo presión temporal, con todas las participantes sesgando sus estimaciones hacia valores inferiores.
{{% /callout %}}

{{% callout note %}}
**Resultado | Fase II (Con Información Previa):**
El grupo corrigió la Media casi a la perfección cuando la referencia fue mostrada explícitamente.
{{% /callout %}}

#### ¿Por qué ocurre esto?

Sin una referencia numérica, el clínico no estima valores a partir de una distribución estadística, sino que recurre a categorías diagnósticas aprendidas (“anemia leve”, “normal”). Bajo presión temporal, este mecanismo cognitivo favorece un juicio conservador: ante la duda, resulta más prudente subestimar la hemoglobina —atribuyéndola a una anemia leve— que sobreestimarla y sugerir una condición menos frecuente, como la policitemia.

Sin embargo, cuando se muestra la media poblacional (136 g/L), la estimación se ajusta casi de inmediato. La media actúa entonces como un punto de referencia claro y fácil de imitar, que permite calibrar el juicio con mayor precisión.



------------------------------------------------------------------------

### Segunda prueba: La Textura (La Variabilidad)

Aquí llegamos al primer hallazgo crucial: fallaron en simular la desviación estándar (SD), incluso cuando el valor real (7.5 g/L) estuvo frente a ellas.

**La media es fácil de corregir; la desviación estándar no.** Examinemos con detalle lo ocurrido. 


|Participante  |   sd| min| max| Error de estimación|
|:-------------|----:|---:|---:|-------------------:|
|La Confiada   | 10.0| 102| 134|                 2.5|
|La Entusiasta | 13.4| 102| 152|                 5.9|
|La Prudente   |  9.7| 103| 141|                 2.2|

#### Resultado

{{% callout note %}}
**Veredicto:** Todas exageraron la variabilidad. Nadie se acercó al 7.5 g/L.
{{% /callout %}} 
  
Curiosamente, a diferencia de la media (donde se quedaron cortas), aquí todas exageraron la variabilidad.
  
- La Entusiasta generó un caos considerable (SD 13.4 g/L), estirando los datos desde 102 g/L hasta 152 g/L.

- La Confiada y La Prudente se alejaron del objetivo inflando la desviación, pero con un patrón revelador: *La asimetría del miedo*.

Observen sus rangos: no tuvieron miedo de bajar hasta 102 g/L o 103 g/L (muy lejos del piso normal de 121 g/L), pero apenas se atrevieron a subir hasta 134 g/L o 141 g/L (lejos del límite superior de 151 g/L).

<img src="{{< blogdown/postref >}}index_files/figure-html/grafico_rangos-1.svg" width="960" style="display: block; margin: auto;" />

Al estirar la distribución hacia la izquierda (inventando anemias severas) pero acortarla a la derecha (evitando valores altos), crearon una dispersión antinatural.


#### ¿Por qué ocurre esto?

La figura muestra que las curvas coloreadas son más anchas y torcidas que la distribución normal teórica en negro (SD = 7.5 g/L), con colas largas hacia anemias graves (102-103 g/L) pero cortas en valores altos (hasta 134-141 g/L). Esta "asimetría del miedo" infla la SD, mostrando cómo las participantes priorizaron sesgos clínicos sobre las leyes del azar (Ley de los grandes número).
La desviación estándar no es un número fijo, sino una "textura" evasiva: aunque veas "7.5", el cerebro lucha por evocar sus colas, dispersión y amplitud.
Fallaron al imponer la percepción médica —"anemia común (hasta 102 g/L), policitemia  rara (freno en 134 g/L)"— válida en clínicas, pero letal para fingir una curva normal equilibrada y simétrica.


{{% callout warning %}} **Primera ley del fraude de datos:**
Los humanos **intuyen bien la media**, pero **fracasan simulando la variabilidad**.
{{% /callout %}}

**Nota de justicia para las participantes:**

Siendo justos, con la excepción del caos generado por La Entusiasta, las demás lograron estimaciones clínicamente tolerables. Sus errores (2-3 g/L) caen dentro de la variación biológica normal o el error típico de medición. En un hospital, estos datos no matarían a nadie; pero en una auditoría forense de sus tesis, son huellas dactilares imborrables. 
 


------------------------------------------------------------------------

### Tercera prueba: El último dígito (El rastro del caos)

Esta es mi prueba favorita. Para entenderla, pensemos en una hemoglobina de 136 g/L. Ese número tiene dos partes:

**1. El principio (13.)**: Las dos primeras cifras obedecen a la biología — la médula ósea, el metabolismo, el hierro. Hay orden.

**2. El final (..6):** El último dígito pertenece al azar — un vaso de agua, un respiro, una vibración. Hay aleatoriedad.

En ese componente estocástico, todos los dígitos del 0 al 9 deberían tener la **misma probabilidad: 1/10, o sea, un 10% cada uno.**

Cualquier desviación sostenida de ese 10% deja una huella: *el rastro del sesgo humano.*

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
 <thead>
  <tr>
   <th style="text-align:center;"> Dígito </th>
   <th style="text-align:center;"> La Confiada </th>
   <th style="text-align:center;"> La Entusiasta </th>
   <th style="text-align:center;"> La Prudente </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:center;"> 0 </td>
   <td style="text-align:center;"> 11.1% </td>
   <td style="text-align:center;"> 8% </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">16.7%</span> </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 1 </td>
   <td style="text-align:center;"> 5.6% </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">4%</span> </td>
   <td style="text-align:center;"> 9.5% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 2 </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">16.7%</span> </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">22%</span> </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">16.7%</span> </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 3 </td>
   <td style="text-align:center;"> 11.1% </td>
   <td style="text-align:center;"> 6% </td>
   <td style="text-align:center;"> 11.9% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 4 </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">16.7%</span> </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">2%</span> </td>
   <td style="text-align:center;"> 4.8% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 5 </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">0%</span> </td>
   <td style="text-align:center;"> 14% </td>
   <td style="text-align:center;"> 9.5% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 6 </td>
   <td style="text-align:center;"> 11.1% </td>
   <td style="text-align:center;"> 12% </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">0%</span> </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 7 </td>
   <td style="text-align:center;"> 5.6% </td>
   <td style="text-align:center;"> 12% </td>
   <td style="text-align:center;"> 11.9% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 8 </td>
   <td style="text-align:center;"> 5.6% </td>
   <td style="text-align:center;"> 12% </td>
   <td style="text-align:center;"> 9.5% </td>
  </tr>
  <tr>
   <td style="text-align:center;"> 9 </td>
   <td style="text-align:center;"> <span style=" font-weight: bold;    color: red !important;">16.7%</span> </td>
   <td style="text-align:center;"> 8% </td>
   <td style="text-align:center;"> 9.5% </td>
  </tr>
</tbody>
</table>

Lo vemos mejor en rojo. Las barras que se disparan son las **"huellas del crimen"**:

<img src="{{< blogdown/postref >}}index_files/figure-html/g_utimodig-1.svg" width="960" style="display: block; margin: auto;" />

#### Resultado

{{% callout note %}}
**veredicto:** El análisis revela dos tipos de manipulación: el exceso de orden (pereza) y el exceso de desorden (sobreactuación).
{{% /callout %}}

Para evaluar esto, usamos dos detectores: la Desviación Media (cuánto se equivocan en general) y la Frecuencia de 0 y 5 (cuánto redondearon por comodidad).

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
 <thead>
  <tr>
   <th style="text-align:left;"> Participante </th>
   <th style="text-align:center;"> Desv. Media </th>
   <th style="text-align:center;"> Frecuencia 0 y 5 </th>
   <th style="text-align:right;"> Evaluación </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> La Confiada </td>
   <td style="text-align:center;"> 4.7% </td>
   <td style="text-align:center;"> 11.1% </td>
   <td style="text-align:right;"> Sospechoso: Evitación Artificial </td>
  </tr>
  <tr>
   <td style="text-align:left;"> La Entusiasta </td>
   <td style="text-align:center;"> 4.4% </td>
   <td style="text-align:center;"> 22.0% </td>
   <td style="text-align:right;"> Sospechoso: Patrón Irregular </td>
  </tr>
  <tr>
   <td style="text-align:left;"> La Prudente </td>
   <td style="text-align:center;"> 3.4% </td>
   <td style="text-align:center;"> 26.2% </td>
   <td style="text-align:right;"> Sospechoso: Exceso de Redondeo </td>
  </tr>
</tbody>
</table>

- **La Prudente (El Cerebro Perezoso):** Cayó en la trampa del redondeo. Sus dígitos 0 y 5 suman un 26% (lo natural es 20%). Al inventar datos, su cerebro buscó inconscientemente números "cerrados".

- **La Entusiasta (El Anclaje):** Intentó ser creativa, pero se obsesionó con un número. Obsérvese su pico en el dígito 2 (22% de frecuencia) y la casi desaparición del 4. Sustituyó un patrón obvio por uno oculto.

- **La Confiada (La Sobreactuación):** Todo lo contrario a la Prudente. Su uso del 0 y 5 es sospechosamente bajo (~11%). Al intentar evitar los números redondos para "parecer más aleatoria", terminó generando un patrón artificial de evitación.

#### ¿Por qué ocurre esto?

El cerebro humano busca comodidad cognitiva o intenta burlar al sistema. Inventar aleatoriedad pura consume mucha energía y solemos fallar de dos formas:

1. Redondeo (Caso Prudente): Ante la duda, el cerebro prefiere hitos fáciles (0, 5, números pares) para procesar la información rápido.

2. Evitación (Caso Confiada): Creemos erróneamente que el azar no debe tener patrones ni números redondos. Al evitar poner un "0" o un "5" porque nos parece "demasiado exacto", rompemos la uniformidad natural del caos.

------------------------------------------------------------------------

### Cuarta prueba: El fantasma de Benford (El orden de los principios)

Si el último dígito es el caos, los centrales son la estructura. Aunque la Ley de Benford estricta requiere rangos amplios, su principio básico se mantiene: la naturaleza dispersa, el humano concentra.

En un grupo de personas reales, veríamos hemoglobinas variadas: desde 118 (anemia leve) hasta 165 (atletas o personas que viven a mucha altitud). Habría una distribución amplia.

¿Qué hicieron nuestras participantes? Se refugiaron en el centro.

<img src="{{< blogdown/postref >}}index_files/figure-html/g_benford-1.svg" width="960" style="display: block; margin: auto;" />


#### Resultado

{{% callout warning %}}
**Veredicto:** Fracaso por *"Aversión al Riesgo"*.
{{% /callout %}}

Las participantes crearon una montaña artificial en las decenas del 3 y el 4 (valores de 130 a 149).

**- Inflación del centro:** Casi todos los datos se agolpan en 130-140.

**- Miedo a los extremos:** Eliminaron casi por completo los valores bajos (120s) o altos (150s-160s), que son biológicamente normales.



#### ¿Por qué ocurre esto?

Por el Sesgo de Centralidad.

El cerebro de La Prudente (y las demás) interpreta que la media (136) es "lo correcto" y que alejarse de ella es "arriesgado".

- La naturaleza produce diversidad (curva ancha).

- El mentiroso busca seguridad (curva estrecha y picuda).

Inventar un dato como "121" o "168" les pareció peligroso, así que todas se copiaron la estrategia: "Pon algo por el medio, un 130 y pico, y no te pasará nada". Al hacerlo todas a la vez, el patrón artificial se volvió evidente.

### Quinta prueba:  La Forma de la Mentira – Curtosis y Asimetría

La mirada final es a la "silueta" completa de los datos. Dos parámetros nos delatan:


**Curtosis (Apuntamiento):** ¿Qué tan picuda es la curva? (Indica miedo a desviarse del centro).

**Asimetría (Sesgo):** ¿Hacia qué lado se inclina la curva? (Indica prejuicios clínicos, como "es mejor poner anemias que policitemias").

He superpuesto las curvas de las tres residentes sobre la Biología Real (Sombra Gris). Las diferencias son delatoras.

<img src="{{< blogdown/postref >}}index_files/figure-html/g_distribucion-1.svg" width="960" style="display: block; margin: auto;" />

### Resultado:

{{% callout warning %}}
**Veredicto:** Cada participante dejó una "huella de forma" distinta.
{{% /callout %}}

En la figura: 

- **La Referencia (Línea negra continua):** Es la curva normal teórica, una colina suave y centrada en 136 g/L. Se extiende naturalmente entre los límites clínicos (121-151 g/L, líneas punteadas), aceptando la variabilidad biológica real.

- **La Confiada (Línea azul):** ¡Es una aguja! Presenta **Leptocurtosis extrema**. Su curva es la más alta y estrecha de todas, concentrando casi todos sus valores en un rango mínimo alrededor de 130-140 g/L. Al confiar en su conocimiento teórico, se quedó "paralizada" en el centro. Es la gráfica del perfeccionismo contraproducente.

- **La Prudente (Línea verde):** Es un camello deforme. Su curva muestra **Asimetría Negativa**, derritiéndose claramente hacia la izquierda (valores de 100-120 g/L). Su estrategia de "quedarse en el rango seguro" la llevó a inventar demasiadas anemias moderadas, creando un sesgo patológico evidente.

- **La Entusiasta (Línea roja):** La imitadora. Es la única cuya curva sigue razonablemente bien la forma de la campana normal, aunque algo más estrecha. Su estrategia de "fuerza bruta" (escribir rápido sin sobreanalizar) resultó ser la más efectiva para emular la aleatoriedad natural.


### ¿Por qué ocurre esto?

Porque simular la Normalidad es anormal para el cerebro.

O somos demasiado precisos (La Prudente comprime los datos).
O somos demasiado prejuiciosos (La Confiada sesga los datos hacia lo patológico).
La naturaleza es simétrica y dispersa. El humano es sesgado y temeroso.



## Sexta prueba: Prueba de Rachas 

Las cinco pruebas anteriores fueron el interrogatorio. Nos dieron sospechas fuertes (la SD, el redondeo), pero necesitábamos la prueba forense de ADN que confirmara la intervención humana.

Aquí es donde interviene la Prueba de Rachas.

Este test es un detective implacable. No le interesa el valor específico del dato (si es 135 o 145), solo le importa la secuencia.

¿Cómo funciona?

1. Corte por Mediana: El test ignora los valores y mira solo si cada dato está por encima (+) o por debajo (-) de la mediana (el valor central)

2.Rachas: Cuenta cuántas veces hay un cambio de signo (ej. + + - - - + tiene tres rachas: ++, ---, +).

- Pocas Rachas (Agrupamiento): Indica una tendencia a que los valores se agrupen (ej. + + + - - -), lo que sugiere pereza o un patrón lento.

- Muchas Rachas (Alternancia): Indica que los valores suben y bajan demasiado rápido (ej. + - + - + -), lo que sugiere que la persona está forzando la aleatoriedad.

Veredicto Z-Score: El Z-Score nos dice si el número de rachas observado se desvía de lo que esperaríamos por puro azar.


|Participante  | Z-Score|
|:-------------|-------:|
|La Confiada   |    0.00|
|La Entusiasta |   -1.71|
|La Prudente   |   -0.81|


### Resultado 


El umbral para declarar un dato "No Aleatorio" es |Z| > 1.96. Aunque solo La Entusiasta estuvo cerca del umbral (-1.71, debido a un agrupamiento), el resultado más revelador fue el de La Confiada:

- La Confiada (Z-Score = 0.00): La estadística no la declaró "No Aleatoria"; la declaró "Demasiado Perfecta".Un Z-Score de cero significa que el número de rachas observadas fue exactamente igual al número de rachas que la teoría predice para la aleatoriedad. En datos reales, esto es casi imposible. Es la prueba definitiva de que conscientemente intentó alternar sus valores por encima y por debajo de la mediana para parecer aleatoria.

- La Entusiasta (Z-Score = -1.71): Su Z-Score negativo sugiere demasiadas pocas rachas (tendencia a agrupar valores). Su cerebro, al escribir rápido, cayó en el patrón común de la pereza cognitiva.

### ¿Por qué ocurre esto?

El porqué es simple y aterrador:

1. El Sesgo de Alternancia Negativa: Cuando se nos pide crear una secuencia aleatoria (como tirar una moneda 100 veces), evitamos instintivamente las rachas largas. El cerebro piensa: "no puede salir 'Cara' seis veces seguidas, eso no parece aleatorio". Entonces, forzamos un cambio (de 'Cara' a 'Cruz').

2. El Resultado: Al forzar el cambio, creamos demasiadas alternancias (o demasiadas rachas) de lo que la probabilidad permite, o, en el caso de La Confiada, un número de rachas tan perfecto que delata la sobrecorrección consciente.

{{% callout warning %}}
**Veredicto:** El ser humano es generalmente incapaz de replicar un proceso estocástico sin estudiarlo. El azar no tiene memoria, pero nosotros sí. Nuestro intento de imitar el azar es tan predecible que deja una huella dactilar estadística.
{{% /callout %}}


## Acto III: El Veredicto

Después de este analisis, procedemos a la entrega de premios.

🏆 **Los Premios Pinocho 2023**

🥇 Pinocho de Oro: La Entusiasta

**Por:** Mentir por volumen.

**Veredicto:** Su estrategia de escribir rápido creó tanto caos que, irónicamente, disimuló algunos patrones. Ganó por fuerza bruta, no por habilidad.

🥈 Pinocho de Plata: La Confiada

**Por:** Sobreactuación.

**Veredicto:** Sabía demasiada fisiología. Al intentar evitar conscientemente los ceros y cincos, creó una aleatoriedad tan perfecta que resultaba imposible.

🥉 Pinocho de Bronce: La Prudente

**Por:** Pereza cognitiva.

**Veredicto:** Redondeó todo y se quedó en el centro. Es el fraude más fácil de detectar.


------------------------------------------------------------------------

## Epílogo: Las Tres Leyes del Mentiroso Numérico

El centro es fácil, los extremos dan miedo: Cualquiera inventa un promedio; nadie se atreve a inventar los valores marginales (outliers).

La aleatoriedad es incómoda: El cerebro evita repetir números y patrones, pero el verdadero azar ama las repeticiones (clústeres).

Los números redondos son una trampa: En situaciones de estrés, el 0 y el 5 son imanes irresistibles.


------------------------------------------------------------------------

La próxima vez que revises un paper y los datos te parezcan "demasiado
limpios", recuerda:

> **Los datos reales son incómodos, impredecibles, y a veces feos.**
>
> **Si todo se ve perfecto, probablemente alguien lo perfeccionó.**

Y si alguna vez te tienta fabricar datos, recuerda a La Prudente, La
Entusiasta y La Confiada.

Ellas también creyeron que podían ganar.

**La estadística siempre gana.**

------------------------------------------------------------------------

## Recursos adicionales

**Descarga la Plantillas de código en R para replicar las pruebas forenses y datos del experimento**

- [Datos](experimento.csv).
- [Código](analisis.R).

**Herramientas online:**
- [GRIM Test Calculator](https://www.grimtest.com/) 
- [Benford Online Calculator](https://benfordonline.net/) 
- [StatCheck](https://statcheck.io/)

------------------------------------------------------------------------

## ¡Conviértete en Detective de Datos!

**No te quedes solo con la teoría.** Estas técnicas forenses pueden salvarte de basar tus investigaciones en datos fraudulentos. *¡Ahora es tu turno de aplicarlas!*

💬 **Tu Experiencia Como Detective**  
La comunidad crece cuando compartimos casos reales. **¡Me encantaría leerte en los comentarios!**

- **¿Has detectado alguna vez datos sospechosos en tesis o en papers que hayas revisado?**

- **¿Qué técnica forense te resultó más útil para validar la autenticidad de los datos?**

- **Comparte tu caso más intrigante** - cómo sospechaste y qué técnica te dio la prueba definitiva.

🕵️ **Lleva la Estadística Forense a Tu Próxima Investigación** 

[**Suscríbete a bioestadísticaedu**]({{< relref "/subscribe/" >}}) y recibe directamente en tu bandeja de entrada:

- Plantillas de código para datos cualitativos


{{% callout note %}}
**¡Regalo inmediato al suscribirte!** Te enviaré automáticamente el **kit completo del detective de datos datos cuantitativos y cualitativos**: código R para replicar las  pruebas forenses  + base de datos del experimento para que practiques.
{{% /callout %}}

🔎 **¿Necesitas un Ojo Experto?**

Si enfrentas:
- **Datos sospechosos** en tu investigación que necesitan auditoría forense
- **Revisión por pares** de un artículo con posibles anomalías estadísticas
- **Curso de estadística básica con enfoque forense** para tu equipo de investigación

[**Agenda una consultoría personalizada**]({{< relref "/collaborations/" >}}). Juntos podemos auditar tus datos, entrenar tu equipo en detección de fraudes o desarrollar protocolos de control de calidad para tus investigaciones.

---

## Referencias

- Jameson, J. L., Fauci, A. S., Kasper, D. L., Hauser, S. L., Longo, D. L., & Loscalzo, J. (Eds.). (2018). Harrison's Principles of Internal Medicine (20th ed.). McGraw-Hill Education.

- Benford, F. (1938). The Law of Anomalous Numbers. Proceedings of the American Philosophical Society, *78*(4), 551–572.

- Brown, N. J. L., & Heathers, J. A. J. (2017). The GRIM Test: A Simple Technique Detects Numerous Anomalies in the Reporting of Results in Psychology. Social Psychological and Personality Science, *8*(4), 363–369. https://doi.org/10.1177/1948550616673876

- Carlisle, J. B. (2017). Data fabrication and other reasons for non-random sampling in 5087 randomised, controlled trials in anaesthetic and general medical journals. Anaesthesia, *72*(8), 944–952. https://doi.org/10.1111/anae.13938

- Heathers, J. A. J., & Brown, N. J. L. (2019). SPRITE. PsyArXiv. https://psyarxiv.com/9qfr5/


- Mosimann, J. E., Wiseman, C. V., & Edelman, R. E. (1995). Data fabrication: Can people generate random digits? Accountability in Research, *4*(1), 31–55. https://doi.org/10.1080/08989629508573866

- Nigrini, M. J. (2012). Benford's Law: Applications for Forensic Accounting, Auditing, and Fraud Detection. John Wiley & Sons.

- Simonsohn, U. (2013). Just Post It: The Lesson from Two Cases of Fabricated Data Detected by Statistics Alone. Psychological Science, *24*(10), 1875–1888. https://doi.org/10.1177/0956797613480366

- Wald, A., & Wolfowitz, J. (1940). On a test whether two samples are from the same population. The Annals of Mathematical Statistics, *11*(2), 147–162.
