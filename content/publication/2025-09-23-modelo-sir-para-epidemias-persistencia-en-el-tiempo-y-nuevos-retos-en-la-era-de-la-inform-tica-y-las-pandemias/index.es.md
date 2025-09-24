---
abstract: 'Este estudio revela las lecciones más impactantes del modelo matemático SIR de 1927, que describe la propagación de epidemias. A través de este modelo, se revelan conceptos como el "umbral epidémico", la importancia de la simplicidad en la modelación y un método para predecir el pico de un brote usando datos iniciales. El post adapta el contenido del artículo original, escrito antes de la pandemia de COVID-19, para demostrar la vigencia de estas ideas en el contexto de las crisis sanitarias modernas, subrayando la importancia de la conexión entre los modelos matemáticos y la toma de decisiones en salud pública.'
authors: ["admin"]
date: "2020-08-01T00:00:00Z"
links:
- name: Artículo Original (pdf)
  url: https://revhabanera.sld.cu/index.php/rhab/article/download/4943/3276
projects:
- ""
publication: 'Revista Habanera de Ciencias Médicas'
publication_short: 'Rev haban cienc méd'
publication_types:
- article-journal
publishDate: "2020-08-01T00:00:00Z"
slides: ""
summary: 'Un estudio sobre revistas biomédicas cubanas revela la alta frecuencia de plagio y la necesidad de una intervención educativa.'
tags:
- Modelacion
- Epidemiología
- Pandemias
title: 'Modelo SIR para epidemias: Persistencia en el tiempo y nuevos retos en la era de la Informática y las pandemias.'
url_code: ""
url_dataset: ""
url_pdf: "http://www.rcim.sld.cu/revista_13/articulos_pdf/modelosir.pdf"
url_poster: ""
url_project: ""
url_slides: ""
url_source: "http://www.rcim.sld.cu/revista_13/articulos_htm/modelosir.htm"
url_video: ""
featured: true 
draft: false 
---



# **Introducción: Un Mapa Centenario para las Crisis Modernas**

En los últimos años, hemos vivido en carne propia la incertidumbre de una pandemia global. Todos anhelábamos tener una bola de cristal para predecir el siguiente pico o el impacto de las medidas de salud pública. Lo que pocos saben es que, mucho antes de la COVID-19, uno de los modelos matemáticos más poderosos para entender y anticipar el comportamiento de las epidemias no era una creación de la era de la supercomputación, sino una idea elegante propuesta en 1927.

Este es el modelo SIR (Susceptible, Infectado, Removido), una herramienta conceptual que, a casi un siglo de su creación, sigue revelando verdades fundamentales sobre la propagación de las enfermedades. A continuación, te invito a explorar las lecciones más impactantes que este modelo centenario nos ofrece, basadas en mi artículo original, publicado antes de la pandemia de COVID-19.



# **1. El "Efecto Umbral": Por qué no es necesario vacunar a todos para detener una epidemia**

El modelo SIR revela un concepto matemático conocido como el "umbral epidémico". Esto significa que una epidemia solo puede desatarse y propagarse si el número de personas susceptibles en una comunidad supera un cierto punto crítico. Si la cantidad de susceptibles está por debajo de ese umbral, el brote se extingue por sí solo. Piénselo como un incendio forestal. Si los árboles (los susceptibles) están demasiado separados, una chispa (un infectado) se extinguirá sola. Solo cuando la densidad de árboles supera un umbral crítico, el fuego se propaga sin control.

Esta idea es revolucionaria por su implicación práctica. Demuestra matemáticamente que el objetivo de una campaña de vacunación no tiene por qué ser inmunizar al 100 % de la población. El verdadero objetivo es reducir el número de personas susceptibles hasta que caiga por debajo de ese umbral crítico, rompiendo así la cadena de transmisión de manera efectiva. Esto valida estrategias de salud pública que deben priorizar recursos limitados. Como señalan los autores del estudio:

 Este resultado teórico nos muestra que la vacunación selectiva cuando no es posible extenderla a toda la comunidad no es una opción impracticable, pues el número de susceptibles no tiene necesariamente que ser igual cero.



# **2. El Poder de lo Simple: Cómo un Modelo de Tres Pasos Descifra la Complejidad**

La genialidad del modelo SIR es una lección de humildad intelectual. Divide a toda la población en solo tres grupos: los **Susceptibles** (que pueden enfermar), los **Infectados** (que tienen la enfermedad y pueden contagiar) y los **Removidos**. Este último grupo incluye a quienes salen de la categoría de infectados por distintos mecanismos: el curso natural de la enfermedad con inmunidad adquirida, la muerte o la cuarentena. El modelo se basa en ideas que, como indica la fuente, "hasta una persona sin preparación especial" entiende: las enfermedades se contagian y, tras un tiempo, la gente deja de ser infecciosa.

