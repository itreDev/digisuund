import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  className,
}: ToggleProps) => {
  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <div
        className={cn(
          "w-11 h-6 rounded-full transition-colors duration-200 relative",
          checked ? "bg-primary" : "bg-muted/30"
        )}
      >
        <div
          className={cn(
            "absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-200 shadow-sm",
            checked && "translate-x-5"
          )}
        />
      </div>
    </label>
  );
};
