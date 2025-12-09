"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({
  children,
  className,
  delay = 0,
}: AnimatedCardProps) => {
  const [ref, isVisible] = useScrollAnimation();
  const needsEqualHeight = className?.includes("equal-height") || false;

  return (
    <div
      ref={ref}
      className={cn(
        "fade-in-up transition-all duration-500 w-full",
        needsEqualHeight && "h-full flex",
        isVisible && "visible"
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <Card
        className={cn(
          "hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 w-full",
          needsEqualHeight && "h-full flex flex-col",
          className
        )}
      >
        {children}
      </Card>
    </div>
  );
};
