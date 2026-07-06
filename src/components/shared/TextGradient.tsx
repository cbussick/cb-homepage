import { JSX, ReactNode } from "react";
import styles from "./TextGradient.module.css";

interface TextGradientProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function TextGradient({
  children,
  as: Component = "span",
  className,
}: TextGradientProps): JSX.Element {
  return (
    <Component
      className={[styles.gradient, className].filter(Boolean).join(" ")}
    >
      {children}
    </Component>
  );
}
