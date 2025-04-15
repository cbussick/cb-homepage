import { cn } from "@/lib/utils";
import { JSX, ReactNode } from "react";

interface CBTextGradientProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

function CBTextGradient({
  children,
  as: Component = "span",
  className,
}: CBTextGradientProps): JSX.Element {
  return (
    <Component
      className={cn(
        "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold",
        className
      )}
    >
      {children}
    </Component>
  );
}

export { CBTextGradient };
