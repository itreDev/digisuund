import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background))] text-secondary shadow-sm group transition-all ease-in-out duration-500 hover:border-[hsl(var(--primary)/0.2)] hover:shadow-[var(--shadow-medium)]",
        className
      )}
    >
      {children}
    </div>
  );
};
