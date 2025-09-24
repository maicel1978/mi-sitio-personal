---
title: "Las trampas de la correlación disfrazada de causalidad"
subtitel: "cuando los números cuentan historias falsas"
author:
  - admin
date: '2024-02-08'
categories:
  - epidemiología
  - opinion
tags:
  - epidemiología
slug: trampas-correlacion
summary: "Guía práctica con R para desarrollar modelos predictivos robustos en entornos clínicos, siguiendo la metodología de Steyerberg"
featured: true  # Destacar en la página principal
language: es
draft: true 
---

El ojo humano ama los patrones: ver dos líneas que se mueven juntas y concluir que una provoca la otra. La estadística, mal interpretada, a veces alimenta esa ilusión. En Cultura estadística e investigación científica, Luis Carlos Silva llama la atención sobre esta confusión: la correlación es apenas la danza conjunta de dos variables, no una flecha de causa. Y, sin embargo, titulares, políticas y hasta decisiones médicas se sostienen sobre esta trampa.

# 1) Correlaciones curiosas (pero falsas)

- **Helados y ahogamientos.** En verano, ambos aumentan. No porque el helado mate, sino porque el calor atrae bañistas y heladeros.

- **Cigüeñas y natalidad.** En pueblos europeos, donde hay más cigüeñas, también hay más nacimientos… simplemente porque se trata de áreas rurales más fértiles, no porque las aves traigan bebés.

- **Películas de Nicolas Cage y ahogamientos en piscinas.** Ejemplo clásico de correlaciones espurias recopiladas por Tyler Vigen: cómico, pero ilustrativo.

---

# La correlación y su impacto en la toma de decisiones

La confusión entre causalidad y correlación no es solo un chiste; tiene consecuencias graves.

**Política pública:** Imagina que un estudio muestra que los países con más médicos per cápita tienen más diagnósticos de cáncer. Una interpretación simplista podría concluir que los médicos "causan" el cáncer. La realidad, sin embargo, es que un mayor número de médicos conduce a una mejor detección del cáncer. La correlación aquí es el reflejo de una variable oculta: la calidad de la atención médica.

**Falacia de la causa inversa:** Un estudio puede revelar que los niños con bajo rendimiento escolar pasan más horas frente a la televisión. ¿La televisión causa el bajo rendimiento? O, ¿los niños con dificultades académicas recurren más a la televisión? La dirección de la causalidad es a menudo difícil de determinar.

---

# Causalidad: un desafío que exige rigurosidad

Identificar la causalidad no se improvisa. Requiere algo más que una simple correlación. Exige un diseño experimental riguroso, el uso de criterios como los de Bradford Hill y la construcción de modelos causales sólidos. La estadística es una herramienta poderosa que puede sugerir relaciones, pero nunca probarlas sin un contexto teórico y supuestos claros.

---

# Metáfora para recordar

Piensa en la correlación como ver dos hojas que caen juntas en otoño. Creer que una arrastra a la otra es ignorar la existencia del viento invisible que las mueve a ambas.

# Checklist para evitar caer en la trampa

1. ¿Existe una variable oculta (confusor) que pueda explicar la relación? ✔

2. ¿Podría la causalidad ir en sentido contrario? ✔

3. ¿El diseño del estudio permite concluir causalidad o solo una asociación? ✔

4. ¿Hay criterios teóricos o experimentales que respalden esta relación? ✔

5. ¿Se comunicó claramente que es una correlación, no causalidad? ✔

# Bibliografía

Silva Aycaguer LC. Cultura estadística e investigación científica en el campo de la salud: una mirada crítica. Madrid: Diaz de Santos; 1998. 


