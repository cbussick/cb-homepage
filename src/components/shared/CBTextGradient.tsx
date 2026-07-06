import { JSX, ReactNode } from "react";
import styles from "./CBTextGradient.module.css";

interface CBTextGradientProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function CBTextGradient({
  children,
  as: Component = "span",
  className,
}: CBTextGradientProps): JSX.Element {
  return (
    <Component
      className={[styles.gradient, className].filter(Boolean).join(" ")}
    >
      {children}
    </Component>
  );
}
