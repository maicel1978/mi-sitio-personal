---
title: "VAR Científico: El arte de mover la portería para que entre el balón"
subtitle: "Caso 1: Rescate ético y suicidio estadístico"
author: "admin"
date: 2026-12-14
categories: ["Reflexiones Críticas"]
tags:
  - "evaluación-regulatoria"
  - "VAR-Científico"
  - "ensayos-clinicos"
slug: var-caso02
summary: "Análisis crítico de cómo decisiones éticas pueden afectar la validez de un ensayo clínico, usando ejemplos simulados y humor ácido."
featured: false
draft: false # True para un borrador
share: true
commentable: true  # Solo si tienes Disqus o similar configurado
show_related: true
show_breadcrumb: true
type: post
---

*Por Maicel Monzon*

> *Cualquier parecido con la realidad es pura coincidencia.  
Este caso podría ocurrir en cualquier ensayo, en cualquier comité, en cualquier país.*

---

## 1. El grupo control: especie en peligro de extinción

El grupo control es frágil, delicado y fundamental para la supervivencia del ensayo clínico.  

- Nace de la aleatorización.  
- Se alimenta de comparabilidad.  
- Respira validez interna.  

Y aun así, muchos estudios lo exterminan… con **buenas intenciones**.

---

## 2. El escenario hipotético

Imaginemos un ensayo aleatorizado:

- Dos brazos: control vs tratamiento experimental.  
- Medidas periódicas a lo largo del tiempo (t₀, tiempo intermedio t\*, tiempo final T).  
- Outcome continuo (por ejemplo, un score clínico).

El objetivo declarado:  

> Determinar si el tratamiento experimental es mejor que el control al final del estudio.

Hasta aquí, todo correcto.  

---

## 3. La “buena intención” que lo cambia todo

En algún momento intermedio, los investigadores deciden:

> Si un paciente en el grupo control no mejora lo suficiente, vamos a cambiarlo al tratamiento experimental, porque sería éticamente cuestionable dejarlo sin ayuda.

Parece noble.  
Parece humano.  
Suena bien en comité ético.  

Pero estadísticamente, esto es una **bomba de relojería**.

---

## 4. Qué pasa realmente

Después del cambio:

- El grupo control deja de representar a la población original que recibiría solo control.  
- Los que “sobreviven” en control son los respondedores tempranos.  
- El experimental se llena de pacientes originalmente control que tenían peor pronóstico.

El resultado:

- La diferencia entre grupos se achica artificialmente.  
- La conclusión a final del estudio se vuelve engañosa.  
- El grupo control deja de ser un contrafactual válido.

Es lo que podríamos llamar un **suicidio estadístico**.  

---

## 5. Varias ventanas temporales

Esto no depende del momento exacto:

- Cambios a las 4 semanas, 8 semanas, 12 semanas, 6 meses…  
- Cambios basados en biomarcadores, progresión clínica o decisión del médico.  

La estructura causal sigue siendo la misma:  
Cuando el tratamiento depende de un resultado intermedio, la comparación directa ya no refleja el efecto verdadero del tratamiento experimental frente al control original.

---

## 6. Simulación conceptual

Podemos demostrarlo con un ejemplo simple:


<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-1-1.png" width="672" />

### 🔹 Qué muestra el gráfico

* El grupo control mejora artificialmente después del cambio.
* El grupo experimental incluye pacientes que originalmente eran peores.
* La diferencia observada se reduce, y cualquier conclusión directa sería engañosa.

---

## 7. La lección conceptual

* El grupo control no murió por razones clínicas.
* Murió porque dejó de ser comparable.
* La inferencia causal requiere **control como contrafactual válido**.
* Cambiar tratamientos basados en resultados intermedios sin un diseño adaptativo preespecificado destruye la comparabilidad y sesga la estimación.

---

## 8. ¿Cómo hacerlo bien?

Si se espera que algunos pacientes cambien de tratamiento:

1. Preespecificar el switching en el protocolo.
2. Redefinir claramente el estimando (Efecto de estrategia, hypothetical, while-on-treatment…).
3. Aplicar métodos apropiados:

   * Inverse Probability Weighting (IPCW)
   * Marginal Structural Models
   * RPSFTM

Sin esto, el análisis simple es **conceptualmente inválido**.

---

## 9. Conclusión

La ética y la estadística no siempre son amigas íntimas.
Puedes rescatar a un paciente y, al mismo tiempo, **destruir el valor informativo del estudio**.

El grupo control sigue siendo una especie en peligro de extinción.
Y no lo protegerás solo con buenas intenciones.

---

# Bibliografía

* Robins JM, Hernán MA, Brumback B. Marginal structural models and causal inference in epidemiology. *Epidemiology*. 2000;11(5):550–560. PMID: 10955408.

* Latimer NR et al. Adjusting for treatment switching in randomised controlled trials. *Stat Med*. 2014;33(26):4489–4505. PMID: 25237052.

* Hernán MA, Robins JM. *Causal Inference: What If*. Chapman & Hall/CRC, 2020.

* ICH E9(R1) Addendum on Estimands and Sensitivity Analysis in Clinical Trials. EMA, 2019.

* Schulz KF et al. CONSORT 2010 Statement. *BMJ*. 2010;340:c332. PMID: 20332509.
