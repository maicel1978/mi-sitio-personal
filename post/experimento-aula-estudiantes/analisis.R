## ==============================================================================
# SCRIPT: ANÁLISIS FORENSE DE DATOS
# Autor: Maicel Monzon MD, PhD
# Fecha: 02/12/2025
# 
# Descripción general:
# Este script realiza un análisis forense de datos inventados por estudiantes 
# en un experimento sobre hemoglobina. Compara los datos generados por tres 
# participantes ("La Entusiasta", "La Confiada", "La Prudente") con valores 
# reales ("REALIDAD") y una distribución normal teórica.
# 
# Se calculan estadísticos descriptivos, se generan tablas y gráficos para 
# detectar anomalías como sesgos en medias, variabilidad, distribución de 
# dígitos, cumplimiento de la Ley de Benford, rachas y forma de la distribución.
# 
# Dependencias: Requiere el archivo "experimento.csv" con columnas 'participante' 
# y 'valor'. Asegúrate de que el working directory lo contenga.
# 
# 
# Instrucciones de uso:
# - Ejecuta el script completo.
# - Para visualizar: Llama a los objetos gráficos como g_rangos, g_distribucion, etc.
# ==============================================================================

# CARGA DE LIBRERÍAS Y CONFIGURACIÓN ----------------------------------------
# Suprimimos mensajes para una salida limpia
suppressMessages(library(tidyverse, verbose = F))
library(conflicted)
# Resolvemos conflictos comunes: Preferimos filter de dplyr y skewness/kurtosis de moments
conflicts_prefer(dplyr::filter)
conflicts_prefer(moments::skewness)
conflicts_prefer(moments::kurtosis)
library(moments) # Para cálculos de asimetría y curtosis
library(scales) # Para formateo de porcentajes en gráficos
library(readr) # Para lectura de CSV
suppressMessages(library(kableExtra)) # Para tablas formateadas en HTML
# Librerías forenses (usadas para Benford y otros tests)
library(digitTests)
library(benford.analysis)
library(randtests)
library(scrutiny)
library(statcheck)
library(dlookr)
library(gtsummary)
library(labelled)
library(kableExtra)

# DEFINICIÓN DE TEMA Y ESTÉTICA ---------------------------------------------
# Tema personalizado para gráficos: Minimalista y académico, con grids suaves
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

# PALETA DE COLORES 
# Colores fijos para consistencia visual: Asignados a cada participante, incluyendo REALIDAD como referencia
colores_fijos <- c(
  "La Entusiasta" = "#E41A1C", # Rojo
  "La Confiada"   = "#377EB8", # Azul
  "La Prudente"   = "#4DAF4A", # Verde
  "REALIDAD"      = "black"    # Negro (Referencia absoluta)
)

# CARGA Y PREPARACIÓN DE DATOS ----------------------------------------------
# Cargar datos desde CSV (asumiendo columnas: participante, valor)
datos_completos <- readr::read_delim(file = "experimento.csv", delim = ",", show_col_types = FALSE)

# Subset sin REALIDAD para análisis comparativos (los estudiantes vs. real)
datos <- datos_completos %>% dplyr::filter(participante != "REALIDAD")

# PARÁMETROS FIJOS DE LITERATURA (Referencia Médica)
# Valores de referencia para hemoglobina en mujeres adultas
media_real <- 136.0  # g/L (media poblacional)
sd_real    <- 7.5    # g/L (desviación estándar poblacional)

# 4. Primera prueba: ¿Acertaron el centro?----------------------------------
# Calcula medias por participante y diferencia con la real
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

# 5. Segunda prueba: ¿Simularon bien la variabilidad?-----------------------
# Calcula variabilidad (SD, min, max) y evalúa diferencia con referencia
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

# Tabla formateada para display (sin columnas internas)
tabla_variabilidad_display <- tabla_variabilidad %>%
  select(Participante = participante,
         `SD (g/L)` = SD,
         `Ref. SD` = Ref_SD,
         `Evaluación` = Evaluacion)

# 5. GRÁFICOS DE VARIABILIDAD (EL NÚCLEO DEL ANÁLISIS) ----------------------
# Resumen de rangos para gráfico de segmentos
resumen_rangos_final <- datos_completos %>%
  group_by(participante) %>%
  summarise(
    min_val = min(valor),
    max_val = max(valor)
  ) %>%
  # Reordenar para que REALIDAD sea la base
  mutate(participante = fct_relevel(participante, "REALIDAD"))

