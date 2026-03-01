// ============================================================
// HUGO TERMINAL TRAINER PRO - DATOS EDUCATIVOS
// Contenido completo con unidades avanzadas
// ============================================================

const fileSystem = {
    'content/es/post/2025-01-15-analisis/index.md': `---
title: "Análisis exploratorio de datos en investigación biomédica"
date: 2025-01-15
categories: ["Estadística en Salud"]
tags: ["bioestadistica", "eda", "R"]
summary: "Guía práctica de EDA para investigadores biomédicos"
authors: ["Dr. Bioestadístico"]
---`,

    'content/es/post/2025-02-20-ensayos/index.md': `---
title: "Diseño de ensayos clínicos: principios fundamentales"
date: 2025-02-20
categories: ["Evaluación Regulatoria"]
tags: ["ensayos-clinicos", "evaluacion-regulatoria"]
summary: "Principios del diseño experimental en investigación clínica"
---`,

    'content/es/post/2025-02-20-ensayos/index.Rmd': `---
title: "Diseño de ensayos clínicos: principios fundamentales"
date: 2025-02-20
categories: ["Evaluación Regulatoria"]
tags: ["ensayos-clínicos", "evaluacion-regulatoria"]
summary: "Principios del diseño experimental en investigación clínica"
---`,

    'content/es/post/2025-03-10-causalidad/index.md': `---
title: "Correlación no implica causalidad: falacias comunes"
date: 2025-03-10
categories: ["Metodología de Investigación"]
tags: ["causalidad", "falacias"]
description: "Análisis de errores causales en investigación biomédica"
---`,

    'content/es/post/_index.md': `---
title: "Blog"
view: compact
---
Filtros: [[tags.bioestadistica]], [[tags.ensayos-clinicos]]`,

    'content/es/project/calculadora-muestra/index.md': `---
title: "Calculadora de Tamaño de Muestra"
categories: ["Herramientas"]
tags: ["calculadoras", "tamaño-muestra"]
---`,

    'content/es/project/pdf-optimizer/index.md': `---
title: "Optimizador de PDFs Académicos"
categories: ["Herramientas"]
tags: ["pdf", "herramientas"]
---`,

    'content/es/publication/2020-plagio/index.md': `---
title: "Detección de plagio en revistas biomédicas"
date: 2020-05-15
tags: ["plagio", "etica-cientifica"]
---`,

    'content/es/publication/2023-covid/index.md': `---
title: "Análisis epidemiológico COVID-19"
date: 2023-03-20
tags: ["covid-19", "epidemiologia"]
---`,

    'config/_default/languages.toml': `
[es]
languageCode = "es"
languageName = "Español"
title = "Mi Sitio Académico Hugo Blox"

[en]
languageCode = "en"
languageName = "English"
title = "My Academic Site"`,

    'hugo.toml': `
baseURL = "https://misitio.com/"
languageCode = "es"
title = "Mi Sitio Académico"
theme = "hugo-blox"`
};

