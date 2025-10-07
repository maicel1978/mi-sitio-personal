---
title: "Subscribe to Our Content"
date: 2025-10-07T00:00:00Z
type: page
summary: "Get the latest articles directly to your inbox."
---

<style>
/* Variables to easily customize the look */
:root {
  --main-bg-color: #ffffff;
  --text-color: #374151;
  --main-brand-color: #0d9488; /* A clean teal color */
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

/* Focus effect using only CSS */
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

/* Hover effect using only CSS */
.submit-button:hover {
  background: #0f766e; /* A slightly darker shade */
}

.disclaimer {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 1rem;
}
</style>

<div class="container">
<section class="minimal-subscription-section">
  <h2>Get Our Content</h2>
  <p>
    Subscribe to receive our latest posts and news right in your inbox.
  </p>

  <form name="suscripcion_en" method="POST" data-netlify="true">
    <div class="form-group">
      <input 
        type="email" 
        name="email" 
        placeholder="your@email.com" 
        required 
        class="email-input"
      >
      <button 
        type="submit" 
        class="submit-button"
      >
        Subscribe
      </button>
    </div>
  </form>

  <p class="disclaimer">
    No spam ever. Unsubscribe at any time.
  </p>
</section>
</div>

If you prefer to use a news reader like **Feedly or Inoreader**, you can subscribe directly to our official **feeds**.

{{< icon name="rss" pack="fas" title="RSS en Inglés" >}} 
[Subscribe to Feed ](/en//post/index.xml)