
import { AudioStats } from "../hooks/useAudioProcessor";
import { Clock, Mic, Activity, HardDrive } from "lucide-react";

interface StatsBarProps {
  stats: AudioStats;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${m}:${s.toString().padStart(2, "0")}.${ms}`;
}

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatPill: React.FC<StatPillProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
    <span className="text-[#00e5a0]">{icon}</span>
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-white text-xs font-bold font-mono">{value}</p>
    </div>
  </div>
);

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-white/40 truncate font-mono">📄 {stats.fileName}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatPill icon={<Clock size={13} />} label="Duración" value={formatDuration(stats.duration)} />
        <StatPill icon={<Activity size={13} />} label="Sample Rate" value={`${stats.sampleRate} Hz`} />
        <StatPill icon={<Mic size={13} />} label="Canales" value={stats.channels === 1 ? "Mono" : "Stereo"} />
        <StatPill icon={<HardDrive size={13} />} label="Tamaño" value={formatSize(stats.fileSize)} />
      </div>
    </div>
  );
};
