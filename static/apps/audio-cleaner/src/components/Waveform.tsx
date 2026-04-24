import { useRef, useEffect } from "react";

interface WaveformProps {
  data: Float32Array;
  color: string;
  label: string;
  height?: number;
}

export const Waveform: React.FC<WaveformProps> = ({
  data,
  color,
  label,
  height = 80,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, w, h);

    // Center line
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Waveform bars
    const max = Math.max(...data, 0.001);
    const barWidth = w / data.length;

    for (let i = 0; i < data.length; i++) {
      const normalized = data[i] / max;
      const barH = normalized * (h - 8);
      const x = i * barWidth;
      const y = (h - barH) / 2;

      // Gradient per bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
      gradient.addColorStop(0, color + "cc");
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, color + "cc");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, Math.max(barWidth - 0.5, 0.5), barH);
    }
  }, [data, color, height]);

  return (
    <div className="w-full">
      <p className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-60" style={{ color }}>
        {label}
      </p>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height }}
      />
    </div>
  );
};
