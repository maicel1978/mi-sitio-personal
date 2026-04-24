import { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  buffer: AudioBuffer;
  label: string;
  accentColor: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  buffer,
  label,
  accentColor,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(buffer.duration);

  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef(0);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  const getCtx = () => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const stopPlayback = () => {
    cancelAnimationFrame(rafRef.current);
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      } catch {}
      sourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const play = () => {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0, offsetRef.current);
    src.onended = () => {
      if (isPlaying) {
        offsetRef.current = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      }
    };

    sourceRef.current = src;
    startTimeRef.current = ctx.currentTime - offsetRef.current;
    setIsPlaying(true);

    const tick = () => {
      if (!ctxRef.current) return;
      const elapsed = ctxRef.current.currentTime - startTimeRef.current;
      const t = Math.min(elapsed, duration);
      offsetRef.current = t;
      setCurrentTime(t);
      if (t < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        offsetRef.current = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(rafRef.current);
    if (sourceRef.current) {
      try { sourceRef.current.stop(); sourceRef.current.disconnect(); } catch {}
      sourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const restart = () => {
    stopPlayback();
    offsetRef.current = 0;
    setCurrentTime(0);
    setTimeout(play, 50);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      try { sourceRef.current?.stop(); } catch {}
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <button
        onClick={togglePlay}
        className="w-9 h-9 flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 shrink-0"
        style={{ background: accentColor }}
      >
        {isPlaying ? (
          <Pause size={16} className="text-white" />
        ) : (
          <Play size={16} className="text-white ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium opacity-60 mb-1 truncate">{label}</p>
        <div
          className="w-full h-1.5 rounded-full bg-white/10 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            offsetRef.current = ratio * duration;
            setCurrentTime(ratio * duration);
            if (isPlaying) {
              pause();
              setTimeout(play, 50);
            }
          }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: accentColor }}
          />
        </div>
      </div>

      <span className="text-xs font-mono opacity-50 shrink-0">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <button
        onClick={restart}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition shrink-0"
      >
        <RotateCcw size={12} className="text-white" />
      </button>
    </div>
  );
};
