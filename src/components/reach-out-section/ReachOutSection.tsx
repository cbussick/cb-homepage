import { TextGradient } from "@/components/shared/TextGradient";
import styles from "./ReachOutSection.module.css";

export function ReachOutSection() {
  return (
    <div className={styles.section} id="reach-out">
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
  );
}
