---
title: Blog BioestadísticaEdu
date: "2026-02-04"
type: landing
design:
  spacing: 5rem

sections:

  # ── MANIFIESTO FIJADO ──
  - block: collection
    content:
      title: ""
      filters:
        folders:
          - post
        featured_only: true
    design:
      columns: 1
      view: article-grid

  # ── ÚLTIMOS ARTÍCULOS ──
  - block: collection
    content:
      title: "📝 Últimos artículos"
      text: ""
      count: 9
      filters:
        folders:
          - post
        exclude_featured: false
      sort_by: date
      sort_ascending: false
    design:
      columns: 3
      view: article-grid

  # ── SERIE: EXPERIMENTOS EN EL AULA ──
  - block: collection
    content:
      title: "🧪 Experimentos en el Aula"
      text: "Desafíos reales con estudiantes, datos fabricados e inteligencia artificial."
      filters:
        folders:
          - post
        tag: "experimento en el aula"
      sort_by: date
      sort_ascending: false
    design:
      columns: 2
      view: article-grid

  # ── SERIE: MUSEO DE LOS HORRORES ──
  - block: collection
    content:
      title: "🏛️ Museo de los Horrores Metodológicos"
      text: "Curaduría de errores imperdonables en la ciencia biomédica. Humor ácido, rigor implacable."
      filters:
        folders:
          - post
        tag: "Museo-Horrores"
      sort_by: date
      sort_ascending: false
    design:
      columns: 2
      view: article-grid
---
