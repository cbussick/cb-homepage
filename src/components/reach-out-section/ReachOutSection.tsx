import { TextGradient } from "@/components/shared/TextGradient";
import { useInView } from "@/hooks/useInView";
import styles from "./ReachOutSection.module.css";

export function ReachOutSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div className={styles.section} id="reach-out">
      <div
        ref={ref}
        className={[styles.sectionInner, isInView && styles.revealed]
          .filter(Boolean)
          .join(" ")}
      >
        <TextGradient as="h1">Reach out</TextGradient>
        <p>
          If you would like to get in touch with me, feel free to reach out via
          email:
        </p>
        <address>
          <a href="mailto:bussick.christopher@gmail.com">
            bussick.christopher@gmail.com
          </a>
        </address>
      </div>
    </div>
  );
}
