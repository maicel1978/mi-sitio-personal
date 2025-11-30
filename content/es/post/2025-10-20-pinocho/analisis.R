## =================================================
# ANÁLISIS FORENSE - SESGO + INTERVALOS DE CONFIANZA
# =================================================

library(tidyverse)
library(boot)


media_real <- 136
sd_real <- 7.5
library(readr)
datos <- read_csv("experimento.csv")


# -------------------------------------------------
# 1. PRIMERA PRUEBA: SESGO DE LA MEDIA (ORIGINAL)
# -------------------------------------------------
tabla_media <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  group_by(participante) %>%
  summarise(
    `Valores escritos` = n(),
    Media = round(mean(valor), 1),
    .groups = 'drop'
  ) %>%
  mutate(
    `Sesgo_media` = Media - media_real,
    `Evaluación` = case_when(
      abs(`Sesgo_media`) <= 1 ~ "✓ Excelente",
      abs(`Sesgo_media`) <= 2.5 ~ "✓ Muy buena",
      TRUE ~ "Aceptable"
    )
  ) %>%
  arrange(`Sesgo_media`)

# print("=== PRIMERA PRUEBA: SESGO DE LA MEDIA ===")
# print(tabla_media)

# -------------------------------------------------
# 2. SEGUNDA PRUEBA: SESGO DE LA VARIABILIDAD (ORIGINAL)
# -------------------------------------------------


tabla_variabilidad <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  group_by(participante) %>%
  summarise(
    `Desviación Estándar Estimada (g/L)` = round(sd(valor), 1),
    n = n(),
    Media_grupo = round(mean(valor), 1),
    Minimo = round(min(valor), 1),
    Maximo = round(max(valor), 1),
    .groups = 'drop'
  ) %>%
  mutate(
    `Desviación Estándar Poblacional (g/L)` = 7.5,
    `Error Absoluto (g/L)` = round(abs(`Desviación Estándar Estimada (g/L)` - 7.5), 1),
    `Error Relativo (%)` = round((`Error Absoluto (g/L)` / 7.5) * 100, 1),
    # CLASIFICACIÓN BASADA EN LA DESVIACIÓN ESTÁNDAR POBLACIONAL
    Calidad_Estimacion = case_when(
      abs(`Error Absoluto (g/L)`) <= 0.75 ~ "Excelente",        # ≤10% de SD poblacional
      abs(`Error Absoluto (g/L)`) <= 1.5  ~ "Adecuada",         # ≤20% de SD poblacional
      abs(`Error Absoluto (g/L)`) <= 2.25 ~ "Aceptable",        # ≤30% de SD poblacional
      abs(`Error Absoluto (g/L)`) <= 3.0  ~ "Alta",            # ≤40% de SD poblacional
      abs(`Error Absoluto (g/L)`) > 3.0   ~ "Muy alta",        # >40% de SD poblacional
      TRUE ~ "Indeterminado"
    ),
    # IMPACTO CLÍNICO ESPECÍFICO PARA HEMOGLOBINA
    Impacto_Clinico = case_when(
      abs(`Error Absoluto (g/L)`) <= 0.75 ~ "Error mínimo - sin impacto clínico",
      abs(`Error Absoluto (g/L)`) <= 1.5  ~ "Variación aceptable - screening confiable",
      abs(`Error Absoluto (g/L)`) <= 2.25 ~ "Puede afectar clasificación de casos límite",
      abs(`Error Absoluto (g/L)`) <= 3.0  ~ "Compromete diagnóstico diferencial",
      abs(`Error Absoluto (g/L)`) > 3.0   ~ "Error crítico - decisiones clínicas comprometidas",
      TRUE ~ "No evaluable"
    ),
    
    # INTERPRETACIÓN EN CONTEXTO DEL RANGO NORMAL (121-151 g/L)
    Interpretacion = paste(
      "La variabilidad estimada representa",
      round((`Desviación Estándar Estimada (g/L)` / 7.5 - 1) * 100, 0),
      "% de la variabilidad poblacional real"
    )
  )




# -------------------------------------------------
# 3. TERCERA PRUEBA: ÚLTIMO DÍGITO (Lógica Docente + Gráfico Bicolor)
# -------------------------------------------------

