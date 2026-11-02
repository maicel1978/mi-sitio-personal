---
date: "2024-03-25"
image:
  caption: Transforma datos en soluciones con R para la fortificación de alimentos
math: false
summary: "Aprende a usar R para analizar datos relacionados con la fortificación de alimentos. Este curso práctico te guiará desde los conceptos básicos hasta la generación de informes profesionales."
tags:
  - "conferencia"
  - "curso"
title: "Curso de Análisis de datos en fortificación de alimentos a gran escala con R. Una Introducción Práctica"
author: "admin"
type: page
---

# ¡Construye investigaciones con R!

En este curso, te convertirás en un **'arquitecto' del análisis de datos en la fortificación de alimentos**, utilizando R como tu herramienta principal. Aprenderás a:

-   leer datos.
-   ordenar y transformar conjuntos de datos.
-   procesar y presentar los resultados en forma de tablas y gráficos.

👉 ¡Para saber más del curso, consulta nuestra [conferencia introductoria](https://ia601803.us.archive.org/17/items/conf_0/conf_0.pdf), mira el siguiente **video promocional** o escucha el **podcast**!

------------------------------------------------------------------------

## Video promocional del curso

Mira el video promocional del curso:

{{< youtube ycnteDZRMxM >}}

------------------------------------------------------------------------

## Podcast

Escucha nuestro podcast introductorio para conocer más sobre los contenidos que serán abordados en el curso:

Pruébelo:

{{< audio src="https://ia601805.us.archive.org/26/items/podcast-r/PodcastR.mp3" >}}

------------------------------------------------------------------------

## ¿Qué aprenderás?

Este curso está diseñado para profesionales interesados en el estudio de la fortificación de alimentos a gran escala. Aquí tienes un vistazo rápido:

{{< spoiler text="👉 Haz clic para ver el contenido del curso" >}}
- **Tema I**: Introducción a R y RStudio.
- **Tema II**: Importación de datos.
- **Tema III**: Ordenar datos.
- **Tema IV**: Manipulación de datos.
- **Tema V**: Representación tabular.
- **Tema VI**: Representación gráfica.
- **Tarea Final**: Informes con R Markdown. 
{{< /spoiler >}}

------------------------------------------------------------------------

## Calendario del Curso

**Estructura Diaria** Cada día incluye sesiones teóricas, prácticas, descansos y actividades gamificadas.  
**Sesiones teóricas**: Conferencias interactivas con ejemplos de fortificación de alimentos a gran escala.  
**Sesiones prácticas**: Ejercicios guiados y retos diarios.  
**Coffee breaks**: 15 minutos entre bloques.

*Descargue la agenda del curso en formato* [**PDF**](/pdf/agenda.pdf):

{{% callout note %}} El **Calendario del curso** podría variar en dependencia del progreso de las actividades docentes y cuestiones logísticas. {{% /callout %}}

| Horario | Día 1 (martes) | Día 2 (miércoles) | Día 3 (Jueves) |
|------------------|-------------------|------------------|------------------|
| **Mañana** 🌞 | [**introducción**](/pdf/conf_0.pdf), [**Conf. Tema I**](/pdf/conf_1.pdf) | [**Conf. Tema III**](/pdf/conf_3.pdf) | [**Conf. Tema V**](/pdf/conf_5.pdf) |
| **Coffee breaks** ☕ | ☕ | ☕ | ☕ |
| **Mañana** 🌞 | [Pract. Tema I](/pdf/desaf_1.pdf) | [Pract. Tema III](/pdf/desaf_3.pdf) | [**Conf. Tema VI**](/pdf/conf_6.pdf) |
| **Almuerzo** 🍽️ | 🍽️ | 🍽️ | 🍽️ |
| **Tarde** 🌆 | [Conf. Tema II](/pdf/conf_2.pdf) | ️ [Conf. Tema IV](/pdf/conf_4.pdf) | ️[Pract. Tema V](/pdf/desaf_5.pdf) |
| **Coffee breaks** ☕ | ☕ | ☕ | ☕ |
| **Tarde** 🌆 | [Pract. Tema II](/pdf/desaf_2.pdf) | ️[Pract. Tema IV](/pdf/desaf_4.pdf) | ️[Pract. Tema VI](/pdf/desaf_6.pdf) |

------------------------------------------------------------------------

## Estructura de módulos

A continuación, te presentamos la estructura detallada de los módulos del curso, basada en el flujo de trabajo propuesto en el libro [R for Data Science](https://es.r4ds.hadley.nz/) de Hadley Wickham y Garrett Grolemund. Cada módulo está diseñado para guiarte paso a paso en el análisis de datos relacionados con la fortificación de alimentos.

### **Tema I: Introducción a R y RStudio**

-   **Objetivo**: Familiarizarse con el entorno de trabajo.
-   **Contenido clave**:
    -   ¿Qué es R y por qué es útil en ciencias de la salud?
    -   Instalación y configuración de R y RStudio.
    -   Interfaz de RStudio: Consola, script, ambiente, gráficos.
    -   Creación de objetos básicos (vectores, listas, data frames).
-   🚀 **Conferencia**: Conferencia 1 en formato [PDF](/pdf/conf_1.pdf).
-   🎉 **Desafío 1**: Hierro -- Cimientos de Código [PDF](/pdf/desaf_1.pdf).
-   😊 **Recompensa** : Insignia 🏗️ "Cimientos Sólidos" .

### **Tema II: Importación de datos**

-   **Objetivo**: Aprender a leer datos desde diferentes formatos.
-   **Contenido clave**:
    -   Leer archivos CSV usando `readr`.
    -   Leer archivos Excel usando `readxl`.
    -   Manejo de problemas comunes (codificación, separadores, valores perdidos).
-   🚀 **Conferencia**: Conferencia 2 en formato [PDF](/pdf/conf_2.pdf).
-   🎉 **Desafío 2**: Zinc -- Puertas a los Datos [PDF](/pdf/desaf_2.pdf).
-   📚 **Datos**: Base de datos de nutrición [csv](/csv/nutricion.csv). Datos sintéticos, creados con fines docentes; no corresponden a personas reales.
-   📚 **Script**: código en R [zip](/r/fortificacion_temaII.zip).
-   😊 **Recompensa** : Insignia 🪓 "Estructuras Estables".
-   📚 **Bibliografía**: [Capítulo 11: Importar datos](https://es.r4ds.hadley.nz/11-import.html).

### **Tema III: Ordenar datos**

-   **Objetivo**: Aprender a organizar y limpiar datos para facilitar su análisis.
-   **Contenido clave**:
    -   Reorganizar columnas y filas con `tidyr`.
    -   Convertir datos de formato ancho a largo (y viceversa) con `pivot_longer()` y `pivot_wider()`.
    -   Separar y combinar columnas.
-   🚀 **Conferencia**: Conferencia 3 en formato [PDF](/pdf/conf_3.pdf).
-   🎉 **Desafío 3**: Vitamina A -- Claridad en la Oscuridad [PDF](/pdf/desaf_3.pdf).
-   😊 **Recompensa** : Insignia 🌟 "Datos Transparentes"
-   📚 **Bibliografía**: [Capítulo 12: Tibbles](https://es.r4ds.hadley.nz/tibbles.html) y [Capítulo 13: Datos limpios](https://es.r4ds.hadley.nz/datos-limpios.html).

### **Tema IV: Manipulación de datos**

-   **Objetivo**: Aprender a transformar y resumir datos.
-   **Contenido clave**:
    -   Filtrar, seleccionar y ordenar datos con `dplyr`.
    -   Crear nuevas variables con `mutate()`.
    -   Resúmenes estadísticos básicos con `summarise()`.
-   🚀 **Conferencia**: Conferencia 4 en formato [PDF](/pdf/conf_4.pdf).
-   🎉 **Desafío 4**: Ácido Fólico -- Datos que Nutren [PDF](/pdf/desaf_4.pdf).
-   😊 **Recompensa** : Insignia 🌱 "Transformación Vital"
-   📚 **Bibliografía**: [Capítulo 5: Data Transformation](https://es.r4ds.hadley.nz/transformacion.html).

### **Tema V: Representación tabular**

-   **Objetivo**: Aprender a generar tablas profesionales.
-   **Contenido clave**:
    -   Realizar análisis básicos.
    -   Generar tablas resumen con `gtsummary`.
-   🚀 **Conferencia**: Conferencia 5 en formato [PDF](/pdf/conf_5.pdf).
-   🎉 **Desafío 5**: Yodo -- Iluminando Hallazgos [PDF](/pdf/desaf_5.pdf).
-   😊 **Recompensa** : Insignia 💡 "Insight Brillante"

### **Tema VI: Representación gráfica**

-   **Objetivo**: Aprender a visualizar datos.
-   **Contenido clave**:
    -   Crear gráficos básicos con `ggstatsplot` (barras, líneas, dispersión).
    -   Personalizar gráficos para comunicar hallazgos clave.
-   🚀 **Conferencia**: Conferencia 6 en formato [PDF](/pdf/conf_6.pdf).
-   🎉 **Desafío 6** [PDF](/pdf/desaf_6.pdf).
-   😊 **Recompensa** : Insignia 💡 "Insight Brillante"

## Conclusiones y recomendaciones.

## Notas Adicionales

1.  Gamificación :

-   Cada práctica desbloquea una insignia virtual (ejemplo: 🏗️ Cimientos Sólidos , 🪴 Transformación Vital ).

------------------------------------------------------------------------

## Bibliografía

-   libro [R Para Ciencia de Datos: Hadley Wickham](https://es.r4ds.hadley.nz/)
