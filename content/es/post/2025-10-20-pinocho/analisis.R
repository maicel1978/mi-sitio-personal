# ==============================================================================
# SCRIPT: ANÁLISIS FORENSE DE DATOS
# Autor: Maicel Monzon MD, PhD
# Fecha: 02/12/2025
# ==============================================================================

# 1. CARGA DE LIBRERÍAS Y CONFIGURACIÓN ----------------------------------------
suppressMessages(library(tidyverse, verbose = F))
library(conflicted)
conflicts_prefer(stats::filter)
library(scales)
library(readr)
# Librerías específicas forenses (opcionales si solo graficas, pero las mantengo)
library(digitTests)
library(benford.analysis)
library(randtests)
library(scrutiny)
library(statcheck)
library(dlookr)
library(gtsummary)
library(labelled)

# 2. DEFINICIÓN DE TEMA Y ESTÉTICA ---------------------------------------------

# Tema Académico Sobrio (Optimizado)
theme_academico <- function() {
  theme_minimal(base_size = 14) + 
    theme(
      plot.title = element_text(face = "bold", color = "black", size = 16, margin = margin(b = 10)),
      plot.subtitle = element_text(color = "grey20", size = 12, margin = margin(b = 10)),
      axis.title = element_text(color = "black", size = 12),
      axis.text = element_text(color = "grey10", size = 10),
      strip.background = element_rect(fill = "grey95", color = NA),
      strip.text = element_text(color = "black", face = "bold", size = 12),
      legend.position = "bottom",
      panel.grid.major = element_line(color = "grey85", linewidth = 0.3, linetype = "dashed"),
      panel.grid.minor = element_blank(),
      axis.line = element_line(color = "grey30", linewidth = 0.5),
      panel.background = element_rect(fill = "white", color = NA),
      plot.background = element_rect(fill = "white", color = NA),
      plot.margin = margin(10, 10, 10, 10)
    )
}

# PALETA DE COLORES CORPORATIVA (CONSISTENCIA TOTAL)
# Se define aquí para usarla en TODOS los gráficos
colores_fijos <- c(
  "La Entusiasta" = "#E41A1C", # Rojo
  "La Confiada"   = "#377EB8", # Azul
  "La Prudente"   = "#4DAF4A", # Verde
  "REALIDAD"      = "black"    # Negro (Referencia absoluta)
)

# 3. CARGA Y PREPARACIÓN DE DATOS ----------------------------------------------

# Cargar datos (Asegúrate de que el archivo existe en el wd)
datos_completos <- readr::read_delim(file = "experimento.csv", delim = ",", show_col_types = FALSE)

# Crear subset SIN realidad para análisis comparativos específicos
datos <- datos_completos %>% dplyr::filter(participante != "REALIDAD")

# PARÁMETROS FIJOS DE LITERATURA (Referencia Médica)
media_real <- 136.0  # g/L
sd_real    <- 7.5    # g/L


# 4. TABLAS DE RESUMEN (MEDIA Y VARIABILIDAD) ----------------------------------

# Tabla de Media
tabla_media <- datos %>%
  group_by(participante) %>%
  summarise(
    n = n(),
    Media = mean(valor), 
    SD = sd(valor), 
    .groups = 'drop'
  ) %>%
  mutate(
    Ref_Media = media_real, 
    Diferencia = Media - media_real 
  ) 

# Tabla de Variabilidad
tabla_variabilidad <- datos %>%
  group_by(participante) %>%
  summarise(
    SD = sd(valor),
    min = min(valor),
    max = max(valor)
  ) %>%
  mutate(
    Ref_SD = sd_real,
    Dif_SD = abs(SD - sd_real),
    Evaluacion = case_when(
      Dif_SD < 2.5 ~ "Excelente",
      Dif_SD < 5.0 ~ "Aceptable",
      TRUE         ~ "Deficiente"
    )
  )

# Tabla formateada para visualización
tabla_variabilidad_display <- tabla_variabilidad %>%
  select(Participante = participante,
         `SD (g/L)` = SD,
         `Ref. SD` = Ref_SD,
         `Evaluación` = Evaluacion)