# A. Preparación de datos (Solo descriptiva)
analisis_ultimo_digito <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  # Aseguramos que existan los niveles 0-9 para el gráfico
  mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
  # Contamos frecuencias, .drop=FALSE es clave para mostrar los ceros
  count(participante, ultimo_digito, .drop = FALSE, name = "n_digito") %>%
  group_by(participante) %>%
  mutate(
    total_vals = sum(n_digito),
    proporcion_observada = n_digito / total_vals,
    # Criterio simple: Marcamos como sospechoso si se desvía > 5% del 10% esperado
    es_sospechoso = abs(proporcion_observada - 0.10) > 0.05
  )

# B. Gráfico (Bicolor: Rojo si pasa del 10%, Azul si no)
g_utimodig <- ggplot(analisis_ultimo_digito, aes(x = ultimo_digito, y = proporcion_observada)) +
  geom_hline(yintercept = 0.10, linetype = "dashed", color = "black", size = 0.6) +
  geom_col(aes(fill = proporcion_observada > 0.10), width = 0.7, alpha = 0.9) +
  facet_wrap(~ participante) +
  scale_fill_manual(values = c("FALSE" = "#5DADE2", "TRUE" = "#E74C3C")) +
  scale_y_continuous(labels = scales::percent_format(accuracy = 1), limits = c(0, 0.30)) +
  scale_x_discrete(drop = FALSE) + 
  labs(title = "El sesgo de los números redondos",
       subtitle = "Rojo: Frecuencia superior al azar (10%) | Azul: Frecuencia inferior",
       x = "Último dígito",
       y = "Frecuencia (%)") +
  theme_minimal() +
  theme(legend.position = "none",
        panel.grid.major.x = element_blank(),
        panel.grid.minor = element_blank(),
        strip.text = element_text(size = 12, face = "bold"),
        axis.text.x = element_text(size = 11, face = "bold"),
        plot.title = element_text(size = 14, face = "bold"),
        plot.subtitle = element_text(color = "grey40"))

# C. Tabla Resumen para Veredicto Final (¡ESTO ERA LO QUE FALTABA!)
resumen_ultimo_digito <- analisis_ultimo_digito %>%
  group_by(participante) %>%
  summarise(
    # Contamos cuántas barras son anómalas (>15% o <5%)
    barras_sospechosas = sum(es_sospechoso),
    # Evaluación cualitativa basada en el conteo
    evaluacion_digitos = case_when(
      barras_sospechosas == 0 ~ "Distribución uniforme ✓",
      barras_sospechosas <= 2 ~ "Ligera desviación ⚠️",
      TRUE ~ "Patrón no uniforme 🚨"
    ),
    .groups = 'drop'
  )

tabla_desviacion <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
  group_by(participante) %>%
  count(ultimo_digito, .drop = FALSE) %>%
  mutate(
    prop = n / sum(n),              # Proporción real
    esperado = 0.10,                # Proporción esperada
    error = abs(prop - esperado)    # Error absoluto en este dígito
  ) %>%
  summarise(
    # Promediamos el error de los 10 dígitos
    # Multiplicamos por 100 para hablar en "puntos porcentuales"
    `Desviación Promedio` = mean(error) * 100,
    
    # Encontramos cuál fue el dígito con mayor error
    `Peor Error` = max(error) * 100,
    .groups = 'drop'
  ) %>%
  arrange(desc(`Desviación Promedio`)) %>%
  mutate(
    # Formateamos bonito
    `Desviación Promedio` = sprintf("%.1f %%", `Desviación Promedio`),
    `Peor Error` = sprintf("%.1f %%", `Peor Error`),
    
    # Una evaluación cualitativa basada en MAGNITUD, no en p-valor
    Interpretación = case_when(
      as.numeric(sub(" %", "", `Desviación Promedio`)) > 4 ~ "🚨 Muy Artificial",
      as.numeric(sub(" %", "", `Desviación Promedio`)) > 2 ~ "⚠️ Algo Sesgado",
      TRUE ~ "✅ Natural"
    )
  )