Aunque la realidad es mucho más compleja, la capacidad predictiva de este modelo básico es asombrosa. Logra capturar la esencia del comportamiento de una epidemia sin perderse en detalles que lo harían intratable.

 Lo que resulta sorprendente es que un modelo tan simple sea capaz de corresponderse con un gran número de situaciones reales.

En la modelación matemática siempre existe un compromiso: el modelo debe ser lo bastante simple para ser manejable, pero lo bastante completo para reflejar la realidad. El modelo SIR demuestra que, a veces, la solución más elegante y útil es también la más sencilla.



# **3. La "Curva Universal": La Sorprendente Similitud Matemática de las Epidemias**

Los creadores del modelo, Kermack y McKendrick, encontraron una solución matemática simplificada (la función de secante hiperbólica) que describe con gran precisión la curva de "removidos". Esta curva representa la velocidad a la que las personas salen del grupo de 'Infectados' para entrar al grupo de 'Removidos' (ya sea por recuperación, aislamiento o fallecimiento). En la práctica, esta curva se asemeja mucho a la curva de nuevos casos que vemos en las noticias, pero con un ligero desfase.

Lo más sorprendente es que esta forma matemática no solo se ajusta a epidemias que siguen el modelo SIR, como un brote de gripe, sino que también describe notablemente bien epidemias con mecanismos mucho más complejos, como el dengue, donde la transmisión depende de la interacción entre humanos y mosquitos. Este hallazgo es extraordinario porque sugiere que, a pesar de las diferencias biológicas (un virus respiratorio frente a uno transmitido por mosquitos), la dinámica matemática de la propagación masiva comparte una firma universal, un ritmo predecible. Por ejemplo, en el análisis de un brote en una escuela interna, esta simple función explicó el 95 % de la varianza de los datos.



# **4. Una "Bola de Cristal" Matemática: Prediciendo el Pico con los Primeros Datos**

Mucho antes del 'big data' y el aprendizaje automático, este modelo de 1927 ya ofrecía un enfoque de 'small data' para la predicción que sigue siendo increíblemente poderoso. Quizás la aplicación más innovadora, propuesta por los propios autores del estudio que sirve de fuente a este artículo, es una metodología para predecir el curso completo de una epidemia utilizando únicamente los datos de su fase inicial. Descubrieron que si se toman los datos de incidencia diaria del inicio de un brote y se transforman matemáticamente (calculando la raíz cuarta de su recíproco), esos puntos forman una línea recta.

La genialidad de este truco matemático es que convierte un problema complejo (predecir una curva) en uno simple (extender una línea recta). Una vez que tienes una línea, puedes ver fácilmente hacia dónde se dirige, dándote un pronóstico del pico epidémico con una antelación crucial. Este método no es solo un ejercicio teórico; se aplicó con éxito a datos históricos reales, como la epidemia de peste en Bombay (1905-1906) y una epidemia de dengue en Santiago de Cuba (1997), demostrando su utilidad para que las autoridades evalúen la severidad de un brote y se preparen en consecuencia.



# **Conclusión: La Vigencia de las Ideas Elegantes**

En una era que venera la complejidad computacional, la lección más profunda del modelo SIR es la perdurable potencia de la elegancia matemática. Casi un siglo después, sus tres simples pasos siguen ofreciendo un mapa más claro de las crisis sanitarias que muchos algoritmos modernos. A raíz de la reciente pandemia, la conexión entre estos modelos y quienes toman las decisiones es más crucial que nunca. Como señalo en el artículo original:


 ...lograr romper las barreras que alejan la organización de los modelos matemáticos de los proveedores de salud podría revertirse en tomas de decisiones más justas...

Este estudio, que realicé antes de la COVID-19, demuestra que las herramientas para entender y prepararnos para eventos como este ya existían en la literatura científica. Te invito a leer el artículo completo para profundizar en estos conceptos y su aplicación.

**[Lee mi artículo completo: "Modelos matemáticos en epidemiología. Una aplicación a la predicción del pico epidémico"](http://www.rcim.sld.cu/revista_13/articulos_htm/modelosir.htm)**

En un mundo obsesionado con la complejidad y los "big data", ¿qué otras soluciones simples y elegantes podríamos estar pasando por alto?



# **Podcast y más...**


🎧 **Escucha el podcast de esta publicación**
{{< audio src="/mp3/articulo02SIR.mp3" controls="yes" >}}

# Bibliografía

Argote, K. MEM, Caceres JLH, Monzon MP. Modelo “SIR” para epidemias: Persistencia en el tiempo y nuevos retos en la era de la Informatica y las pandemias. [citado 12 de octubre de 2012]; Disponible en: http://www.bvs.hn/cu-2007/ponencias/SLD/SLD126.pdf



