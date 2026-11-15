import { MicButton } from "@/components/MicButton";

interface DoctorNotesProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  listening: boolean;
  supported: boolean;
  onMicClick: () => void;
  onStopDictation: () => void;
  micTestId?: string;
  textareaTestId?: string;
  sectionTestId?: string;
}

/** Presentational "What my doctor told me" notes block. State lives with the caller. */
export function DoctorNotes({
  id,
  label,
  placeholder,
  value,
  onChange,
  listening,
  supported,
  onMicClick,
  onStopDictation,
  micTestId = "button-mic-notes",
  textareaTestId = "textarea-notes",
  sectionTestId = "notes-section",
}: DoctorNotesProps) {
  return (
    <div className="mt-7 sm:mt-8 print-notes" data-testid={sectionTestId}>
      <div className="no-print flex items-center justify-between mb-2">
        <label htmlFor={id} className="block text-base font-semibold text-foreground">
          {label}
        </label>
        <MicButton listening={listening} supported={supported} onClick={onMicClick} testId={micTestId} />
      </div>
      <textarea
        id={id}
        data-testid={textareaTestId}
        value={value}
        onChange={(e) => {
          if (listening) onStopDictation();
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={5}
        className="
          no-print w-full rounded-xl border-2 border-border bg-card
          px-4 py-3 text-base text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          resize-y transition-colors
        "
      />
      <div className="hidden print-notes-label" aria-hidden="true">{label}</div>
      {value ? (
        <div className="hidden print-notes-content" aria-hidden="true">{value}</div>
      ) : (
        <>
          <div className="hidden print-notes-lines" aria-hidden="true" />
          <div className="hidden print-notes-lines" aria-hidden="true" />
          <div className="hidden print-notes-lines" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