# 5. GRÁFICOS DE VARIABILIDAD (EL NÚCLEO DEL ANÁLISIS) -------------------------

# --- A. GRÁFICO DE RANGOS MINIMALISTA (Asimetría del Miedo) ---
# Usamos datos_completos para incluir la línea negra de "REALIDAD"

resumen_rangos_final <- datos_completos %>%
  group_by(participante) %>%
  summarise(
    min_val = min(valor),
    max_val = max(valor)
  ) %>%
  # Ordenar: REALIDAD abajo como base de comparación
  mutate(participante = fct_relevel(participante, "REALIDAD"))

g_rangos <- ggplot(resumen_rangos_final, aes(y = participante)) +
  
  # Líneas de referencia normal (121 y 151 según texto)
  geom_vline(xintercept = c(121, 151), linetype = "dashed", color = "grey60", size = 0.5) +
  
  # Conector del rango
  geom_segment(aes(x = min_val, xend = max_val, 
                   y = participante, yend = participante, 
                   color = participante), 
               linewidth = 1.2, alpha = 0.8) +
  
  # Puntos extremos
  geom_point(aes(x = min_val, color = participante), size = 4) +
  geom_point(aes(x = max_val, color = participante), size = 4) +
  
  # Escalas y Colores
  scale_x_continuous(breaks = seq(100, 160, 5), limits = c(100, 160)) +
  scale_color_manual(values = colores_fijos) + # APLICANDO COLORES FIJOS
  
  # Etiquetas
  labs(title = "Rangos Observados [Mínimo — Máximo]",
       subtitle = "Las líneas verticales grises marcan los límites normales (121 y 151 g/L).",
       x = "Hemoglobina (g/L)", 
       y = NULL) + 
  
  theme_academico() +
  theme(
    legend.position = "none",
    panel.grid.major.y = element_blank(),     
    panel.grid.major.x = element_line(color = "grey85", size = 0.4), 
    axis.text.y = element_text(face = "bold", color = "black"),
    axis.text.x = element_text(color = "grey20", size = 10)
  )


#GRÁFICO DENSIDAD (DISTRIBUCIÓN) ---
  # Visualizando la forma del fraude: Colas largas a la izquierda, cortas a la derecha.
  
  g_distribucion <- ggplot(datos, aes(x = valor, color = participante, fill = participante)) +
  
  # A. LÍNEAS DE LÍMITES NORMALES (El contexto clínico)
  # Estas líneas muestran visualmente el "piso" y "techo" que mencionas en el texto.
  geom_vline(xintercept = c(121, 151), linetype = "dotted", color = "grey50", linewidth = 0.6) +
  
  # B. CURVA TEÓRICA (El estándar de oro)
  # inherit.aes = FALSE es vital para que no busque "participante" en esta capa
  stat_function(fun = dnorm, args = list(mean = media_real, sd = sd_real),
                aes(linetype = "Curva Normal Teórica"), 
                color = "black", linewidth = 0.9, inherit.aes = FALSE) +
  
  # C. DENSIDADES OBSERVADAS (Las estudiantes)
  # alpha = 0.2 es mejor que 0.3 para ver cuando se solapan varias curvas
  geom_density(alpha = 0.2, linewidth = 1) + 
  
  # D. ESCALAS Y COLORES (Consistencia total)
  scale_color_manual(values = colores_fijos) + 
  scale_fill_manual(values = colores_fijos) +
  
  # Eje X sincronizado con el gráfico de rangos para comparación directa
  scale_x_continuous(breaks = seq(100, 160, 10), limits = c(95, 160)) +
  
  # E. ETIQUETAS Y TEMA
  labs(title = "La Forma del Fraude: Distribución vs. Normalidad",
       subtitle = "Línea negra: Referencia Normal. Líneas punteadas: Límites clínicos (121-151).",
       x = "Hemoglobina (g/L)", 
       y = "Densidad",
       linetype = "") + # Elimina el título de la leyenda de la línea negra
  
  theme_academico() +
  theme(legend.position = "bottom") # Asegura que la leyenda no robe espacio lateral


