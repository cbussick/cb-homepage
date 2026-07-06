import { ReactNode } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className={styles.wrapper}>
      {children}
      <span role="tooltip" className={styles.content}>
        {label}
      </span>
    </span>
  );
}