# Gráfico de rangos: Segmentos horizontales con puntos extremos
g_rangos <- ggplot(resumen_rangos_final, aes(y = participante)) +
  # Líneas de referencia para límites normales
  geom_vline(xintercept = c(121, 151), 
             linetype = "dashed", color = "grey60", size = 0.5) +
  # Segmento conectando min-max
  geom_segment(aes(x = min_val, xend = max_val, 
                   y = participante, yend = participante, 
                   color = participante), 
               linewidth = 1.2, alpha = 0.8) +
  # Puntos en extremos
  geom_point(aes(x = min_val, color = participante), size = 4) +
  geom_point(aes(x = max_val, color = participante), size = 4) +
  
  # Escalas y colores
  scale_x_continuous(breaks = seq(100, 160, 5), limits = c(100, 160)) +
  scale_color_manual(values = colores_fijos) +
  
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

# GRÁFICO DENSIDAD (DISTRIBUCIÓN) ------------------------------------------
# Gráfico de densidades de los estudiantes superpuesto con normal teórica
g_distribucion <- ggplot(datos, aes(x = valor, color = participante, fill = participante)) +
  
  # A. Líneas de límites normales
  geom_vline(xintercept = c(121, 151), linetype = "dotted", color = "grey50", linewidth = 0.6) +
  
  # B. Curva teórica normal (referencia)
  stat_function(fun = dnorm, args = list(mean = media_real, sd = sd_real),
                aes(linetype = "Curva Normal Teórica"), 
                color = "black", linewidth = 0.9, inherit.aes = FALSE) +
  
  # C. Densidades observadas (estudiantes)
  geom_density(alpha = 0.2, linewidth = 1) + 
  
  # D. Escalas y colores
  scale_color_manual(values = colores_fijos) + 
  scale_fill_manual(values = colores_fijos) +
  scale_x_continuous(breaks = seq(100, 160, 10), limits = c(95, 160)) +
  
  # E. Etiquetas y tema
  labs(title = "La Forma del Fraude: Distribución vs. Normalidad",
       subtitle = "Línea negra: Referencia Normal. Líneas punteadas: Límites clínicos (121-151).",
       x = "Hemoglobina (g/L)", 
       y = "Densidad",
       linetype = "") + 
  
  theme_academico() +
  theme(legend.position = "bottom")

# 6. Tercera prueba: El último dígito (El rastro del caos) ------------------
# A. Cálculo de proporciones de últimos dígitos y detección de anomalías
analisis_ultimo_digito <- datos %>%
  mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
  count(participante, ultimo_digito, .drop = FALSE) %>%
  group_by(participante) %>%
  mutate(
    prop = n / sum(n),
    es_alto = abs(prop - 0.10) > 0.06 
  )

# B. Tabla con formato HTML (colores para desviaciones)
tabla_ultimo_digito <- analisis_ultimo_digito %>%
  mutate(
    prop_formato = paste0(round(prop * 100, 1), "%"),
    prop_html = ifelse(
      es_alto,
      cell_spec(prop_formato, "html", bold = TRUE, color = "red"),
      prop_formato
    )
  ) %>%
  select(ultimo_digito, participante, prop_html) %>%
  pivot_wider(names_from = participante, values_from = prop_html) %>%
  arrange(as.numeric(as.character(ultimo_digito)))

# C. Gráfico de barras para distribución de últimos dígitos
g_utimodig <- ggplot(analisis_ultimo_digito, aes(x = ultimo_digito, y = prop)) +
  geom_hline(yintercept = 0.10, linetype = "solid", color = "black", alpha = 0.5) +
  geom_col(aes(fill = es_alto), width = 0.7, color = "white") +
  facet_wrap(~ participante) +
  scale_fill_manual(values = c("FALSE" = "gray60", "TRUE" = "firebrick"),
                    labels = c("Esperado", "Desviación Alta")) +
  scale_y_continuous(labels = percent_format(accuracy = 1)) +
  labs(title = "Detección de Datos Inventados: Último Dígito",
       subtitle = "Comparación: Datos Reales vs. Sesgos Cognitivos",
       fill = "Estado", 
       x = "Último Dígito", 
       y = "Frecuencia Relativa") +
  theme_academico()

