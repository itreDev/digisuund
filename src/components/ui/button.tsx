import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "large" | "small";
  fullWidth?: boolean;
  scale?: boolean;
}

export const Button = ({
  children,
  size = "default",
  className,
  fullWidth = false,
  variant = "default",
  scale = true,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-[12px] flex items-center justify-center font-semibold",
        scale ? "hover:scale-105" : "",
        variant === "outline"
          ? cn(
              "bg-transparent text-secondary border-2 border-secondary transition-all duration-300",
              "hover:bg-secondary/5 hover:border-secondary/80"
            )
          : cn(
              "relative bg-gradient-to-r from-[#B899FF] to-[#D9A6B3] text-white button-glow shadow-[var(--shadow-cta)] transition-[transform] duration-300 overflow-hidden",
              "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#A689FF] before:to-[#C996A3] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:z-0",
              "z-10"
            ),
        size === "default" && "h-9 text-sm px-6",
        size === "large" && "h-14 text-base px-8",
        fullWidth
          ? "w-full"
          : size === "default"
          ? "w-38"
          : "w-auto min-w-[144px]",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};