const lessons = {
    // UNIDAD 1: ORIENTARTE (5 lecciones)
    unit1: {
        title: "UNIDAD 1: Orientarte en la terminal",
        description: "La terminal es un explorador de archivos donde escribes comandos en vez de hacer clic",
        lessons: [
            {
                id: '1.1',
                title: 'pwd - Dónde estoy parado',
                mentalModel: 'La terminal no tiene interfaz visual. Cuando la abres, estás "parado" en algún lugar de tu computadora, pero no lo ves. pwd (print working directory) te dice exactamente dónde estás.',
                analogy: 'Es como mirar el letrero de la calle cuando estás perdido en una ciudad desconocida',
                syntax: {
                    command: 'pwd',
                    parts: [
                        { text: 'pwd', desc: 'print working directory - imprime el directorio actual' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Escribe pwd para ver dónde estás parado',
                        command: 'pwd',
                        output: '/c/Users/TuUsuario/Documents/mi-sitio-hugo-blox',
                        hint: 'Solo las tres letras: pwd'
                    }
                ],
                goldenRule: '🎯 Si te pierdes, pwd. Siempre pwd primero.'
            },
            {
                id: '1.2',
                title: 'ls - Qué hay en este lugar',
                mentalModel: 'Una vez que sabes DÓNDE estás (pwd), necesitas saber QUÉ hay en ese lugar. ls (list) te muestra todos los archivos y carpetas visibles.',
                analogy: 'Es como encender la luz en una habitación oscura para ver qué hay dentro',
                syntax: {
                    command: 'ls',
                    parts: [
                        { text: 'ls', desc: 'list - lista archivos y carpetas' },
                        { text: '-l', desc: 'formato largo con detalles' },
                        { text: '-a', desc: 'muestra archivos ocultos (que empiezan con .)' },
                        { text: '-la', desc: 'combinado: largo + ocultos' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Lista los archivos y carpetas básicas',
                        command: 'ls',
                        output: 'config/\ncontent/\nthemes/\nhugo.toml\nREADME.md',
                        hint: 'Solo dos letras: ls'
                    },
                    {
                        instruction: 'Ahora lista con detalles completos (ls -la)',
                        command: 'ls -la',
                        output: 'drwxr-xr-x  config/\ndrwxr-xr-x  content/\ndrwxr-xr-x  themes/\n-rw-r--r--  hugo.toml\n-rw-r--r--  README.md\n-rw-r--r--  .gitignore',
                        hint: 'ls espacio -la'
                    },
                    {
                        instruction: 'Lista solo el contenido de la carpeta content/',
                        command: 'ls content/',
                        alternatives: ['ls content'],
                        output: 'en/\nes/',
                        hint: 'ls seguido del nombre de la carpeta'
                    }
                ],
                goldenRule: '🎯 ls es mirar rápido, ls -la es mirar con lupa'
            },
            {
                id: '1.3',
                title: 'cd - Moverse entre carpetas',
                mentalModel: 'cd (change directory) te permite moverte entre carpetas. Es como caminar entre habitaciones de una casa. Cada cd te mueve de un lugar a otro.',
                analogy: 'Si pwd es "¿dónde estoy?" y ls es "¿qué veo?", cd es "ir hacia allá"',
                syntax: {
                    command: 'cd',
                    parts: [
                        { text: 'cd carpeta', desc: 'entrar a una carpeta' },
                        { text: 'cd ..', desc: 'subir un nivel (carpeta padre)' },
                        { text: 'cd ~', desc: 'ir a tu carpeta home' },
                        { text: 'cd -', desc: 'volver al directorio anterior' },
                        { text: 'cd', desc: 'sin argumentos también va a home' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Entra a la carpeta content',
                        command: 'cd content',
                        alternatives: ['cd content/'],
                        output: 'usuario@hugo-trainer ~/mi-sitio-hugo-blox/content',
                        hint: 'cd seguido del nombre de la carpeta'
                    },
                    {
                        instruction: 'Ahora entra a la carpeta es',
                        command: 'cd es',
                        alternatives: ['cd es/'],
                        output: 'usuario@hugo-trainer ~/mi-sitio-hugo-blox/content/es',
                        hint: 'cd es'
                    },
                    {
                        instruction: 'Sube un nivel con cd .. (dos puntos)',
                        command: 'cd ..',
                        output: 'usuario@hugo-trainer ~/mi-sitio-hugo-blox/content',
                        hint: 'cd espacio dos puntos: cd ..'
                    },
                    {
                        instruction: 'Vuelve a la carpeta home con cd solo',
                        command: 'cd',
                        alternatives: ['cd ~'],
                        output: 'usuario@hugo-trainer ~',
                        hint: 'cd sin nada te lleva a casa'
                    }
                ],
                goldenRule: '🎯 cd sin argumentos = volver a casa. cd .. = subir un piso'
            },
            {
                id: '1.4',
                title: 'head y cat - Leer archivos sin abrirlos',
                mentalModel: 'Para ver el CONTENIDO de un archivo sin abrirlo en un editor, usas cat (muestra todo) o head (muestra solo el inicio). En archivos grandes, head es tu amigo.',
                analogy: 'cat es como leer un libro completo de una vez. head es leer solo la primera página para ver de qué trata',
                syntax: {
                    command: 'head / cat',
                    parts: [
                        { text: 'cat archivo.md', desc: 'muestra TODO el contenido' },
                        { text: 'head archivo.md', desc: 'muestra las primeras 10 líneas' },
                        { text: 'head -20 archivo.md', desc: 'muestra las primeras 20 líneas' },
                        { text: 'head -n archivo.md', desc: 'muestra las primeras n líneas' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Ve las primeras líneas del archivo hugo.toml',
                        command: 'head hugo.toml',
                        output: '# Configuración Hugo Blox\nbaseURL = "https://misitio.com/"\nlanguageCode = "es"\ntitle = "Mi Sitio Académico"\ntheme = "hugo-blox"',
                        hint: 'head seguido del nombre del archivo'
                    },
                    {
                        instruction: 'Muestra las primeras 5 líneas con head -5',
                        command: 'head -5 hugo.toml',
                        output: '# Configuración Hugo Blox\nbaseURL = "https://misitio.com/"\nlanguageCode = "es"\ntitle = "Mi Sitio Académico"\ntheme = "hugo-blox"',
                        hint: 'head -5 archivo'
                    },
                    {
                        instruction: 'Muestra las primeras 15 líneas',
                        command: 'head -15 hugo.toml',
                        output: '# Configuración Hugo Blox\nbaseURL = "https://misitio.com/"\nlanguageCode = "es"\ntitle = "Mi Sitio Académico"\ntheme = "hugo-blox"\n\n[languages]\n  [languages.es]\n    languageName = "Español"\n    weight = 1',
                        hint: 'head -15 archivo'
                    }
                ],
                goldenRule: '🎯 Nunca uses cat en archivos enormes. Usa head primero para inspeccionar.'
            },
            {
                id: '1.5',
                title: 'mkdir, cp, mv, rm - Operaciones básicas',
                mentalModel: 'Estas son las operaciones fundamentales: crear carpetas (mkdir), copiar archivos (cp), mover/renombrar (mv), y eliminar (rm). Cada una es irreversible excepto con git.',
                analogy: 'Son como el menú clic derecho: Nueva carpeta, Copiar, Cortar/Renombrar, Eliminar - pero sin papelera de reciclaje',
                syntax: {
                    command: 'Operaciones de archivos',
                    parts: [
                        { text: 'mkdir nombre', desc: 'crea una carpeta nueva' },
                        { text: 'cp origen destino', desc: 'copia un archivo' },
                        { text: 'mv viejo nuevo', desc: 'renombra o mueve' },
                        { text: 'rm archivo', desc: 'elimina (¡SIN papelera!)' },
                        { text: 'rm -r carpeta', desc: 'elimina carpeta y contenido' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Crea una carpeta llamada backup',
                        command: 'mkdir backup',
                        output: '✓ Carpeta "backup" creada',
                        hint: 'mkdir seguido del nombre'
                    },
                    {
                        instruction: 'Copia hugo.toml a backup/hugo.toml',
                        command: 'cp hugo.toml backup/hugo.toml',
                        output: '✓ Archivo copiado a backup/hugo.toml',
                        hint: 'cp origen destino'
                    },
                    {
                        instruction: 'Renombra README.md a README_OLD.md',
                        command: 'mv README.md README_OLD.md',
                        output: '✓ Archivo renombrado',
                        hint: 'mv nombre-actual nombre-nuevo'
                    }
                ],
                goldenRule: '🎯 rm no tiene papelera. Antes de rm, haz git add para tener respaldo.'
            }
        ]
    },

    // UNIDAD 2: BUSCAR (6 lecciones)
    unit2: {
        title: "UNIDAD 2: Buscar como un pro",
        description: "find busca NOMBRES de archivos. grep busca CONTENIDO dentro de archivos. Son complementarios.",
        lessons: [
            {
                id: '2.1',
                title: 'find - Buscar archivos por nombre',
                mentalModel: 'find recorre carpetas buscando archivos que coincidan con un patrón de NOMBRE. No ve adentro de los archivos, solo busca por el nombre.',
                analogy: 'Es como buscar en tu biblioteca "todos los libros cuyo título termine en \"Guía\"" sin abrir ninguno',
                syntax: {
                    command: 'find',
                    parts: [
                        { text: 'find', desc: 'comando de búsqueda' },
                        { text: 'content/', desc: 'dónde buscar (carpeta)' },
                        { text: '-name', desc: 'buscar por nombre' },
                        { text: '"*.md"', desc: 'patrón: archivos que terminan en .md' },
                        { text: '-type f', desc: 'solo archivos (no carpetas)' },
                        { text: '-type d', desc: 'solo carpetas' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca todos los archivos .md en content/',
                        command: 'find content/ -name "*.md"',
                        alternatives: ['find content -name "*.md"', 'find content/ -name *.md'],
                        output: 'content/es/post/2025-01-15-analisis/index.md\ncontent/es/post/2025-02-20-ensayos/index.md\ncontent/es/post/2025-03-10-causalidad/index.md\ncontent/es/post/_index.md\ncontent/es/project/calculadora-muestra/index.md\ncontent/es/project/pdf-optimizer/index.md\ncontent/es/publication/2020-plagio/index.md\ncontent/es/publication/2023-covid/index.md',
                        hint: 'find carpeta/ -name "patrón"'
                    },
                    {
                        instruction: 'Busca archivos .Rmd (R Markdown)',
                        command: 'find content/ -name "*.Rmd"',
                        alternatives: ['find content -name "*.Rmd"'],
                        output: 'content/es/post/2025-02-20-ensayos/index.Rmd',
                        hint: 'Usa .Rmd en vez de .md'
                    },
                    {
                        instruction: 'Busca archivos llamados exactamente "hugo.toml"',
                        command: 'find . -name "hugo.toml"',
                        alternatives: ['find . -name hugo.toml'],
                        output: './hugo.toml',
                        hint: 'Sin asterisco para nombre exacto'
                    }
                ],
                goldenRule: '🎯 find busca NOMBRES de archivos, no lo que hay adentro'
            },
            {
                id: '2.2',
                title: 'grep - Buscar texto en UN archivo',
                mentalModel: 'grep busca líneas que contengan un texto específico DENTRO de archivos. Es como Ctrl+F pero en la terminal. Puedes usarlo en un archivo o en muchos.',
                analogy: 'Es como buscar "todas las páginas de un libro que mencionan la palabra diabetes"',
                syntax: {
                    command: 'grep',
                    parts: [
                        { text: 'grep', desc: 'comando de búsqueda de texto' },
                        { text: '"texto"', desc: 'qué buscar' },
                        { text: 'archivo.md', desc: 'dónde buscar' },
                        { text: '-n', desc: 'muestra número de línea' },
                        { text: '-i', desc: 'ignora mayúsculas/minúsculas' },
                        { text: '-r', desc: 'recursivo (en todas las carpetas)' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca la palabra "tags" en el archivo de ensayos',
                        command: 'grep "tags" content/es/post/2025-02-20-ensayos/index.md',
                        alternatives: ['grep tags content/es/post/2025-02-20-ensayos/index.md'],
                        output: 'tags: ["ensayos-clinicos", "evaluacion-regulatoria"]',
                        hint: 'grep "palabra" archivo'
                    },
                    {
                        instruction: 'Busca "tags" con número de línea (-n)',
                        command: 'grep -n "tags" content/es/post/2025-02-20-ensayos/index.md',
                        alternatives: ['grep -n tags content/es/post/2025-02-20-ensayos/index.md'],
                        output: '5:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]',
                        hint: 'Agrega -n antes del texto a buscar'
                    },
                    {
                        instruction: 'Busca "title" ignorando mayúsculas (-i)',
                        command: 'grep -i "TITLE" content/es/post/2025-02-20-ensayos/index.md',
                        alternatives: ['grep -i TITLE content/es/post/2025-02-20-ensayos/index.md'],
                        output: 'title: "Diseño de ensayos clínicos: principios fundamentales"',
                        hint: 'grep -i busca sin distinguir mayúsculas'
                    }
                ],
                goldenRule: '🎯 grep busca CONTENIDO dentro de archivos, no nombres'
            },
            {
                id: '2.3',
                title: 'grep -r - Buscar en TODOS los archivos',
                mentalModel: 'grep -r busca en TODOS los archivos dentro de una carpeta y sus subcarpetas. Es el comando más poderoso para encontrar dónde usaste algo en todo tu sitio.',
                analogy: 'Es como buscar "todas las páginas de TODOS los libros de la biblioteca que mencionan diabetes"',
                syntax: {
                    command: 'grep -r',
                    parts: [
                        { text: 'grep -r', desc: 'búsqueda recursiva' },
                        { text: '"texto"', desc: 'qué buscar' },
                        { text: 'content/', desc: 'carpeta donde buscar' },
                        { text: '-n', desc: 'con números de línea' },
                        { text: '-l', desc: 'solo nombres de archivos' },
                        { text: '-i', desc: 'ignorar mayúsculas' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca "bioestadistica" en todos los archivos de content/',
                        command: 'grep -r "bioestadistica" content/',
                        alternatives: ['grep -r bioestadistica content/'],
                        output: 'content/es/post/2025-01-15-analisis/index.md:tags: ["bioestadistica", "eda", "R"]',
                        hint: 'grep -r "texto" carpeta/'
                    },
                    {
                        instruction: 'Busca "herramientas" mostrando solo nombres de archivos (-l)',
                        command: 'grep -rl "herramientas" content/',
                        alternatives: ['grep -lr "herramientas" content/', 'grep -rl herramientas content/'],
                        output: 'content/es/project/calculadora-muestra/index.md\ncontent/es/project/pdf-optimizer/index.md',
                        hint: 'Usa -rl para solo nombres'
                    },
                    {
                        instruction: 'Busca "covid" con números de línea (-rn)',
                        command: 'grep -rn "covid" content/',
                        alternatives: ['grep -nr "covid" content/', 'grep -rn covid content/'],
                        output: 'content/es/publication/2023-covid/index.md:4:tags: ["covid-19", "epidemiologia"]',
                        hint: 'Combina -r y -n en cualquier orden'
                    }
                ],
                goldenRule: '🎯 grep -r busca en TODO. Úsalo para encontrar dónde usaste algo en todo el sitio.'
            },
            {
                id: '2.4',
                title: 'grep con filtro de tipo de archivo',
                mentalModel: 'A veces quieres buscar solo en archivos .md o solo en .Rmd. --include te permite filtrar por tipo de archivo. Es crucial para separar fuentes (.Rmd) de compilados (.md).',
                analogy: 'Es como decir "busca en todos los libros, pero solo en los de tapa roja, no en los de tapa azul"',
                syntax: {
                    command: 'grep --include',
                    parts: [
                        { text: 'grep -r', desc: 'búsqueda recursiva' },
                        { text: '"texto"', desc: 'qué buscar' },
                        { text: 'content/', desc: 'dónde buscar' },
                        { text: '--include="*.md"', desc: 'solo archivos .md' },
                        { text: '--include="*.Rmd"', desc: 'solo archivos .Rmd' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca "tags" solo en archivos .md',
                        command: 'grep -r "tags" content/ --include="*.md"',
                        alternatives: ['grep -r tags content/ --include="*.md"', 'grep -r "tags" content/ --include=*.md'],
                        output: 'content/es/post/2025-01-15-analisis/index.md:tags: ["bioestadistica", "eda", "R"]\ncontent/es/post/2025-02-20-ensayos/index.md:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-03-10-causalidad/index.md:tags: ["causalidad", "falacias"]',
                        hint: 'grep -r "texto" carpeta/ --include="*.md"'
                    },
                    {
                        instruction: 'Busca "tags" solo en archivos .Rmd',
                        command: 'grep -r "tags" content/ --include="*.Rmd"',
                        alternatives: ['grep -r tags content/ --include="*.Rmd"'],
                        output: 'content/es/post/2025-02-20-ensayos/index.Rmd:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                        hint: 'Cambia .md por .Rmd'
                    }
                ],
                goldenRule: '🎯 --include filtra por extensión. Úsalo para separar .md de .Rmd'
            },
            {
                id: '2.5',
                title: 'grep -L - Archivos que NO contienen algo',
                mentalModel: 'A veces necesitas encontrar archivos que NO tienen algo. Por ejemplo, posts sin campo "summary" o sin "description". -L es "grep al revés": muestra los archivos que NO coinciden.',
                analogy: 'Es como buscar "libros que NO mencionan la palabra diabetes" en tu biblioteca',
                syntax: {
                    command: 'grep -L',
                    parts: [
                        { text: 'grep -L', desc: 'muestra archivos que NO contienen el texto' },
                        { text: 'grep -rL', desc: 'recursivo + negativo' },
                        { text: '"texto"', desc: 'qué NO debe estar' },
                        { text: 'carpeta/', desc: 'dónde buscar' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Encuentra archivos que NO tienen "summary:"',
                        command: 'grep -rL "summary:" content/es/post/*/index.md',
                        alternatives: ['grep -rL summary: content/es/post/*/index.md'],
                        output: 'content/es/post/2025-03-10-causalidad/index.md\ncontent/es/post/_index.md',
                        hint: 'grep -rL busca lo que NO está'
                    },
                    {
                        instruction: 'Encuentra archivos que NO tienen "description:"',
                        command: 'grep -rL "description:" content/es/post/*/index.md',
                        alternatives: ['grep -rL description: content/es/post/*/index.md'],
                        output: 'content/es/post/2025-01-15-analisis/index.md\ncontent/es/post/2025-02-20-ensayos/index.md\ncontent/es/post/_index.md',
                        hint: 'Cambia summary por description'
                    }
                ],
                goldenRule: '🎯 -l (minúscula) lista los que SÍ tienen. -L (mayúscula) los que NO tienen.'
            },
            {
                id: '2.6',
                title: 'Pipe | - Conectar comandos',
                mentalModel: 'El símbolo | (pipe, tubería) conecta comandos. La salida del primero se convierte en la entrada del segundo. Es como una cadena de montaje: el resultado de una máquina entra en la siguiente.',
                analogy: 'Es como decir "toma todos los libros de la estantería Y PÁSALOS a la persona que los va a catalogar"',
                syntax: {
                    command: 'Pipe |',
                    parts: [
                        { text: 'comando1 | comando2', desc: 'la salida de 1 entra en 2' },
                        { text: '| head -10', desc: 'muestra solo las primeras 10 líneas' },
                        { text: '| wc -l', desc: 'cuenta líneas (word count lines)' },
                        { text: '| tail', desc: 'muestra las últimas líneas' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca "tags" y muestra solo las primeras 3 líneas',
                        command: 'grep -rn "tags" content/ | head -3',
                        alternatives: ['grep -rn tags content/ | head -3'],
                        output: 'content/es/post/2025-01-15-analisis/index.md:5:tags: ["bioestadistica", "eda", "R"]\ncontent/es/post/2025-02-20-ensayos/index.md:5:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-02-20-ensayos/index.Rmd:5:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                        hint: 'comando | head -3'
                    },
                    {
                        instruction: 'Cuenta cuántos archivos .md hay en content/',
                        command: 'find content/ -name "*.md" | wc -l',
                        alternatives: ['find content -name "*.md" | wc -l'],
                        output: '8',
                        hint: 'find ... | wc -l cuenta resultados'
                    },
                    {
                        instruction: 'Cuenta cuántos archivos tienen "bioestadistica"',
                        command: 'grep -rl "bioestadistica" content/ | wc -l',
                        alternatives: ['grep -rl bioestadistica content/ | wc -l'],
                        output: '1',
                        hint: 'grep -rl ... | wc -l'
                    }
                ],
                goldenRule: '🎯 | conecta comandos. wc -l cuenta cuántas líneas (resultados).'
            }
        ]
    },

    // UNIDAD 3: GIT SEGURO (8 lecciones)
    unit3: {
        title: "UNIDAD 3: Git - Tu máquina del tiempo",
        description: "Git es una máquina del tiempo. Cada commit es una foto. Las ramas son universos paralelos donde puedes experimentar sin dañar la realidad.",
        lessons: [
            {
                id: '3.1',
                title: 'git status - La pregunta más importante',
                mentalModel: 'git status te dice QUÉ ha cambiado desde el último commit. Es tu radar de situación. Úsalo TODO EL TIEMPO, antes de hacer cualquier otra cosa.',
                analogy: 'Es como preguntarte "¿qué toqué desde la última vez que guardé el documento?"',
                syntax: {
                    command: 'git status',
                    parts: [
                        { text: 'git status', desc: 'muestra el estado actual de cambios' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Verifica el estado del repositorio',
                        command: 'git status',
                        output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean',
                        hint: 'git status sin argumentos'
                    }
                ],
                goldenRule: '🎯 Antes de hacer CUALQUIER cosa: git status. Siempre.'
            },
            {
                id: '3.2',
                title: 'git add + commit - Guardar una foto',
                mentalModel: 'add pone archivos en "staging" (listos para guardar). commit toma la foto. El mensaje del commit es la etiqueta de esa foto que te ayudará en el futuro.',
                analogy: 'add = poner a las personas en posición para la foto. commit = tomar la foto y ponerle una etiqueta.',
                syntax: {
                    command: 'git add / commit',
                    parts: [
                        { text: 'git add -A', desc: 'agregar TODOS los cambios' },
                        { text: 'git add archivo.md', desc: 'agregar un archivo específico' },
                        { text: 'git commit -m "mensaje"', desc: 'guardar con descripción' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Agrega todos los cambios al staging',
                        command: 'git add -A',
                        alternatives: ['git add .', 'git add --all'],
                        output: '✓ Todos los cambios agregados al staging area',
                        hint: 'git add -A'
                    },
                    {
                        instruction: 'Haz commit con un mensaje descriptivo',
                        command: 'git commit -m "Corregir typos en tags de ensayos"',
                        output: '[main 7a3f2b1] Corregir typos en tags de ensayos\n 2 files changed, 2 insertions(+), 2 deletions(-)',
                        hint: 'git commit -m "mensaje claro"'
                    }
                ],
                goldenRule: '🎯 Commits pequeños y frecuentes. Mensajes que expliquen el QUÉ y el POR QUÉ.'
            },
            {
                id: '3.3',
                title: 'git branch - Ver universos paralelos',
                mentalModel: 'Las ramas (branches) son líneas de tiempo paralelas. main es la realidad oficial (tu sitio publicado). Las demás ramas son experimentos donde puedes romper cosas sin miedo.',
                analogy: 'Es como tener varios borradores de un artículo sin tocar el original que ya está publicado',
                syntax: {
                    command: 'git branch',
                    parts: [
                        { text: 'git branch', desc: 'ver todas las ramas' },
                        { text: '*', desc: 'la estrella marca en qué rama estás ahora' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Lista todas las ramas del repositorio',
                        command: 'git branch',
                        output: '* main\n  fix-tags\n  nuevo-post-analisis',
                        hint: 'git branch sin argumentos'
                    }
                ],
                goldenRule: '🎯 La estrella (*) marca dónde estás. Si no ves *, estás en main.'
            },
            {
                id: '3.4',
                title: 'git checkout -b - Crear universo seguro',
                mentalModel: 'Antes de hacer cambios arriesgados (editar 10 archivos, cambiar estructura, etc.), crea una rama. Si algo sale mal, puedes volver a main sin daño alguno.',
                analogy: 'Es como hacer una copia del documento antes de empezar a editar masivamente',
                syntax: {
                    command: 'git checkout -b',
                    parts: [
                        { text: 'git checkout -b', desc: 'crear Y cambiar a nueva rama' },
                        { text: 'nombre-rama', desc: 'nombre descriptivo con guiones' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Crea una rama llamada "fix-tags"',
                        command: 'git checkout -b fix-tags',
                        output: 'Switched to a new branch \'fix-tags\'',
                        hint: 'git checkout -b nombre-de-rama'
                    },
                    {
                        instruction: 'Crea una rama para un post nuevo',
                        command: 'git checkout -b nuevo-post-bioestadistica',
                        output: 'Switched to a new branch \'nuevo-post-bioestadistica\'',
                        hint: 'Usa nombres descriptivos'
                    }
                ],
                goldenRule: '🎯 SIEMPRE crear rama antes de cambios arriesgados. Nunca trabajes directamente en main.'
            },
            {
                id: '3.5',
                title: 'git checkout - Deshacer errores',
                mentalModel: 'checkout sin -b te permite deshacer cambios o cambiar de rama. Es tu botón de pánico cuando algo sale mal. Puedes deshacer un archivo, todos los archivos, o volver a otra rama.',
                analogy: 'Es como Ctrl+Z, pero más poderoso: puedes deshacer un archivo específico o todo.',
                syntax: {
                    command: 'git checkout',
                    parts: [
                        { text: 'git checkout -- archivo.md', desc: 'deshacer cambios en 1 archivo' },
                        { text: 'git checkout .', desc: 'deshacer TODO (¡cuidado!)' },
                        { text: 'git checkout main', desc: 'volver a la rama main' },
                        { text: 'git checkout nombre-rama', desc: 'cambiar a otra rama' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Deshaz cambios en un archivo específico',
                        command: 'git checkout -- content/es/post/2025-02-20-ensayos/index.md',
                        output: '✓ Cambios descartados en content/es/post/2025-02-20-ensayos/index.md',
                        hint: 'git checkout -- nombre-archivo'
                    },
                    {
                        instruction: 'Cambia a la rama main',
                        command: 'git checkout main',
                        output: 'Switched to branch \'main\'',
                        hint: 'git checkout nombre-rama'
                    }
                ],
                goldenRule: '🎯 checkout es tu botón de pánico. --archivo deshace uno. . deshace TODO.'
            },
            {
                id: '3.6',
                title: 'git diff - Ver exactamente qué cambió',
                mentalModel: 'diff muestra exactamente QUÉ líneas cambiaron, no solo qué archivos. Verde = texto agregado, Rojo = texto eliminado. Es crucial para revisar cambios antes de commit.',
                analogy: 'Es como la función "comparar documentos" de Word que te muestra exactamente qué palabras cambiaste',
                syntax: {
                    command: 'git diff',
                    parts: [
                        { text: 'git diff', desc: 'cambios no guardados (antes de add)' },
                        { text: 'git diff --cached', desc: 'cambios en staging (después de add)' },
                        { text: '+', desc: 'línea agregada (verde)' },
                        { text: '-', desc: 'línea eliminada (rojo)' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Ve qué cambió antes de hacer add',
                        command: 'git diff',
                        output: 'diff --git a/content/es/post/2025-02-20-ensayos/index.md b/content/es/post/2025-02-20-ensayos/index.md\nindex abc123..def456 100644\n--- a/content/es/post/2025-02-20-ensayos/index.md\n+++ b/content/es/post/2025-02-20-ensayos/index.md\n@@ -4,7 +4,7 @@ categories: ["Evaluación Regulatoria"]\n-tags: ["ensayos-clínicos", "evaluacion-regulatoria"]\n+tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\n summary: "Principios del diseño experimental"',
                        hint: 'git diff sin argumentos'
                    }
                ],
                goldenRule: '🎯 Siempre git diff antes de git commit. Revisa qué vas a guardar.'
            },
            {
                id: '3.7',
                title: 'git merge - Unir universos',
                mentalModel: 'Cuando terminas en una rama y todo funciona perfecto, merge trae esos cambios a main. Es como decir "este borrador está listo, hazlo oficial".',
                analogy: 'Es como decir "este borrador del artículo está listo, publícalo en la versión final"',
                syntax: {
                    command: 'git merge',
                    parts: [
                        { text: 'git checkout main', desc: '1. Primero ir a main' },
                        { text: 'git merge nombre-rama', desc: '2. Luego merge la rama' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Primero, ve a la rama main',
                        command: 'git checkout main',
                        output: 'Switched to branch \'main\'',
                        hint: 'Primero debes estar en main'
                    },
                    {
                        instruction: 'Haz merge de la rama fix-tags',
                        command: 'git merge fix-tags',
                        output: 'Updating a1b2c3d..e4f5g6h\nFast-forward\n content/es/post/2025-02-20-ensayos/index.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                        hint: 'git merge nombre-de-rama'
                    }
                ],
                goldenRule: '🎯 Primero ir a main (git checkout main), LUEGO merge (git merge rama). El orden importa.'
            },
            {
                id: '3.8',
                title: 'git push - Publicar al mundo',
                mentalModel: 'push sube tus commits a GitHub/GitLab. Después de push, otros pueden ver tus cambios y (si tienes auto-deploy) el sitio se despliega automáticamente. No hay vuelta atrás fácil.',
                analogy: 'Es como enviar el artículo final a la revista. Una vez enviado, ya está en manos de otros.',
                syntax: {
                    command: 'git push',
                    parts: [
                        { text: 'git push', desc: 'subir commits a remoto (GitHub)' },
                        { text: 'git push origin main', desc: 'subir main explícitamente' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Sube los cambios a GitHub',
                        command: 'git push',
                        output: 'Enumerating objects: 7, done.\nCounting objects: 100% (7/7), done.\nWriting objects: 100% (4/4), 421 bytes | 421.00 KiB/s, done.\nTotal 4 (delta 2), reused 0 (delta 0)\nremote: Resolving deltas: 100% (2/2), completed with 2 local objects.\nTo github.com:usuario/mi-sitio-hugo-blox.git\n   a1b2c3d..e4f5g6h  main -> main',
                        hint: 'git push sin argumentos si estás en main'
                    }
                ],
                goldenRule: '🎯 Push solo cuando estés 100% seguro. Después de push, el mundo lo ve y el sitio se actualiza.'
            }
        ]
    },

    // UNIDAD 4: FLUJOS HUGO (4 lecciones)
    unit4: {
        title: "UNIDAD 4: Flujos Hugo Blox",
        description: "Hugo Blox lee archivos .md y genera tu sitio web. Si el .md está mal (YAML roto), el sitio entero se rompe.",
        lessons: [
            {
                id: '4.1',
                title: 'Estructura de contenido Hugo Blox',
                mentalModel: 'Hugo Blox organiza el contenido en carpetas específicas según el tipo. Cada tipo de contenido va en su lugar: posts en post/, proyectos en project/, publicaciones en publication/.',
                analogy: 'Es como una biblioteca bien organizada: los libros van en estanterías, las revistas en otra sección, los documentos en archivadores',
                syntax: {
                    command: 'Estructura Hugo Blox',
                    parts: [
                        { text: 'content/es/post/', desc: 'artículos del blog' },
                        { text: 'content/es/project/', desc: 'proyectos y herramientas' },
                        { text: 'content/es/publication/', desc: 'publicaciones académicas' },
                        { text: '_index.md', desc: 'landing pages con filtros' },
                        { text: 'Cada post:', desc: 'va en su propia carpeta con index.md' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Lista las carpetas de contenido en español',
                        command: 'ls content/es/',
                        output: 'post/\nproject/\npublication/',
                        hint: 'ls content/es/'
                    },
                    {
                        instruction: 'Encuentra todos los archivos _index.md',
                        command: 'find content/ -name "_index.md"',
                        alternatives: ['find content -name "_index.md"'],
                        output: 'content/es/post/_index.md',
                        hint: 'find content/ -name "_index.md"'
                    },
                    {
                        instruction: 'Lista los posts disponibles',
                        command: 'ls content/es/post/',
                        output: '2025-01-15-analisis/\n2025-02-20-ensayos/\n2025-03-10-causalidad/\n_index.md',
                        hint: 'ls content/es/post/'
                    }
                ],
                goldenRule: '🎯 Cada tipo de contenido tiene su carpeta. Cada post va en su propia carpeta con index.md dentro.'
            },
            {
                id: '4.2',
                title: 'hugo server - Previsualizar ANTES de publicar',
                mentalModel: 'hugo server genera el sitio localmente en tu computadora. SIEMPRE previsualiza antes de push para ver cómo se ve y detectar errores. Es tu red de seguridad.',
                analogy: 'Es como ver la vista previa del documento antes de imprimirlo y enviarlo',
                syntax: {
                    command: 'hugo server',
                    parts: [
                        { text: 'hugo server', desc: 'inicia servidor local' },
                        { text: 'http://localhost:1313', desc: 'dirección para ver el sitio' },
                        { text: 'Ctrl+C', desc: 'detener el servidor' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Inicia el servidor de Hugo para previsualizar',
                        command: 'hugo server',
                        output: 'Watching for changes...\nWeb Server is available at http://localhost:1313/\nPress Ctrl+C to stop',
                        hint: 'hugo server'
                    }
                ],
                goldenRule: '🎯 SIEMPRE hugo server antes de git push. Nunca publiques sin previsualizar.'
            },
            {
                id: '4.3',
                title: 'Front matter YAML - La ficha del contenido',
                mentalModel: 'El front matter (entre --- al inicio del archivo) es la metadata del post: título, fecha, tags, categorías. Un error de sintaxis YAML aquí ROMPE TODO EL SITIO, no solo ese post.',
                analogy: 'Es como la ficha bibliográfica de un libro: si está mal escrita, el sistema de la biblioteca no puede catalogarlo',
                syntax: {
                    command: 'Front matter YAML',
                    parts: [
                        { text: 'title:', desc: 'título del contenido (obligatorio)' },
                        { text: 'date:', desc: 'fecha en YYYY-MM-DD' },
                        { text: 'categories:', desc: 'lista de categorías [cat1, cat2]' },
                        { text: 'tags:', desc: 'lista de etiquetas [tag1, tag2]' },
                        { text: 'summary:', desc: 'resumen breve para listings' },
                        { text: 'Cuidado:', desc: 'YAML es sensible a espacios y dos puntos' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Busca todos los posts que tienen "summary:"',
                        command: 'grep -r "summary:" content/es/post/',
                        alternatives: ['grep -r summary: content/es/post/'],
                        output: 'content/es/post/2025-01-15-analisis/index.md:summary: "Guía práctica de EDA para investigadores biomédicos"\ncontent/es/post/2025-02-20-ensayos/index.md:summary: "Principios del diseño experimental en investigación clínica"',
                        hint: 'grep -r "summary:" carpeta/'
                    },
                    {
                        instruction: 'Encuentra posts SIN "summary:" (usan -L)',
                        command: 'grep -rL "summary:" content/es/post/*/index.md',
                        alternatives: ['grep -rL summary: content/es/post/*/index.md'],
                        output: 'content/es/post/2025-03-10-causalidad/index.md\ncontent/es/post/_index.md',
                        hint: 'Usa -L para buscar lo que NO está'
                    }
                ],
                goldenRule: '🎯 Un error en YAML rompe TODO el sitio, no solo un post. Revisa con hugo server.'
            },
            {
                id: '4.4',
                title: 'Archivos .Rmd vs .md - Mantener sincronizados',
                mentalModel: 'Si usas R Markdown, tienes dos archivos: .Rmd (fuente que tú editas en RStudio) y .md (compilado que Hugo lee). Si editas solo uno, se dessincronizan y tienes problemas.',
                analogy: 'Es como tener un documento Word (.docx) y un PDF generado desde él. Si editas el PDF a mano, la próxima vez que generes desde Word, tus cambios se pierden.',
                syntax: {
                    command: '.Rmd vs .md',
                    parts: [
                        { text: '.Rmd', desc: 'archivo fuente (R Markdown, tú editas aquí)' },
                        { text: '.md', desc: 'archivo compilado (Hugo lee este)' },
                        { text: 'Regla de oro:', desc: 'Edita solo el .Rmd y vuelve a knitear' },
                        { text: 'Opción B:', desc: 'Edita AMBOS manualmente si es un cambio rápido' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Encuentra todos los archivos .Rmd en tu sitio',
                        command: 'find content/ -name "*.Rmd"',
                        output: 'content/es/post/2025-02-20-ensayos/index.Rmd',
                        hint: 'find content/ -name "*.Rmd"'
                    },
                    {
                        instruction: 'Compara los tags del .Rmd vs .md de ensayos',
                        command: 'grep "tags:" content/es/post/2025-02-20-ensayos/index.*',
                        output: 'content/es/post/2025-02-20-ensayos/index.md:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-02-20-ensayos/index.Rmd:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                        hint: 'grep "tags:" archivo.* busca en ambos'
                    },
                    {
                        instruction: 'Busca diferencias en "tags" entre .Rmd y .md',
                        command: 'grep -r "tags:" content/es/post/2025-02-20-ensayos/',
                        output: 'content/es/post/2025-02-20-ensayos/index.md:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-02-20-ensayos/index.Rmd:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                        hint: 'Nota la tilde en el .Rmd que no está en el .md'
                    }
                ],
                goldenRule: '🎯 Si existen .Rmd y .md, edita solo el .Rmd y re-knitea. O edita AMBOS manualmente.'
            }
        ]
    },

    // UNIDAD 5: RENOMBRADO MASIVO (5 lecciones) - NUEVO
    unit5: {
        title: "UNIDAD 5: Renombrado Masivo con Patrones",
        description: "Renombra múltiples archivos y carpetas usando patrones. Ahorra horas de trabajo manual.",
        lessons: [
            {
                id: '5.1',
                title: 'rename - Cambiar patrones de nombre',
                mentalModel: 'rename permite cambiar nombres de archivos usando expresiones regulares. Es como "buscar y reemplazar" pero para nombres de archivos.',
                analogy: 'Es como usar "buscar y reemplazar" en Word, pero para nombres de archivos en vez de texto',
                syntax: {
                    command: 'rename',
                    parts: [
                        { text: 'rename s/antiguo/nuevo/', desc: 'sustituye patrón en nombres' },
                        { text: '*.md', desc: 'archivos a afectar' },
                        { text: '-n', desc: 'modo prueba (no ejecuta)' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Prueba cambiar espacios por guiones en archivos .md',
                        command: 'rename -n "s/ /-/g" *.md',
                        alternatives: ['rename "s/ /-/g" *.md'],
                        output: 'rename(My_Post_File.md, My_Post_File.md) -> rename(My-Post-File.md, My-Post-File.md)\nrename(Another File.md, Another File.md) -> rename(Another-File.md, Another-File.md)',
                        hint: 'rename -n "s/espacio/guion/g" *.md'
                    },
                    {
                        instruction: 'Ejecuta el cambio real (sin -n)',
                        command: 'rename "s/ /-/g" *.md',
                        alternatives: ['rename "s/ /-/g" *.md'],
                        output: '✓ Renombrados: My_Post_File.md -> My-Post-File.md',
                        hint: 'rename "s/espacio/guion/g" *.md'
                    }
                ],
                goldenRule: '🎯 Siempre prueba primero con -n antes de ejecutar cambios reales.'
            },
            {
                id: '5.2',
                title: 'mv con wildcards - Renombrar en masa',
                mentalModel: 'mv (move) con wildcards (*, ?) te permite mover o renombrar múltiples archivos a la vez. Muy útil para reorganizar carpetas.',
                analogy: 'Es como arrastrar múltiples archivos a una carpeta, pero con un solo comando',
                syntax: {
                    command: 'mv',
                    parts: [
                        { text: 'mv *.md backup/', desc: 'mueve todos los .md a backup/' },
                        { text: 'mv file[0-9].md', desc: 'mueve file0.md, file1.md, etc.' },
                        { text: 'mv old* new*', desc: 'cambia prefijo de múltiples archivos' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Mueve todos los archivos .md a una carpeta backup/',
                        command: 'mv *.md backup/',
                        alternatives: ['mv *.md backup'],
                        output: '✓ Moviidos: index.md, README.md, hugo.toml a backup/',
                        hint: 'mv *.md carpeta/'
                    },
                    {
                        instruction: 'Cambia prefijo de múltiples archivos',
                        command: 'mv old* new*',
                        alternatives: ['mv old* new*'],
                        output: '✓ Renombrados: old-file.md -> new-file.md, old-test.md -> new-test.md',
                        hint: 'mv old* new*'
                    }
                ],
                goldenRule: '🎯 Wildcards (*, ?) son tus amigos. Úsalos para afectar múltiples archivos.'
            },
            {
                id: '5.3',
                title: 'Renombrar carpetas de posts por fecha',
                mentalModel: 'Los posts de Hugo Blox requieren fechas en el nombre de carpeta. rename te ayuda a estandarizar nombres antiguos.',
                analogy: 'Es como ponerle etiquetas de fecha a todos tus archivos desordenados',
                syntax: {
                    command: 'rename fechas',
                    parts: [
                        { text: 'rename "s/^post-([0-9]+)$/$1-post/"', desc: 'cambia formato post-123 a 123-post' },
                        { text: 'rename "s/^([a-z]+)-([0-9]{4})-([0-9]{2})-([0-9]{2})/$3-$4-$2-$1/"', desc: 'cambia formato mes-2025-01-15 a 2025-01-15-mes' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Cambia formato: post-analisis a 2025-01-15-analisis',
                        command: 'rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*',
                        alternatives: ['rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*'],
                        output: 'rename(post-analisis, 2025-01-15-analisis) -> rename(2025-01-15-analisis, 2025-01-15-analisis)',
                        hint: 'rename "s/patron/reemplazo/" carpeta-*'
                    },
                    {
                        instruction: 'Aplica el cambio real',
                        command: 'rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*',
                        alternatives: ['rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*'],
                        output: '✓ Carpeta renombrada: post-analisis -> 2025-01-15-analisis',
                        hint: 'Sin -n para ejecutar'
                    }
                ],
                goldenRule: '🎯 Usa expresiones regulares para patrones complejos. $1, $2 son grupos capturados.'
            },
            {
                id: '5.4',
                title: 'Agregar prefijos/sufijos en masa',
                mentalModel: 'A veces necesitas agregar un prefijo (como "WIP_" para work in progress) o sufijo (como "_backup") a múltiples archivos.',
                analogy: 'Es como ponerle un sello de "CONFIDENCIAL" a todos los documentos de una carpeta',
                syntax: {
                    command: 'rename prefijos',
                    parts: [
                        { text: 'rename "s/^/WIP_/" *.md', desc: 'agrega prefijo WIP_ a todos' },
                        { text: 'rename "s/$/_backup/" *.md', desc: 'agrega sufijo _backup a todos' },
                        { text: 'rename "s/^/2025-01-15-/" *', desc: 'agrega fecha como prefijo' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Agrega prefijo "WIP_" a todos los archivos .md',
                        command: 'rename "s/^/WIP_/" *.md',
                        alternatives: ['rename "s/^/WIP_/" *.md'],
                        output: 'rename(index.md, WIP_index.md) -> rename(WIP_index.md, WIP_index.md)\nrename(README.md, WIP_README.md) -> rename(WIP_README.md, WIP_README.md)',
                        hint: 'rename "s/^/prefijo/" *.md'
                    },
                    {
                        instruction: 'Agrega sufijo "_archived" a todos los archivos',
                        command: 'rename "s/$/_archived/" *.md',
                        alternatives: ['rename "s/$/_archived/" *.md'],
                        output: 'rename(WIP_index.md, WIP_index_archived.md) -> rename(WIP_index_archived.md, WIP_index_archived.md)',
                        hint: 'rename "s/$/sufijo/" *.md'
                    }
                ],
                goldenRule: '🎯 ^ al inicio = prefijo. $ al final = sufijo. Usa rename para ambos casos.'
            },
            {
                id: '5.5',
                title: 'Renombrar extensiones en masa',
                mentalModel: 'Cambia la extensión de múltiples archivos a la vez. Útil cuando migras de .txt a .md, o de .Rmd a .md.',
                analogy: 'Es como cambiarle la etiqueta de "borrador" a "final" a todos los archivos de una carpeta',
                syntax: {
                    command: 'rename extensiones',
                    parts: [
                        { text: 'rename "s/\\.txt$/.md/" *.txt', desc: 'cambia .txt a .md' },
                        { text: 'rename "s/\\.Rmd$/.md/" *.Rmd', desc: 'cambia .Rmd a .md' },
                        { text: 'rename "s/\\.[^.]+$/.md/" *', desc: 'cambia cualquier extensión a .md' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Cambia todas las extensiones .txt a .md',
                        command: 'rename "s/\\.txt$/.md/" *.txt',
                        alternatives: ['rename "s/\\.txt$/.md/" *.txt'],
                        output: 'rename(documento.txt, documento.md) -> rename(documento.md, documento.md)',
                        hint: 'rename "s/\\.ext1$/\\.ext2/" *.ext1'
                    },
                    {
                        instruction: 'Cambia todas las extensiones .Rmd a .md',
                        command: 'rename "s/\\.Rmd$/.md/" *.Rmd',
                        alternatives: ['rename "s/\\.Rmd$/.md/" *.Rmd'],
                        output: 'rename(index.Rmd, index.md) -> rename(index.md, index.md)',
                        hint: 'rename "s/\\.Rmd$/.md/" *.Rmd'
                    }
                ],
                goldenRule: '🎯 \\.$ = fin de nombre. Usa rename para cambiar extensiones masivamente.'
            }
        ]
    },

    // UNIDAD 6: BÚSQUEDA Y REEMPLAZO (4 lecciones) - NUEVO
    unit6: {
        title: "UNIDAD 6: Búsqueda y Reemplazo Avanzado",
        description: 'Usa sed y grep para buscar y reemplazar texto en uno o múltiples archivos.',
        lessons: [
            {
                id: '6.1',
                title: 'sed - Reemplazar texto en UN archivo',
                mentalModel: 'sed (stream editor) modifica texto en tiempo real. Es como "buscar y reemplazar" pero en la terminal. Perfecto para correcciones rápidas.',
                analogy: 'Es como Ctrl+H en Word, pero puedes aplicarlo a 100 archivos con un solo comando',
                syntax: {
                    command: 'sed',
                    parts: [
                        { text: 'sed "s/antiguo/nuevo/"', desc: 'reemplaza primera coincidencia' },
                        { text: 'sed "s/antiguo/nuevo/g"', desc: 'reemplaza TODAS las coincidencias (g = global)' },
                        { text: '-i', desc: 'modifica archivo en lugar (in-place)' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Reemplaza "forence" por "forense" en un archivo',
                        command: 'sed -i "s/forence/forense/g" index.md',
                        alternatives: ['sed -i "s/forence/forense/g" index.md'],
                        output: '✓ Reemplazados 3 casos de "forence" por "forense" en index.md',
                        hint: 'sed -i "s/antiguo/nuevo/g" archivo'
                    },
                    {
                        instruction: 'Reemplaza sin modificar archivo (modo prueba)',
                        command: 'sed "s/forence/forense/g" index.md',
                        alternatives: ['sed "s/forence/forense/g" index.md'],
                        output: 'title: "Análisis forense de datos"',
                        hint: 'Sin -i muestra el resultado pero no modifica'
                    }
                ],
                goldenRule: '🎯 Siempre prueba sin -i primero. Con -i modificas el archivo permanentemente.'
            },
            {
                id: '6.2',
                title: 'sed -i - Reemplazar en múltiples archivos',
                mentalModel: 'sed -i con wildcards te permite reemplazar texto en todos los archivos de una carpeta. ¡Cuidado! Es irreversible sin backup.',
                analogy: 'Es como hacer Ctrl+H en todos los documentos de una carpeta a la vez',
                syntax: {
                    command: 'sed -i multiples',
                    parts: [
                        { text: 'sed -i "s/antiguo/nuevo/g" *.md', desc: 'reemplaza en todos los .md' },
                        { text: 'sed -i "s/patron/reemplazo/g" carpeta/*', desc: 'reemplaza en todos los archivos de carpeta/' },
                        { text: 'sed -i.bak', desc: 'crea backup antes de modificar' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Reemplaza "bioestadística" por "bioestadistica" en todos los .md',
                        command: 'sed -i "s/bioestadística/bioestadistica/g" *.md',
                        alternatives: ['sed -i "s/bioestadística/bioestadistica/g" *.md'],
                        output: '✓ Reemplazados todos los casos en 5 archivos',
                        hint: 'sed -i "s/antiguo/nuevo/g" *.md'
                    },
                    {
                        instruction: 'Crea backup antes de reemplazar',
                        command: 'sed -i.bak "s/antiguo/nuevo/g" *.md',
                        alternatives: ['sed -i.bak "s/antiguo/nuevo/g" *.md'],
                        output: '✓ Backup creado: index.md.bak, README.md.bak',
                        hint: 'Agrega .bak después de -i'
                    }
                ],
                goldenRule: '🎯 SIEMPRE crea backup (-i.bak) antes de reemplazos masivos. Es tu red de seguridad.'
            },
            {
                id: '6.3',
                title: 'grep -r + sed -i - Buscar y reemplazar',
                mentalModel: 'Primero grep para encontrar qué archivos tienen el problema, luego sed para corregirlos. Flujo de trabajo profesional.',
                analogy: 'Es como: 1) Buscar las páginas con errores, 2) Corregirlas todas a la vez',
                syntax: {
                    command: 'grep + sed',
                    parts: [
                        { text: 'grep -r "error" content/', desc: 'encuentra archivos con error' },
                        { text: 'grep -rl "error" content/ | xargs sed -i', desc: 'corrige todos los archivos encontrados' },
                        { text: 'grep -r "tag" content/ --include="*.md"', desc: 'busca solo en .md' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Encuentra todos los archivos con "tag incorrecto"',
                        command: 'grep -r "tag incorrecto" content/',
                        alternatives: ['grep -r "tag incorrecto" content/'],
                        output: 'content/es/post/2025-01-15-analisis/index.md:tags: ["tag incorrecto"]\ncontent/es/post/2025-02-20-ensayos/index.md:tags: ["tag incorrecto"]',
                        hint: 'grep -r "texto" carpeta/'
                    },
                    {
                        instruction: 'Corrige todos los archivos encontrados',
                        command: 'grep -rl "tag incorrecto" content/ | xargs sed -i "s/tag incorrecto/tag-correcto/g"',
                        alternatives: ['grep -rl "tag incorrecto" content/ | xargs sed -i "s/tag incorrecto/tag-correcto/g"'],
                        output: '✓ Corregidos 2 archivos con xargs + sed',
                        hint: 'grep -rl ... | xargs sed -i "s/antiguo/nuevo/g"'
                    }
                ],
                goldenRule: '🎯 Primero grep para identificar, luego sed para corregir. Usa -l para solo nombres.'
            },
            {
                id: '6.4',
                title: 'Reemplazar URLs y paths en todo el sitio',
                mentalModel: 'Cuando cambias la URL de tu sitio o la estructura de carpetas, necesitas actualizar todos los links. sed es perfecto para esto.',
                analogy: 'Es como cambiar la dirección postal en todas las cartas de tu casa de una vez',
                syntax: {
                    command: 'sed URLs',
                    parts: [
                        { text: 'sed -i "s|old-url.com|new-url.com|g" *.md', desc: 'cambia URL en todos los .md' },
                        { text: 'sed -i "s|/old/path/|/new/path/|g" content/*', desc: 'cambia paths en contenido' },
                        { text: 'sed -i "s|http://|https://|g" *.md', desc: 'cambia http a https' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Cambia todas las URLs de "oldsite.com" a "newsite.com"',
                        command: 'sed -i "s|oldsite.com|newsite.com|g" *.md',
                        alternatives: ['sed -i "s|oldsite.com|newsite.com|g" *.md'],
                        output: '✓ URLs actualizadas en 10 archivos',
                        hint: 'sed -i "s|antiguo|nuevo|g" *.md'
                    },
                    {
                        instruction: 'Cambia http a https en todos los archivos',
                        command: 'sed -i "s|http://|https://|g" *.md',
                        alternatives: ['sed -i "s|http://|https://|g" *.md'],
                        output: '✓ Todos los links ahora usan https://',
                        hint: 'sed -i "s|http://|https://|g" *.md'
                    }
                ],
                goldenRule: '🎯 Usa | como separador en vez de / cuando el texto tiene slashes (URLs, paths).'
            }
        ]
    },

    // UNIDAD 7: GIT AVANZADO (5 lecciones) - NUEVO
    unit7: {
        title: "UNIDAD 7: Git Avanzado",
        description: 'Domina Git con stash, log, reset, revert y cherry-pick para flujos de trabajo profesionales.',
        lessons: [
            {
                id: '7.1',
                title: 'git stash - Guardar cambios temporales',
                mentalModel: 'stash guarda tus cambios sin hacer commit. Útil cuando necesitas cambiar de rama pero no has terminado tu trabajo.',
                analogy: 'Es como poner tus cambios en una caja temporal mientras haces otra cosa',
                syntax: {
                    command: 'git stash',
                    parts: [
                        { text: 'git stash', desc: 'guarda todos los cambios' },
                        { text: 'git stash save "mensaje"', desc: 'guarda con descripción' },
                        { text: 'git stash pop', desc: 'recupera y aplica el último stash' },
                        { text: 'git stash list', desc: 'lista todos los stashes' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Guarda tus cambios actuales sin commit',
                        command: 'git stash',
                        alternatives: ['git stash'],
                        output: 'Saved working directory and index state WIP on main: a1b2c3d Cambios pendientes',
                        hint: 'git stash sin argumentos'
                    },
                    {
                        instruction: 'Lista todos los stashes guardados',
                        command: 'git stash list',
                        alternatives: ['git stash list'],
                        output: 'stash@{0}: WIP on main: a1b2c3d Cambios pendientes\nstash@{1}: WIP on feature: e4f5g6h Nueva funcionalidad',
                        hint: 'git stash list'
                    }
                ],
                goldenRule: '🎯 Usa stash cuando necesitas cambiar de rama pero no has terminado. Nunca commits work-in-progress.'
            },
            {
                id: '7.2',
                title: 'git log - Navegar el historial',
                mentalModel: 'log muestra el historial de commits. Es tu máquina del tiempo: puedes ver qué cambió, quién lo hizo y cuándo.',
                analogy: 'Es como el historial de versiones de Google Docs, pero para todo tu proyecto',
                syntax: {
                    command: 'git log',
                    parts: [
                        { text: 'git log', desc: 'muestra historial completo' },
                        { text: 'git log --oneline', desc: 'historial compacto' },
                        { text: 'git log -5', desc: 'últimos 5 commits' },
                        { text: 'git log --graph', desc: 'historial con gráfico de ramas' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Muestra los últimos 10 commits de forma compacta',
                        command: 'git log --oneline -10',
                        alternatives: ['git log --oneline -10'],
                        output: 'a1b2c3d Corregir typo en tags\nb2c3d4e Agregar nuevo post\nc3d4e5f Actualizar front matter\nd4e5f6g Crear rama fix-tags',
                        hint: 'git log --oneline -N'
                    },
                    {
                        instruction: 'Muestra historial con gráfico de ramas',
                        command: 'git log --graph --oneline',
                        alternatives: ['git log --graph --oneline'],
                        output: '* a1b2c3d Corregir typo\n| * b2c3d4e Nueva feature\n|/ \n* c3d4e5f Commit anterior',
                        hint: 'git log --graph --oneline'
                    }
                ],
                goldenRule: '🎯 git log --oneline -N es tu mejor amigo para navegar historial rápidamente.'
            },
            {
                id: '7.3',
                title: 'git reset vs revert - Deshacer commits',
                mentalModel: 'reset mueve el puntero HEAD (borra commits). revert crea un nuevo commit que deshace cambios. Uno es destructivo, el otro es seguro.',
                analogy: 'reset = borrar páginas del libro. revert = agregar páginas que anulan lo anterior',
                syntax: {
                    command: 'reset / revert',
                    parts: [
                        { text: 'git reset --soft HEAD~1', desc: 'deshace commit pero mantiene cambios' },
                        { text: 'git reset --hard HEAD~1', desc: 'deshace commit y cambios (¡peligroso!)' },
                        { text: 'git revert HEAD', desc: 'crea commit que deshace HEAD' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Deshace el último commit pero mantiene cambios',
                        command: 'git reset --soft HEAD~1',
                        alternatives: ['git reset --soft HEAD~1'],
                        output: 'Moviido HEAD a a1b2c3d\nCambios permanecen en staging',
                        hint: 'git reset --soft HEAD~1'
                    },
                    {
                        instruction: 'Crea commit que deshace el último (seguro)',
                        command: 'git revert HEAD',
                        alternatives: ['git revert HEAD'],
                        output: '[main b2c3d4e] Revert "Corregir typo"\n Date: Mon Jan 15 12:00:00 2025\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                        hint: 'git revert HEAD'
                    }
                ],
                goldenRule: '🎯 Usa revert en ramas compartidas. Usa reset solo en ramas locales.'
            },
            {
                id: '7.4',
                title: 'git cherry-pick - Copiar commits',
                mentalModel: 'cherry-pick toma un commit específico de otra rama y lo aplica aquí. Útil para traer correcciones puntuales.',
                analogy: 'Es como copiar y pegar un párrafo específico de un documento a otro',
                syntax: {
                    command: 'git cherry-pick',
                    parts: [
                        { text: 'git cherry-pick commit-hash', desc: 'aplica commit específico' },
                        { text: 'git cherry-pick HEAD~2..HEAD', desc: 'aplica últimos 2 commits' },
                        { text: 'git cherry-pick --continue', desc: 'continúa después de resolver conflictos' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Copia el commit a1b2c3d a esta rama',
                        command: 'git cherry-pick a1b2c3d',
                        alternatives: ['git cherry-pick a1b2c3d'],
                        output: '[main d4e5f6g] Corregir typo en tags\n Date: Mon Jan 15 14:00:00 2025\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                        hint: 'git cherry-pick HASH'
                    },
                    {
                        instruction: 'Copia últimos 2 commits',
                        command: 'git cherry-pick HEAD~2..HEAD',
                        alternatives: ['git cherry-pick HEAD~2..HEAD'],
                        output: '[main e5f6g7h] Commit 2\n[main f6g7h8i] Commit 1\n 2 files changed',
                        hint: 'git cherry-pick HEAD~N..HEAD'
                    }
                ],
                goldenRule: '🎯 Cherry-pick es útil para traer correcciones específicas sin traer todo el historial.'
            },
            {
                id: '7.5',
                title: 'git rebase - Reordenar commits',
                mentalModel: 'rebase reescribe historial poniendo tus commits sobre otra rama. Hace historial lineal y limpio, pero es destructivo.',
                analogy: 'Es como recortar y pegar varios commits al final de otra línea de tiempo',
                syntax: {
                    command: 'git rebase',
                    parts: [
                        { text: 'git rebase main', desc: 'rebase sobre main' },
                        { text: 'git rebase -i HEAD~3', desc: 'rebase interactivo (editar commits)' },
                        { text: 'git rebase --continue', desc: 'continúa después de conflictos' },
                        { text: 'git rebase --abort', desc: 'cancela rebase' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Rebasea tu rama actual sobre main',
                        command: 'git rebase main',
                        alternatives: ['git rebase main'],
                        output: 'First up, rebasing from a1b2c3d to e4f5g6h\nApplying: Corregir typo\nApplying: Agregar nuevo post\nSuccessfully rebased',
                        hint: 'git rebase main'
                    },
                    {
                        instruction: 'Cancela el rebase si hay problemas',
                        command: 'git rebase --abort',
                        alternatives: ['git rebase --abort'],
                        output: 'Rebase aborted\nVuelto al estado anterior',
                        hint: 'git rebase --abort'
                    }
                ],
                goldenRule: '🎯 Nunca rebases commits públicos (ya compartidos). Solo rebase tu trabajo local.'
            }
        ]
    },

    // UNIDAD 8: AUTOMATIZACIÓN HUGO (4 lecciones) - NUEVO
    unit8: {
        title: "UNIDAD 8: Automatización Hugo",
        description: 'Scripts y comandos para automatizar tareas repetitivas en Hugo Blox.',
        lessons: [
            {
                id: '8.1',
                title: 'Crear posts en masa con script',
                mentalModel: 'En vez de crear posts uno por uno, usa scripts para generar múltiples posts de una vez con estructura consistente.',
                analogy: 'Es como usar una plantilla en Word para crear 10 documentos similares en segundos',
                syntax: {
                    command: 'script creación',
                    parts: [
                        { text: 'for i in 1 2 3; do mkdir -p content/es/post/2025-01-15-post-$i; done', desc: 'crea 3 carpetas de posts' },
                        { text: 'echo "---\ntitle: "Post $i"\ndate: 2025-01-15\n---" > content/es/post/2025-01-15-post-$i/index.md', desc: 'crea front matter' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Crea 3 carpetas de posts con fecha',
                        command: 'for i in 1 2 3; do mkdir -p content/es/post/2025-01-15-post-$i; done',
                        alternatives: ['for i in 1 2 3; do mkdir -p content/es/post/2025-01-15-post-$i; done'],
                        output: '✓ Creadas: content/es/post/2025-01-15-post-1/\ncontent/es/post/2025-01-15-post-2/\ncontent/es/post/2025-01-15-post-3/',
                        hint: 'for i in 1 2 3; do mkdir -p carpeta-$i; done'
                    },
                    {
                        instruction: 'Crea archivos index.md con front matter',
                        command: 'for i in 1 2 3; do echo "---\ntitle: "Post $i"\ndate: 2025-01-15\n---" > content/es/post/2025-01-15-post-$i/index.md; done',
                        alternatives: ['for i in 1 2 3; do echo "---\ntitle: "Post $i"\ndate: 2025-01-15\n---" > content/es/post/2025-01-15-post-$i/index.md; done'],
                        output: '✓ Creados 3 archivos index.md con front matter',
                        hint: 'for i in 1 2 3; do echo "---\ntitle: "Post $i"\ndate: 2025-01-15\n---" > archivo-$i/index.md; done'
                    }
                ],
                goldenRule: '🎯 Usa loops for para crear múltiples archivos con estructura consistente.'
            },
            {
                id: '8.2',
                title: 'Limpiar archivos no usados',
                mentalModel: 'Encuentra y elimina archivos huérfanos: .md sin .Rmd, .Rmd sin .md, o archivos con errores de YAML.',
                analogy: 'Es como buscar archivos duplicados en tu computadora y eliminarlos',
                syntax: {
                    command: 'limpieza',
                    parts: [
                        { text: 'find content/ -name "*.md" ! -name "index.md"', desc: 'encuentra .md que no son index' },
                        { text: 'find content/ -name "*.Rmd" ! -exec test -f {}.md \\;', desc: 'encuentra .Rmd sin .md' },
                        { text: 'grep -L "^---" content/es/post/*/index.md', desc: 'encuentra archivos sin front matter' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Encuentra archivos .md que no son index.md',
                        command: 'find content/ -name "*.md" ! -name "index.md"',
                        alternatives: ['find content/ -name "*.md" ! -name "index.md"'],
                        output: 'content/es/post/2025-01-15-analisis/backup.md\ncontent/es/post/2025-02-20-ensayos/temp.md',
                        hint: 'find carpeta/ -name "*.md" ! -name "index.md"'
                    },
                    {
                        instruction: 'Encuentra archivos sin front matter (sin ---)',
                        command: 'grep -L "^---" content/es/post/*/index.md',
                        alternatives: ['grep -L "^---" content/es/post/*/index.md'],
                        output: 'content/es/post/2025-03-10-causalidad/index.md',
                        hint: 'grep -L "^---" archivo'
                    }
                ],
                goldenRule: '🎯 Limpia archivos huérfanos regularmente. Usa find con ! para negación.'
            },
            {
                id: '8.3',
                title: 'Validar front matter automáticamente',
                mentalModel: 'Antes de publicar, valida que todos los posts tengan los campos obligatorios: title, date, tags.',
                analogy: 'Es como un spellchecker pero para front matter de Hugo',
                syntax: {
                    command: 'validación',
                    parts: [
                        { text: 'grep -L "title:" content/es/post/*/index.md', desc: 'encuentra posts sin title' },
                        { text: 'grep -L "date:" content/es/post/*/index.md', desc: 'encuentra posts sin date' },
                        { text: 'grep -L "tags:" content/es/post/*/index.md', desc: 'encuentra posts sin tags' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Encuentra posts sin campo "title:"',
                        command: 'grep -L "title:" content/es/post/*/index.md',
                        alternatives: ['grep -L "title:" content/es/post/*/index.md'],
                        output: 'content/es/post/2025-03-10-causalidad/index.md',
                        hint: 'grep -L "campo:" carpeta/*'
                    },
                    {
                        instruction: 'Encuentra posts sin campo "tags:"',
                        command: 'grep -L "tags:" content/es/post/*/index.md',
                        alternatives: ['grep -L "tags:" content/es/post/*/index.md'],
                        output: 'content/es/post/2025-03-10-causalidad/index.md\ncontent/es/post/_index.md',
                        hint: 'grep -L "tags:" carpeta/*'
                    }
                ],
                goldenRule: '🎯 Valida title, date, tags antes de cada push. Usa grep -L para lo que FALTA.'
            },
            {
                id: '8.4',
                title: 'Generar reportes de contenido',
                mentalModel: 'Obtén estadísticas de tu contenido: cuántos posts por categoría, tags más usados, posts sin resumen, etc.',
                analogy: 'Es como un dashboard de analytics pero para tu contenido Hugo',
                syntax: {
                    command: 'reportes',
                    parts: [
                        { text: 'grep -r "^tags:" content/ | wc -l', desc: 'cuenta menciones de tags' },
                        { text: 'grep -r "^categories:" content/ | sort | uniq -c', desc: 'categorías más usadas' },
                        { text: 'find content/es/post -name "*.md" | wc -l', desc: 'total de posts' }
                    ]
                },
                exercises: [
                    {
                        instruction: 'Cuenta cuántos posts tienes en total',
                        command: 'find content/es/post -name "*.md" | wc -l',
                        alternatives: ['find content/es/post -name "*.md" | wc -l'],
                        output: '8',
                        hint: 'find carpeta -name "*.md" | wc -l'
                    },
                    {
                        instruction: 'Muestra categorías más usadas',
                        command: 'grep -r "^categories:" content/ | sort | uniq -c | sort -rn',
                        alternatives: ['grep -r "^categories:" content/ | sort | uniq -c | sort -rn'],
                        output: '      3 categories: ["Estadística en Salud"]\n      2 categories: ["Evaluación Regulatoria"]\n      1 categories: ["Metodología de Investigación"]',
                        hint: 'grep "campo:" | sort | uniq -c | sort -rn'
                    }
                ],
                goldenRule: '🎯 Usa sort | uniq -c para contar frecuencias. sort -rn para ordenar descendente.'
            }
        ]
    }
};

const scenarios = [
    {
        id: 'scenario1',
        title: 'Tag con typo (tilde de más)',
        difficulty: 'Intermedio',
        difficultyClass: 'difficulty-intermedio',
        situation: 'Descubriste que escribiste "ensayos-clínicos" (con tilde) en vez de "ensayos-clinicos" (sin tilde) en algunos archivos. Los filtros del sitio no agrupan bien los posts.',
        strategicQuestion: '¿Qué haces PRIMERO antes de tocar ningún archivo?',
        choices: [
            { id: 'a', text: 'Crear una rama de seguridad', correct: true, feedback: '✅ Correcto. SIEMPRE crear rama antes de cambios masivos.' },
            { id: 'b', text: 'Buscar directamente los archivos con grep', correct: false, feedback: '❌ Antes de buscar, crea una rama de seguridad por si rompes algo.' },
            { id: 'c', text: 'Editar todos los archivos de una vez', correct: false, feedback: '❌ Muy arriesgado sin rama de seguridad y sin identificar primero qué archivos tocar.' }
        ],
        steps: [
            {
                title: 'Crear rama de seguridad',
                command: 'git checkout -b fix-tag-ensayos',
                alternatives: ['git checkout -b fix-tags', 'git checkout -b fix-typo'],
                output: 'Switched to a new branch \'fix-tag-ensayos\'',
                explanation: 'Primero creamos un espacio seguro donde podemos romper cosas sin dañar main'
            },
            {
                title: 'Buscar archivos con el typo (con tilde)',
                command: 'grep -rl "ensayos-clínicos" content/',
                alternatives: ['grep -rl ensayos-clínicos content/'],
                output: 'content/es/post/2025-02-20-ensayos/index.Rmd',
                explanation: 'Identificamos exactamente qué archivos tienen el error'
            },
            {
                title: 'Ver el contexto del error',
                command: 'grep -n "ensayos-clínicos" content/es/post/2025-02-20-ensayos/index.Rmd',
                alternatives: ['grep -n ensayos-clínicos content/es/post/2025-02-20-ensayos/index.Rmd'],
                output: '5:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                explanation: 'Vemos exactamente en qué línea está (línea 5) y el contexto completo'
            },
            {
                title: 'Editar el archivo (simulado)',
                command: 'echo "Editando: cambiar ensayos-clínicos por ensayos-clinicos"',
                alternatives: ['echo "editado"'],
                output: 'Editando: cambiar ensayos-clínicos por ensayos-clinicos',
                explanation: 'En la vida real, abrirías el archivo en tu editor y quitarías la tilde'
            },
            {
                title: 'Verificar que ya no existe el typo',
                command: 'grep -r "ensayos-clínicos" content/',
                alternatives: ['grep -r ensayos-clínicos content/'],
                output: '(sin resultados - el typo fue eliminado)',
                explanation: 'Confirmamos que el typo fue corregido en todos lados'
            },
            {
                title: 'Previsualizar con Hugo',
                command: 'hugo server',
                output: 'Watching for changes...\nWeb Server is available at http://localhost:1313/\n✓ Sitio generado exitosamente',
                explanation: 'Verificamos que el sitio se genera sin errores y los filtros funcionan'
            },
            {
                title: 'Guardar todos los cambios',
                command: 'git add -A',
                alternatives: ['git add .', 'git add content/'],
                output: '✓ Cambios agregados al staging area',
                explanation: 'Preparamos los cambios para commit'
            },
            {
                title: 'Hacer commit con mensaje descriptivo',
                command: 'git commit -m "Corregir typo: ensayos-clínicos -> ensayos-clinicos"',
                output: '[fix-tag-ensayos 7a3f2b1] Corregir typo: ensayos-clínicos -> ensayos-clinicos\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                explanation: 'Guardamos la foto del cambio con mensaje que explica qué y por qué'
            },
            {
                title: 'Volver a main',
                command: 'git checkout main',
                output: 'Switched to branch \'main\'',
                explanation: 'Regresamos a la rama principal antes de merge'
            },
            {
                title: 'Incorporar los cambios a main',
                command: 'git merge fix-tag-ensayos',
                output: 'Updating a1b2c3d..7a3f2b1\nFast-forward\n content/es/post/2025-02-20-ensayos/index.Rmd | 1 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                explanation: 'Traemos los cambios validados desde la rama a main'
            },
            {
                title: 'Publicar en GitHub',
                command: 'git push',
                output: 'Enumerating objects: 5, done.\nTo github.com:usuario/mi-sitio-hugo-blox.git\n   a1b2c3d..7a3f2b1  main -> main',
                explanation: 'Subimos los cambios a GitHub y el sitio se actualiza automáticamente'
            }
        ]
    },
    {
        id: 'scenario2',
        title: '¿Funciona mi landing page?',
        difficulty: 'Básico',
        difficultyClass: 'difficulty-basico',
        situation: 'Cambiaste un tag de "experimento en el aula" a "experimento-en-el-aula" en varios posts. Quieres verificar que la landing page del blog lo filtra correctamente.',
        strategicQuestion: '¿Qué necesitas verificar para que el filtro funcione?',
        choices: [
            { id: 'a', text: 'Que el filtro en _index.md coincida con el nuevo tag', correct: true, feedback: '✅ Correcto. La landing y los posts deben usar exactamente el mismo tag.' },
            { id: 'b', text: 'Solo que los posts tengan el nuevo tag', correct: false, feedback: '❌ También debes verificar que el filtro en _index.md usa el mismo tag.' },
            { id: 'c', text: 'Hacer push inmediatamente', correct: false, feedback: '❌ Primero verifica con hugo server que todo funciona.' }
        ],
        steps: [
            {
                title: 'Buscar el filtro en la landing page',
                command: 'grep -n "experimento" content/es/post/_index.md',
                alternatives: ['grep -n experimento content/es/post/_index.md'],
                output: '8:[[tags.experimento-en-el-aula]]',
                explanation: 'Verificamos que la landing tiene el filtro con el nuevo tag'
            },
            {
                title: 'Buscar el tag en los posts',
                command: 'grep -r "experimento-en-el-aula" content/es/post/',
                alternatives: ['grep -r experimento-en-el-aula content/es/post/'],
                output: 'content/es/post/2025-04-01-experimento/index.md:tags: ["experimento-en-el-aula", "educacion"]\ncontent/es/post/2025-04-15-laboratorio/index.md:tags: ["experimento-en-el-aula", "practicas"]',
                explanation: 'Confirmamos que los posts tienen el tag correcto (2 posts)'
            },
            {
                title: 'Previsualizar el sitio completo',
                command: 'hugo server',
                output: 'Web Server is available at http://localhost:1313/\n✓ Sitio generado. Abre http://localhost:1313/es/post/ para verificar filtros',
                explanation: 'Verificamos visualmente que los filtros muestran los posts correctos'
            }
        ]
    },
    {
        id: 'scenario3',
        title: 'Post nuevo seguro',
        difficulty: 'Intermedio',
        difficultyClass: 'difficulty-intermedio',
        situation: 'Vas a crear un post nuevo con código R y gráficos. Quieres hacerlo de forma segura sin arriesgar el sitio actual.',
        strategicQuestion: '¿Cuál es el orden CORRECTO para crear un post nuevo?',
        choices: [
            { id: 'a', text: 'Rama → crear → knitear → verificar → commit → merge → push', correct: true, feedback: '✅ Perfecto. Este es el flujo seguro completo.' },
            { id: 'b', text: 'Crear → push → verificar', correct: false, feedback: '❌ Nunca hagas push sin verificar primero con hugo server.' },
            { id: 'c', text: 'Crear → commit → push', correct: false, feedback: '❌ Falta crear rama, knitear el .Rmd y verificar con hugo server.' }
        ],
        steps: [
            {
                title: 'Crear rama de trabajo',
                command: 'git checkout -b post-analisis-regresion',
                alternatives: ['git checkout -b nuevo-post', 'git checkout -b post-regresion'],
                output: 'Switched to a new branch \'post-analisis-regresion\'',
                explanation: 'Espacio seguro para crear el nuevo post'
            },
            {
                title: 'Crear carpeta del post con fecha',
                command: 'mkdir -p content/es/post/2025-05-01-analisis-regresion',
                output: '✓ Carpeta creada: content/es/post/2025-05-01-analisis-regresion/',
                explanation: 'Hugo Blox requiere una carpeta por post, con fecha en el nombre'
            },
            {
                title: 'Crear archivo .Rmd (simulado)',
                command: 'echo "Crear index.Rmd con front matter: title, date, tags, categories"',
                output: '✓ index.Rmd creado con front matter correcto',
                explanation: 'En RStudio, crearías el .Rmd con el front matter YAML completo'
            },
            {
                title: 'Knitear el .Rmd para generar .md',
                command: 'echo "Knitear index.Rmd → index.md"',
                output: '✓ index.md generado desde index.Rmd',
                explanation: 'En RStudio: Knit HTML o Knit Markdown para generar el .md que Hugo lee'
            },
            {
                title: 'Verificar con hugo server',
                command: 'hugo server',
                output: 'Web Server is available at http://localhost:1313/\n✓ Nuevo post visible en http://localhost:1313/es/post/2025-05-01-analisis-regresion/',
                explanation: 'Previsualiza que el post se ve bien y no rompe el sitio'
            },
            {
                title: 'Guardar todo',
                command: 'git add -A',
                output: '✓ Cambios agregados (nueva carpeta con index.Rmd e index.md)',
                explanation: 'Prepara el nuevo post para commit'
            },
            {
                title: 'Commit descriptivo',
                command: 'git commit -m "Agregar post: Análisis de regresión lineal en R"',
                output: '[post-analisis-regresion a1b2c3d] Agregar post: Análisis de regresión lineal en R\n 2 files added',
                explanation: 'Guarda la foto del nuevo post'
            },
            {
                title: 'Volver a main y merge',
                command: 'git checkout main && git merge post-analisis-regresion',
                alternatives: ['git checkout main', 'git merge post-analisis-regresion'],
                output: 'Switched to branch \'main\'\nUpdating a1b2c3d..b2c3d4e\nFast-forward\n content/es/post/2025-05-01-analisis-regresion/index.Rmd | 50 +\n content/es/post/2025-05-01-analisis-regresion/index.md | 30 +\n 2 files created',
                explanation: 'Incorpora el nuevo post a main'
            },
            {
                title: 'Publicar',
                command: 'git push',
                output: 'To github.com:usuario/mi-sitio-hugo-blox.git\n   main -> main',
                explanation: 'Publica el nuevo post en el sitio'
            }
        ]
    },
    {
        id: 'scenario4',
        title: 'Algo se rompió después de mis cambios',
        difficulty: 'Avanzado',
        difficultyClass: 'difficulty-avanzado',
        situation: 'Editaste 5 archivos de front matter y ahora hugo server da error: "ERROR: failed to render page". No sabes cuál archivo tiene el problema.',
        strategicQuestion: '¿Qué haces PRIMERO para diagnosticar el problema?',
        choices: [
            { id: 'a', text: 'git status para ver qué archivos cambié', correct: true, feedback: '✅ Correcto. Primero identifica QUÉ tocaste antes de intentar arreglar.' },
            { id: 'b', text: 'git checkout . para deshacer todo inmediatamente', correct: false, feedback: '❌ Podrías perder trabajo bueno. Primero identifica el archivo problemático.' },
            { id: 'c', text: 'Editar archivos al azar buscando el error', correct: false, feedback: '❌ Método caótico. Usa git para identificar sistemáticamente.' }
        ],
        steps: [
            {
                title: 'Ver qué archivos cambié',
                command: 'git status',
                output: 'On branch main\nChanges not staged for commit:\n  modified: content/es/post/2025-01-15-analisis/index.md\n  modified: content/es/post/2025-02-20-ensayos/index.md\n  modified: content/es/post/2025-03-10-causalidad/index.md',
                explanation: 'Identifica exactamente qué archivos modificaste (3 archivos)'
            },
            {
                title: 'Ver qué cambió exactamente en cada archivo',
                command: 'git diff',
                output: 'diff --git a/content/es/post/2025-03-10-causalidad/index.md\n--- a/content/es/post/2025-03-10-causalidad/index.md\n+++ b/content/es/post/2025-03-10-causalidad/index.md\n@@ -4,7 +4,7 @@ categories: ["Metodología de Investigación"]\n-tags: ["causalidad", "falacias"]\n+tags: ["causalidad", "falacias",]\n # ← ERROR: coma de más al final',
                explanation: 'Identifica el error: coma de más en la lista de tags (YAML inválido)'
            },
            {
                title: 'Deshacer solo el archivo problemático',
                command: 'git checkout -- content/es/post/2025-03-10-causalidad/index.md',
                output: '✓ Cambios descartados en content/es/post/2025-03-10-causalidad/index.md',
                explanation: 'Solo deshaces el archivo con error YAML, conservas los otros 2 cambios'
            },
            {
                title: 'Verificar que hugo server ya funciona',
                command: 'hugo server',
                output: 'Web Server is available at http://localhost:1313/\n✓ Sitio generado exitosamente',
                explanation: 'Confirma que el sitio ya se genera sin errores'
            }
        ]
    },
    {
        id: 'scenario5',
        title: 'Limpieza de taxonomía: unificar tags',
        difficulty: 'Avanzado',
        difficultyClass: 'difficulty-avanzado',
        situation: 'Sospechas que tienes tags duplicados: "bioestadística" (con tilde) y "bioestadistica" (sin tilde), "COVID-19" y "covid-19". Quieres unificarlos para que los filtros funcionen bien.',
        strategicQuestion: '¿Cómo procedes de forma sistemática?',
        choices: [
            { id: 'a', text: 'Rama → grep para identificar → decidir estándar → editar → verificar → merge', correct: true, feedback: '✅ Correcto. Proceso sistemático: identificar, decidir, aplicar, verificar.' },
            { id: 'b', text: 'Editar todos los archivos de memoria', correct: false, feedback: '❌ Puedes olvidar algunos. Usa grep para encontrar TODOS los casos.' },
            { id: 'c', text: 'Buscar visualmente en cada archivo', correct: false, feedback: '❌ grep es más eficiente y garantiza no olvidar ninguno.' }
        ],
        steps: [
            {
                title: 'Crear rama de seguridad',
                command: 'git checkout -b unificar-tags-bioestadistica',
                alternatives: ['git checkout -b unificar-tags', 'git checkout -b limpiar-tags'],
                output: 'Switched to a new branch \'unificar-tags-bioestadistica\'',
                explanation: 'Espacio seguro para cambios masivos'
            },
            {
                title: 'Buscar variaciones CON tilde',
                command: 'grep -ri "bioestadística" content/',
                alternatives: ['grep -ri bioestadística content/'],
                output: 'content/es/post/2025-01-15-analisis/index.md:tags: ["bioestadística", "eda", "R"]',
                explanation: 'El -i ignora mayúsculas. Encontramos 1 archivo con tilde'
            },
            {
                title: 'Buscar variaciones SIN tilde',
                command: 'grep -ri "bioestadistica" content/',
                alternatives: ['grep -ri bioestadistica content/'],
                output: '(sin resultados)',
                explanation: 'Nadie usa la versión sin tilde. Decidimos: usar SIN tilde (estándar)'
            },
            {
                title: 'Editar el archivo para unificar',
                command: 'echo "Editar: cambiar bioestadística por bioestadistica"',
                output: '✓ Archivo editado: bioestadistica (sin tilde)',
                explanation: 'Unificamos al estándar decidido: sin tilde'
            },
            {
                title: 'Verificar que no quedan duplicados',
                command: 'grep -ri "bioestadística" content/',
                output: '(sin resultados - todos unificados)',
                explanation: 'Confirmamos que la versión con tilde ya no existe'
            },
            {
                title: 'Contar cuántos archivos usan el tag unificado',
                command: 'grep -rl "bioestadistica" content/ | wc -l',
                output: '1',
                explanation: 'Ahora todos los posts usan el mismo tag'
            },
            {
                title: 'Previsualizar el sitio',
                command: 'hugo server',
                output: 'Web Server is available at http://localhost:1313/\n✓ Filtros por tags funcionando correctamente',
                explanation: 'Verifica que los filtros agrupan bien los posts'
            },
            {
                title: 'Commit y merge',
                command: 'git add -A && git commit -m "Unificar tag: bioestadística -> bioestadistica"',
                output: '[unificar-tags-bioestadistica a1b2c3d] Unificar tag: bioestadística -> bioestadistica\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                explanation: 'Guarda los cambios de unificación'
            }
        ]
    },
    {
        id: 'scenario6',
        title: 'Sincronizar .Rmd y .md dessincronizados',
        difficulty: 'Intermedio',
        difficultyClass: 'difficulty-intermedio',
        situation: 'Editaste el .md directamente para corregir un typo urgente, pero el .Rmd sigue con los tags viejos. La próxima vez que knitees, perderás tus cambios.',
        strategicQuestion: '¿Qué debes hacer para mantener ambos archivos sincronizados?',
        choices: [
            { id: 'a', text: 'Comparar ambos archivos y decidir cuál es la versión correcta', correct: true, feedback: '✅ Correcto. Necesitas ver ambos conscientemente y decidir.' },
            { id: 'b', text: 'Editar solo el .md y olvidar el .Rmd', correct: false, feedback: '❌ La próxima vez que knitees desde RStudio, perderás tus cambios del .md.' },
            { id: 'c', text: 'Borrar el .Rmd y trabajar solo con .md', correct: false, feedback: '❌ Pierdes la capacidad de generar gráficos con R. Ambos son necesarios.' }
        ],
        steps: [
            {
                title: 'Ver los tags del archivo .md (compilado)',
                command: 'grep "tags:" content/es/post/2025-02-20-ensayos/index.md',
                output: 'tags: ["ensayos-clinicos", "evaluacion-regulatoria"]',
                explanation: 'Versión .md: sin tilde (correcta)'
            },
            {
                title: 'Ver los tags del archivo .Rmd (fuente)',
                command: 'grep "tags:" content/es/post/2025-02-20-ensayos/index.Rmd',
                output: 'tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                explanation: 'Versión .Rmd: con tilde (incorrecta, dessincronizada)'
            },
            {
                title: 'Ver ambos archivos juntos para comparar',
                command: 'grep -n "tags:" content/es/post/2025-02-20-ensayos/index.*',
                output: 'content/es/post/2025-02-20-ensayos/index.md:5:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-02-20-ensayos/index.Rmd:5:tags: ["ensayos-clínicos", "evaluacion-regulatoria"]',
                explanation: 'Comparación lado a lado: línea 5 en ambos, pero diferente contenido'
            },
            {
                title: 'Editar el .Rmd para sincronizar con el .md',
                command: 'echo "Editar index.Rmd línea 5: quitar tilde de ensayos-clínicos"',
                output: '✓ index.Rmd editado: tags ahora coinciden con index.md',
                explanation: 'Sincronizamos el .Rmd con la versión correcta del .md'
            },
            {
                title: 'Verificar que ambos archivos coinciden',
                command: 'grep "tags:" content/es/post/2025-02-20-ensayos/index.*',
                output: 'content/es/post/2025-02-20-ensayos/index.md:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]\ncontent/es/post/2025-02-20-ensayos/index.Rmd:tags: ["ensayos-clinicos", "evaluacion-regulatoria"]',
                explanation: 'Ahora ambos archivos tienen exactamente los mismos tags'
            },
            {
                title: 'Commit con mensaje claro',
                command: 'git add -A && git commit -m "Sincronizar .Rmd con .md: corregir tags de ensayos"',
                output: '[main a1b2c3d] Sincronizar .Rmd con .md: corregir tags de ensayos\n 1 file changed, 1 insertion(+), 1 deletion(-)',
                explanation: 'Guardamos la sincronización para evitar perder cambios futuros'
            }
        ]
    },
    {
        id: 'scenario7',
        title: 'Renombrar posts por fecha',
        difficulty: 'Intermedio',
        difficultyClass: 'difficulty-intermedio',
        situation: 'Tienes posts antiguos con nombres como "post-analisis" en vez de "2025-01-15-analisis". Hugo Blox requiere fechas en el nombre de carpeta.',
        strategicQuestion: '¿Qué comando usas para renombrar múltiples carpetas a la vez?',
        choices: [
            { id: 'a', text: 'rename con expresiones regulares', correct: true, feedback: '✅ Correcto. rename con regex es perfecto para esto.' },
            { id: 'b', text: 'mv uno por uno manualmente', correct: false, feedback: '❌ Muy lento. Usa rename para automatizar.' },
            { id: 'c', text: 'Renombrar desde el explorador de archivos', correct: false, feedback: '❌ Propenso a errores. La terminal es más precisa.' }
        ],
        steps: [
            {
                title: 'Ver los posts antiguos',
                command: 'ls content/es/post/ | grep -v "^2025"',
                output: 'post-analisis/\npost-ensayos/\npost-causalidad/',
                explanation: 'Vemos 3 posts con nombres antiguos (sin fecha)'
            },
            {
                title: 'Probar rename con modo seguro (-n)',
                command: 'rename -n "s/^post-([a-z]+)/2025-01-15-$1/" post-*',
                alternatives: ['rename -n "s/^post-([a-z]+)/2025-01-15-$1/" post-*'],
                output: 'rename(post-analisis, 2025-01-15-analisis) -> rename(2025-01-15-analisis, 2025-01-15-analisis)\nrename(post-ensayos, 2025-01-15-ensayos) -> rename(2025-01-15-ensayos, 2025-01-15-ensayos)',
                explanation: 'Modo prueba muestra qué cambiará sin ejecutar'
            },
            {
                title: 'Ejecutar el renombrado',
                command: 'rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*',
                alternatives: ['rename "s/^post-([a-z]+)/2025-01-15-$1/" post-*'],
                output: '✓ Renombradas: post-analisis -> 2025-01-15-analisis\npost-ensayos -> 2025-01-15-ensayos\npost-causalidad -> 2025-01-15-causalidad',
                explanation: 'Todos los posts ahora tienen formato de fecha correcto'
            },
            {
                title: 'Verificar que todo funciona',
                command: 'ls content/es/post/',
                output: '2025-01-15-analisis/\n2025-01-15-ensayos/\n2025-01-15-causalidad/\n_index.md',
                explanation: 'Todos los posts ahora tienen formato YYYY-MM-DD-nombre'
            }
        ]
    },
    {
        id: 'scenario8',
        title: 'Corregir typos masivos con sed',
        difficulty: 'Avanzado',
        difficultyClass: 'difficulty-avanzado',
        situation: 'Descubriste que escribiste "bioestadística" (con tilde) en 10 archivos, pero el estándar es "bioestadistica" (sin tilde). Necesitas corregir todo.',
        strategicQuestion: '¿Qué comando usas para reemplazar texto en múltiples archivos?',
        choices: [
            { id: 'a', text: 'sed -i con wildcard', correct: true, feedback: '✅ Correcto. sed -i "s/antiguo/nuevo/g" *.md es perfecto.' },
            { id: 'b', text: 'Editar cada archivo manualmente', correct: false, feedback: '❌ Muy lento y propenso a errores.' },
            { id: 'c', text: 'grep para encontrar y luego editar', correct: false, feedback: '❌ grep solo encuentra, no reemplaza.' }
        ],
        steps: [
            {
                title: 'Encontrar todos los archivos con el typo',
                command: 'grep -rl "bioestadística" content/',
                alternatives: ['grep -rl bioestadística content/'],
                output: 'content/es/post/2025-01-15-analisis/index.md\ncontent/es/project/calculadora-muestra/index.md',
                explanation: 'Encontramos 2 archivos con "bioestadística" (con tilde)'
            },
            {
                title: 'Probar sed sin modificar (-i no)',
                command: 'sed "s/bioestadística/bioestadistica/g" content/es/post/2025-01-15-analisis/index.md',
                alternatives: ['sed "s/bioestadística/bioestadistica/g" content/es/post/2025-01-15-analisis/index.md'],
                output: 'tags: ["bioestadistica", "eda", "R"]',
                explanation: 'Modo prueba muestra el resultado sin modificar'
            },
            {
                title: 'Ejecutar reemplazo masivo',
                command: 'sed -i "s/bioestadística/bioestadistica/g" content/es/post/*.md content/es/project/*.md',
                alternatives: ['sed -i "s/bioestadística/bioestadistica/g" content/es/post/*.md content/es/project/*.md'],
                output: '✓ Reemplazados todos los casos en 5 archivos',
                explanation: 'Todos los archivos ahora usan "bioestadistica" (sin tilde)'
            },
            {
                title: 'Verificar que no quedan typos',
                command: 'grep -r "bioestadística" content/',
                alternatives: ['grep -r bioestadística content/'],
                output: '(sin resultados - todos corregidos)',
                explanation: 'Confirmamos que ya no hay "bioestadística" con tilde'
            }
        ]
    }
];

const reference = {
    '🔍 Quiero buscar algo': [
        {
            intent: 'Buscar archivos por nombre',
            command: 'find content/ -name "*.md"',
            explanation: 'Encuentra todos los archivos .md en content/ y sus subcarpetas',
            variations: [
                'find content/ -name "index.md" → solo archivos llamados index.md',
                'find content/ -name "*.Rmd" → archivos R Markdown',
                'find content/ -type d → solo carpetas',
                'find . -name "hugo.toml" → buscar en todo el proyecto'
            ]
        },
        {
            intent: 'Buscar texto dentro de archivos',
            command: 'grep -rn "texto" content/ --include="*.md"',
            explanation: 'Busca "texto" en todos los .md de content/ con números de línea',
            variations: [
                'grep -rl "texto" content/ → solo nombres de archivos (no contenido)',
                'grep -ri "texto" content/ → ignorar mayúsculas/minúsculas',
                'grep -rL "texto" content/ → archivos que NO contienen el texto',
                'grep -rn "tags:" content/es/post/ → buscar en posts específicos'
            ]
        },
        {
            intent: 'Contar resultados',
            command: 'grep -rl "tag" content/ | wc -l',
            explanation: 'Cuenta cuántos archivos contienen "tag"',
            variations: [
                'find content/ -name "*.md" | wc -l → contar archivos .md',
                'ls content/es/post/ | wc -l → contar carpetas de posts',
                'grep -r "bioestadistica" content/ | wc -l → contar menciones'
            ]
        },
        {
            intent: 'Buscar solo en .Rmd o solo en .md',
            command: 'grep -r "texto" content/ --include="*.Rmd"',
            explanation: 'Busca solo en archivos R Markdown, excluyendo los .md compilados',
            variations: [
                '--include="*.md" → solo archivos Markdown compilados',
                '--include="*.toml" → solo archivos de configuración',
                'Usa --include para separar fuentes (.Rmd) de compilados (.md)'
            ]
        }
    ],
    '🛡️ Quiero proteger mi trabajo': [
        {
            intent: 'Guardar el estado actual',
            command: 'git add -A && git commit -m "Descripción clara"',
            explanation: 'Toma una foto del estado actual con etiqueta descriptiva',
            variations: [
                'git add archivo.md → guardar solo un archivo específico',
                'git add content/ → guardar solo la carpeta content/',
                'git commit -m "Corregir typo en tags" → mensaje corto y claro',
                'git commit -m "Agregar post sobre análisis" → mensaje específico'
            ]
        },
        {
            intent: 'Crear espacio seguro para experimentar',
            command: 'git checkout -b nombre-descriptivo',
            explanation: 'Crea una rama (universo paralelo) donde puedes romper cosas sin miedo',
            variations: [
                'git checkout -b fix-tags → rama para arreglar tags',
                'git checkout -b nuevo-post-analisis → rama para post nuevo',
                'git checkout -b unificar-taxonomia → rama para limpieza masiva',
                'Usa guiones en lugar de espacios: fix-tags no fix tags'
            ]
        },
        {
            intent: 'Guardar cambios temporales',
            command: 'git stash',
            explanation: 'Guarda cambios sin hacer commit, útil para cambiar de rama',
            variations: [
                'git stash save "mensaje" → guardar con descripción',
                'git stash list → ver todos los stashes',
                'git stash pop → recuperar y aplicar último stash'
            ]
        },
        {
            intent: 'Volver a terreno seguro',
            command: 'git checkout main',
            explanation: 'Regresa a la rama principal (abandona el experimento)',
            variations: [
                'git branch → ver en qué rama estás (la * marca la actual)',
                'git checkout nombre-rama → cambiar a otra rama existente',
                'git checkout - → volver al directorio anterior'
            ]
        }
    ],
    '🚨 Algo salió mal': [
        {
            intent: 'Ver qué cambié',
            command: 'git diff',
            explanation: 'Muestra exactamente qué líneas modificaste (+ verde = nuevo, - rojo = borrado)',
            variations: [
                'git status → lista de archivos modificados (sin detalles)',
                'git diff archivo.md → cambios en un archivo específico',
                'git diff --cached → cambios ya agregados con git add',
                'Siempre diff antes de commit para revisar cambios'
            ]
        },
        {
            intent: 'Deshacer cambios en UN archivo',
            command: 'git checkout -- archivo.md',
            explanation: 'Revierte archivo.md a la última versión guardada (¡pierdes los cambios no commiteados!)',
            variations: [
                'git checkout . → deshacer TODO en el directorio actual (¡cuidado!)',
                'git checkout -- content/ → deshacer toda la carpeta content/',
                'git checkout HEAD~1 -- archivo.md → volver al commit anterior'
            ]
        },
        {
            intent: 'Deshacer commits (no solo cambios)',
            command: 'git revert HEAD',
            explanation: 'Crea un nuevo commit que deshace el último commit (seguro, no destructivo)',
            variations: [
                'git reset --soft HEAD~1 → deshace commit pero mantiene cambios',
                'git reset --hard HEAD~1 → deshace commit y cambios (¡peligroso!)',
                'git revert HEAD → crea commit que deshace (seguro)'
            ]
        },
        {
            intent: 'Hugo da error y no sé por qué',
            command: 'hugo server',
            explanation: 'Lee el mensaje de error. Usualmente dice qué archivo y línea tiene problema de YAML',
            variations: [
                'grep -n ":" archivo.md → buscar líneas con : (posible error de YAML)',
                'head -20 archivo.md → ver el front matter completo',
                'El error de Hugo suele decir: "ERROR: failed to render page /post/nombre/"'
            ]
        },
        {
            intent: 'Identificar archivos problemáticos',
            command: 'git status && git diff',
            explanation: 'Primero ver qué archivos cambiaste, luego ver qué cambiaste en cada uno',
            variations: [
                'git status → lista rápida de archivos modificados',
                'git diff → detalles línea por línea',
                'Combina ambos para diagnóstico completo'
            ]
        }
    ],
    '🚀 Quiero publicar': [
        {
            intent: 'Previsualizar ANTES de publicar',
            command: 'hugo server',
            explanation: 'Genera el sitio en http://localhost:1313 para verificar que todo se ve bien',
            variations: [
                'Ctrl+C → detener el servidor',
                'hugo server -D → incluir borradores (drafts)',
                'hugo server -e production → usar configuración de producción',
                'SIEMPRE previsualiza antes de push'
            ]
        },
        {
            intent: 'Guardar cambios',
            command: 'git add -A && git commit -m "Mensaje descriptivo"',
            explanation: 'Prepara y guarda todos los cambios con un mensaje claro',
            variations: [
                'git commit -m "Corregir typo en tags" → mensaje corto',
                'git commit -m "Agregar post sobre análisis de regresión" → específico',
                'El mensaje debe explicar QUÉ cambiaste y POR QUÉ'
            ]
        },
        {
            intent: 'Ir a la rama principal',
            command: 'git checkout main',
            explanation: 'Cambia a main antes de hacer merge (si estás en otra rama)',
            variations: [
                'git branch → confirmar que estás en main (debe tener *)',
                'Si ya estás en main, git branch mostrará * main'
            ]
        },
        {
            intent: 'Incorporar cambios de rama experimental',
            command: 'git merge nombre-rama',
            explanation: 'Trae los cambios validados desde la rama a main',
            variations: [
                'git merge fix-tags → ejemplo de merge',
                'git branch -d nombre-rama → borrar rama después de merge exitoso',
                'Primero git checkout main, LUEGO git merge'
            ]
        },
        {
            intent: 'Subir a GitHub y desplegar',
            command: 'git push',
            explanation: 'Sube los commits a GitHub. Si tienes auto-deploy (Netlify, Vercel), el sitio se actualiza automáticamente',
            variations: [
                'git push origin main → forma explícita',
                'git push -u origin nombre-rama → subir una rama nueva por primera vez',
                'Después de push, espera 1-2 minutos para que el deploy termine'
            ]
        }
    ],
    '✅ Quiero verificar': [
        {
            intent: '¿Qué cambié desde el último commit?',
            command: 'git status',
            explanation: 'Lista archivos modificados, agregados, eliminados desde el último commit',
            variations: [
                'git diff → ver cambios línea por línea',
                'git log --oneline -5 → ver últimos 5 commits',
                'git status -s → formato corto'
            ]
        },
        {
            intent: '¿Quedan errores en el front matter?',
            command: 'hugo server',
            explanation: 'Hugo te dirá exactamente qué archivo tiene error de YAML y en qué línea',
            variations: [
                'grep -rL "summary:" content/es/post/*/index.md → posts sin summary',
                'grep -rL "tags:" content/es/post/*/index.md → posts sin tags',
                'head -15 archivo.md → ver el front matter completo'
            ]
        },
        {
            intent: '¿Se ve bien el sitio?',
            command: 'hugo server',
            explanation: 'Abre http://localhost:1313 en tu navegador y verifica visualmente',
            variations: [
                'Navega a cada sección modificada',
                'Verifica que los filtros por tags muestran los posts correctos',
                'Revisa que no hay enlaces rotos (404)',
                'Prueba en móvil (responsive)'
            ]
        },
        {
            intent: '¿Cuántos archivos tienen cierto tag?',
            command: 'grep -rl "tag-específico" content/ | wc -l',
            explanation: 'Cuenta archivos que contienen ese tag',
            variations: [
                'grep -r "tag-específico" content/ --include="*.md" → ver contexto',
                'grep -rn "tag-específico" content/ → con números de línea',
                'grep -rl "bioestadistica" content/ | wc -l → ejemplo real'
            ]
        },
        {
            intent: '¿Están sincronizados .Rmd y .md?',
            command: 'grep "tags:" archivo/index.*',
            explanation: 'Compara los tags del .Rmd y el .md para ver si coinciden',
            variations: [
                'grep -n "tags:" archivo/index.* → con números de línea',
                'Si son diferentes, edita el .Rmd y re-knitea',
                'O edita AMBOS manualmente para sincronizar'
            ]
        }
    ],
    '🔄 Quiero renombrar en masa': [
        {
            intent: 'Renombrar archivos con patrón',
            command: 'rename "s/antiguo/nuevo/" *.md',
            explanation: 'Cambia nombres de archivos usando expresiones regulares',
            variations: [
                'rename -n "s/ /-/g" *.md → prueba sin ejecutar',
                'rename "s/^post-([a-z]+)/2025-01-15-$1/" post-* → agrega fecha',
                'rename "s/\\.txt$/.md/" *.txt → cambia extensión'
            ]
        },
        {
            intent: 'Agregar prefijo/sufijo a múltiples archivos',
            command: 'rename "s/^/WIP_/" *.md',
            explanation: 'Agrega prefijo (al inicio ^) o sufijo (al final $) a todos los archivos',
            variations: [
                'rename "s/^/WIP_/" *.md → agrega prefijo WIP_',
                'rename "s/$/_backup/" *.md → agrega sufijo _backup',
                'rename "s/^/2025-01-15-/" * → agrega fecha como prefijo'
            ]
        },
        {
            intent: 'Mover múltiples archivos a carpeta',
            command: 'mv *.md backup/',
            explanation: 'Mueve todos los archivos que coinciden al patrón a una carpeta',
            variations: [
                'mv *.md backup/ → mueve todos los .md',
                'mv old* new* → cambia prefijo de múltiples archivos',
                'mv file[0-9].md carpeta/ → mueve file0.md, file1.md, etc.'
            ]
        }
    ],
    '⚡ Quiero automatizar': [
        {
            intent: 'Crear múltiples posts de una vez',
            command: 'for i in 1 2 3; do mkdir -p content/es/post/2025-01-15-post-$i; done',
            explanation: 'Crea 3 carpetas de posts con un solo loop for',
            variations: [
                'for i in 1 2 3; do echo "---\ntitle: "Post $i"\ndate: 2025-01-15\n---" > content/es/post/2025-01-15-post-$i/index.md; done → crea posts completos',
                'Usa loops for para automatización masiva',
                'Crea plantillas reutilizables'
            ]
        },
        {
            intent: 'Limpiar archivos huérfanos',
            command: 'find content/ -name "*.md" ! -name "index.md"',
            explanation: 'Encuentra archivos .md que no son index.md (probablemente temporales)',
            variations: [
                'find content/ -name "*.Rmd" ! -exec test -f {}.md \\; → .Rmd sin .md',
                'grep -L "^---" content/es/post/*/index.md → sin front matter',
                'Encuentra y elimina archivos basura'
            ]
        },
        {
            intent: 'Generar reportes de contenido',
            command: 'find content/es/post -name "*.md" | wc -l',
            explanation: 'Cuenta cuántos posts tienes en total',
            variations: [
                'grep -r "^categories:" content/ | sort | uniq -c | sort -rn → categorías más usadas',
                'grep -r "^tags:" content/ | sort | uniq -c | sort -rn → tags más usados',
                'grep -L "summary:" content/es/post/*/index.md → posts sin resumen'
            ]
        },
        {
            intent: 'Reemplazar texto en múltiples archivos',
            command: 'sed -i "s/antiguo/nuevo/g" *.md',
            explanation: 'Reemplaza texto en todos los archivos .md de la carpeta actual',
            variations: [
                'sed -i.bak "s/antiguo/nuevo/g" *.md → crea backup antes',
                'sed -i "s|oldsite.com|newsite.com|g" *.md → cambia URLs',
                'Siempre prueba sin -i primero'
            ]
        }
    ]
};