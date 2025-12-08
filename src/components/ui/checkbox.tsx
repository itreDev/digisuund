import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "ref"> {
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative shrink-0 h-4 w-4">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 rounded border-2 appearance-none cursor-pointer transition-all",
            "border-primary/40 bg-white",
            "checked:bg-primary checked:border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        <div className="absolute  inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
          <Check className="h-3 w-3 text-white stroke-[2.5]" />
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
