---
abstract: Un estudio realizado en Cuba durante la pandemia de COVID-19 utilizó un modelo de árboles de clasificación para identificar pacientes con bajo riesgo de desarrollar complicaciones graves. Este modelo se ajustó para predecir la admisión en la UCI y la mortalidad, basándose en factores como la edad y la presencia de comorbilidades. El objetivo fue crear una herramienta que permitiera identificar a los pacientes que podrían ser seguidos de forma segura en atención primaria, optimizando así los recursos hospitalarios. Los árboles de decisión demostraron ser precisos en la clasificación de riesgo, lo que podría favorecer una mejor asignación de recursos y una atención sanitaria más eficiente.
authors: ["admin"]
date: "2021-04-07T00:00:00Z"
doi: ""
featured: true
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/s9CC2SKySJM)'
  focal_point: ""
  preview_only: false
links:
- name: Custom Link
  url: https://revhabanera.sld.cu/index.php/rhab/article/view/4943
projects:
- internal-project
publication: ""
publication_short: ""
publication_types:
- article
publishDate: "2023-02-01T00:00:00Z"
slides: example
summary: Un estudio realizado en Cuba durante la pandemia de COVID-19 utilizó un modelo de árboles de clasificación para identificar pacientes con bajo riesgo de desarrollar complicaciones graves. Este modelo se ajustó para predecir la admisión en la UCI y la mortalidad, basándose en factores como la edad y la presencia de comorbilidades. El objetivo fue crear una herramienta que permitiera identificar a los pacientes que podrían ser seguidos de forma segura en atención primaria, optimizando así los recursos hospitalarios. Los árboles de decisión demostraron ser precisos en la clasificación de riesgo, lo que podría favorecer una mejor asignación de recursos y una atención sanitaria más eficiente.
tags:
- machine learning
- triaje
title: Identificación de pacientes de bajo riesgo de severidad en confirmados de la COVID-19. Cuba. Años 2020-2021
url_code: https://github.com/maicel1978/ABR
url_dataset: '#'
url_pdf: https://revhabanera.sld.cu/index.php/rhab/article/download/4943/3276
url_poster: https://docs.google.com/presentation/d/e/2PACX-1vTqmn0xKRJXd3Nb0KMR3bsj0FcJET5Tjlf2DwT6OiDOwu9_K7XHYpd_tMpJRW3HiHerhBJQ532NzrV4/pub?start=false&loop=false&delayms=3000
url_project: ""
url_slides: https://docs.google.com/presentation/d/e/2PACX-1vTqmn0xKRJXd3Nb0KMR3bsj0FcJET5Tjlf2DwT6OiDOwu9_K7XHYpd_tMpJRW3HiHerhBJQ532NzrV4/pub?start=false&loop=false&delayms=3000
url_source: https://revhabanera.sld.cu/index.php/rhab/article/view/4943
url_video: '#'
---

Este trabajo está impulsado por los resultados de mi [artículo anterior](https://revhabanera.sld.cu/index.php/rhab/article/view/4943) sobre desarrollo de modelos predictivos para el triaje.


{{% callout note %}}
El modelo empleado conocido como **ABR** se actualizó posteriormente en mi tesis de doctorado.
{{% /callout %}}

Los detalles del modelo **ABR** se pueden consultar en el [artículo ](https://revhabanera.sld.cu/index.php/rhab/article/view/4943) titulado *Identificación de pacientes de bajo riesgo de severidad en confirmados de la COVID-19. Cuba. Años 2020-2021*


```mermaid
graph TD
    A[edad] --> B[< 65]
    A --> C[>= 65]
    
    B --> D[comorbilidades]
    C --> E[comorbilidades]
    
    D --> F[no]
    D --> G[sí]
    E --> H[no]
    E --> I[sí]
    
    F --> J["0.003"]
    G --> K["0.004"]
    H --> L["0.027"]
    I --> M["0.041"]

    classDef green fill:#98FB98,stroke:#333,stroke-width:2px;
    classDef lightRed fill:#FFCCCC,stroke:#333,stroke-width:2px;
    classDef mediumRed fill:#FF9999,stroke:#333,stroke-width:2px;
    classDef darkRed fill:#FF6666,stroke:#333,stroke-width:2px;

    class A,B,C,D,E,F,G,H,I green
    class J green
    class K lightRed
    class L mediumRed
    class M darkRed
```

**Figura 1. Árbol de bajo riesgo**


La actualización de este modelo se encuentra disponible en la  [tesis de dotorado ](https://www.researchgate.net/publication/388656780_MODELOS_PREDICTIVOS_PARA_LA_ESTIMACION_Y_CLASIFICACION_DEL_RIESGO_DE_MUERTE_EN_COVID-19) titulada  *MODELOS PREDICTIVOS PARA LA ESTIMACIÓN Y CLASIFICACIÓN DEL RIESGO DE MUERTE EN COVID-19*



