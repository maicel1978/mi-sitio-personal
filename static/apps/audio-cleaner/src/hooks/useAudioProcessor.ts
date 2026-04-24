import { useState, useRef, useCallback } from "react";

export type ProcessingStage =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "done"
  | "error";

export interface AudioStats {
  duration: number;
  sampleRate: number;
  channels: number;
  fileName: string;
  fileSize: number;
}

export interface ProcessingSettings {
  highpassFreq: number;       // Hz – remove rumble
  lowpassFreq: number;        // Hz – remove hiss
  compressorThreshold: number;
  compressorRatio: number;
  compressorAttack: number;
  compressorRelease: number;
  gainDb: number;             // output gain boost
  noiseGateThreshold: number; // 0-1 gate floor
  stereoToMono: boolean;
  normalize: boolean;
}

export const DEFAULT_SETTINGS: ProcessingSettings = {
  highpassFreq: 80,
  lowpassFreq: 16000,
  compressorThreshold: -24,
  compressorRatio: 3,
  compressorAttack: 0.003,
  compressorRelease: 0.25,
  gainDb: 2,
  noiseGateThreshold: 0.01,
  stereoToMono: false,
  normalize: true,
};

export interface UseAudioProcessorReturn {
  stage: ProcessingStage;
  stats: AudioStats | null;
  progress: number;
  errorMsg: string;
  originalBuffer: AudioBuffer | null;
  processedBuffer: AudioBuffer | null;
  downloadUrl: string | null;
  waveformData: Float32Array | null;
  processedWaveformData: Float32Array | null;
  loadFile: (file: File) => Promise<void>;
  process: (settings: ProcessingSettings) => Promise<void>;
  reset: () => void;
}

function dbToLinear(db: number) {
  return Math.pow(10, db / 20);
}

function normalizeBuffer(buffer: AudioBuffer, offCtx: OfflineAudioContext): AudioBuffer {
  let peak = 0;
  for (let c = 0; c < buffer.numberOfChannels; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i++) {
      const abs = Math.abs(data[i]);
      if (abs > peak) peak = abs;
    }
  }
  if (peak === 0 || peak >= 0.999) return buffer;
  const gain = 0.98 / peak;
  const newBuffer = offCtx.createBuffer(
    buffer.numberOfChannels,
    buffer.length,
    buffer.sampleRate
  );
  for (let c = 0; c < buffer.numberOfChannels; c++) {
    const src2 = buffer.getChannelData(c);
    const dst = newBuffer.getChannelData(c);
    for (let i = 0; i < src2.length; i++) {
      dst[i] = Math.max(-1, Math.min(1, src2[i] * gain));
    }
  }
  return newBuffer;
}

function applyNoiseGate(buffer: AudioBuffer, threshold: number, offCtx: OfflineAudioContext): AudioBuffer {
  if (threshold <= 0) return buffer;
  const newBuffer = offCtx.createBuffer(
    buffer.numberOfChannels,
    buffer.length,
    buffer.sampleRate
  );
  const windowSize = Math.floor(buffer.sampleRate * 0.02); // 20ms windows
  for (let c = 0; c < buffer.numberOfChannels; c++) {
    const src = buffer.getChannelData(c);
    const dst = newBuffer.getChannelData(c);
    for (let i = 0; i < src.length; i++) {
      const start = Math.max(0, i - windowSize);
      const end = Math.min(src.length, i + windowSize);
      let rms = 0;
      for (let j = start; j < end; j++) rms += src[j] * src[j];
      rms = Math.sqrt(rms / (end - start));
      dst[i] = rms < threshold ? 0 : src[i];
    }
  }
  return newBuffer;
}

function downsampleWaveform(buffer: AudioBuffer, points = 1000): Float32Array {
  const channel = buffer.getChannelData(0);
  const blockSize = Math.floor(channel.length / points);
  const result = new Float32Array(points);
  for (let i = 0; i < points; i++) {
    let sum = 0;
    const start = i * blockSize;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(channel[start + j] || 0);
    }
    result[i] = sum / blockSize;
  }
  return result;
}

