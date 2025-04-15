import { JSX, ReactNode } from "react";

function CBTextGradient({ children }: { children: ReactNode }): JSX.Element {
  return (
    <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
      {children}
    </p>
  );
}

export { CBTextGradient };
