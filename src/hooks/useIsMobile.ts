import { useEffect, useState } from "react";
import { BREAKPOINT_MD } from "@/styles/breakpoints";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < BREAKPOINT_MD,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT_MD - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINT_MD);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