# Cálculo de la desviación promedio (MAD)
tabla_desviacion <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
  group_by(participante) %>%
  count(ultimo_digito, .drop = FALSE) %>%
  mutate(
    prop = n / sum(n),              # Proporción real
    esperado = 0.10,                # Proporción esperada
    error = abs(prop - esperado)    # Error absoluto
  ) %>%
  summarise(
    `Desviación Promedio` = mean(error) * 100,
    `Peor Error` = max(error) * 100,
    .groups = 'drop'
  ) %>%
  arrange(desc(`Desviación Promedio`)) %>%
  mutate(
    Interpretación = case_when(
      `Desviación Promedio` > 4 ~ "🚨 Muy Artificial",
      `Desviación Promedio` > 2 ~ "⚠️ Algo Sesgado",
      TRUE ~ "✅ Natural"
    ),
    # Formato para tabla
    `Desviación Promedio` = sprintf("%.1f %%", `Desviación Promedio`),
    `Peor Error` = sprintf("%.1f %%", `Peor Error`)
  )

# -------------------------------------------------
# 4. CUARTA PRUEBA: RACHAS CON ESTADÍSTICO Z
# -------------------------------------------------

analisis_rachas <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  group_by(participante) %>%
  summarise(
    valores = list(valor),
    .groups = 'drop'
  ) %>%
  mutate(
    # Estadístico Z para rachas (reemplaza valor p)
    estadistico_z = map_dbl(valores, ~{
      n <- length(.x)
      mediana_val <- median(.x)
      secuencia <- ifelse(.x > mediana_val, 1, 0)
      rachas_obs <- sum(diff(secuencia) != 0) + 1

      n1 <- sum(secuencia == 1)
      n2 <- sum(secuencia == 0)
      rachas_esp <- (2 * n1 * n2) / n + 1
      var_rachas <- (2 * n1 * n2 * (2 * n1 * n2 - n)) / (n^2 * (n - 1))

      # Estadístico Z (valor estandarizado)
      (rachas_obs - rachas_esp) / sqrt(var_rachas)
    }),
    evaluacion_rachas = case_when(
      abs(estadistico_z) < 1.96 ~ "Aleatoriedad normal ✓",
      abs(estadistico_z) < 2.58 ~ "Desviación leve ⚠️",
      TRUE ~ "Patrón no aleatorio 🚨"
    ),
    interpretacion = case_when(
      estadistico_z > 0 ~ "Alternancia excesiva",
      estadistico_z < 0 ~ "Agrupamiento excesivo",
      TRUE ~ "Aleatoriedad perfecta"
    )
  ) %>%
  select(-valores)

# print("=== CUARTA PRUEBA: ANÁLISIS DE RACHAS CON ESTADÍSTICO Z ===")
# print(analisis_rachas)

# -------------------------------------------------
# 5. QUINTA PRUEBA: BENFORD CON INTERVALOS DE CONFIANZA
# -------------------------------------------------

benford_esperado <- c(12.0, 11.4, 10.9, 10.4, 10.0, 9.7, 9.3, 9.0, 8.8, 8.5) / 100

analisis_benford <- datos %>%
  filter(participante %in% c("La Prudente", "La Entusiasta", "La Confiada")) %>%
  mutate(
    segundo_digito = (valor %% 100) %/% 10
  ) %>%
  filter(!is.na(segundo_digito)) %>%
  group_by(participante, segundo_digito) %>%
  summarise(
    n_digito = n(),
    .groups = 'drop'
  ) %>%
  group_by(participante) %>%
  mutate(
    total_vals = sum(n_digito),
    proporcion_observada = n_digito / total_vals,
    # Intervalos de confianza para Benford
    error_estandar = sqrt(proporcion_observada * (1 - proporcion_observada) / total_vals),
    ic_lower = proporcion_observada - 1.96 * error_estandar,
    ic_upper = proporcion_observada + 1.96 * error_estandar,
    proporcion_esperada = benford_esperado[segundo_digito + 1],
    contiene_esperado = (proporcion_esperada >= ic_lower) & (proporcion_esperada <= ic_upper),
    desviacion_relativa = abs(proporcion_observada - proporcion_esperada) / proporcion_esperada
  ) %>%
  group_by(participante) %>%
  summarise(
    digitos_conforme_benford = sum(contiene_esperado),
    desviacion_promedio_benford = mean(desviacion_relativa),
    evaluacion_benford = case_when(
      digitos_conforme_benford >= 7 & desviacion_promedio_benford < 0.2 ~ "Conforme con Benford ✓",
      digitos_conforme_benford >= 5 & desviacion_promedio_benford < 0.3 ~ "Ligera desviación ⚠️",
      digitos_conforme_benford >= 3 ~ "Desviación moderada ⚠️",
      TRUE ~ "No conforme con Benford 🚨"
    ),
    .groups = 'drop'
  )



