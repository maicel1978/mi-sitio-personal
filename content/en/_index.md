---
date: "2022-10-24"
design:
  spacing: 6rem
sections:

  - block: resume-biography-3
    content:
      button:
        text: Download CV
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
      text: "My research spans a wide range of topics \U0001F4DA, from the design and analysis of clinical trials and epidemiological studies \U0001F50D, to the development and validation of predictive models for infectious diseases and triage systems \U0001F9E0. I aim to integrate biostatistics, epidemiology, and mathematical modeling to generate high-impact results \U0001F4AD.\n\nI am passionate about programming in R and Python, data analysis, machine learning, and Artificial Intelligence \U0001F916. My commitment is to advance biostatistics and research that transforms public health through innovative and collaborative approaches to improve people's quality of life.\n\nI am always open to collaborating on projects that push the boundaries of science and technology in healthcare."
      title: "\U0001F4DA My Research"
    design:
      columns: "1"

  - block: collection
    content:
      filters:
        featured_only: true
        folders:
          - publication
      title: Featured Publications
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
      title: Recent Publications
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
      title: Latest Blog Posts
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
        text: Contact Me
        url: mailto:contact@bioestadisticaedu.com
      text: "Interested in research collaboration, statistical consulting, or teaching? I am open to new projects."
      title: "\U0001F4EC Shall We Work Together?"
    design:
      card:
        css_class: bg-primary-700
        css_style: ""

title: ""
type: landing
---

