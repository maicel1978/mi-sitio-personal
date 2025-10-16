---
title: 'Tutorial: Análisis de Fortificación de Alimentos con HCES y R'
author: 
  - "admin"
summary: "Aprende en este tutorial a usar R para analizar Encuestas de Consumo y Gasto en Hogares  y Tablas de Composición de Alimentos."
date: "2025-03-05"
slug: "tutorial-an-lisis-de-fortificaci-n-de-alimentos-con-hces-y-r"
tags:
  - R
  - Fortificación
---

En este tutorial, aprenderás a usar datos de Encuestas de Consumo y Gasto en Hogares (HCES) , Tablas de Composición de Alimentos (FCT) y herramientas de R (tidyverse, gtsummary, ggstatsplot) para evaluar la adecuación nutricional y modelar escenarios de fortificación. Los conceptos se explican desde cero, con ejemplos reproducibles.

# Paso 1: Preparación de datos HCES

**Concepto :** Las HCES son encuestas que registran compras y consumo de alimentos a nivel de hogar 9. Son esenciales para analizar patrones dietéticos, pero requieren limpieza para eliminar inconsistencias.

**Ejemplo en R :**


``` r
library(tidyverse)

# Datos simulados de HCES (consumo de alimentos en gramos)
hc_data <- tibble(
  alimento = c("Azúcar", "Arroz", "Azúcar morena", "Harina fortificada"),
  cantidad_g = c(500, 1200, NA, 800),
  hogar_id = c(1, 1, 2, 2)
)

# Limpieza: Estandarizar nombres y eliminar valores faltantes
hc_clean <- hc_data %>%
  mutate(alimento = case_when(
    str_detect(alimento, "Azúcar") ~ "Azúcar",  # Unificar "Azúcar" y "Azúcar morena"
    TRUE ~ alimento
  )) %>%
  filter(!is.na(cantidad_g))  # Eliminar registros sin datos
```

# Paso 2: Vinculación con Tablas de Composición de Alimentos (FCT)

Las FCT contienen información nutricional de alimentos (ej: hierro, vitamina A). Al vincularlas con HCES, calculamos la ingesta de nutrientes por hogar

**Ejemplo en R :**


``` r
# FCT simulada (nutrientes por 100g)
fct_data <- tibble(
  alimento = c("Azúcar", "Arroz", "Harina fortificada"),
  hierro_mg = c(0.1, 2.5, 5.0),
  vitamina_a_ug = c(0, 0, 500)
)

# Combinar HCES con FCT
hc_nutrientes <- hc_clean %>%
  left_join(fct_data, by = "alimento") %>%
  mutate(hierro_total = cantidad_g * hierro_mg / 100)  # Calcular hierro total consumido
```

# Paso 3: Evaluación de adecuación nutricional (EAR, RNI, UL)

**Concepto :** 
**EAR (Requerimiento Promedio Estimado) :** Nivel de ingesta que cubre las necesidades del 50% de la población.

**RNI (Requerimiento Nutricional de Ingesta) :** Meta para cubrir el 97-98% de la población.

**UL (Límite Máximo Seguro) :** Ingesta máxima sin riesgo de toxicidad.

**Ejemplo en R :**


``` r
# EAR de hierro para mujeres (18-50 años): 18 mg/día
hc_nutrientes %>%
  group_by(hogar_id) %>%
  summarise(ingesta_hierro = sum(hierro_total)) %>%
  mutate(adepto = ifelse(ingesta_hierro >= 18, "Sí", "No"))
```

Visualización con **ggstatsplot** :


``` r
library(ggstatsplot)

gghistostats(
  data = hc_nutrientes,
  x = ingesta_hierro,
  title = "Ingesta de hierro vs. EAR (18 mg/día)",
  binwidth = 2
)
```
# Paso 4: Cálculo de consumo aparente con AME/AFE

**Concepto :**
La FAO recomienda ajustar el consumo por tamaño del hogar usando **Equivalentes Adultos (AME/AFE)** . Por ejemplo, un niño <10 años equivale a 0.5 AME


``` r
# Datos de hogares (miembros y edades)
hogares <- tibble(
  hogar_id = c(1, 2),
  miembros = list(
    tibble(edad = c(30, 5), genero = c("M", "F")),  # Hogar 1: adulto + niño
    tibble(edad = c(40, 15), genero = c("M", "M"))  # Hogar 2: 2 adultos
  )
)

# Calcular AME total por hogar
hogares <- hogares %>%
  mutate(ame_total = map_dbl(miembros, ~ sum(
    ifelse(.x$edad < 10, 0.5, 1)  # Niños <10 = 0.5 AME
  )))

# Consumo aparente per cápita
hc_consumo_aparente <- hc_nutrientes %>%
  left_join(hogares, by = "hogar_id") %>%
  mutate(consumo_aparente = hierro_total / ame_total)
```

# Paso 5: Modelado de escenarios de fortificación

**Concepto :**

Simular la adición de nutrientes a alimentos (ej: hierro en harina) permite predecir impacto en la ingesta.

Ejemplo con **gtsummary** :


``` r
library(gtsummary)

# Escenario: Harina fortificada con +5 mg de hierro/100g
hc_fortificado <- hc_nutrientes %>%
  mutate(hierro_total = ifelse(alimento == "Harina fortificada", 
                              cantidad_g * (hierro_mg + 5) / 100,
                              hierro_total))

# Comparación pre-post fortificación
tbl_summary(
  hc_nutrientes %>% select(ingesta_hierro),
  hc_fortificado %>% select(ingesta_hierro),
  label = list(ingesta_hierro ~ "Hierro (mg/día)"),
  statistic = list(ingesta_hierro ~ "{mean} ± {sd}")
)
```

**Herramientas R utilizadas :**

**tidyverse :** Manipulación y limpieza de datos .

**ggstatsplot :** Visualización estadística rápida.

**gtsummary :** Resúmenes tabulares para comparaciones.