# -------------------------------------------------
# 6. GRÁFICO COMPARATIVO: SESGO DE MEDIA Y VARIABILIDAD
# -------------------------------------------------

# # Gráfico para mostrar sesgos de manera visual
# datos_sesgo <- tabla_media %>%
#   select(participante, `Sesgo_media`) %>%
#   left_join(
#     tabla_variabilidad %>% select(participante, `Sesgo (g/L)`),
#     by = "participante"
#   ) %>%
#   pivot_longer(
#     cols = c(`Sesgo_media`, `Sesgo (g/L)`),
#     names_to = "tipo_sesgo",
#     values_to = "magnitud"
#   ) %>%
#   mutate(
#     tipo_sesgo = case_when(
#       tipo_sesgo == "Sesgo_media" ~ "Sesgo Media",
#       tipo_sesgo == "Sesgo (g/L)" ~ "Sesgo Desviación Estándar"
#     ),
#     direccion = ifelse(magnitud > 0, "Sobreestimación", "Subestimación")
#   )
# 
# g_sesgo <- ggplot(datos_sesgo, aes(x = participante, y = magnitud, fill = direccion)) +
#   geom_col(alpha = 0.8) +
#   geom_hline(yintercept = 0, linetype = "dashed", color = "black", size = 1) +
#   facet_wrap(~ tipo_sesgo, scales = "free_y") +
#   scale_fill_manual(values = c("Sobreestimación" = "#EF8A62", "Subestimación" = "#67A9CF")) +
#   labs(
#     title = "Análisis de Sesgo: Media vs Variabilidad",
#     subtitle = "Valores positivos = sobreestimación | Valores negativos = subestimación",
#     x = NULL,
#     y = "Magnitud del Sesgo (g/L)",
#     fill = "Dirección del Error"
#   ) +
#   theme_minimal() +
#   theme(legend.position = "bottom")

# -------------------------------------------------
# 7. TABLA FINAL DE VEREDICTOS
# -------------------------------------------------

# veredicto_final <- tabla_media %>%
#   select(participante, Evaluación_media = Evaluación) %>%
#   left_join(
#     tabla_variabilidad %>%
#       mutate(Evaluación_variabilidad = case_when(
#         `Error` == "⬇️ Muy baja" ~ "Subestimación severa 🚨",
#         `Error` == "⬆️ Muy alta" ~ "Sobreestimación severa 🚨",
#         `Error` == "⬇️ Baja" ~ "Subestimación ⚠️",
#         `Error` == "⬆️ Alta" ~ "Sobreestimación ⚠️"
#       )) %>%
#       select(participante, Evaluación_variabilidad),
#     by = "participante"
#   ) %>%
#   left_join(
#     resumen_ultimo_digito %>% select(participante, Evaluación_digitos = evaluacion_digitos),
#     by = "participante"
#   ) %>%
#   left_join(
#     analisis_rachas %>% select(participante, Evaluación_rachas = evaluacion_rachas),
#     by = "participante"
#   ) %>%
#   left_join(
#     analisis_benford %>% select(participante, Evaluación_benford = evaluacion_benford),
#     by = "participante"
#   ) %>%
#   mutate(
#     # Puntuación basada en sesgo + intervalos de confianza
#     puntuacion_final = (
#       (str_detect(Evaluación_media, "✓")) * 2 +
#         (str_detect(Evaluación_media, "Muy buena")) * 1.5 +
#         (str_detect(Evaluación_variabilidad, "⚠️")) * 0.5 +
#         (!str_detect(Evaluación_variabilidad, "🚨")) * 1 +
#         (str_detect(Evaluación_digitos, "✓")) * 1.5 +
#         (str_detect(Evaluación_digitos, "⚠️")) * 1 +
#         (str_detect(Evaluación_rachas, "✓")) * 1.5 +
#         (str_detect(Evaluación_rachas, "⚠️")) * 1 +
#         (str_detect(Evaluación_benford, "✓")) * 1.5 +
#         (str_detect(Evaluación_benford, "⚠️")) * 1
#     ),
#     evaluacion_final = case_when(
#       puntuacion_final >= 8 ~ "🌟 Excelente coincidencia",
#       puntuacion_final >= 6 ~ "✅ Buena aproximación",
#       puntuacion_final >= 4 ~ "⚠️ Aproximación moderada",
#       TRUE ~ "❌ Patrones artificiales detectados"
#     )
#   )


