// ============================================================
// HUGO TERMINAL TRAINER PRO - ESCENARIOS INTERACTIVOS
// ============================================================

const ScenarioManager = {
    currentScenario: null,
    currentStep: 0,
    
    init() {
        this.renderScenarioList();
    },
    
    renderScenarioList() {
        const container = document.getElementById('scenarios-list');
        container.innerHTML = scenarios.map(scenario => `
            <div class="scenario-card" onclick="ScenarioManager.startScenario('${scenario.id}')">
                <h3>${scenario.title}</h3>
                <p>${scenario.situation.substring(0, 100)}...</p>
                <span class="difficulty-badge ${scenario.difficultyClass}">
                    ${scenario.difficulty}
                </span>
            </div>
        `).join('');
    },
    
    startScenario(scenarioId) {
        this.currentScenario = scenarios.find(s => s.id === scenarioId);
        this.currentStep = 0;
        
        if (!this.currentScenario) return;
        
        // Hide list, show scenario
        document.getElementById('scenarios-list').classList.add('hidden');
        const content = document.getElementById('scenario-content');
        content.classList.remove('hidden');
        
        this.renderStrategicQuestion();
    },
    
    renderStrategicQuestion() {
        const container = document.getElementById('scenario-content');
        const scenario = this.currentScenario;
        
        container.innerHTML = `
            <div class="explanation-section">
                <h2>🎯 ${scenario.title}</h2>
                <p><strong>Situación:</strong> ${scenario.situation}</p>
                
                <h3>Pregunta Estratégica</h3>
                <p>${scenario.strategicQuestion}</p>
                
                <div id="choices-container">
                    ${scenario.choices.map(choice => `
                        <div class="choice-option" onclick="ScenarioManager.handleChoice('${choice.id}', this)">
                            ${choice.text}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    handleChoice(choiceId, element) {
        const choice = this.currentScenario.choices.find(c => c.id === choiceId);
        const container = document.getElementById('choices-container');
        
        // Disable all choices
        container.querySelectorAll('.choice-option').forEach(el => {
            el.style.pointerEvents = 'none';
        });
        
        // Show feedback
        if (choice.correct) {
            element.classList.add('correct');
            setTimeout(() => {
                this.renderStep();
            }, 1000);
        } else {
            element.classList.add('incorrect');
            const feedback = document.createElement('div');
            feedback.className = 'feedback-incorrect';
            feedback.innerHTML = `<p><strong>❌ ${choice.feedback}</strong></p>`;
            container.after(feedback);
        }
    },
    
    renderStep() {
        const scenario = this.currentScenario;
        const step = scenario.steps[this.currentStep];
        
        if (!step) {
            this.completeScenario();
            return;
        }
        
        const container = document.getElementById('scenario-content');
        
        container.innerHTML = `
            <div class="explanation-section">
                <h2>📍 Paso ${this.currentStep + 1}: ${step.title}</h2>
                
                <div class="terminal" id="scenario-terminal">
                    <div class="terminal-output"></div>
                    <div class="terminal-input-container">
                        <span class="prompt">usuario@hugo-trainer $ </span>
                        <input type="text" class="terminal-input" 
                               placeholder="Escribe el comando..."
                               onkeydown="ScenarioManager.handleScenarioInput(event, '${step.command}')">
                    </div>
                </div>
                
                <div class="feedback" id="scenario-feedback"></div>
                
                <div class="exercise-actions">
                    <button class="btn-primary" onclick="ScenarioManager.nextStep()">
                        Siguiente paso →
                    </button>
                    <button class="btn-secondary" onclick="ScenarioManager.showSolution()">
                        💡 Ver solución
                    </button>
                </div>
            </div>
        `;
        
        // Auto-focus input
        const input = container.querySelector('.terminal-input');
        if (input) input.focus();
    },
    
    handleScenarioInput(event, expectedCommand) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const input = event.target;
            const command = input.value.trim();
            
            if (this.validateCommand(command, expectedCommand)) {
                input.parentElement.previousElementSibling.textContent = `$ ${command}`;
                input.value = '';
                
                // Show output
                const output = input.parentElement.previousElementSibling;
                const feedback = document.getElementById('scenario-feedback');
                feedback.innerHTML = `<div class="feedback-correct">✅ ¡Correcto! ${this.currentScenario.steps[this.currentStep].explanation}</div>`;
            }
        }
    },
    
    validateCommand(command, expected) {
        // Normalize both commands
        const normalizedCommand = command.toLowerCase().replace(/\s+/g, ' ').trim();
        const normalizedExpected = expected.toLowerCase().replace(/\s+/g, ' ').trim();
        
        // Check if they match
        return normalizedCommand === normalizedExpected;
    },
    
    nextStep() {
        this.currentStep++;
        this.renderStep();
    },
    
    showSolution() {
        const step = this.currentScenario.steps[this.currentStep];
        const feedback = document.getElementById('scenario-feedback');
        
        feedback.innerHTML = `
            <div class="feedback-hint">
                <p><strong>Comando:</strong> ${step.command}</p>
                <p><strong>Explicación:</strong> ${step.explanation}</p>
            </div>
        `;
    },
    
    completeScenario() {
        const container = document.getElementById('scenario-content');
        const completed = ProgressManager.completeScenario(this.currentScenario.id);
        
        container.innerHTML = `
            <div class="completion-screen">
                <div class="emoji">🎉</div>
                <h2>¡Escenario Completado!</h2>
                <p>${this.currentScenario.title}</p>
                <p>Has completado este escenario práctico.</p>
                <button class="btn-primary" onclick="ScenarioManager.reset()">
                    Volver a escenarios
                </button>
            </div>
        `;
        
        if (completed) {
            // Show celebration
            setTimeout(() => {
                alert('¡Felicidades! Has completado este escenario.');
            }, 500);
        }
    },
    
    reset() {
        this.currentScenario = null;
        this.currentStep = 0;
        
        document.getElementById('scenario-content').classList.add('hidden');
        document.getElementById('scenarios-list').classList.remove('hidden');
    }
};