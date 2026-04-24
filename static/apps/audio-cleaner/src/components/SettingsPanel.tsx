
import { DEFAULT_SETTINGS, ProcessingSettings } from "../hooks/useAudioProcessor";
import { RotateCcw } from "lucide-react";

interface SettingsPanelProps {
  settings: ProcessingSettings;
  onChange: (s: ProcessingSettings) => void;
  disabled?: boolean;
}

interface SliderProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  disabled?: boolean;
  color?: string;
}

const Slider: React.FC<SliderProps> = ({
  label,
  hint,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  disabled,
  color = "#00e5a0",
}) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`${disabled ? "opacity-40 pointer-events-none" : ""}`}>
      <div className="flex justify-between items-baseline mb-1.5">
        <div>
          <span className="text-sm font-semibold text-white">{label}</span>
          <span className="ml-2 text-xs text-white/40">{hint}</span>
        </div>
        <span className="text-sm font-mono font-bold" style={{ color }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full appearance-none h-1.5 rounded-full outline-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)`,
        }}
      />
    </div>
  );
};

interface ToggleProps {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  color?: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, hint, value, onChange, disabled, color = "#00e5a0" }) => (
  <div className={`flex items-center justify-between ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
    <div>
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="ml-2 text-xs text-white/40">{hint}</span>
    </div>
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
      style={{ background: value ? color : "rgba(255,255,255,0.15)" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  </div>
);

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
  disabled = false,
}) => {
  const set = <K extends keyof ProcessingSettings>(key: K, value: ProcessingSettings[K]) =>
    onChange({ ...settings, [key]: value });

  const resetAll = () => onChange({ ...DEFAULT_SETTINGS });

  const GREEN = "#00e5a0";
  const BLUE = "#60a5fa";
  const PURPLE = "#c084fc";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Ajustes de Procesamiento</h3>
        <button
          onClick={resetAll}
          disabled={disabled}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/10"
        >
          <RotateCcw size={11} />
          Restaurar
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/40">Filtros EQ</p>
        <Slider
          label="High-Pass"
          hint="elimina ruido de baja frec."
          value={settings.highpassFreq}
          min={20} max={400} step={5} unit=" Hz"
          onChange={(v) => set("highpassFreq", v)}
          disabled={disabled}
          color={GREEN}
        />
        <Slider
          label="Low-Pass"
          hint="elimina hiss de alta frec."
          value={settings.lowpassFreq}
          min={4000} max={20000} step={500} unit=" Hz"
          onChange={(v) => set("lowpassFreq", v)}
          disabled={disabled}
          color={GREEN}
        />
      </div>

      {/* Dynamics */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/40">Dinámica</p>
        <Slider
          label="Umbral Compresor"
          hint="threshold"
          value={settings.compressorThreshold}
          min={-60} max={0} step={1} unit=" dB"
          onChange={(v) => set("compressorThreshold", v)}
          disabled={disabled}
          color={BLUE}
        />
        <Slider
          label="Ratio Compresor"
          hint="compresión"
          value={settings.compressorRatio}
          min={1} max={20} step={0.5} unit=":1"
          onChange={(v) => set("compressorRatio", v)}
          disabled={disabled}
          color={BLUE}
        />
        <Slider
          label="Ganancia Salida"
          hint="boost final"
          value={settings.gainDb}
          min={-12} max={24} step={0.5} unit=" dB"
          onChange={(v) => set("gainDb", v)}
          disabled={disabled}
          color={BLUE}
        />
        <Slider
          label="Noise Gate"
          hint="silencia fondos"
          value={settings.noiseGateThreshold}
          min={0} max={0.1} step={0.002} unit=""
          onChange={(v) => set("noiseGateThreshold", v)}
          disabled={disabled}
          color={BLUE}
        />
      </div>

      {/* Options */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/40">Opciones</p>
        <Toggle
          label="Normalizar"
          hint="ajusta el volumen al máximo seguro"
          value={settings.normalize}
          onChange={(v) => set("normalize", v)}
          disabled={disabled}
          color={PURPLE}
        />
        <Toggle
          label="Stereo → Mono"
          hint="combina canales"
          value={settings.stereoToMono}
          onChange={(v) => set("stereoToMono", v)}
          disabled={disabled}
          color={PURPLE}
        />
      </div>
    </div>
  );
};