# 6. ANÁLISIS DEL ÚLTIMO DÍGITO (BENFORD-LIKE) ---------------------------------
# 
# analisis_ultimo_digito <- datos %>%
#   mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
#   count(participante, ultimo_digito, .drop = FALSE) %>%
#   group_by(participante) %>%
#   mutate(
#     prop = n / sum(n),
#     # Umbral: > 7% de desviación sobre el 10% esperado se marca en rojo
#     es_alto = abs(prop - 0.10) > 0.07 
#   )
# 
# g_utimodig <- ggplot(analisis_ultimo_digito, aes(x = ultimo_digito, y = prop)) +
#   geom_hline(yintercept = 0.10, linetype = "solid", color = "black", alpha = 0.5) +
#   geom_col(aes(fill = es_alto), width = 0.7, color = "white") +
#   facet_wrap(~ participante) +
#   scale_fill_manual(values = c("FALSE" = "gray60", "TRUE" = "firebrick"),
#                     labels = c("Esperado", "Desviación Alta")) +
#   scale_y_continuous(labels = percent_format(accuracy = 1)) +
#   labs(title = "Detección de Datos Inventados: Análisis del Último Dígito",
#        subtitle = "Comparación: Datos Reales vs. Inventiva Humana",
#        fill = "Estado", 
#        x = "Último Dígito", 
#        y = "Frecuencia Relativa") +
#   theme_academico()
# 
# 
# Tabla Resumen Dígitos
# tabla_desviacion <- analisis_ultimo_digito %>%
#   group_by(participante) %>%
#   summarise(
#     Desv_Promedio = mean(abs(prop - 0.10)) * 100,
#     Exceso_0_5 = sum(prop[ultimo_digito %in% c(0,5)]) * 100
#   ) %>%
#   mutate(
#     Evaluacion = if_else(Desv_Promedio > 3.5, "Patrón Artificial", "Patrón Natural"),
#     Desv_Promedio = sprintf("%.1f%%", Desv_Promedio),
#     Exceso_0_5 = sprintf("%.1f%%", Exceso_0_5)
#   )
# # 
# tabla_digitos_display <- tabla_desviacion %>%
#   select(Participante = participante,
#          `Desv. Media` = Desv_Promedio,
#          `Exceso 0 y 5` = Exceso_0_5,
#          `Evaluación` = Evaluacion)
# 
  analisis_ultimo_digito <- datos %>%
    mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
    count(participante, ultimo_digito, .drop = FALSE) %>%
    group_by(participante) %>%
    mutate(
      prop = n / sum(n),
      # Umbral: > 7% de desviación sobre el 10% esperado se marca en rojo
      es_alto = abs(prop - 0.10) > 0.07 
    )
  
  # Creamos tabla para impresión, independiente de la original
  tabla_ultimo_digito <- analisis_ultimo_digito %>%
    mutate(
      prop_html = ifelse(
        es_alto,
        cell_spec(paste0(round(prop*100,1), "%"), bold = TRUE, color = "red"),
        paste0(round(prop*100,1), "%")
      )
    ) %>%
    select(ultimo_digito, participante, prop_html) %>%
    pivot_wider(
      names_from = participante,
      values_from = prop_html
    ) %>%
    arrange(as.numeric(as.character(ultimo_digito)))
  
  
  g_utimodig <- ggplot(analisis_ultimo_digito, aes(x = ultimo_digito, y = prop)) +
    geom_hline(yintercept = 0.10, linetype = "solid", color = "black", alpha = 0.5) +
    geom_col(aes(fill = es_alto), width = 0.7, color = "white") +
    facet_wrap(~ participante) +
    scale_fill_manual(values = c("FALSE" = "gray60", "TRUE" = "firebrick"),
                      labels = c("Esperado", "Desviación Alta")) +
    scale_y_continuous(labels = percent_format(accuracy = 1)) +
    labs(title = "Detección de Datos Inventados: Análisis del Último Dígito",
         subtitle = "Comparación: Datos Reales vs. Inventiva Humana",
         fill = "Estado", 
         x = "Último Dígito", 
         y = "Frecuencia Relativa") +
    theme_academico()
  
  
  # Tabla Resumen Dígitos
  # CORRECCIÓN: Calculamos la SUMA de 0 y 5, no el exceso, para evitar confusiones.
  # Lo ideal es 20% (10% + 10%).
  # tabla_desviacion <- analisis_ultimo_digito %>%
  #   group_by(participante) %>%
  #   summarise(
  #     Desv_Promedio = mean(abs(prop - 0.10)) * 100,
  #     Suma_0_5 = sum(prop[ultimo_digito %in% c(0,5)]) * 100 # <--- ESTE ES EL NUEVO NOMBRE
  #   ) %>%
  #   mutate(
  #     Evaluacion = if_else(Desv_Promedio > 5.5, "Patrón Artificial", 
  #                          if_else(Desv_Promedio > 3.0, "Zona Gris", "Patrón Natural")),
  #     Desv_Promedio = sprintf("%.1f%%", Desv_Promedio),
  #     Suma_0_5 = sprintf("%.1f%%", Suma_0_5)
  #   )
  # 
  # tabla_digitos_display <- tabla_desviacion %>%
  #   select(Participante = participante,
  #          `Desv. Media` = Desv_Promedio,
  #          `Frecuencia 0 y 5` = Suma_0_5, # Nombre más claro
  #          `Evaluación` = Evaluacion)
  
  
  tabla_desviacion <- analisis_ultimo_digito %>%
    group_by(participante) %>%
    summarise(
      Desv_Promedio = mean(abs(prop - 0.10)) * 100,
      Suma_0_5 = sum(prop[ultimo_digito %in% c(0,5)]) * 100 # <--- CAMBIO IMPORTANTE
    ) %>%
    mutate(
      # Ajustamos criterios para ser más justos con muestras pequeñas
      Evaluacion = case_when(
        Desv_Promedio > 5.5 ~ "Patrón Artificial",
        Desv_Promedio > 3.0 ~ "Zona Gris / Sospechoso",
        TRUE ~ "Patrón Natural"
      ),
      Desv_Promedio = sprintf("%.1f%%", Desv_Promedio),
      Suma_0_5 = sprintf("%.1f%%", Suma_0_5)
    )
  
  # Preparamos la tabla lista para imprimir (para simplificar el Rmd)
  tabla_digitos_display <- tabla_desviacion %>%
    select(Participante = participante,
           `Desv. Media` = Desv_Promedio,
           `Frecuencia 0 y 5` = Suma_0_5,
           `Evaluación` = Evaluacion) 
  
