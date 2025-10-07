---
title: "Suscríbete a Nuestro Contenido"
date: 2025-10-07T00:00:00Z
type: page
summary: "Recibe los nuevos artículos directamente en tu correo"
---

<style>
/* Variables para facilitar la personalización */
:root {
  --main-bg-color: #ffffff;
  --text-color: #374151;
  --main-brand-color: #0d9488; /* Un verde azulado limpio */
  --light-border-color: #e5e7eb;
}

.minimal-subscription-section {
  max-width: 400px;
  margin: 3rem auto;
  padding: 1.5rem;
  text-align: center;
  background: var(--main-bg-color);
  border: 1px solid var(--light-border-color);
  border-radius: 0.5rem;
  font-family: system-ui, sans-serif;
}

.minimal-subscription-section h2 {
  color: var(--main-brand-color);
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.minimal-subscription-section p {
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.email-input {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--light-border-color);
  border-radius: 0.3rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Efecto de foco solo con CSS */
.email-input:focus {
  border-color: var(--main-brand-color);
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2);
}

.submit-button {
  background: var(--main-brand-color);
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

/* Efecto de hover solo con CSS */
.submit-button:hover {
  background: #0f766e; /* Un tono más oscuro */
}

.disclaimer {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 1rem;
}
</style>

<div class="container">
<section class="minimal-subscription-section">
  <h2>Recibe Nuestro Contenido</h2>
  <p>
    Suscríbete y recibe las últimas publicaciones directamente en tu correo.
  </p>

  <form name="suscripcion_es" method="POST" data-netlify="true">
    <div class="form-group">
      <input 
        type="email" 
        name="email" 
        placeholder="tu@correo.com" 
        required 
        class="email-input"
      >
      <button 
        type="submit" 
        class="submit-button"
      >
        Suscribirse
      </button>
    </div>
  </form>

  <p class="disclaimer">
    Cero spam. Cancela cuando quieras.
  </p>
</section>
</div>