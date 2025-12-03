import Link from "next/link";
import cn from "classnames";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  size?: "default" | "large";
  className?: string;
  fullWidth?: boolean;
  variant?: "default" | "outline";
}

export const ButtonLink = ({
  href,
  children,
  size = "default",
  className,
  fullWidth = false,
  variant = "default",
}: ButtonLinkProps) => {
  const hasCustomHover = className?.includes("hover:");

  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg flex items-center justify-center transition-colors",
        variant === "outline"
          ? cn(
              "bg-transparent text-foreground border border-description/50",
              !hasCustomHover && "hover:bg-description/5"
            )
          : "bg-primary text-white hover:bg-primary/90",
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
      {children}
    </Link>
  );
};
