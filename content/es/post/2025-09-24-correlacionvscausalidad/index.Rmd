---
title: "Las trampas de la correlación disfrazada de causalidad"
subtitle: "cuando los números cuentan historias falsas"
author: "admin"
date: '2025-09-24'
categories: ["Estadística en Salud"]
tags:
  - "detectar trampas correlación vs. causalidad en investigación"
  - "checklist para rigor en pruebas estadísticas médicas"
  - "ejemplos prácticos de falacias causales en salud"
  - "herramientas para validar causalidad real"
slug: trampas-correlacion
summary:  "Ejemplos curiosos, cápsulas de rigor y un checklist práctico para no confundir correlación con causalidad en investigación científica."
featured: true  # Destacar en la página principal
draft: false 
type: post
---

## Introducción

El ojo humano ama los patrones: ver dos líneas que se mueven juntas y concluir que una provoca la otra. La estadística, mal interpretada, a veces alimenta esa ilusión. La correlación es apenas la danza conjunta de dos variables, no una flecha de causa. Y, sin embargo, titulares, políticas y hasta decisiones médicas se sostienen sobre esta trampa.

## 1) Correlaciones curiosas (pero falsas)

- **Helados y ahogamientos.** En verano, ambos aumentan. No porque el helado mate, sino porque el calor atrae bañistas y heladeros.

- **Cigüeñas y natalidad.** En pueblos europeos, donde hay más cigüeñas, también hay más nacimientos… simplemente porque se trata de áreas rurales más fértiles, no porque las aves traigan bebés.

- **Películas de Nicolas Cage y ahogamientos en piscinas.** Ejemplo clásico de correlaciones espurias recopiladas por Tyler Vigen: cómico, pero ilustrativo.

---

## 2) La correlación y su impacto en la toma de decisiones

La confusión entre causalidad y correlación no es solo un chiste; tiene consecuencias graves.

**Política pública:** Un estudio muestra que los países con más médicos per cápita tienen más diagnósticos de cáncer. Conclusión errada: “los médicos causan cáncer”. Realidad: mayor densidad médica implica mejor detección.

**Falacia de la causa inversa:** Niños con bajo rendimiento escolar pasan más horas frente a la televisión. ¿La TV los perjudica? ¿O los niños con dificultades recurren más a ella? La dirección de la causalidad puede invertirse fácilmente.

---

# 3) ¿Qué mide realmente la correlación?

- El **coeficiente de correlación (r)** mide la fuerza y dirección de la relación entre dos variables.  
- Sus valores van de **-1 a +1**:  
  - +1 → relación positiva perfecta  
  - -1 → relación negativa perfecta  
  - 0 → ausencia de relación lineal  

{{% callout note %}}
**Advertencia:** un r alto no significa causalidad. Puede deberse a **confusores**, **azar** o **causalidad inversa**.
{{% /callout %}}

  

---

# 4) Tipos de coeficientes de correlación (más allá de Pearson)

![](correlacion.png)

---

# 5) Causalidad: un desafío que exige rigurosidad

Identificar la causalidad no se improvisa. Requiere algo más que una simple correlación. Exige un diseño experimental riguroso, criterios de Bradford Hill y construcción de modelos causales. La estadística sugiere, pero no prueba por sí sola.

---

# 6) Metáfora para recordar

Piensa en la correlación como ver dos hojas que caen juntas en otoño. Creer que una arrastra a la otra es ignorar el viento invisible que las mueve a ambas.

---

# 7) Checklist para evitar caer en la trampa

1. ¿Existe una variable oculta (confusor) que explique la relación? ✔  
2. ¿Podría la causalidad ir en sentido contrario? ✔  
3. ¿El diseño permite concluir causa o solo asociación? ✔  
4. ¿Hay criterios teóricos/experimentales que respalden esta relación? ✔  
5. ¿Se comunicó claramente que es correlación, no causalidad? ✔  

---

# Bibliografía

Silva Aycaguer LC. *Cultura estadística e investigación científica en el campo de la salud: una mirada crítica*. Madrid: Díaz de Santos; 1998.  

Pearl, J. (2009). Causality: Models, Reasoning, and Inference (2nd ed.). Cambridge University Press.

Hernán, M. A., & Robins, J. M. (2020). Causal Inference: What If. Chapman & Hall/CRC. [Disponible gratis en línea].

Hill, A. B. (1965). The environment and disease: association or causation? Proceedings of the Royal Society of Medicine, 58(5), 295–300. (Criterios de Bradford Hill).

Freedman, D. A. (2005). Statistical Models: Theory and Practice. Cambridge University Press. (Discusión crítica sobre correlación y causalidad).

