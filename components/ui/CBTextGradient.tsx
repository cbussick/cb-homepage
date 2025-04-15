import { JSX, ReactNode } from "react";

interface CBTextGradientProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

function CBTextGradient({
  children,
  as: Component = "span",
}: CBTextGradientProps): JSX.Element {
  return (
    <Component className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
      {children}
    </Component>
  );
}

export { CBTextGradient };