# D. Tabla de diagnóstico forense basado en desviaciones
tabla_digitos_display <- analisis_ultimo_digito %>%
  group_by(participante) %>%
  summarise(
    Desv_Promedio = mean(abs(prop - 0.10)) * 100,
    Suma_0_5      = sum(prop[ultimo_digito %in% c(0,5)]) * 100 
  ) %>%
  mutate(
    Evaluacion = case_when(
      Suma_0_5 > 25 ~ "Sospechoso: Exceso de Redondeo",   
      Suma_0_5 < 15 ~ "Sospechoso: Evitación Artificial", 
      Desv_Promedio > 4.0 ~ "Sospechoso: Patrón Irregular", 
      TRUE ~ "Patrón Natural"
    ),
    Desv_Promedio    = sprintf("%.1f%%", Desv_Promedio),
    Suma_0_5         = sprintf("%.1f%%", Suma_0_5)
  ) %>%
  select(Participante = participante,
         `Desv. Media` = Desv_Promedio,
         `Frecuencia 0 y 5` = Suma_0_5,
         `Evaluación` = Evaluacion)  

# 7. Cuarta prueba: Ley de Benford (El Segundo Dígito) ----------------------
# Nota: Dado el rango estrecho de hemoglobina, usamos frecuencia de decenas 
# en lugar de Benford completo para detectar aversión a extremos.

# Análisis de decenas (segundo dígito)
analisis_decenas <- datos %>%
  mutate(decena = floor((valor %% 100) / 10)) %>% 
  count(participante, decena) %>%
  group_by(participante) %>%
  mutate(prop = n / sum(n))

# Gráfico de Benford adaptado: Barras con tendencia suave
g_benford <- ggplot(analisis_decenas, aes(x = factor(decena), y = prop)) +
  geom_col(aes(fill = participante), color = "white", show.legend = FALSE) +
  # Línea suave para tendencia
  geom_smooth(aes(group=1), method = "loess", se = FALSE, color="black", linetype="dashed") +
  facet_wrap(~ participante, scales = "free_x") +
  # Usamos colores_fijos para consistencia (excluyendo REALIDAD)
  scale_fill_manual(values = colores_fijos[names(colores_fijos) != "REALIDAD"]) +
  scale_y_continuous(labels = percent_format(accuracy = 1)) +
  labs(title = "El Fantasma de Benford: Análisis de las Decenas",
       subtitle = "La 'Montaña' artificial (Aversión a los Extremos) vs. Dispersión Natural",
       x = "Segundo Dígito (Decena: 1[3]6)",
       y = "Frecuencia") +
  theme_academico()  

# 7. TEST DE RACHAS (INDEPENDENCIA) -----------------------------------------
# Test de rachas para detectar no-aleatoriedad en la secuencia de valores
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

# Tabla display para rachas
tabla_rachas_display <- analisis_rachas %>%
  select(Participante = participante,
         `Z-Score` = Z_Score,
         `Evaluación` = Evaluacion) %>%
  mutate(`Z-Score` = round(`Z-Score`, 2))

# 8. Quinta prueba: Análisis de Distribución (Forma y Sesgo) ----------------
# Preparar datos con factores (incluye REALIDAD aunque no esté en 'datos')
datos_plot <- datos %>%
  mutate(participante = factor(participante, 
                               levels = c("REALIDAD", "La Confiada", "La Entusiasta", "La Prudente")))

# Tabla de métricas de forma (media, SD, asimetría, curtosis)
tabla_forma <- datos_plot %>%
  group_by(participante) %>%
  summarise(
    Media = mean(valor),
    SD = sd(valor),
    Asimetria = skewness(valor),  
    Curtosis = kurtosis(valor)    
  ) 

# Gráfico de curtosis y asimetría (densidades superpuestas)
g_curtosis <- ggplot(datos_plot, aes(x = valor, fill = participante)) +
  geom_density(alpha = 0.5, color = "white", size = 0.3) +
  # Línea vertical en media real
  geom_vline(xintercept = 136, linetype = "dotted", color = "black", alpha = 0.6) +
  # Colores y etiquetas personalizadas
  scale_fill_manual(
    values = colores_fijos,
    labels = c("REALIDAD" = "Biología Real (Referencia)", 
               "La Confiada" = "La Confiada (Sesgada)", 
               "La Entusiasta" = "La Entusiasta", 
               "La Prudente" = "La Prudente (Picuda)")
  ) +
  labs(title = "El Detector de Forma: Asimetría y Curtosis",
       subtitle = "Comparación de la huella dactilar de la distribución",
       x = "Valor de Hemoglobina (g/L)",
       y = "Densidad") +
  theme_academico() +
  theme(legend.position = "bottom")

# ==============================================================================
# FIN DEL SCRIPT
# Para ver los gráficos, ejecuta:
# g_rangos
# g_distribucion
# g_utimodig
# g_benford
# g_curtosis (opcional, no usado en el post)
# ==============================================================================