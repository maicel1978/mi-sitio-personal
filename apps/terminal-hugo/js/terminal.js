// ============================================================
// HUGO TERMINAL TRAINER PRO - TERMINAL SIMULADA
// ============================================================

class TerminalSimulator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.output = null;
        this.input = null;
        this.history = [];
        this.historyIndex = -1;
        this.commandCount = 0;
        
        this.init();
    }
    
    init() {
        this.output = this.container.querySelector('.terminal-output');
        this.input = this.container.querySelector('.terminal-input');
        
        // Event listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.addEventListener('input', () => this.handleInput());
        
        // Special characters
        this.setupSpecialChars();
        
        // Focus input
        this.input.focus();
    }
    
    setupSpecialChars() {
        const specialChars = ['/', '|', '"', '*', '.', '_', '~', '(', ')'];
        
        specialChars.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'special-char-btn';
            btn.textContent = char;
            btn.onclick = () => this.insertChar(char);
            this.container.querySelector('.special-chars').appendChild(btn);
        });
    }
    
    insertChar(char) {
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;
        const text = this.input.value;
        
        this.input.value = text.substring(0, start) + char + text.substring(end);
        this.input.selectionStart = this.input.selectionEnd = start + 1;
        this.input.focus();
        this.handleInput();
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        }
    }
    
    handleInput() {
        // Update cursor position
        this.updateCursor();
    }
    
    updateCursor() {
        // Cursor already handled by CSS caret-color
    }
    
    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        
        // Bounds checking
        if (this.historyIndex < -1) this.historyIndex = -1;
        if (this.historyIndex >= this.history.length) this.historyIndex = this.history.length - 1;
        
        if (this.historyIndex === -1) {
            this.input.value = '';
        } else {
            this.input.value = this.history[this.historyIndex];
        }
        
        // Move cursor to end
        this.input.selectionStart = this.input.selectionEnd = this.input.value.length;
    }
    
    executeCommand() {
        const command = this.input.value.trim();
        if (!command) return;
        
        // Add to history
        this.history.push(command);
        this.historyIndex = this.history.length;
        
        // Show command in output
        this.showOutput(`$ ${command}`);
        
        // Clear input
        this.input.value = '';
        
        // Simulate processing
        this.simulateProcessing(command);
    }
    
    simulateProcessing(command) {
        // Simulate delay
        setTimeout(() => {
            // Find matching lesson or scenario
            const result = this.findCommandResult(command);
            
            if (result) {
                this.showOutput(result.output, result.type);
                
                // Mark lesson complete if applicable
                if (result.isComplete) {
                    this.markComplete();
                }
            } else {
                this.showOutput('Comando no reconocido. Intenta de nuevo.', 'error');
            }
        }, 300);
    }
    
    findCommandResult(command) {
        // This would be implemented by the app to find matching commands
        // For now, return null
        return null;
    }
    
    showOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = 'output-line';
        if (type === 'success') line.classList.add('success-line');
        if (type === 'error') line.classList.add('error-line');
        line.textContent = text;
        
        this.output.appendChild(line);
        
        // Auto-scroll to bottom
        this.container.scrollTop = this.container.scrollHeight;
    }
    
    markComplete() {
        // This would mark the current lesson as complete
        // Implemented by app
    }
    
    clear() {
        this.output.innerHTML = '';
        this.history = [];
        this.historyIndex = -1;
    }
    
    reset() {
        this.clear();
        this.input.value = '';
        this.input.focus();
    }
}