export function useAudioProcessor(): UseAudioProcessorReturn {
  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [stats, setStats] = useState<AudioStats | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [originalBuffer, setOriginalBuffer] = useState<AudioBuffer | null>(null);
  const [processedBuffer, setProcessedBuffer] = useState<AudioBuffer | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [waveformData, setWaveformData] = useState<Float32Array | null>(null);
  const [processedWaveformData, setProcessedWaveformData] = useState<Float32Array | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const reset = useCallback(() => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setStage("idle");
    setStats(null);
    setProgress(0);
    setErrorMsg("");
    setOriginalBuffer(null);
    setProcessedBuffer(null);
    setDownloadUrl(null);
    setWaveformData(null);
    setProcessedWaveformData(null);
  }, [downloadUrl]);

  const loadFile = useCallback(async (file: File) => {
    try {
      setStage("loading");
      setProgress(0);
      setErrorMsg("");
      setProcessedBuffer(null);
      setDownloadUrl(null);
      setProcessedWaveformData(null);

      if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|ogg|flac|aac|m4a|opus|webm)$/i)) {
        throw new Error("Archivo inválido. Sube un archivo de audio.");
      }

      if (file.size > 300 * 1024 * 1024) {
        throw new Error("El archivo es demasiado grande (máx. 300 MB).");
      }

      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      const ctx = getAudioCtx();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      setProgress(80);

      setOriginalBuffer(decoded);
      setStats({
        duration: decoded.duration,
        sampleRate: decoded.sampleRate,
        channels: decoded.numberOfChannels,
        fileName: file.name,
        fileSize: file.size,
      });
      setWaveformData(downsampleWaveform(decoded));
      setStage("ready");
      setProgress(100);
    } catch (e: any) {
      setErrorMsg(e?.message || "Error al cargar el archivo.");
      setStage("error");
    }
  }, []);

  const process = useCallback(
    async (settings: ProcessingSettings) => {
      if (!originalBuffer) return;
      try {
        setStage("processing");
        setProgress(0);
        setErrorMsg("");

        const numChannels = settings.stereoToMono ? 1 : originalBuffer.numberOfChannels;
        const sampleRate = originalBuffer.sampleRate;

        const offlineCtx = new OfflineAudioContext(
          numChannels,
          originalBuffer.length,
          sampleRate
        );

        const source = offlineCtx.createBufferSource();
        source.buffer = originalBuffer;

        // High-pass filter (remove rumble)
        const highpass = offlineCtx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = settings.highpassFreq;
        highpass.Q.value = 0.707;

        // Low-pass filter (remove hiss)
        const lowpass = offlineCtx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = Math.min(settings.lowpassFreq, sampleRate / 2 - 100);
        lowpass.Q.value = 0.707;

        // Peaking EQ for presence
        const presence = offlineCtx.createBiquadFilter();
        presence.type = "peaking";
        presence.frequency.value = 3000;
        presence.gain.value = 2;
        presence.Q.value = 1;

        // Dynamics compressor
        const compressor = offlineCtx.createDynamicsCompressor();
        compressor.threshold.value = settings.compressorThreshold;
        compressor.knee.value = 12;
        compressor.ratio.value = settings.compressorRatio;
        compressor.attack.value = settings.compressorAttack;
        compressor.release.value = settings.compressorRelease;

        // Output gain
        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = dbToLinear(settings.gainDb);

        // Chain
        source.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(presence);
        presence.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(offlineCtx.destination);

        source.start();

        setProgress(20);

        let rendered = await offlineCtx.startRendering();
        setProgress(60);

        // Noise gate (manual post-process)
        if (settings.noiseGateThreshold > 0) {
          rendered = applyNoiseGate(rendered, settings.noiseGateThreshold, offlineCtx);
        }
        setProgress(80);

        // Normalize
        if (settings.normalize) {
          rendered = normalizeBuffer(rendered, offlineCtx);
        }
        setProgress(90);

        setProcessedBuffer(rendered);
        setProcessedWaveformData(downsampleWaveform(rendered));

        // Encode to WAV
        const wavBlob = bufferToWave(rendered);
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        const url = URL.createObjectURL(wavBlob);
        setDownloadUrl(url);
        setStage("done");
        setProgress(100);
      } catch (e: any) {
        setErrorMsg(e?.message || "Error durante el procesamiento.");
        setStage("error");
      }
    },
    [originalBuffer, downloadUrl]
  );

  return {
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
  };
}

// ─── WAV encoder ────────────────────────────────────────────────────────────

export function bufferToWave(abuffer: AudioBuffer): Blob {
  const numOfChan = abuffer.numberOfChannels;
  const length = abuffer.length * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels: Float32Array[] = [];
  const sampleRate = abuffer.sampleRate;
  let offset = 0;

  const writeString = (s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset++, s.charCodeAt(i));
  };

  writeString("RIFF");
  view.setUint32(offset, 36 + abuffer.length * numOfChan * 2, true); offset += 4;
  writeString("WAVE");
  writeString("fmt ");
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numOfChan, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * numOfChan * 2, true); offset += 4;
  view.setUint16(offset, numOfChan * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  writeString("data");
  view.setUint32(offset, abuffer.length * numOfChan * 2, true); offset += 4;

  for (let i = 0; i < numOfChan; i++) channels.push(abuffer.getChannelData(i));

  const interleaved = new Float32Array(abuffer.length * numOfChan);
  for (let i = 0; i < abuffer.length; i++) {
    for (let ch = 0; ch < numOfChan; ch++) {
      interleaved[i * numOfChan + ch] = channels[ch][i];
    }
  }

  let index = 44;
  for (let i = 0; i < interleaved.length; i++) {
    const sample = Math.max(-1, Math.min(1, interleaved[i]));
    view.setInt16(index, sample * 0x7fff, true);
    index += 2;
  }

  return new Blob([buffer], { type: "audio/wav" });
}
