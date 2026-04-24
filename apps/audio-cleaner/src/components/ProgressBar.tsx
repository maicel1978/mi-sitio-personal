

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-xs text-white/50">
          <span>{label}</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00b894, #00e5a0, #00cec9)",
            boxShadow: "0 0 10px #00e5a088",
          }}
        />
      </div>
    </div>
  );
};