# 7. TEST DE RACHAS (INDEPENDENCIA) --------------------------------------------

analisis_rachas <- datos %>%
  group_by(participante) %>%
  summarise(
    Z_Score = {
      x <- valor; med <- median(x); signs <- sign(x - med); signs <- signs[signs != 0]
      if(length(signs) < 10) NA else {
        runs <- rle(signs); n1 <- sum(signs == 1); n2 <- sum(signs == -1); n <- n1 + n2
        R <- length(runs$lengths); mu <- 2 * n1 * n2 / n + 1
        sigma <- sqrt((mu - 1) * (mu - 2) / (n - 1))
        (R - mu) / sigma
      }
    }
  ) %>%
  mutate(
    Evaluacion = case_when(
      is.na(Z_Score) ~ "Datos insuficientes",
      abs(Z_Score) > 1.96 ~ "No Aleatorio",
      TRUE ~ "Aleatorio"
    )
  )

tabla_rachas_display <- analisis_rachas %>%
  select(Participante = participante,
         `Z-Score` = Z_Score,
         `Evaluación` = Evaluacion) %>%
  mutate(`Z-Score` = round(`Z-Score`, 2))

# ==============================================================================
# FIN DEL SCRIPT
# Para ver los gráficos, ejecuta:
# g_rangos
# g_distribucion
# g_utimodig
# ==============================================================================
