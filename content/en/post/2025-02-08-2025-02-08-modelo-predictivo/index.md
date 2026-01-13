---
title: "How to Train and Validate Clinical Prediction Models: Step-by-Step Guide for Healthcare Professionals"
subtitle: "Tutorial for Developing a Clinical Prediction Model with Examples in R"
# categories: ["Código Práctico en R o Python"]
summary: "Practical Guide with R for Developing Robust Predictive Models in Clinical Settings"
author: "admin"
date: "2025-10-22" #año mes dia
# show_author_profile: true
tags: 
  - "train model in R for clinical predictions"
  - "tutorial in R for medical predictive models"
  - "Steyerberg guide for medical predictive models"
  - "avoid overfitting in ML validation"
  - "step by step R for machine learning in thesis"
slug: how-to-train-and-validate-a-machine-learning-model
featured: true  # Destacar en la página principal
translationKey: "MPC"
languages:
  es: "/es/como-entrenar-y-validar-un-modelo-de-machine-learning"
  en: "/en/how-to-train-and-validate-a-machine-learning-model"
commentable: true
draft: true# True para un borrador
type: post
---





*By Maicel Monzon*


If you're reading this post, you're likely interested in developing clinical prediction models to diagnose or prognosticate diseases in patients. You're probably a researcher or graduate student—in a master's or PhD program—in biomedical sciences, looking for how to develop and validate those models in a scientific article or thesis.

You've almost certainly reached that phase where the methodology feels like a brick wall: you don't know what steps to follow, what software to use, if what you need can be done in SPSS or if you'll have to deal with those daunting R or Python codes—and on top of that, you have no programming experience. And, worst of all: you're haunted by the doubt of whether your model will be useful for anything beyond filling a thesis repository... or if it will even be useful for your own sample patients, let alone other clinical contexts.

Let's be honest: deep down, we all run from that stinging comment that bursts our predictive bubble in one blow:

> Wow!, a dream area under the curve, with no traces of calibration or external validation... probably the fruit of a classic recipe: excess predictors, enthusiastic dichotomization, scarcity of events, and a pinch of automatic selection. TRIPOD would call it ‘apparent optimism’; we call it the gourmet overfitting recipe—with a cigar and a wink to finish.

{{% callout note %}} Overfitting occurs when a model learns the training data so well (including noise or irrelevant details) that its performance on new data is much worse. {{% /callout %}}

In other words, the model works spectacularly well... but only with your sample of patients. The performance metrics on other datasets are a disaster! We'll come back to that idea later.

While high-level theses focus on building clinical prediction models with classical statistical techniques or sophisticated machine learning algorithms like random forests, biostatistics courses—even in programs specializing in this field!—barely touch on the subject. The gap is real, and with it comes the anxiety of having to learn everything now.

But take a deep breath. This post can harden your predictive bubble with an extra layer of titanium: your unofficial methodological translator, (almost) tear-free and loaded with practical tools. I myself navigated that methodological hell in my doctoral process, so I'm not just offering generic advice: I'm sharing lessons from someone who already burned their eyelashes for you, so you can move forward with confidence and avoid the same pitfalls.

Forget about complex and convoluted code. Here we focus on the essential logic to build a reliable predictive model. We'll break down the process step by step, taking the fear out of data processing with practical R code examples.
While this post focuses on practical data processing issues, it's important to highlight that the choice of research design is determined by the objective of the prediction study, which according to TRIPOD (Transparent Reporting of a multivariable prediction model for Individual Prognosis Or Diagnosis) is classified into three fundamental categories (1):

- Development of a new model

- Validation of an existing model

- Update of a model

Depending on the research objective, one of the following study designs can be chosen:

- Designs by Objective
  - Model Development
    - Cohort Studies
    - Randomized Trials
    - Routine Care Data
  - Model Validation
    - Independent Cohort Studies
    - Meta-analysis
    - Registry Data
  - Model Update
    - Any previous design with new data
    - Data with Cluster Structur

It is recommended to delve into these topics from the proposed bibliography for this post. In this post, we will focus on the sequence of key stages to develop a predictive model. As a base, I'll use the article “Seven steps for development and an ABCD for validation” by Ewout Steyerberg (1), as well as his book Clinical Prediction Models (2). To the recipe, I'll add recommendations from Frank Harrell from his work Regression Modeling Strategies (3), and we'll rely on his rms library to develop this tutorial with practical R code. Finally, I'll give my own view on the controversial issue of partitioning data into training set and test set in a 70:30 ratio and other issues that will surely be interesting.

