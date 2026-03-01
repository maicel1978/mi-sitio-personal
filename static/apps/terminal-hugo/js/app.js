// ============================================================
// HUGO TERMINAL TRAINER PRO - APLICACIÓN PRINCIPAL
// ============================================================

// Global state
let currentLesson = null;
let currentAttempt = 0;
const MAX_ATTEMPTS = 3;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    ProgressManager.init();
    ScenarioManager.init();
    renderLessons();
    renderReference();
    updateStats();
});

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Hide all content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected content
    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// Mobile menu toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Render lessons
function renderLessons() {
    const container = document.getElementById('units-list');
    let html = '';
    
    for (const [unitKey, unit] of Object.entries(lessons)) {
        const progress = ProgressManager.getUnitProgress(unitKey);
        const collapsed = localStorage.getItem(`hugoTrainerCollapsed_${unitKey}`) === 'true';
        
        html += `
            <div class="unit-header ${collapsed ? 'collapsed' : ''}" onclick="toggleUnit('${unitKey}')">
                <div class="unit-title">
                    <span>${unit.title}</span>
                    <span class="unit-toggle">${collapsed ? '▶' : '▼'}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="unit-progress">${progress.completed}/${progress.total} lecciones (${progress.percentage}%)</div>
                <div class="unit-content ${collapsed ? '' : 'open'}">
                    ${unit.lessons.map(lesson => `
                        <div class="lesson-item ${currentLesson && currentLesson.id === lesson.id ? 'active' : ''}" 
                             onclick="loadLesson('${unitKey}', '${lesson.id}')">
                            <span>
                                <span class="lesson-id">${lesson.id}</span>
                                ${lesson.title}
                            </span>
                            ${ProgressManager.progress.completedLessons.includes(lesson.id) 
                                ? '<span class="check-icon">✓</span>' 
                                : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Toggle unit collapse
function toggleUnit(unitKey) {
    const header = document.querySelector(`[onclick="toggleUnit('${unitKey}')"]`);
    const content = header.nextElementSibling.nextElementSibling;
    
    const isCollapsed = localStorage.getItem(`hugoTrainerCollapsed_${unitKey}`) === 'true';
    localStorage.setItem(`hugoTrainerCollapsed_${unitKey}`, !isCollapsed);
    
    header.classList.toggle('collapsed');
    content.classList.toggle('open');
    header.querySelector('.unit-toggle').textContent = isCollapsed ? '▼' : '▶';
}

// Load lesson
function loadLesson(unitKey, lessonId) {
    const unit = lessons[unitKey];
    const lesson = unit.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    currentLesson = lesson;
    currentAttempt = 0;
    
    // Expand unit if collapsed
    const header = document.querySelector(`[onclick="toggleUnit('${unitKey}')"]`);
    if (header.classList.contains('collapsed')) {
        toggleUnit(unitKey);
    }
    
    // Render lesson content
    const container = document.getElementById('lesson-content');
    container.innerHTML = `
        <div class="explanation-section">
            <h2>${lesson.title}</h2>
            
            <h3>🧠 Modelo Mental</h3>
            <p>${lesson.mentalModel}</p>
            
            <div class="analogy">
                <strong>💡 Analogía:</strong> ${lesson.analogy}
            </div>
            
            <h3>📝 Sintaxis</h3>
            <div class="syntax-box">
                <span class="syntax-command">${lesson.syntax.command}</span>
                ${lesson.syntax.parts.map(part => `
                    <div class="syntax-part">
                        <span class="command-part">${part.text}</span>
                        <span>${part.desc}</span>
                    </div>
                `).join('')}
            </div>
            
            <h3>🎯 Ejercicio Interactivo</h3>
            <div class="exercise-container">
                <div class="exercise-info">
                    <div class="exercise-counter">Intento ${currentAttempt + 1} de ${MAX_ATTEMPTS}</div>
                    <div class="exercise-instruction">${lesson.exercises[0].instruction}</div>
                </div>
                
                <div class="terminal" id="lesson-terminal">
                    <div class="terminal-output"></div>
                    <div class="terminal-input-container">
                        <span class="prompt">usuario@hugo-trainer $ </span>
                        <input type="text" class="terminal-input" 
                               placeholder="Escribe el comando..."
                               onkeydown="handleLessonInput(event)">
                    </div>
                </div>
                
                <div class="special-chars"></div>
                
                <div class="feedback" id="lesson-feedback"></div>
                
                <div class="exercise-actions">
                    <button class="btn-primary" onclick="validateLessonCommand()">
                        ✅ Verificar
                    </button>
                    <button class="btn-secondary" onclick="showHint()">
                        💡 Pista
                    </button>
                </div>
            </div>
            
            <div class="golden-rule">
                ${lesson.goldenRule}
            </div>
        </div>
    `;
    
    // Setup special characters
    setupSpecialChars();
    
    // Focus input
    setTimeout(() => {
        const input = container.querySelector('.terminal-input');
        if (input) input.focus();
    }, 100);
    
    // Re-render lessons to show active state
    renderLessons();
}

// Setup special characters for lesson
function setupSpecialChars() {
    const container = document.querySelector('.special-chars');
    if (!container) return;
    
    container.innerHTML = '';
    const specialChars = ['/', '|', '"', '*', '.', '_', '~', '(', ')'];
    
    specialChars.forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'special-char-btn';
        btn.textContent = char;
        btn.onclick = () => insertSpecialChar(char);
        container.appendChild(btn);
    });
}

// Insert special character
function insertSpecialChar(char) {
    const input = document.querySelector('.terminal-input');
    if (!input) return;
    
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    
    input.value = text.substring(0, start) + char + text.substring(end);
    input.selectionStart = input.selectionEnd = start + 1;
    input.focus();
}

// Handle lesson input
function handleLessonInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateLessonCommand();
    }
}

