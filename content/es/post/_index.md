---
title: BioestadísticaEdu
date: "2024-05-19"
type: landing

sections:

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOQUE 1: MANIFIESTO (1 post destacado)
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: manifiesto
    content:
      title: "📜 Manifiesto BioestadísticaEdu"
      subtitle: "Nuestra misión y visión"
      count: 1
      page_type: post
      filters:
        tag: "manifiesto"
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: card
      columns: '1'

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOQUE 2: TODOS LOS POSTS (cronológico)
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: todos-los-posts
    content:
      title: "📝 Últimas las Publicaciones"
      subtitle: "Ordenadas por fecha de publicación"
      text: >
        Todo el contenido publicado en BioestadísticaEdu,
        desde tutoriales hasta análisis y reflexiones.
      count: 4
      page_type: post
      filters:
        tag: "post" # poner bioestaditica para lo que no sea EC
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: article-grid
      columns: '2'
  # 
   # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOQUE 3: Bioestadística y metodología de la investigación
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: experimentos
    content:
      title: "Bioestadística y Metodología de la investigación"
      subtitle: "Museo de los horrores metodológicos, experimentos en el aula y más"
      text: >
        Publicaciones sobre metodología de la investigación,
        bioestadística y buenas prácticas .
      count: 6
      page_type: post
      filters:
        tag: "experimento en el aula"
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: article-grid
      columns: '2'

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOQUE 4: ENSAYOS CLÍNICOS Y REGULATORIA
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: evaluacion-regulatoria
    content:
      title: "💊 Ensayos Clínicos y Evaluación Regulatoria"
      subtitle: "ICH, FDA, EMA y marcos regulatorios"
      text: >
        Publicaciones sobre diseño de ensayos clínicos,
        normativas regulatorias y buenas prácticas estadísticas.
      count: 6
      page_type: post
      filters:
        tag: "evaluacion-regulatoria"
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: article-grid
      columns: '2'

---


