import { useRef, useState } from "react";
import { Upload, Music } from "lucide-react";

interface DropZoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFile, disabled }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file || disabled) return;
    onFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        relative flex flex-col items-center justify-center gap-4
        rounded-3xl border-2 border-dashed p-10 cursor-pointer
        transition-all duration-300 select-none
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        ${
          dragging
            ? "border-[#00e5a0] bg-[#00e5a0]/10 scale-[1.01]"
            : "border-white/20 hover:border-white/40 hover:bg-white/5"
        }
      `}
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          dragging ? "bg-[#00e5a0]/20 scale-110" : "bg-white/10"
        }`}
      >
        {dragging ? (
          <Music size={28} className="text-[#00e5a0]" />
        ) : (
          <Upload size={28} className="text-white/60" />
        )}
      </div>

      <div className="text-center">
        <p className="text-white font-semibold text-lg">
          {dragging ? "Suelta el archivo aquí" : "Arrastra tu audio aquí"}
        </p>
        <p className="text-white/40 text-sm mt-1">
          o <span className="text-[#00e5a0] underline">haz clic para buscar</span>
        </p>
        <p className="text-white/30 text-xs mt-2">
          MP3 · WAV · OGG · FLAC · AAC · M4A · OPUS — Máx. 300 MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
};
