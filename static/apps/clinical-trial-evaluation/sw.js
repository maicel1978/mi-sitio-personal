// =============================================
// ClinTrialSuite — Service Worker v3.1
// Estrategia: Cache First + Network Fallback
// =============================================

const CACHE_NAME = 'clintrialsuite-v3.1';
const OFFLINE_URL = './index.html';

// Recursos locales (siempre cachear)
const LOCAL_ASSETS = [
  './',
  './index.html',
  './manual.html',
  './manifest.json',
  './icon.svg'
];

// Recursos CDN (cachear en primer uso)
const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// ---- INSTALL: Pre-cachear recursos locales ----
self.addEventListener('install', event => {
  console.log('[SW] Instalando ClinTrialSuite v3.1...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-cacheando recursos locales...');
        return cache.addAll(LOCAL_ASSETS);
      })
      .then(() => {
        // Intentar cachear CDN (no falla si no hay red)
        return caches.open(CACHE_NAME).then(cache => {
          return Promise.allSettled(
            CDN_ASSETS.map(url => 
              cache.add(url).catch(err => {
                console.warn(`[SW] No se pudo cachear CDN: ${url}`, err);
              })
            )
          );
        });
      })
      .then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE: Limpiar caches antiguos ----
self.addEventListener('activate', event => {
  console.log('[SW] Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log(`[SW] Eliminando cache antiguo: ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ---- FETCH: Estrategia mixta ----
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Solo manejar GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Recursos locales: Network First, Cache Fallback
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Recursos CDN / externos: Cache First, Network Fallback
  event.respondWith(cacheFirstStrategy(request));
});

// ---- Network First (para archivos locales) ----
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    // Si éxito, actualizar cache
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Sin red: buscar en cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`[SW] Sirviendo desde cache (offline): ${request.url}`);
      return cachedResponse;
    }
    // Si no está en cache y es navegación, mostrar página offline
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match(OFFLINE_URL);
      if (offlinePage) return offlinePage;
    }
    // Respuesta de error genérica
    return new Response('Sin conexión y recurso no disponible en cache.', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// ---- Cache First (para CDN / externos) ----
async function cacheFirstStrategy(request) {
  // Buscar en cache primero
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Actualizar cache en background (stale-while-revalidate)
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse);
        });
      }
    }).catch(() => {});
    return cachedResponse;
  }
  // No está en cache: ir a la red
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn(`[SW] Recurso no disponible: ${request.url}`);
    return new Response('', { status: 503 });
  }
}

// ---- Mensajes desde la app ----
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
