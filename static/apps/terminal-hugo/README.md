# 🎓 Hugo Terminal Trainer Pro

Aplicación educativa para aprender terminal, Git y gestión de sitios Hugo Blox.

## 🚀 Cómo Usar

### Instalación (PWA)
1. Abre `index.html` en tu navegador (Chrome/Edge recomendado)
2. Toca el botón "📲 Instalar App" en la barra superior
3. La app se instalará en tu teléfono/escritorio

### Funcionalidades

#### 📚 Lecciones (8 unidades, 37 lecciones)
- **Unidad 1**: Orientarte en la terminal (pwd, ls, cd, cat, head)
- **Unidad 2**: Buscar como un pro (find, grep, pipes)
- **Unidad 3**: Git seguro (status, add, commit, branch, checkout, merge, push)
- **Unidad 4**: Flujos Hugo Blox (estructura, server, YAML, .Rmd vs .md)
- **Unidad 5**: Renombrado masivo (rename, mv con wildcards)
- **Unidad 6**: Búsqueda y reemplazo (sed, grep + sed)
- **Unidad 7**: Git avanzado (stash, log, reset, revert, cherry-pick, rebase)
- **Unidad 8**: Automatización Hugo (scripts, limpieza, validación, reportes)

#### 🎯 Escenarios (8 casos prácticos)
- Corregir typos en tags
- Verificar landing pages
- Crear posts nuevos seguros
- Recuperar de errores
- Unificar taxonomías
- Sincronizar .Rmd y .md
- Renombrar posts por fecha
- Corregir typos masivos con sed

#### 📖 Referencia Rápida
- Buscar algo
- Proteger mi trabajo
- Algo salió mal
- Quiero publicar
- Quiero verificar
- Renombrar en masa
- Automatizar

## 📱 Funciona Offline

La app se guarda en caché y funciona sin internet después de la primera carga.

## 💾 Progreso Guardado

- Tu progreso se guarda automáticamente
- Racha diaria
- Porcentaje de completado
- Lecciones terminadas

## 🎯 Reglas de Oro

1. **Antes de hacer cualquier cosa**: `git status`
2. **Si te pierdes**: `pwd`
3. **Antes de push**: `hugo server`
4. **Cambios arriesgados**: Crear rama primero
5. **rm no tiene papelera**: Piensa antes de eliminar

## 🛠️ Estructura de Archivos

```
hugo-terminal-trainer/
├── index.html              # HTML principal
├── manifest.json           # PWA manifest
├── css/
│   └── styles.css          # Estilos
└── js/
    ├── data.js             # Contenido educativo
    ├── terminal.js         # Terminal simulada
    ├── progress.js         # Gestión de progreso
    ├── scenarios.js        # Escenarios
    └── app.js              # Lógica principal
```

## 🎓 Para Bioestadísticos

La app está diseñada específicamente para tu contexto:
- Ejemplos con posts de investigación biomédica
- Tags reales: "bioestadistica", "ensayos-clinicos", "epidemiologia"
- Escenarios sobre .Rmd vs .md
- Enfoque en "no romper nada"

## 🚀 Comenzar

1. Abre `index.html` en tu navegador
2. Comienza con la Unidad 1
3. Practica en la terminal simulada
4. Completa los escenarios
5. Usa la referencia cuando necesites

¡Buena suerte! 🎉
