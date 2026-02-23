---
title: "VAR Científico: Rescate ético y suicidio estadístico"
subtitle: "Caso 1: Rescate ético y suicidio estadístico"
author: "admin"
date: 2026-02-13
categories: ["Reflexiones Críticas"]
tags:
  - evaluacion-regulatoria
  - var-cientifico
  - post
  - ensayos-clinicos
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
> Aunque, curiosamente, estas coincidencias suelen tener protocolo aprobado.*

---

## 1. El grupo control: ese gran incomprendido

El grupo control no es un trámite regulatorio.  
No está ahí para completar la tabla 1 ni para tranquilizar a un comité.

Está ahí para responder una pregunta fundamental:

> ¿Qué habría ocurrido si estos pacientes no hubieran recibido el tratamiento experimental?

Eso es el **contrafactual**.

Nace de la aleatorización.  
Vive de la comparabilidad.  
Y desaparece cuando modificamos el experimento sin redefinir la inferencia.

Sin contrafactual válido, no hay evidencia.  
Hay narrativa.

---

## 2. El experimento bien portado

Imaginemos un ensayo clásico:

- Asignación 1:1  
- Medición basal  
- Medición intermedia  
- Medición final  
- Objetivo: comparar resultados al final  

Mientras cada paciente permanece en el grupo asignado:

- La aleatorización protege la comparabilidad.
- El análisis ITT tiene interpretación causal clara.
- El efecto estimado responde a la pregunta original.

La arquitectura es coherente.  
Y la inferencia también.

---

## 3. El momento aparentemente razonable

En algún punto intermedio ocurre algo:

> Los pacientes del grupo control que no responden suficientemente reciben el tratamiento experimental.

Puede suceder en cualquier momento del seguimiento.

El calendario es secundario.  
Lo relevante es que el tratamiento futuro pasa a depender de la evolución previa.

Y esa evolución fue influenciada por la asignación inicial.

Ahí cambia la estructura del experimento.

---

## 4. Qué cambia realmente

Antes:

- El tratamiento depende solo de la aleatorización.

Después:

- El tratamiento depende de la respuesta intermedia.
- Y la respuesta intermedia depende del tratamiento inicial.

Eso introduce un circuito causal.

Comprensible desde la ética.  
Metodológicamente delicado desde la inferencia.

---

## 5. Qué ocurre en términos simples

Tras permitir el cambio:

- En el grupo control permanecen, en promedio, quienes iban mejor.
- Los que evolucionaban peor pasan al experimental.
- El experimental incorpora pacientes con peor pronóstico intermedio.

El resultado visible:

La diferencia entre grupos al final puede reducirse.

El resultado menos visible —y más importante—:

La pregunta que estamos respondiendo ya no es exactamente la misma.

---

## 6. El problema no es el resultado. Es su significado.

La diferencia puede reducirse.

La estimación puede cambiar.

Incluso el intervalo de confianza puede desplazarse.

Pero nada de eso es el núcleo del problema.

El verdadero problema es que ya no sabemos con precisión qué efecto estamos estimando.

¿Es el efecto del tratamiento experimental frente a control puro?

¿O es el efecto de una estrategia que permite cambiar de tratamiento si no hay respuesta?

Si la pregunta cambia y no lo declaramos, el número final pierde interpretación.

La estadística no consiste en producir números.  
Consiste en saber qué significan.

---

## 7. Qué muestra la simulación

<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-1-1.png" width="768" />

El gráfico no solo ilustra una reducción de diferencias.

Muestra algo más profundo:

El grupo “control” ya no representa la evolución sin tratamiento experimental.

Representa la evolución de quienes respondieron mejor al inicio.

Eso no es un detalle estadístico.  
Es una alteración del contrafactual.

Y cuando el contrafactual cambia, la validez interna cambia con él.

---

## 8. Una aclaración necesaria

El análisis ITT no se vuelve incorrecto.

Se vuelve insuficientemente interpretado.

Ahora estima el efecto de una **estrategia clínica adaptativa**:

> “Asignar control, pero permitir cambio si no hay respuesta.”

Esa puede ser una pregunta válida.

Pero no es lo mismo que comparar tratamiento experimental versus control puro.

Si no redefinimos explícitamente el estimando, generamos ambigüedad científica.

Y la ambigüedad rara vez favorece decisiones sólidas.

---

## 9. El problema no es ético. Es estructural.

Rescatar pacientes puede ser correcto.

Lo problemático es:

- No anticiparlo en el diseño.
- No redefinir la pregunta científica.
- No usar métodos apropiados.
- Pretender que nada cambió.

La estadística no es una ceremonia para obtener aprobación regulatoria.

Es el mecanismo que preserva el significado de nuestras comparaciones.

---

## 10. Conclusión

Cuando el tratamiento cambia en función de la respuesta intermedia:

No estamos comparando tratamientos.

Estamos comparando estrategias.

Si eso se define, se modela y se analiza correctamente, es ciencia.

Si no, es una ilusión estadística con buenas intenciones.

Y la ilusión nunca ha sido un sustituto sólido de la evidencia.

---

## 🔎 Para debatir

Cuando un ensayo permite cambiar de tratamiento a los no respondedores:

> ¿Deberíamos seguir hablando de “eficacia del fármaco”  
> o de “eficacia de la estrategia terapéutica”?

La diferencia no es semántica.  
Es metodológica.  
Y también regulatoria.

---

# Bibliografía

* Robins JM, Hernán MA, Brumback B. Marginal structural models and causal inference in epidemiology. *Epidemiology*. 2000;11(5):550–560. PMID: 10955408.

* Latimer NR et al. Adjusting for treatment switching in randomised controlled trials. *Stat Med*. 2014;33(26):4489–4505. PMID: 25237052.

* Hernán MA, Robins JM. *Causal Inference: What If*. Chapman & Hall/CRC, 2020.

* ICH E9(R1) Addendum on Estimands and Sensitivity Analysis in Clinical Trials. EMA, 2019.

* Schulz KF et al. CONSORT 2010 Statement. *BMJ*. 2010;340:c332. PMID: 20332509.
