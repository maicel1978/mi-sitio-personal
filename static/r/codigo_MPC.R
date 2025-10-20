# =============================================================================
# MODELO CLÍNICO  
# Post: Cómo entrenar y validar un modelo de predicción clínica
# =============================================================================

# LIBRERÍAS MÍNIMAS PERO SUFICIENTES
library(rms)    # El alma de la metodología 
library(pROC)   # ROC confiable
library(ggplot2)# Gráficos publicación
library(missRanger)
library(mlbench)

set.seed(123)   # para reproducibilidad

# DATOS: 
data("PimaIndiansDiabetes")
datos <- PimaIndiansDiabetes

# predictores
vars_clinicas <- c("glucose", "pressure", "triceps", "insulin", "mass")

# PASO CRÍTICO: Valores imposibles → NA (no ignorar)
datos <- datos %>%
  # Reemplaza 0 por NA solo en las columnas especificadas en vars_clinicas
  mutate(across(all_of(vars_clinicas), ~ ifelse(.x == 0, NA, .x))) %>%
  # Luego aplica missRanger al dataset completo (o se puede focalizar si se desea)
  missRanger()

# CONFIGURACIÓN RMS (NO OMITIR)
dd <- datadist(datos)
options(datadist = "dd")

# MODELO: PREDICTORES POR FISIOPATOLOGÍA, NO p-valores
modelo <- lrm(diabetes ~ rcs(glucose, 3) + rcs(mass, 3) + age + pregnant + pedigree,
              data = datos, x = TRUE, y = TRUE)

# VALIDACIÓN: BOOTSTRAP O NADA
val_boot <- validate(modelo, method = "boot", B = 200)
cal_boot <- calibrate(modelo, method = "boot", B = 200)

# GRÁFICOS DE SUPERVIVENCIA 
plot(cal_boot, main = "Probabilidasde predichas vs observadas")
abline(0, 1, lty = 2, col = "red")

roc_obj <- roc(datos$diabetes, predict(modelo, type = "fitted"))
plot(roc_obj, main = paste("AUC =", round(auc(roc_obj), 3)), 
     col = "blue", legacy.axes = TRUE)

# NOMOGRAMA: EL TEST DE USABILIDAD CLÍNICA  
nom <- nomogram(modelo, fun = plogis, funlabel = "Riesgo Diabetes")
plot(nom)



