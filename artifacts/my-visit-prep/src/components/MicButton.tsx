import { Mic, Square } from "lucide-react";

interface MicButtonProps {
  listening: boolean;
  supported: boolean;
  onClick: () => void;
  testId: string;
}

export function MicButton({ listening, supported, onClick, testId }: MicButtonProps) {
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      aria-label={listening ? "Stop dictation" : "Dictate with your voice"}
      aria-pressed={listening}
      className={`
        flex-shrink-0 inline-flex items-center justify-center
        w-12 h-12 rounded-xl border-2 transition-colors touch-manipulation
        focus:outline-none focus:ring-2 focus:ring-primary/30
        ${
          listening
            ? "bg-destructive text-destructive-foreground border-destructive animate-pulse"
            : "bg-card text-primary border-border hover:border-primary"
        }
      `}
    >
      {listening ? (
        <Square className="w-4 h-4" fill="currentColor" aria-hidden="true" />
      ) : (
        <Mic className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
}