// Validate lesson command
function validateLessonCommand() {
    const input = document.querySelector('.terminal-input');
    const feedback = document.getElementById('lesson-feedback');
    
    if (!input || !currentLesson) return;
    
    const command = input.value.trim();
    const expected = currentLesson.exercises[0].command;
    const alternatives = currentLesson.exercises[0].alternatives || [];
    
    // Normalize commands
    const normalizedCommand = command.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedExpected = expected.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const alternativesNormalized = alternatives.map(a => 
        a.toLowerCase().replace(/\s+/g, ' ').trim()
    );
    
    // Check if command matches
    const isCorrect = normalizedCommand === normalizedExpected || 
                     alternativesNormalized.includes(normalizedCommand);
    
    if (isCorrect) {
        // Show correct feedback
        feedback.innerHTML = `
            <div class="feedback-correct">
                <p><strong>✅ ¡Correcto!</strong></p>
                <p>${currentLesson.exercises[0].output}</p>
            </div>
        `;
        
        // Mark lesson complete
        ProgressManager.completeLesson(currentLesson.id);
        
        // Update lesson list
        setTimeout(() => {
            renderLessons();
        }, 1000);
        
        // Auto-advance to next lesson after delay
        setTimeout(() => {
            advanceToNextLesson();
        }, 2000);
        
    } else {
        currentAttempt++;
        
        if (currentAttempt < MAX_ATTEMPTS) {
            feedback.innerHTML = `
                <div class="feedback-incorrect">
                    <p><strong>❌ Intento incorrecto.</strong></p>
                    <p>Inténtalo de nuevo.</p>
                </div>
            `;
        } else {
            // Show solution after max attempts
            feedback.innerHTML = `
                <div class="feedback-hint">
                    <p><strong>💡 Solución:</strong></p>
                    <p><strong>Comando:</strong> ${expected}</p>
                    <p><strong>Pista:</strong> ${currentLesson.exercises[0].hint}</p>
                    <p><strong>Salida:</strong> ${currentLesson.exercises[0].output}</p>
                </div>
            `;
            
            // Still mark as complete
            ProgressManager.completeLesson(currentLesson.id);
            renderLessons();
        }
    }
    
    input.value = '';
    input.focus();
}

// Show hint
function showHint() {
    const feedback = document.getElementById('lesson-feedback');
    feedback.innerHTML = `
        <div class="feedback-hint">
            <p><strong>💡 Pista:</strong> ${currentLesson.exercises[0].hint}</p>
        </div>
    `;
}

// Advance to next lesson
function advanceToNextLesson() {
    // Find current unit and lesson index
    for (const [unitKey, unit] of Object.entries(lessons)) {
        const lessonIndex = unit.lessons.findIndex(l => l.id === currentLesson.id);
        
        if (lessonIndex !== -1 && lessonIndex < unit.lessons.length - 1) {
            // Load next lesson
            setTimeout(() => {
                loadLesson(unitKey, unit.lessons[lessonIndex + 1].id);
            }, 500);
            return;
        }
    }
    
    // No next lesson, show completion
    const container = document.getElementById('lesson-content');
    container.innerHTML = `
        <div class="completion-screen">
            <div class="emoji">🎉</div>
            <h2>¡Lección Completada!</h2>
            <p>Has completado esta lección.</p>
            <button class="btn-primary" onclick="location.reload()">
                Volver al inicio
            </button>
        </div>
    `;
}

// Render reference
function renderReference() {
    const container = document.getElementById('reference-content');
    
    container.innerHTML = Object.entries(reference).map(([category, items]) => `
        <div class="explanation-section">
            <h2>${category}</h2>
            ${items.map(item => `
                <div class="reference-card" onclick="this.querySelector('.reference-detail').classList.toggle('open')">
                    <div class="reference-title">
                        <strong>${item.intent}</strong>
                        <span class="toggle">▼</span>
                    </div>
                    <div class="reference-detail">
                        <p><strong>Comando:</strong> <code>${item.command}</code></p>
                        <p>${item.explanation}</p>
                        <ul class="reference-list">
                            ${item.variations.map(v => `<li>${v}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Update stats
function updateStats() {
    ProgressManager.updateStats();
}

// Modal functions
function showResetModal() {
    document.getElementById('reset-modal').classList.remove('hidden');
}

function hideResetModal() {
    document.getElementById('reset-modal').classList.add('hidden');
}

function confirmReset() {
    ProgressManager.resetProgress();
    hideResetModal();
}

// PWA Install
function installApp() {
    if (window.installPrompt) {
        window.installPrompt.prompt();
        window.installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                document.getElementById('install-btn').classList.add('hidden');
            }
            window.installPrompt = null;
        });
    }
}

// Handle resize
window.addEventListener('resize', () => {
    // Update sidebar if needed
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
});