// ============================================================
// HUGO TERMINAL TRAINER PRO - GESTIÓN DE PROGRESO
// ============================================================

const ProgressManager = {
    STORAGE_KEY: 'hugoTrainerProgress',
    
    init() {
        this.loadProgress();
        this.updateStats();
        this.checkStreak();
    },
    
    loadProgress() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.progress = JSON.parse(saved);
        } else {
            this.progress = {
                completedLessons: [],
                completedScenarios: [],
                streak: 0,
                lastLogin: null,
                totalLessons: 0,
                totalScenarios: 0
            };
            this.calculateTotals();
            this.saveProgress();
        }
    },
    
    calculateTotals() {
        let lessonCount = 0;
        let scenarioCount = 0;
        
        // Contar lecciones de todas las unidades
        for (const unitKey in lessons) {
            lessonCount += lessons[unitKey].lessons.length;
        }
        
        // Contar escenarios
        scenarioCount = scenarios.length;
        
        this.progress.totalLessons = lessonCount;
        this.progress.totalScenarios = scenarioCount;
    },
    
    saveProgress() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
        this.updateStats();
    },
    
    updateStats() {
        const completedCount = this.progress.completedLessons.length + 
                              this.progress.completedScenarios.length;
        const totalCount = this.progress.totalLessons + this.progress.totalScenarios;
        
        const percentage = totalCount > 0 
            ? Math.round((completedCount / totalCount) * 100) 
            : 0;
        
        document.getElementById('completed-count').textContent = 
            this.progress.completedLessons.length;
        document.getElementById('total-count').textContent = 
            this.progress.totalLessons;
        document.getElementById('total-progress').textContent = percentage;
        document.getElementById('streak').textContent = this.progress.streak;
    },
    
    checkStreak() {
        const today = new Date().toDateString();
        const lastLogin = this.progress.lastLogin;
        
        if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastLogin === yesterday.toDateString()) {
                this.progress.streak++;
            } else if (lastLogin !== today) {
                this.progress.streak = 1;
            }
            
            this.progress.lastLogin = today;
            this.saveProgress();
        }
    },
    
    completeLesson(lessonId) {
        if (!this.progress.completedLessons.includes(lessonId)) {
            this.progress.completedLessons.push(lessonId);
            this.saveProgress();
            return true;
        }
        return false;
    },
    
    completeScenario(scenarioId) {
        if (!this.progress.completedScenarios.includes(scenarioId)) {
            this.progress.completedScenarios.push(scenarioId);
            this.saveProgress();
            return true;
        }
        return false;
    },
    
    getUnitProgress(unitKey) {
        const unit = lessons[unitKey];
        if (!unit) return { completed: 0, total: 0, percentage: 0 };
        
        const completed = unit.lessons.filter(l => 
            this.progress.completedLessons.includes(l.id)
        ).length;
        
        const total = unit.lessons.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    },
    
    resetProgress() {
        if (confirm('¿Estás seguro? Esto borrará todo tu progreso.')) {
            localStorage.removeItem(this.STORAGE_KEY);
            this.progress = {
                completedLessons: [],
                completedScenarios: [],
                streak: 0,
                lastLogin: null,
                totalLessons: 0,
                totalScenarios: 0
            };
            this.calculateTotals();
            this.saveProgress();
            location.reload();
        }
    }
};