We'll start with the modeling strategy; the tutorial with all the code will come later.

**Let's get started!**

## Modeling Strategy

Following an appropriate modeling strategy is essential for developing and validating prediction models: it not only mitigates bias and overfitting, but also guides us in a process that could otherwise become chaotic.

Below is a set of R libraries that will help us implement these ideas, but this process can be done equally in SPSS or Python [^1]. 

[^1]: You can contact me for personalized consulting where I can help you develop a predictive model or teach you the modeling strategy with other tools like SPSS or Python at my personal email.

[You can download and install the rms package from its official page on the CRAN repository](https://cran.r-project.org/web/packages/rms/index.html) 
You'll also need other libraries for data handling, creating tables and graphs for your publication, among other actions. 


``` r
library(conflicted)   # Detects and resolves function conflicts
library(rms)          # Restricted logistic modeling (lrm) and splines (rcs)
library(pROC)         # ROC curves and AUC
library(ggplot2)      # Polished graphics (used internally by rms)
library(missRanger)   # Iterative imputation with random forests
library(mlbench)      # Example dataset: PimaIndiansDiabetes
library(dplyr)        # Data manipulation (pipe %>%)
library(caret)        # Data partitions (createDataPartition)
```



### 1. Problem Definition and Data Inspection

The first step in any modeling project is to clearly define the research problem and select the appropriate outcome variable.


{{% callout note %}} The **outcome variable** must be defined precisely: specify what event is being predicted, how and when it is measured, and the prediction **time horizon** (for example, 30-day mortality). It is also key to indicate the event evaluation method and whether blinding was applied regarding the predictors, to ensure internal coherence and model validity. {{% /callout %}}

During this phase, we also perform an exploratory data analysis (EDA) to understand the characteristics of the variables and detect possible problems, such as **outliers** or **missing values**.




``` r
set.seed(123)  # Total reproducibility (imputation, splits, bootstrap)
# Load native dataset
data("PimaIndiansDiabetes")
datos <- PimaIndiansDiabetes
# Clinical variables with impossible 0s (biologically)
vars_clinicas <- c("glucose", "pressure", "triceps", "insulin", "mass")
# Cleaning: 0 → NA, then imputation
datos <- datos %>%
  mutate(across(all_of(vars_clinicas), ~ ifelse(.x == 0, NA, .x))) %>%
  missRanger()  # Imputes NA with iterative random forests
# note: ideally, if a simple split were used, imputation should be done only on the training set.
# rms setup: datadist for automatic predictions
dd <- datadist(as.data.frame(datos))
options(datadist = "dd")
```


### 2. Encoding of Predictor Variables

**Proper encoding of predictor variables** is fundamental to building **robust models**.


You may need to group infrequent categories or create summary predictors to condense redundant or highly correlated information. And if your model is based on logistic regression, don't assume input linearity: often it is necessary to apply restricted cubic splines to relax the linearity assumption between predictors and the outcome.

💡 **Tip for publication:**  Report each predictor with its measurement method, registration time, and units (if continuous). If you categorize, justify the cut points. If categorical, show all categories and the reference one. The final model must reflect exactly the encoding used.


{{% callout warning %}}
**Alert:** Dichotomizing quantitative predictors—for example, converting a continuous variable like age or blood pressure into a binary (“≥65 years = 1”, “<65 = 0”)—is a widely discouraged bad practice. This strategy wastes information, reduces statistical power, introduces arbitrary cut points, and increases the risk of overfitting. Instead of categorizing, model the continuous relationship (for example, with splines) to preserve the real clinical signal.
{{% /callout %}}


### 3. Specification of the Model Type

At this stage, the formal structure of the model is defined, which includes the type of relationship between variables (e.g., linear, non-linear) and, crucially, the selection of the final predictors that will be integrated.


{{% callout warning %}}
**Alert:** The choice of predictors should not be based on the mechanical application of algorithmic methods like Stepwise Regression (SWR), as they often produce unstable and overfitted models, especially in biomedical and social contexts. 
{{% /callout %}}

Instead of preselecting variables based solely on p-values from bivariate analyses, it is recommended:

-   Prioritize clinical judgment, systematic literature review, and prior experience.

-   Opt for a reduced set of clinically relevant predictors defined a priori, or include all candidates in the initial multivariable model without prior statistical filtering.

There are algorithms with alternative approaches to automatic predictor selection, such as Lasso regression or classification trees. In the guide proposed by Heinze, you can delve into this topic (5)


### 4. Model Estimation

Once the model is specified (i.e., predictors and functional structure defined), the next step aims to calculate the coefficients or parameters that best fit the data.


``` r
modelo <- lrm(
  diabetes ~ rcs(glucose, 3) + rcs(mass, 3) + rcs(age, 3) + rcs(pedigree, 3) + pregnant,
  data = datos,
  x = TRUE,  # Saves design for bootstrap
  y = TRUE   # Saves response for bootstrap
)
```

In regression models, model estimation is performed using methods like maximum likelihood. However, when the number of events is limited or the number of predictors is high, the risk of overfitting is high, leading to extreme and poorly generalizable predictions. To mitigate this, regularization, penalization, or shrinkage techniques are used, which adjust coefficients toward zero to improve stability and calibration in new populations.

The ultimate goal is not to maximize apparent performance in the development sample, but to obtain a model with stable, **well-calibrated, and clinically useful predictions**.

💡 **Tip for publication:** The final model equation must be presented in full—including all coefficients, the intercept, and, if applicable, baseline survival—reporting calibration and discrimination metrics with their confidence intervals.

In machine learning, it is common to split data into training and testing. However, in clinical contexts, it is different:

- Datasets are usually small or medium (usually less than 1000 rows) → splitting reduces available information for training.

- Metrics derived from the test can be highly variable, depending on which observations fall into the partition.

- This generates a less stable model and less reliable, especially in individual probability estimates.

{{% callout note %}} The absence of partitions in your study may be a controversial topic, but don't worry!
[Later, some arguments for discussion are commented on.](#hi) 
{{% /callout %}}


### 5. Evaluation of Model Performance


Once the model is developed, it is essential to quantify its predictive capacity before validation. This evaluation focuses on three key aspects:

-   **Calibration:** Measures the agreement between predicted and observed probabilities. For example, does a 10% predicted risk correspond to 10% observed events? It is evaluated visually with calibration curves and quantitatively with parameters like the intercept (A, calibration-in-the-large) and calibration slope (B).


``` r
cal_boot <- calibrate(modelo, method = "boot", B = 100)

plot(cal_boot, main = "Calibración: Predichas vs Observadas")
## 
## n=768   Mean absolute error=0.016   Mean squared error=0.00045
## 0.9 Quantile of absolute error=0.034
abline(0, 1, lty = 2, col = "red")  # Línea ideal
```

<img src="calibracion-1.png" width="80%" style="display: block; margin: auto;" />

{{< spoiler text="The graph shows that the model is well calibrated (Click to know why)" >}}

Perfect calibration occurs when predicted probabilities match actual frequencies. For example, if the model predicts 30% risk, approximately 30 out of every 100 similar patients should have the condition.

{{< /spoiler >}}


-   **Discrimination:** Evaluates the model's ability to distinguish between patients who experience the event and those who do not. The most common metric is the C statistic (or AUC-ROC), which represents the probability that a patient with the event has a higher risk score than one without it.




``` r
val_boot <- validate(modelo, method = "boot", B = 100)

roc_obj <- roc(datos$diabetes, 
               predict(modelo, type = "fitted"))
plot(roc_obj,
     main = paste("Curva ROC - AUC =", round(auc(roc_obj), 3)),
     col = "blue",
     legacy.axes = TRUE)
```

<img src="Discriminacion-1.png" width="80%" style="display: block; margin: auto;" />





{{< spoiler text="The ROC curve area under the curve (AUC) graph shows very good discrimination (Click to know why)" >}}
- The ROC curve evaluates the model's ability to distinguish between patients with and without the condition.
  - AUC = Excellent (>0.8 is considered very good in medicine)
  - Y-axis: Sensitivity (ability to detect sick individuals)
  - X-axis: 1 - Specificity (false positive rate)

{{< /spoiler >}}



-   **Clinical Utility:** Determines if the model is useful for decision-making. Decision curve analysis and Net Benefit (NB) allow evaluating if using the model leads to better net clinical outcomes compared to alternative strategies (like treating all or none).

### 6. Evaluation of Model Validity

The **performance evaluation** on the data is usually optimistic. Therefore, it is crucial to evaluate the model's validity on data not used for its construction, a process divided into:

- **Internal Validation:** Evaluates the model's reproducibility, i.e., its performance on multiple samples from the same underlying population. Techniques like bootstrapping or cross-validation are superior to simple sample splitting, as they quantify and correct optimism in performance metrics without reducing the development sample size.

- **External Validation:** It is the definitive test of the model's generalizability or transportability. It consists of applying the model to a completely independent population, which may include:

  -   **Temporal Validation:** Using patients recruited in a later period.

  -   **Geographic Validation:** Applying the model to patients from other centers or hospitals.


### 7. Model Presentation

Effective presentation is crucial for clinical adoption. A perfect model is useless if doctors can't use it easily. Some options to bring the model to clinical practice are:

-   **Nomograms**: Ideal for quick use in consultation.


``` r
nom <- nomogram(modelo, 
                fun = plogis, 
                funlabel = "Riesgo de Diabetes")
plot(nom, main = "Nomograma del Modelo")
```

<img src="nomograma-1.png" width="80%" style="display: block; margin: auto;" />

{{< spoiler text="Nomogram: visual risk calculator (Click to learn how to use it)" >}}

The **nomogram** is a visual tool that allows manually calculating individual diabetes risk, using the model's key variables. It allows calculating the specific risk for each patient without needing software, facilitating its use in consultation

How does it work?
- For each clinical variable (glucose, BMI, age, etc.), a score is assigned on the “Points” scale
- All points are summed to get the “Total Points”
- That total is projected onto the lower scales to obtain the predictive risk

{{< /spoiler >}}

-   **Web/mobile applications**: For integration into clinical workflows

A functional application to run the model on a web page, mobile phone, or tablet is a very good option to generalize the model.

In this link, I show you the web calculator I programmed in js, html, and css, for my thesis model.

[see CovidCencecAPK]({{< relref "/project/2025-02-28-covidcencecapk" >}})


## My Recommendations and Position {#hi}

I recognize that **simple data partitioning (70/30)** is a frequent standard and often the starting point in Machine Learning practice. However, if our goal is to strengthen the credibility and robustness of our findings, especially in the field of clinical models, this approach deserves a pause and serious reconsideration.

The criticism of this practice is neither new nor isolated. Influential authors in the field like Frank Harrell and Edmund Steyerberg have expressed their clear opposition, and other experts join this consensus. As Smedenen summarizes well in this **tweet:**


{{< x user="MaartenvSmeden" id="1544599686488723461" >}}

I fully share this view: for small samples, as clinical research datasets often are, a simple partition—even if random—introduces more risks than benefits. This is a practice more common in general Machine Learning environments, where datasets are typically much larger.

Below, let's explore in detail the main reasons why this approach may not be the best practice when precision and patients' lives are at stake.

### 1. Inefficiency in Data Use and Loss of Power

Clinical datasets are, by nature, often small (think less than 500 patients), limited by costs or the low incidence of rare events.

A typical 70/30 partition wastes up to 30% of the data just on evaluation, drastically reducing the effective size for training. This causes a drop in the key metric of Events per Predictor Variable (EPV)—which measures how many events, like positive diagnoses, there are per predictor in the model—often placing it below the recommended threshold of 10-20.

The result is predictable: unstable and biased models. Apparent performance (e.g., a high AUC in the training split) can drop drastically on new data (for example, from 0.85 to a disappointing 0.65). In clinical contexts, where capturing real patterns is vital, the recommendation is clear: maximize all data and apply resampling techniques for a more honest estimation.

### 2. Performance Evaluations with High Variability and Instability

When relying on a single simple partition, performance metrics (like AUC for discrimination or Brier score for calibration) become very sensitive to the chance of how the data was split.

Simulations show that this “luck” can generate variations of up to ±0.10-0.15 in the AUC, significant noise. This variance skyrockets (2-3 times more) in small samples. An unstable result can inflate or underestimate calibration (e.g., in the Hosmer-Lemeshow test), which could lead to erroneous clinical decisions and, most importantly, put patients at risk (for example, undertreating those who need it).

To illustrate this instability, here the AUC variability in repeated simple splits is simulated using our example dataset:


``` r
auc_splits <- replicate(100, {
  trainIndex <- createDataPartition(datos$diabetes, p = 0.7, list = FALSE)
  train <- datos[trainIndex, ]; test <- datos[-trainIndex, ]
  
  model_simple <- glm(diabetes ~ glucose + mass + age, family = binomial, data = train)
  pred <- predict(model_simple, test, type = "response")
  
  roc(test$diabetes, pred)$auc
})

hist(auc_splits,
     main = "Distribution of AUC in 100 Simple Splits",
     xlab = "AUC",
     col = "lightgray",
     border = "black")
```

<img src="Simular-1.png" width="80%" style="display: block; margin: auto;" />



### 3. Risk of Overfitting and Lack of Robust Generalization

A simple “snapshot” provided by the test partition is not enough to correct overfitting. The model, by fitting to the training set (including its noise), offers apparent performance (an “optimism”) that, according to Harrell, can be 5-20% higher than the real one.

Without resampling methods, it is impossible to obtain a realistic generalization error. Repeated methods (like k-fold cross-validation) average estimates across multiple splits, reducing bias and improving stability.

When this optimism is not corrected, not only is the internal validity of the study affected, but the model's generalization is compromised, as it will fail when applied to external cohorts due to the idiosyncrasies (unique details) of the original sample.

## 💡 My Suggestion

Instead of relying on simple partitions, my recommendation is clear: use methods that leverage all the data and offer more stable estimates. This includes:

- Repeated Cross-Validation: Divide the data into partitions and repeat the splitting and evaluation process multiple times to average the results.

- Bootstrapping: Sample with replacement to estimate stability and correct inherent optimism.

- These methods not only correct optimism but also reduce variability, aligning with best practices in clinical prognostic model development. For this reason, I selected libraries like rms::validate() in R for the example, as they adhere to this philosophy.

- For small datasets, robustness comes first. Avoid simple splits and prioritize stability to generate results that are truly useful in clinical practice.

**A Note on External Validation**

I agree that external validation is crucial and should be performed with an independent dataset in other contexts, whether at different times (temporal validation) or in different hospitals (geographic validation), to confirm true generalization.

In my experience, the operational and logistical issues involved in performing external validation in another center or at another time often demotivate the researcher developing a model with data from their own practice. However, I believe this approach is what paves the way for better results from research in real conditions. Additionally, it is an act of merit and a pillar of science to perform validations of others' models in your own practice; science thrives on replication and collaboration.

## ⏭️ What’s Next?

This guide is a practical and concise introduction to getting started with clinical predictive models. Advanced topics such as detailed sample size calculation, exhaustive handling of missing data (beyond basic imputation), updating existing models, in-depth analyses of decision curves for clinical utility, reproducibility, adjustment of the logistic regression intercept in scenarios with different prevalences, continuous recalibration methods, or the construction of scales and clinical classifications are not addressed in detail to maintain brevity and focus on the essentials. For deeper insight, consult references like Steyerberg or the TRIPOD framework.

## 🚀 Your Turn! Go from Theory to Practice

This material is just the tip of the iceberg. Now apply these concepts with your clinical data and experiment to build more robust models! If you need more resources, explore the mentioned references.

Now, I'd love to hear from you. Experience is what enriches knowledge!

💬 Leave your comment in the comment box:
- Have you applied these resampling techniques in your predictive model projects?
- What strategies do you usually use to train and validate your clinical models?
- Your comments, difficulties, and achievements help us all keep learning.

🚀 Take the Code to Your Project 

[Join our bioestadisticaedu.com community]({{< relref "/subscribe/" >}}).

{{% callout note %}}
Upon subscribing, I'll immediately send you a complete template with all the commented code (including tables and structure!) to apply this process in your next publication or thesis.
{{% /callout %}}

🤝 Need a Personalized Approach? 

If you want to apply these strategies to a specific dataset and need the security of an expert by your side, you can also contact me for personalized consulting on this topic.


And always remember the golden rule: **If you're going to make mistakes, let them be new ones! 😉** *m@icel*

## Bibliography

1. Collins GS, Moons KGM, Dhiman P, Riley RD, Beam AL, Van Calster B, et al. TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods. BMJ [Internet]. 16 de abril de 2024 [citado 3 de octubre de 2025];e078378. Disponible en: https://www.bmj.com/lookup/doi/10.1136/bmj-2023-078378

2.  Steyerberg EW, Vergouwe Y. Towards better clinical prediction models: seven steps for development and an ABCD for validation. European Heart Journal [Internet]. 1 de agosto de 2014 [citado 9 de mayo de 2021];35(29):1925-31. Disponible en: <https://academic.oup.com/eurheartj/article-lookup/doi/10.1093/eurheartj/ehu207>

3. Steyerberg E. Clinical Prediction Models. 1th ed. USA: Springer; 2009. (Statistics for Biology and Health). 

4. Harrell Jr FE. Regression Modeling Strategies. 1era ed. New York: Springer; 2015.

5.  Heinze G, Wallisch C, Dunkler D. Variable selection - A review and recommendations for the practicing statistician. Biom J [Internet]. mayo de 2018 [citado 9 de mayo de 2021];60(3):431-49. Disponible en: http://doi.wiley.com/10.1002/bimj.201700067



