---
date: "2022-10-24"
design:
  spacing: 6rem
sections:

  - block: resume-biography-3
    content:
      button:
        text: Descargar CV
        url: uploads/resume.pdf
      text: ""
      username: admin
    design:
      background:
        color: "#0f1729"
        image:
          filename: stacked-peaks.svg
          filters:
            brightness: 1
          parallax: false
          position: center
          size: cover
      css_class: dark

  - block: markdown
    content:
      subtitle: ""
      text: "Mi investigación abarca disímiles temas \U0001F4DA, desde el diseño y análisis de ensayos clínicos y estudios epidemiológicos \U0001F50D, hasta el desarrollo y validación de modelos predictivos para enfermedades infecciosas y sistemas de triaje \U0001F9E0. Busco integrar conocimientos de bioestadística, epidemiología y modelado matemático para generar resultados de alto impacto \U0001F4AD.\n\nSoy un entusiasta de la programación en R y Python, el análisis de datos, el aprendizaje automático y la Inteligencia Artificial \U0001F916. Mi compromiso es con el desarrollo de la bioestadística y la investigación que transforman la salud pública a través de enfoques innovadores y colaborativos y para mejorar la calidad de vida de las personas.\n\nSiempre estoy abierto a colaborar en proyectos que impulsen los límites de la ciencia y la tecnología en el ámbito de la salud."
      title: "\U0001F4DA Mi investigación"
    design:
      columns: "1"

  - block: collection
    content:
      filters:
        featured_only: true
        folders:
          - publication
      title: Artículos destacados
    design:
      columns: 2
      view: article-grid
    id: papers

  - block: collection
    content:
      count: 5
      filters:
        exclude_featured: true
        folders:
          - publication
      text: ""
      title: Publicaciones recientes
    design:
      view: citation

  - block: collection
    content:
      count: 5
      filters:
        author: ""
        category: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
        tag: ""
      offset: 0
      order: desc
      page_type: post
      subtitle: ""
      text: ""
      title: Últimas entradas del blog
    design:
      spacing:
        padding:
          - 0
          - 0
          - 0
          - 0
      view: date-title-summary
    id: news

  - block: cta-card
    content:
      button:
        text: Contáctame
        url: mailto:contact@bioestadisticaedu.com
      text: "¿Interesado en colaborar en investigación, consultoría estadística o docencia? Estoy abierto a nuevos proyectos."
      title: "\U0001F4EC ¿Trabajamos juntos?"
    design:
      card:
        css_class: bg-primary-700
        css_style: ""

title: ""
type: landing
---

