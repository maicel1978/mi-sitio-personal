# SCRIPT: ANÁLISIS FORENSE DE DATOS
# Autor: Maicel Monzon MD, PHd
# Fecha: 02/12/2025
# bibliotecas
suppressMessages(library(tidyverse,verbose = F))
library(conflicted)
conflicts_prefer(stats::filter)
library(digitTests)
library(benford.analysis)
library(randtests)
library(scrutiny)
library(statcheck)
library(scales)
library(dlookr)
library(gtsummary)
library(labelled)




# 1. CARGA Y CONFIGURACIÓN-------------------------------------------------
library(readr)
datos_completos <- readr::read_delim(file = "experimento.csv",delim = ",")


 # datos_completos <- read_csv("content/es/post/2025-10-20-pinocho/experimento.csv")


# Filtramos "REALIDAD" porque usaremos parámetros fijos de literatura
datos <- datos_completos %>% dplyr::filter(participante != "REALIDAD")

# PARÁMETROS FIJOS DE LITERATURA (Harrison / Medicina Interna)
media_real <- 136.0  # g/L
sd_real    <- 7.5    # g/L

# TEMA GRÁFICO SOBRIO
theme_academico <- function() {
  theme_minimal(base_size = 12) +
    theme(
      plot.title = element_text(face = "bold", color = "black"),
      strip.background = element_rect(fill = "gray80", color = NA),
      strip.text = element_text(color = "black", face = "bold"),
      legend.position = "bottom",
      panel.grid.minor = element_blank()
    )
}

# 2. ANÁLISIS DE MEDIA (error) -------------------------------------------------

tabla_media <- datos %>%
  group_by(participante) %>%
  summarise(
    n = n(),
    Media = mean(valor), 
    SD = sd(valor), # Mantenemos SD para el cálculo posterior del Error Estándar
    .groups = 'drop'
  ) %>%
  mutate(
    Ref_Media = media_real, 
    Diferencia = Media - media_real # Error de Estimación
  ) 



# etiquetas
# var_label(tabla_media$participante) <- "Participante"
# var_label(tabla_media$n) <- "Valores inventados"
# var_label(tabla_media$Media) <- "Media aritmetica (g/L)"
# var_label(tabla_media$Ref_Media) <- "Parametro poblacional"
# var_label(tabla_media$Diferencia) <- "Error de estimación"

# 3. ANÁLISIS DE VARIABILIDAD -------------------------------------------------
tabla_variabilidad <- datos %>%
  group_by(participante) %>%
  summarise(SD = sd(valor)) %>%
  mutate(
    Ref_SD = sd_real,
    Dif_SD = abs(SD - sd_real),
    Evaluacion = case_when(
      Dif_SD < 2.5 ~ "Excelente",
      Dif_SD < 5.0 ~ "Aceptable",
      TRUE         ~ "Deficiente"
    )
  )

# Tabla formateada para index.Rmd
tabla_variabilidad_display <- tabla_variabilidad %>%
  select(Participante = participante,
         `SD (g/L)` = SD,
         `Ref. SD` = Ref_SD,
         `Evaluación` = Evaluacion)

# Gráfico Densidad
g_distribucion <- ggplot(datos, aes(x = valor, color = participante)) +
  stat_function(fun = dnorm, args = list(mean = media_real, sd = sd_real), 
                aes(linetype = "Referencia (Literatura)"), color = "black", size = 0.8) +
  geom_density(size = 1) +
  scale_color_brewer(palette = "Set1") +
  labs(title = "Distribución de Datos vs Referencia",
       subtitle = "Línea negra: Curva Normal Teórica (Media=136, SD=7.5)",
       x = "Hemoglobina (g/L)", y = "Densidad") +
  theme_academico()

# 4. ANÁLISIS DEL ÚLTIMO DÍGITO -------------------------------------------------

analisis_ultimo_digito <- datos %>%
  mutate(ultimo_digito = factor(valor %% 10, levels = 0:9)) %>%
  count(participante, ultimo_digito, .drop = FALSE) %>%
  group_by(participante) %>%
  mutate(
    prop = n / sum(n),
    # Desviación mayor al 6% se marca como "Alta"
    es_alto = abs(prop - 0.10) > 0.06
  )

# Gráfico
g_utimodig <- ggplot(analisis_ultimo_digito, aes(x = ultimo_digito, y = prop)) +
  geom_hline(yintercept = 0.10, linetype = "dashed") +
  geom_col(aes(fill = es_alto), width = 0.7) +
  facet_wrap(~ participante) +
  scale_fill_manual(values = c("FALSE" = "gray50", "TRUE" = "firebrick"), 
                    labels = c("Esperado", "Desviación Alta")) +
  scale_y_continuous(labels = percent_format(accuracy = 1)) +
  labs(title = "Frecuencia del Último Dígito",
       fill = "Estado", x = "Dígito", y = "Proporción") +
  theme_academico()

# Tabla Resumen
tabla_desviacion <- analisis_ultimo_digito %>%
  group_by(participante) %>%
  summarise(
    Desv_Promedio = mean(abs(prop - 0.10)) * 100,
    Exceso_0_5 = sum(prop[ultimo_digito %in% c(0,5)]) * 100
  ) %>%
  mutate(
    Evaluacion = if_else(Desv_Promedio > 3.5, "Patrón Artificial", "Patrón Natural"),
    Desv_Promedio = sprintf("%.1f%%", Desv_Promedio),
    Exceso_0_5 = sprintf("%.1f%%", Exceso_0_5)
  )

# Tabla formateada para index.Rmd
tabla_digitos_display <- tabla_desviacion %>%
  select(Participante = participante,
         `Desv. Media` = Desv_Promedio,
         `Exceso 0 y 5` = Exceso_0_5,
         `Evaluación` = Evaluacion)

# 5. TEST DE RACHAS -------------------------------------------------
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

# Tabla formateada para index.Rmd
tabla_rachas_display <- analisis_rachas %>%
  select(Participante = participante,
         `Z-Score` = Z_Score,
         `Evaluación` = Evaluacion) %>%
  mutate(`Z-Score` = round(`Z-Score`, 2))