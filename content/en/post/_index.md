---
title: BioestadísticaEdu
date: "2024-05-19"
type: landing

sections:

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOCK 1: MANIFESTO
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: manifesto
    content:
      title: "📜 BioestadísticaEdu Manifesto"
      subtitle: "Our mission and vision"
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
  # BLOCK 2: ALL POSTS
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: all-posts
    content:
      title: "📝 All Publications"
      subtitle: "Sorted by publication date"
      text: >
        All content published on BioestadísticaEdu,
        from tutorials to analyses and reflections.
      count: 6
      page_type: post
      filters:
        tag: "post"
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: article-grid
      columns: '2'
  # 
  # # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # # BLOCK 3: EXPERIMENTS
  # # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # - block: collection
  #   id: experiments
  #   content:
  #     title: "🧪 Experiments"
  #     subtitle: "Tests, prototypes and practical explorations"
  #     text: >
  #       Section dedicated to statistical experiments,
  #       simulations and proofs of concept.
  #     count: 6
  #     page_type: post
  #     filters:
  #       tag: "experimento-en-el-aula"
  #     sort_by: 'Date'
  #     sort_ascending: false
  #   design:
  #     view: article-grid
  #     columns: '2'

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # BLOCK 4: CLINICAL TRIALS & REGULATORY
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - block: collection
    id: regulatory-evaluation
    content:
      title: "💊 Clinical Trials & Regulatory Evaluation"
      subtitle: "ICH, FDA, EMA and regulatory frameworks"
      text: >
        Publications on clinical trial design,
        regulatory standards and statistical best practices.
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