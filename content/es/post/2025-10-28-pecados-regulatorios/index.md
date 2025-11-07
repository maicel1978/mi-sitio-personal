---
title: "Los siete pecados capitales del protocolo y del Plan de Análisis Estadístico: confesiones de un regulador"
subtitle: "Por qué los reguladores rechazan protocolos de ensayos clínicos y cómo evitar los errores estadísticos que los condenan"
categories: ["Evaluación Regulatoria"]
summary: "Errores en protocolos clínicos y planes de análisis estadístico no siempre provienen de fallos técnicos, sino de decisiones humanas mal calibradas. Esta guía identifica siete errores comunes —inspirados en los pecados capitales— que pueden comprometer la validez científica, la coherencia metodológica y la aprobación regulatoria de un ensayo clínico. Una invitación a revisar con humor, rigor y autoconciencia antes de someter un protocolo o plan estadístico, fortaleciendo la calidad del diseño, la transparencia analítica y la confiabilidad de los resultados clínicos"
profile: true
authors:
  - "admin"
date: "2025-10-28" #año mes dia
# show_author_profile: true
tags: 
  - "bioestadistica"
  - "ensayos-clinicos"
  - "errores-estadisticos"
  - "plan-analisis-estadistico"
slug: por-que-reguladores-rechazan-protocolos-ensayos-clinicos
featured: true  # Destacar en la página principal
translationKey: "pecados"
# languages:
#   es: "/es/siete-pecados-protocolo-plan-estadistico-regulador"
#   en: "/en/how-to-train-and-validate-clinical-prediction-model"
# related_posts:
#   - "eda"  # Slug de tu post sobre EDA, luego añadir categoria superior para cluster
# control
show_date: true
reading_time: true
share: true
feedback: true
commentable: true
pager: true
show_related: true
show_breadcrumb: true
draft: true# True para un borrador
---

*¿Sabías que más de la mitad de los protocolos de ensayos clínicos requieren modificaciones antes de su aprobación debido a deficiencias metodológicas evitables?*

Imagine la escena: tras **meses de trabajo meticuloso**, el **protocolo** de su **ensayo clínico regresa** con una una **solicitud de completamiento de información** (RFI por sus siglas en ingles) y una extensa lista de observaciones por parte de la autoridad reguladora por lo que tendrá que hacer **modificaciones** para someterlo a una nueva evaluación.

{{% callout note %}} Una **RFI (Request for Information)** es un **mecanismo formal** utilizado generalmente por **autoridades reguladoras** o **comités de revisión** (Ej. Comités de Ética de la Investigación), para solicitar al **promotor** o al **investigador**, **datos**, **documentos o aclaraciones** que se consideran **ambiguas** o **insuficientes** en la **documentación** presentada para la **Solicitud de Autorización**. {{% /callout %}}

Muchas modificaciones posteriores a la **Solicitud de Autorización (CTA)** no surgen de la complejidad inherente al proceso de evaluación, sino de deficiencias **prevenibles en la planificación** de la investigación. Este tipo de cambios genera un doble perjuicio: **demoras** en la disponibilidad de terapias innovadoras y **gastos significativos de recursos**.

{{< spoiler text="La prevalencia de enmiendas evitables en protocolos varía significativamente según la jurisdicción y el contexto clínico específico del estudio (Click para ver detalles)" >}}

-   Tufts-CSDD evaluó 836 protocolos de ensayos clínicos. El 45% de las enmiendas se consideraron evitables, principalmente por **defectos de diseño** y **viabilidad**. Además, el 57% de los ensayos tuvieron al menos una enmienda sustancial, con un promedio de 2.3 enmiendas por protocolo y un retraso medio de tres meses (1).

-   Una actualización (Tufts-CSDD, 2023) basada en 950 protocolos mostró un aumento a 76 % de protocolos con enmiendas y una media de 3.3 enmiendas por protocolo, donde se confirma una **tendencia al alza** (2,3).

-   En ensayos de **oncología**, la frecuencia de enmiendas fue aún mayor: 91.1 % de los protocolos presentaron al menos una, con un promedio de cuatro enmiendas por estudio, el **ámbito de mayor prevalencia** (4).



-   Datos regulatorios de la MHRA (Reino Unido) indican que más del 50 % de las **solicitudes de autorización** de ensayo clínico (CTA) **requieren información adicional** o corrección antes de su aprobación, evidenciando deficiencias documentales evitables (6).

-   De forma global, se estima que entre 40 % y 45 % de las enmiendas sustanciales son evitables, mientras que cerca de la **mitad de las solicitudes regulatorias** iniciales requieren ajuste o **aclaraciones por causas prevenibles** (1, 3, 6).

{{< /spoiler >}}

Las **enmiendas evitables** se originan en fallos internos de **planificación**, a diferencia de las **inevitables** que responden a **causas externas** (p. ej., nuevas directrices o información de seguridad). Las causas de las **enmiendas evitables** se pueden clasificar en en dos categorías principales:

{{< spoiler text="1. Fallos en el diseño del protocolo que comprometen la validez interna del estudio (Click para ver detalles)" >}}

| Fallo de Diseño | Descripción |
|:-----------------------------------|:-----------------------------------|
| **Defectos o inconsistencias en el diseño (General)** | Errores subyacentes (incluyendo **criterios de inclusión/exclusión inapropiados** que introducen sesgo o heterogeneidad inecesaria) que obligan a **enmiendas mayores y evitables**, comprometiendo la aceptación regulatoria. |
| **Ambigüedad de objetivos y resultados (Problemas para formular el problema científico y su operacionalización)** | Falta de **claridad, validación u operacionalización** de los **objetivos primarios/secundarios** o los **criterios de resultado** (*endpoints*), lo que dificulta la medición inequívoca del efecto del tratamiento. |
| **Diseño inadecuado** | Elección de un diseño que introduce sesgo o no permite una **prueba de inferencia estadística** válida (p. ej., diseños de **no inferioridad** sin margen justificado), lo que invalida el **estimando** central del estudio. |
| **Carencia de Justificación Metodológica** | **Ausencia de fundamentación documentada** para elementos críticos (selección del comparador, enmascaramiento, aleatorización, dosis, duración), para los **parámetros estadísticos** (tamaño del efecto), o para las **reglas de análisis interino/detención temprana** que controlan el error Tipo I. |
| **Insuficiencia en el Fundamento Científico (Base Preclínica/Clínica)** | Falta de **datos preclínicos de seguridad o clínicos previos (Fase I/II)** que respalden la dosis, la duración o el perfil de riesgo propuesto, haciendo el estudio **no ético o inútil**. |
| **Errores en el Plan de Análisis Estadístico** | Fallos en la **aplicación de principios estadísticos** (cálculo muestral final incorrecto) o en el control del **error Tipo I** (ej. no corrección de multiplicidad). Incluye la omisión o **falta de justificación de la estrategia de manejo de datos faltantes** o **eventos intercurrentes** (ICH E9 R1). |

{{< /spoiler >}}

{{< spoiler text="2. Problemas operativos y de viabilidad que afectan la capacidad de ejecución (Click para ver detalles)" >}}

| Fallo de Viabilidad Operativa | Descripción y Consecuencia |
|:-----------------------------------|:-----------------------------------|
| **Riesgo de Reclutamiento No Viable** | El número de participantes requerido **no es realista** o la **tasa de reclutamiento proyectada es inalcanzable** debido a la baja incidencia de la enfermedad, la competencia con otros estudios, o la sobrecarga de los centros. Consecuencia: **Fracaso del estudio por baja potencia estadística o incumplimiento de plazos.** |
| **Capacidad de Reclutamiento No Justificada** | El promotor no aporta **evidencia realista** (datos históricos, demografía de la población, o tasas de detección) que respalde la posibilidad de reclutar la muestra requerida en el plazo previsto, generando una **incertidumbre operativa inaceptable.** |
| **Complejidad y Carga Desproporcionada** | Inclusión de **procedimientos de tratamiento o seguimiento excesivamente gravosos** para el participante o el personal de investigación, lo que aumenta significativamente la **tasa de abandono (*dropout*)** o resulta en **datos faltantes** (ICH E6 R3, B.4.3(b)). |
| **Insuficiencia de recursos en el sitio clínico** | Falta de **personal cualificado, equipo especializado, tiempo de dedicación o infraestructura** en los centros de investigación para ejecutar los procedimientos del protocolo, resultando en **desviaciones del protocolo** o fallos en la recogida de datos. |
| **Deficiencias en el Sistema de Calidad** | El promotor no establece o describe **sistemas robustos de monitorización, gestión de calidad y aseguramiento de la calidad** (**QA/QC**) para garantizar la integridad de los datos y el cumplimiento de las BPC (GCP). Consecuencia: **Riesgo de datos no fiables.** |
| **Logística Operacional Deficiente** | Dificultades prácticas en la **gestión de productos de investigación** (suministro, almacenamiento, dispensación), la **cadena de frío**, o la **gestión de muestras biológicas** (transporte, procesamiento), lo que compromete la calidad de los datos generados. |

{{< /spoiler >}}

