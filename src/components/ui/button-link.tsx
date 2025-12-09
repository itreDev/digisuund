import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  size?: "default" | "large" | "small";
  className?: string;
  fullWidth?: boolean;
  variant?: "default" | "outline";
  scale?: boolean;
  onClick?: () => void;
}

export const ButtonLink = ({
  href,
  children,
  size = "default",
  className,
  fullWidth = false,
  scale = true,
  variant = "default",
  onClick,
}: ButtonLinkProps) => {
  const hasCustomHover = className?.includes("hover:");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-[12px] flex items-center justify-center font-semibold",
        scale ? "hover:scale-105" : "",
        variant === "outline"
          ? cn(
              "bg-transparent text-secondary border-2 border-secondary transition-all duration-500",
              !hasCustomHover &&
                "hover:bg-secondary/5 hover:border-secondary/80"
            )
          : cn(
              "relative bg-gradient-to-r from-[#B899FF] to-[#D9A6B3] text-white button-glow shadow-[var(--shadow-cta)] transition-all duration-500 overflow-hidden",
              "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#A689FF] before:to-[#C996A3] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:z-0",
              "z-10"
            ),
        size === "small" && "h-6 text-xs px-4",
        size === "default" && "h-9 text-sm px-6",
        size === "large" && "h-14 text-base px-8",
        fullWidth
          ? "w-full"
          : size === "default"
          ? "w-36"
          : "w-auto min-w-[144px]",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </Link>
  );
};
