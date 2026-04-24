import { useState, useCallback } from "react";
import { useAudioProcessor, DEFAULT_SETTINGS, ProcessingSettings } from "./hooks/useAudioProcessor";
import { DropZone } from "./components/DropZone";
import { SettingsPanel } from "./components/SettingsPanel";
import { Waveform } from "./components/Waveform";
import { AudioPlayer } from "./components/AudioPlayer";
import { StatsBar } from "./components/StatsBar";
import { ProgressBar } from "./components/ProgressBar";
import {
  Sparkles,
  RefreshCw,
  Download,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";

const PRESETS: { name: string; emoji: string; settings: Partial<ProcessingSettings> }[] = [
  {
    name: "Voz Podcast",
    emoji: "🎙",
    settings: {
      highpassFreq: 100,
      lowpassFreq: 14000,
      compressorThreshold: -18,
      compressorRatio: 4,
      gainDb: 3,
      noiseGateThreshold: 0.015,
      normalize: true,
    },
  },
  {
    name: "Llamada Telefónica",
    emoji: "📞",
    settings: {
      highpassFreq: 300,
      lowpassFreq: 3400,
      compressorThreshold: -12,
      compressorRatio: 6,
      gainDb: 5,
      noiseGateThreshold: 0.03,
      stereoToMono: true,
      normalize: true,
    },
  },
  {
    name: "Música / Instrumento",
    emoji: "🎵",
    settings: {
      highpassFreq: 30,
      lowpassFreq: 20000,
      compressorThreshold: -24,
      compressorRatio: 2,
      gainDb: 1,
      noiseGateThreshold: 0,
      normalize: true,
    },
  },
  {
    name: "Entrevista / Reunión",
    emoji: "🗣",
    settings: {
      highpassFreq: 120,
      lowpassFreq: 12000,
      compressorThreshold: -20,
      compressorRatio: 5,
      gainDb: 4,
      noiseGateThreshold: 0.02,
      stereoToMono: false,
      normalize: true,
    },
  },
];

export default function App() {
  const {
    stage,
    stats,
    progress,
    errorMsg,
    originalBuffer,
    processedBuffer,
    downloadUrl,
    waveformData,
    processedWaveformData,
    loadFile,
    process,
    reset,
  } = useAudioProcessor();

  const [settings, setSettings] = useState<ProcessingSettings>({ ...DEFAULT_SETTINGS });
  const [showSettings, setShowSettings] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleProcess = useCallback(() => {
    process(settings);
  }, [process, settings]);

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setSettings((s) => ({ ...s, ...preset.settings }));
    setActivePreset(preset.name);
    setShowSettings(true);
  };

  const isLoading = stage === "loading";
  const isProcessing = stage === "processing";
  const isBusy = isLoading || isProcessing;
  const hasAudio = stage === "ready" || stage === "done";
  const isDone = stage === "done";

  const stageLabel =
    stage === "loading"
      ? "Cargando y decodificando..."
      : stage === "processing"
      ? "Procesando audio..."
      : "";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00e5a0]/8 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#60a5fa]/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 rounded-full bg-[#c084fc]/5 blur-3xl -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-bold uppercase tracking-widest mb-3">
            <Zap size={11} />
            Web Audio API
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
            Voice Cleaner <span className="text-[#00e5a0]">Pro</span>
          </h1>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Limpia, mejora y procesa tu audio directamente en el navegador — sin servidores, sin límites.
          </p>
        </div>

        {/* Drop Zone */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-1 shadow-2xl">
          <div className="p-5 space-y-4">
            <DropZone onFile={loadFile} disabled={isBusy} />

            {/* Progress */}
            {isBusy && (
              <ProgressBar progress={progress} label={stageLabel} />
            )}

            {/* Error */}
            {stage === "error" && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-300 text-sm font-semibold">Error</p>
                  <p className="text-red-400/80 text-xs mt-0.5">{errorMsg}</p>
                </div>
                <button
                  onClick={reset}
                  className="text-red-400 hover:text-red-200 text-xs underline"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Stats */}
            {stats && (
              <StatsBar stats={stats} />
            )}

            {/* Waveforms */}
            {waveformData && (
              <div className="space-y-3">
                <Waveform
                  data={waveformData}
                  color="#60a5fa"
                  label="Original"
                  height={72}
                />
                {processedWaveformData && (
                  <Waveform
                    data={processedWaveformData}
                    color="#00e5a0"
                    label="Procesado"
                    height={72}
                  />
                )}
              </div>
            )}

            {/* Players */}
            {originalBuffer && (
              <div className="space-y-2">
                <AudioPlayer
                  buffer={originalBuffer}
                  label="Original"
                  accentColor="#60a5fa"
                />
                {processedBuffer && (
                  <AudioPlayer
                    buffer={processedBuffer}
                    label="Procesado"
                    accentColor="#00e5a0"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Presets */}
        {hasAudio && (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">Presets</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePreset(preset)}
                  disabled={isBusy}
                  className={`
                    flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center
                    transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]
                    disabled:opacity-40 disabled:pointer-events-none
                    ${
                      activePreset === preset.name
                        ? "border-[#00e5a0]/60 bg-[#00e5a0]/10 text-[#00e5a0]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
                    }
                  `}
                >
                  <span className="text-xl">{preset.emoji}</span>
                  <span className="text-xs font-semibold leading-tight">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {hasAudio && (
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <button
              onClick={() => setShowSettings((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition"
            >
              <span className="text-sm font-bold text-white">Ajustes Avanzados</span>
              <span className="text-white/40">
                {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {showSettings && (
              <div className="px-6 pb-6">
                <SettingsPanel
                  settings={settings}
                  onChange={(s) => {
                    setSettings(s);
                    setActivePreset(null);
                  }}
                  disabled={isBusy}
                />
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        {hasAudio && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleProcess}
              disabled={isBusy}
              className={`
                flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl
                font-bold text-base transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  isProcessing
                    ? "bg-[#00e5a0]/20 border border-[#00e5a0]/40 text-[#00e5a0]"
                    : "bg-[#00e5a0] hover:bg-[#00f0aa] active:scale-[0.98] text-black shadow-lg shadow-[#00e5a0]/20"
                }
              `}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {isDone ? "Reprocesar Audio" : "Mejorar Audio"}
                </>
              )}
            </button>

            {isDone && downloadUrl && (
              <a
                href={downloadUrl}
                download="cleaned_audio.wav"
                className="
                  flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl
                  font-bold text-base border border-white/20 bg-white/5
                  hover:bg-white/10 hover:border-white/40 transition-all duration-200
                  active:scale-[0.98]
                "
              >
                <Download size={18} />
                Descargar WAV
              </a>
            )}

            <button
              onClick={reset}
              disabled={isBusy}
              className="
                flex items-center justify-center gap-2 py-4 px-5 rounded-2xl
                border border-white/10 bg-white/5 text-white/50
                hover:text-white hover:border-white/30 hover:bg-white/10
                transition-all duration-200 active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              title="Cargar otro archivo"
            >
              <RefreshCw size={16} />
              <span className="text-sm font-semibold">Nuevo</span>
            </button>
          </div>
        )}

        {/* Feature badges */}
        {stage === "idle" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { emoji: "🎚", title: "EQ de 3 bandas", desc: "High-pass, Low-pass y Presence" },
              { emoji: "🗜", title: "Compresor dinámico", desc: "Controla picos y sibilantes" },
              { emoji: "🔇", title: "Noise Gate", desc: "Elimina fondos y respiraciones" },
              { emoji: "📊", title: "Visualización", desc: "Waveform antes y después" },
              { emoji: "🎧", title: "Preview en tiempo real", desc: "Escucha el resultado al instante" },
              { emoji: "💾", title: "Exporta en WAV", desc: "Sin pérdida, listo para usar" },
            ].map((f) => (
              <div
                key={f.title}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-1"
              >
                <span className="text-2xl">{f.emoji}</span>
                <p className="text-sm font-bold text-white">{f.title}</p>
                <p className="text-xs text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/20 text-xs pb-4">
          Voice Cleaner Pro · 100% en el navegador · Privacidad garantizada · Tu audio nunca sale del dispositivo
        </p>
      </div>
    </div>
  );
}