Durante más de una década, he estado en ambos lados de la mesa: primero como responsable de estadística en el [Centro Nacional Coordinador de Ensayos Clínicos (CENCEC)](https://instituciones.sld.cu/cencec/centro-nacional-coordinador-de-ensayos-clinicos-cencec/), donde redacté innumerables protocolos y Planes de Análisis Estadístico (PAE); y luego como evaluador en el [Centro para el Control Estatal de Medicamentos, Equipos y Dispositivos Médicos (CECMED)](https://www.cecmed.cu/), donde he sido testigo de esta problemática desde una óptica diferente.

En este post, voy a revelarte los **siete pecados capitales del protocolo y del PAE** que condenan a muchos estudios al rechazo o demoras evitables. Basándome en casos reales —aunque anónimos— te mostraré cómo evitarlos.

Al final de estas recomendaciones, tendrá herramientas para facilitar su camino y el de su equipo hacia la aprobación sin contratiempos y evitar los costosos prejucios que provocan las **enmiendas evitables**.

## Los siete pecados capitales del protocolo y del PAE: una guía para la redención estadística

> En el principio era el protocolo, y el protocolo debía ser bueno. Pero la soberbia, la gula y la pereza estadística entraron en escena, y el ensayo fue rechazado.

Las guías ICH E6(R3) y E9(R1) son un manual de virtudes clínicas. Detrás de cada artículo técnico hay una advertencia moral: **no improvisar**, **no mentirle a los datos**, **no enamorarse de los resultados**.

Y, como en toda historia humana, los errores se repiten con los mismos rostros: **los siete pecados capitales**.

### Pecado 1: La soberbia estadística (el orgullo del protocolo perfecto)

La soberbia es el orgullo ciego que convence al investigador de que su protocolo *"ya está bien así"*, presentándolo sin la revisión estadística y metodológica rigurosa que requiere. Esta ceguera lo expone a rechazos por omisiones invisibles al ojo inexperto, pero centrales para el regulador

#### La Revelación del Pecado

La soberbia se manifiesta como la negación de la necesidad de una mirada externa, llevando a errores fundamentales en la concepción científica que comprometen la validez interna del estudio. Es la creencia de que la experiencia clínica sustituye al rigor del diseño.

#### El Mandamiento Violado

Este pecado genera inconsistencias que comprometen la integridad científica y la validez de los resultados. El mandamiento regulatorio lo prohíbe con claridad, exigiendo un plan pre-especificado, detallado y vinculante:

La ICH E6(R3), sección 3.16.2(a), establece que el plan de análisis estadístico debe estar..

> descrito con suficiente detalle en el protocolo" o, preferiblemente, como un Plan de Análisis Estadístico independiente y consistente, respondiendo a la pregunta crítica de "¿Cómo demostrar que los resultados no fueron 'inventados' tras ver los datos?.

#### La Confesión del Pecador

La soberbia se materializa en los fallos de diseño más críticos que condenan la credibilidad científica:

-   **Deficiencias en el Cálculo del Tamaño Muestral** (N): El cálculo incorrecto o injustificado del tamaño de muestra es un error estadístico central, que compromete la validez del estudio en dos sentidos opuestos, afectando la potencia estadística.

{{< spoiler text="Las muestras demasiado pequeñas pueden servir para no probar nada (Click para ver detalles)" >}}

**Muestra Insuficiente (Baja Potencia):** Un tamaño muestral reducido compromete severamente la potencia estadística de la investigación. Esto aumenta el riesgo de cometer el **Error de Tipo II** (la probabilidad de no detectar un efecto real). Si la muestra es insuficiente, incluso una diferencia clínicamente **muy intensa** puede no resultar significativa. Formalmente, la lógica interna de las pruebas de hipótesis no permite aceptar que el efecto sea nulo, sino únicamente **abstenerse de sacar conclusión alguna** sobre el hallazgo. Esta falta de capacidad para rechazar la hipótesis inicial es lo que lleva a la conclusión de que las muestras pequeñas "sirven para no probar nada".

{{< /spoiler >}}


{{< spoiler text="Las muestras demasiado grandes pueden servir para  probar cualquier cosa (Click para ver detalles)" >}}

**Muestra Excesiva (Significación Trivial):** Si el tamaño de muestra es **excesivamente grande**, la validez de la inferencia se compromete, ya que se convierte en un simple reflejo del tamaño muestral y no del contenido científico del estudio.

Un tamaño excesivo garantiza que una asociación o diferencia que es **muy débil** o **nimia** desde el punto de vista clínico o biológico resulte **estadísticamente significativa**.

Esto ocurre porque la decisión de rechazar la hipótesis de nulidad (la afirmación de que no hay diferencia) está "casi siempre en manos del tamaño muestral". Dado que la hipótesis de nulidad casi nunca es verdadera en la naturaleza, un tamaño muestral lo suficientemente grande simplemente confirma este hecho trivial, desviando la atención de la verdadera **importancia práctica** del fenómeno investigado.

{{< /spoiler >}}



-   **Ambigüedad de Objetivos y Endpoints**: Falta de claridad en los objetivos primarios y secundarios o carencia de operacionalización clara o validación de los criterios de resultado (endpoints).

-   **Diseño Metodológico Inapropiado**: Elección de un diseño que no es adecuado para responder la pregunta de investigación, como proponer un diseño de no inferioridad sin justificación científica sólida.

-   **Carencia de Justificación Científica**: No se proporciona información no clínica de seguridad suficiente o datos clínicos previos que respalden pilares metodológicos clave (ej., dosis, placebo, duración del ensayo)

{{% callout note %}} Los reguladores exigen objetivos claros y justificación estadística sólida en protocolos de ensayos clínicos. El efecto esperado para el cálculo del tamaño de muestra debe justificarse con evidencia (literatura, fases previas) o criterio experto fundamentado - puede ser subjetivo pero nunca arbitrario.
{{% /callout %}}

#### La Absolución y Redención:

La redención requiere la implementación de Rigor y Humildad procedimental. Este proceso funciona como antídoto directo contra los fallos críticos de diseño (insuficiencia en el cálculo muestral, ambigüedad de endpoints). Para incrementar la credibilidad y facilitar la aprobación, es esencial someterse a una revisión crítica y externa antes de la presentación. Esto incluye:

-   **Integración y Consistencia Documental:** Desarrollar el PAE/SAP de forma  consistente con el protocolo general, resolviendo de antemano las ambigüedades en objetivos y endpoints.

-   **Transparencia de Parámetros Clave:** Justificar, documentar y respaldar con evidencia científica sólida todos los supuestos utilizados en el cálculo del tamaño muestral, evitando el riesgo de baja potencia (Error Tipo II) o significación trivial..

**Virtud opuesta:** Humildad y Rigor Metodológico. “El protocolo que se cree infalible invariablemente termina marcado en rojo por un revisor misericordioso: el rigor del proceso es el único camino para redimir la soberbia del diseño.”

### Pecado 2: La Gula Metodológica (El Protocolo Obeso de la Multiplicidad)

#### La Revelación del Pecado

La gula no es hambre de comida, sino de complejidad y datos. Se manifiesta cuando el investigador, por temor a no encontrar "algo significativo," quiere "exprimir" todos los datos posibles: veinte hipótesis, treinta subgrupos, y una multitud de endpoints secundarios. El resultado es un protocolo obeso cuya longitud no se corresponde con su claridad.

En un estudio realizado por Getz, se describe que la complejidad del protocolo (número de procedimientos, visitas y criterios de selección) se correlaciona directamente con el riesgo de enmiendas; cada aumento del 10 % en complejidad incrementa entre 7 y 9 % la probabilidad de modificación (5).

#### El Mandamiento Violado

El exceso de análisis, variables, y comparaciones sin justificación ni control estadístico adecuado, amenaza con inflar el error tipo I (falso positivo), llevando a conclusiones espurias.

> La ICH E9(R1) (A.5) recuerda que los métodos deben controlar adecuadamente la inflación del error tipo I y las pruebas múltiples. Cada análisis adicional es como una moneda más en la bolsa del p-value: brilla, pero devalúa la verdad estadística.

#### La Confesión del Pecador

La gula metodológica se materializa en los siguientes fallos comunes que un regulador identificará de inmediato:

-   **Manejo Inadecuado de Múltiples Comparaciones (Multiplicidad):** Proponer múltiples variables o análisis de subgrupos sin especificar un procedimiento estadístico para controlar la inflación del error tipo I. El problema se produce porque cada prueba aumenta la probabilidad de un falso positivo.

-   **Gula de Endpoints:** Inclusión excesiva de outcomes o criterios de resultado sin validación o que no están claramente alineados con los objetivos primarios.

-   **Complejidad y Carga Excesiva:** Inclusión de procedimientos innecesariamente complejos o que imponen una carga desproporcionada a participantes e investigadores sin una justificación metodológica clara.

{{% callout note %}} El protocolo obeso es aquel que incluye análisis de subgrupos innecesarios, covariables irrelevantes, y endpoints que sólo confunden al lector, violando el principio de moderación. {{% /callout %}}

En la práctica, la mayoría de los Protocolos  o PAE muestran deficiencias en el abordaje explícito y exhaustivo de las variables confusoras. Es frecuente que el protocolo enuncie variables de control que, posteriormente, no son incorporadas en ningún procedimiento de ajuste o modelado multivariado dentro del PAE. Esta omisión limita la capacidad de mitigar el sesgo y garantizar la validez interna del estudio.  

#### La Absolución y Redención:

La redención llega con la templanza y la moderación. Sé estricto en la selección de hipótesis y variables:

-   **Prioriza:** Define claramente el endpoint primario y justifica cada endpoint secundario.

-   **Controla la Multiplicidad:** Especifica el procedimiento estadístico (ej., ajuste de Bonferroni) que usarás para controlar el error tipo I si realizas múltiples comparaciones.

-   **Simplifica:** Elimina procedimientos que no sean esenciales para responder la pregunta principal de investigación.

**Virtud opuesta: Templanza y Moderación.** "El protocolo virtuoso no se mide por su longitud, sino por su claridad y por la solidez de su principal hallazgo."

### Pecado 3: La Pereza Documental (La Acedia del Detalle y la Omisión)

#### La Revelación del Pecado

La pereza, o acedia estadística, es el más silencioso de los pecados: no es un error de cálculo (Soberbia) ni de ambición (Gula), sino de descuido y falta de diligencia documental. Se manifiesta en la creencia de que los detalles se pueden dejar “para después”, o que un cambio no necesita ser registrado.

#### El Mandamiento Violado

La pereza atenta contra el principio de trazabilidad y transparencia. La falta de registro y control de versiones puede socavar la confianza en el proceso y, al igual que los pecados anteriores, compromete la validez interna del estudio.

> La ICH E6(R3), sección 3.16.2(f), exige trazabilidad: todo cambio en el Plan de Análisis Estadístico debe estar documentado, fechado y justificado. El protocolo perezoso no falla por ignorancia, sino por omisión.

#### La Confesión del Pecador

La pereza se materializa en fallos que, aunque parecen menores, generan observaciones sustanciales durante la revisión regulatoria:

-   **Inconsistencia entre Protocolo y PAE:** Existe una falta de armonización entre lo descrito en el protocolo metodológico y el plan de análisis estadístico detallado. Esto se produce por una falta de planificación multidisciplinaria y control de calidad documental. En casos extremos, se puede ver desconexión entre los objetivos primarios y secundarios del protocolo y los procedimientos estadísticos descritos en el PAE.   

-   **Omisión del Análisis por Intención de Tratar (ITT):** La falta de especificación del ITT como población de análisis principal para la eficacia, el cual es crucial para preservar el efecto de la aleatorización. Su omisión afecta la validez interna del estudio.

-   **Deficiencias en el Manejo de Datos Faltantes (Missing Data):** El protocolo no especifica cómo se manejarán los datos perdidos o los abandonos. El fallo no es tener datos faltantes (que es inevitable), sino no prever métodos de análisis apropiados para tenerlos en cuenta.

-   **Ausencia de Transparencia:** Falta de registro o documentación incompleta o ambigua en el protocolo inicial.

{{% callout note %}} El problema de la pereza es que el protocolo debe ser claro y conciso para evitar diferencias de interpretación. El plan de análisis no documentado es la excusa perfecta para la sospecha de p-hacking posterior. {{% /callout %}}

#### La Absolución y Redención:

La redención llega con la diligencia. Establece un riguroso control de calidad documental y de versiones.

-   **Armoniza:** Asegura la coherencia entre el Protocolo, el PAE, y el Formulario de Recolección de Datos (CRF). Chequea que el análisis estadístico de soporte a los objetivos del estudio.

-   **Prevé lo Inevitable:** Describe con detalle los métodos de análisis para la población ITT y las estrategias de imputación para los datos faltantes.

-   **Versiona:** Documenta, fecha y justifica cada cambio, incluso los mínimos.

**Virtud opuesta: Diligencia.** *"La diligencia no es perfección, es constancia: el arte de documentar y armonizar cada detalle, incluso cuando nadie evalúa."*

### Pecado 4: La Ira del Analista (La Venganza Contra la Realidad de los Datos)

#### La Revelación del Pecado

La ira aparece cuando los datos desafían nuestras expectativas, o peor, cuando no confirman la hipótesis principal del investigador. Es el momento en que el analista, enfadado con la realidad estadística, decide "reanalizar" el estudio hasta que encuentre algo que confirme su hipótesis o alcance un p < 0.05 o un OR cuyo intervalo de confianza no incluya el uno. Esta furia estadística solo conduce al infierno del p-hacking.

#### El Mandamiento Violado

La ira viola el principio fundamental de la objetividad científica y el compromiso de seguir el plan preespecificado (SAP/PAE). Modificar el plan después de ver los resultados es una traición metodológica.

> La ICH E9(R1) (A.5) prevé esta tentación: el análisis debe reflejar la verdad de los datos, no el deseo del analista. La furia estadística es el camino más rápido para comprometer la credibilidad.

#### La Confesión del Pecador

La ira se manifiesta en acciones específicas de manipulación o justificación retrospectiva, a menudo relacionadas con la Lujuria (el deseo de un p < 0.05).

-   **Cambio de Endpoint Retrospectivo:** Decidir que la variable secundaria no significativa debe ser el nuevo endpoint primario, o cambiar la definición de la variable de resultado después de que la recolección de datos esté avanzada.

-   **Selección de Subgrupos No Preespecificados:** Realizar múltiples análisis de subgrupos hasta encontrar uno que arroje significación, sin haberlo especificado y justificado en el protocolo inicial.

-   **Ajustes de Modelo Ilegítimos:** Eliminar outliers o transformar variables sin una justificación metodológica a priori, solo porque el resultado inicial no fue el deseado.

-   **Desviación No Documentada:** La falta de documentación, fechado y justificación de cualquier cambio en el Plan de Análisis (lo opuesto a la Diligencia), lo que expone la intención de ocultar la manipulación.

{{% callout note %}} El análisis debe reflejar la verdad de los datos, no el deseo del analista. La furia estadística es el camino más rápido para comprometer la credibilidad. {{% /callout %}}

#### La Absolución y Redención:

La redención reside en la Paciencia Metodológica y el compromiso con la transparencia.

-   **Fidelidad al Plan:** Comprométete a seguir el PAE/SAP, incluso si los resultados son decepcionantes.

-   **Justificación A Priori:** Si el análisis requiere un cambio, la necesidad debe ser identificada y justificada antes de mirar los datos, y debe estar documentada como una enmienda.

-   **Escuchar a los Datos:** Si los datos no apoyan la hipótesis, la conclusión es que la hipótesis no se sostiene, no que el método debe cambiarse.

**Virtud opuesta: Paciencia y Objetividad.** "El estadístico paciente escucha a los datos; el colérico los tortura hasta que confiesen lo que no saben."

### Pecado 5: La Envidia Metodológica (La Imitación sin Fundamento Científico)

#### La Revelación del Pecado

La envidia metodológica se disfraza de modernidad y de ambición injustificada: "ellos usaron machine learning, nosotros también", o "copiemos el modelo de aquel estudio famoso". Es el deseo de imitar el diseño y los métodos de un tercero sin haber establecido un Estimand propio o una justificación sólida.

#### El Mandamiento Violado

Este pecado viola el principio de que todo elemento del diseño debe estar sólidamente fundamentado en evidencia existente. Copiar métodos sin contexto es tan inútil como citar sin entender.

> La ICH E9(R1) (A.1–A.2) insiste en definir un estimand propio, alineado con el objetivo clínico real. La falta de este fundamento compromete la ética al exponer a pacientes sin evidencia de seguridad o eficacia suficiente.

#### La Confesión del Pecador

La envidia metodológica se manifiesta como una falta de rigor en la etapa de investigación preliminar y planificación:

-   **Carencia de Justificación Científica:** El protocolo carece de información no clínica de seguridad suficiente o datos clínicos previos que respalden la intervención, dosis, población o duración del ensayo.

-   **Diseño Metodológico Inadecuado:** Se proponen diseños complejos o herramientas sofisticadas que no responden adecuadamente a la pregunta de investigación.

-   **Falta de Fundamento Metodológico Clave:** No se justifica adecuadamente el uso de pilares metodológicos esenciales como el placebo, el enmascaramiento o la aleatorización.

{{% callout note %}} El protocolo envidioso no se basa en su propia evidencia preclínica, sino en el éxito ajeno. Esto introduce un riesgo regulatorio, ya que el diseño y el análisis no están vinculados a la base de evidencia real del producto bajo investigación. {{% /callout %}}

#### La Absolución y Redención:

La redención reside en la Caridad Científica y la honestidad intelectual:

-   **Fundamenta:** Asegura que cada aspecto del protocolo esté sólidamente respaldado por evidencia propia o publicada.

-   **Justifica la Complejidad:** Si vas a usar un método "de moda", justifica por qué ese método es el mejor para tu pregunta de investigación y tu estimando.

-   **Adapta, No Copies:** Aprende de los diseños exitosos, pero adáptalos a la realidad de tu estudio y a tu población.

**Virtud opuesta:** Caridad Científica y Creatividad Propia. *"El investigador sabio se alegra del éxito ajeno, pero no lo imita: aprende, adapta y crea su propio camino."*

### Pecado 6: La Lujuria del Resultado (La Fascinación por lo Significativo)

#### La Revelación del Pecado

La lujuria estadística no es intelectual, sino pasional: es el deseo irrefrenable de mostrar solo los resultados más "bellos" o significativos. Este pecado se manifiesta al intentar embellecer los hallazgos, priorizando la posibilidad de publicación sobre la fidelidad al diseño metodológico acordado.

#### El Mandamiento Violado

La lujuria viola la fidelidad al plan preespecificado. El regulador exige que la presentación de los resultados sea una consecuencia lógica del diseño, no de un juicio estético o de publicación posterior.

> La ICH E6(R3), 3.16.2(e), y la E9(R1) (A.6) lo condenan claramente: cualquier desviación del Plan de Análisis Estadístico (SAP/PAS) debe documentarse y justificarse antes de realizar el análisis. La modificación post-hoc sin justificación es un atentado contra la transparencia.

#### La Confesión del Pecador

Este pecado se materializa en la tentación de cambiar el plan a última hora o de jugar con la presentación de los datos para lograr el efecto deseado:

-  ** Traicionar el Plan Preespecificado:** Cambiar el modelo de análisis, modificar la definición de las variables, o eliminar un análisis "porque no salió significativo", traicionando el plan acordado.

-   **Presentación Selectiva de Datos:** Mostrar solo las variables de resultado que alcanzaron significación y minimizar aquellas que no lo hicieron, rompiendo la transparencia de la evaluación.

-   **Violación de las Reglas de Parada Temprana:** Exceder o ignorar las reglas preestablecidas para un análisis intermedio, motivado por el deseo de alcanzar un resultado positivo antes de lo previsto o de evitar una parada por futilidad.

{{% callout note %}} La lujuria estadística convierte la búsqueda de la verdad en la búsqueda de un titular. La ICH E9 insiste en que el análisis debe ser un proceso deductivo, no una búsqueda inductiva de un resultado atractivo. {{% /callout %}}

#### La Absolución y Redención:

La redención reside en la Castidad Metodológica y el compromiso inquebrantable con la verdad, incluso si es incómoda.

-   **Fidelidad Absoluta:** Mantente fiel al Plan de Análisis Estadístico (PAS/SAP) acordado con el regulador. Si debe haber una desviación, documéntala como una enmienda antes de abrir la base de datos.

-   **Honestidad Brutal:** Reporta todos los resultados, tanto los que confirman la hipótesis como los que la refutan. La fortaleza de un ensayo reside en la honestidad de sus datos.

-   **Justificación A Priori:** Toda modificación de análisis debe ser guiada por la ciencia y la metodología, no por el valor p.

**Virtud opuesta: Castidad Metodológica.** "La castidad metodológica consiste en mantenerse fiel al plan, incluso cuando la tentación de un p < 0.05 susurra al oído."

### Pecado 7: La Codicia Operativa (La Lenta Inclusión y la Sobreestimación)

#### La Revelación del Pecado

La codicia operativa es la sobreestimación sistemática y optimista de la capacidad de ejecución de un ensayo. Se manifiesta en el deseo irreal de reclutar más de lo posible, más rápido de lo factible, o con menos recursos de lo necesario, priorizando la ambición sobre la realidad logística

#### El Mandamiento Violado

La codicia viola el principio de la viabilidad y factibilidad operativa. Un protocolo no debe solo ser científicamente válido (lo opuesto a la Soberbia), sino también ejecutable en el mundo real.

> Los reguladores requieren una planificación realista: la sobreestimación de la disponibilidad de pacientes es la causa más frecuente de retraso, adición de centros, aumento de costos y, en última instancia, la discontinuación prematura de los ensayos.

#### La Confesión del Pecador

La codicia operativa se traduce en fallos que paralizan la ejecución del estudio:

-   **Capacidad de Reclutamiento No Demostrada / Lenta Inclusión:** Se sobreestima la capacidad de reclutar participantes sin respaldo de datos históricos, lo que resulta en un lento ritmo de inclusión y una potencial discontinuación prematura.

-   **Criterios de Selección Problemáticos:** Los criterios de inclusión y exclusión son excesivamente restrictivos, lo que limita la disponibilidad de pacientes y dificulta el enrolamiento.

-   **Complejidad y Carga Excesiva del Protocolo:** Inclusión de procedimientos innecesariamente complejos que imponen una carga desproporcionada a participantes e investigadores.

-   **Inadecuada Planificación Logística:** Dificultades con equipos, insumos o falta de recursos humanos calificados, debido a una falta de evaluación de factibilidad exhaustiva del sitio clínico.

{{% callout note %}} El problema no es solo la baja incidencia de la enfermedad, sino la sobreestimación sistemática de la disponibilidad de pacientes, lo cual compromete la finalización exitosa del estudio. {{% /callout %}}

#### La Absolución y Redención:

La redención reside en el Realismo y la Planificación Rigurosa de la ejecución.

-   **Fundamenta el Reclutamiento:** Basar la estimación del tamaño muestral (N) y el tiempo de reclutamiento en datos históricos o pilotos que demuestren la viabilidad.

-   **Simplifica los Criterios:** Evitar criterios restrictivos que creen barreras innecesarias al enrolamiento.

-   **Evalúa la Factibilidad:** Realizar una evaluación exhaustiva de factibilidad del sitio clínico para asegurar la disponibilidad de recursos humanos y materiales antes de iniciar

**Virtud opuesta: Realismo Operativo y Planificación.** "El plan codicioso aspira a reclutar mil pacientes en un año sin evidencia; el plan realista se basa en la historia y evita el infierno de las enmiendas por falta de viabilidad."

### Epílogo: la redención del protocolo

Ningún ensayo clínico está libre de tentaciones, pero las guías ICH ofrecen un camino de salvación. Las virtudes opuestas a los pecados son la clave: **la humildad del diseño**, **la templanza del análisis y la diligencia de la documentación** son las que distinguen a un protocolo excelente de uno condenado al limbo regulatorio.

**Abrazar estas virtudes no solo asegura la integridad científica, sino que es la estrategia más eficaz para evitar las costosas enmiendas evitables y las demoras en la disponibilidad de terapias para los pacientes.**

> “El protocolo virtuoso no teme al juicio del evaluador: sabe que la transparencia es su absolución.”

## Mis recomendaciones y posición

Un protocolo puede ser metodológamente sólido y, aun así, dar lugar a conclusiones erróneas si no se previene contra los malos usos de la inferencia estadística. La dependencia exclusiva de los valores p para tomar decisiones es una falla crítica. La teoría detrás de las pruebas de significación es objeto de debate por varias razones, puedes profundizar sobre esto en 
[este post]({{< relref "/post/2025-08-10-significacion" >}})

Por este motivo, es fundamental que el protocolo incluya explícitamente que los resultados se presenten con intervalos de confianza y medidas del tamaño del efecto (como odds ratios, hazard ratios o diferencias de medias estandarizadas), que ofrecen una visión más matizada y útil para la toma de decisiones . 

Esta práctica permite a los reguladores y clínicos evaluar no solo si un tratamiento funciona, sino cuánto y si esa diferencia merece la pena en la práctica.



## 💡 Mi Sugerencia

Diseñar un protocolo sólido exige no solo rigor metodológico, sino también alinearse con los estándares regulatorios internacionales. El documento ICH E6(R3) ofrece ese marco ético y científico global para ensayos clínicos con participantes humanos, priorizando su protección y la integridad de los datos. Si bien su Apéndice B detalla los contenidos mínimos que debe incluir un protocolo, parte de esa información puede residir en documentos complementarios —como el Manual del Investigador (Investigator’s Brochure)— referenciados por el protocolo. En cualquier caso, un protocolo bien estructurado es esencial tanto para salvaguardar a los participantes como para garantizar resultados fiables.

## ¡Tu Turno! Pasa de la Teoría a la Práctica

Ahora que has explorado los siete pecados capitales que condenan tantos protocolos y Planes de Análisis Estadístico (PAE) al rechazo regulatorio, es momento de dejar la confesión atrás y buscar la redención en tu propio trabajo. No basta con identificar los errores ajenos; la verdadera transformación viene al aplicar estas lecciones a tus proyectos. ¡Es tu turno de actuar!

Descarga el Checklist de Redención estadística


## Bibliografía

1.  Getz KA, Stergiopoulos S, Short M, Surgeon L, Krauss R, Pretorius S, et al. The Impact of Protocol Amendments on Clinical Trial Performance and Cost. Ther Innov Regul Sci [Internet]. julio de 2016 [citado 30 de octubre de 2025];50(4):436-41. Disponible en: <http://link.springer.com/10.1177/2168479016632271>

2.  Getz KA, Campo RA, Kaitin KI. Protocol Design Amendments: Frequency, Cause, and Impact. Therapeutic Innovation & Regulatory Science. 2016;50(3):436–446. PMID: 30227022

3.  Getz KA, et al. Trends in Protocol Design Amendments and their Impact on Study Performance. Therapeutic Innovation & Regulatory Science. 2023. PMID: 38438658

4.  Getz KA, et al. Protocol Amendments in Oncology Clinical Trials: Incidence and Impact. Therapeutic Innovation & Regulatory Science. 2024. PMID: 38530628

5.  Getz KA, et al. Assessing Protocol Design Complexity and Its Relationship to Clinical Trial Performance. J Clin Res Best Pract. 2014;10(3):1–7.

6.  Medicines and Healthcare products Regulatory Agency (MHRA). Common Issues Identified During Clinical Trial Applications. 2023. Disponible en: <https://www.gov.uk/government/publications/common-issues-identified-during-clinical-trial-applications>

7.  Vignot S, Dhanani A, Sainte-Marie I, De Ligniville Lajavardi L, Even G, Echemann M, et al. Authorization of COVID-19 clinical trials: lessons from 2 years of experience of a national competent authority. Front Pharmacol [Internet]. 15 de agosto de 2022 [citado 30 de octubre de 2025];13:972660. Disponible en: <https://www.frontiersin.org/articles/10.3389/fphar.2022.972660/full>

8.  Getz K, Smith Z, Botto E, Murphy E, Dauchy A. New Benchmarks on Protocol Amendment Practices, Trends and their Impact on Clinical Trial Performance [Internet]. In Review; 2023 [citado 30 de octubre de 2025]. Disponible en: <https://www.researchsquare.com/article/rs-3168679/v1>

9.  Kahan BC, Ahmad T, Forbes G, Cro S. Public availability and adherence to prespecified statistical analysis approaches was low in published randomized trials. Journal of Clinical Epidemiology [Internet]. diciembre de 2020 [citado 29 de octubre de 2025];128:29-34. Disponible en: <https://linkinghub.elsevier.com/retrieve/pii/S0895435620301979>
