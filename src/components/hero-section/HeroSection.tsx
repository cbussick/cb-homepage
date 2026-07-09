import { TextGradient } from "@/components/shared/TextGradient";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <div className={styles.section} id="hero">
      <div className={[styles.sectionInner, styles.revealed].join(" ")}>
        <div>
          <h1>
            <TextGradient>Hey</TextGradient> 👋🏻
          </h1>
          <p className={styles.bio}>
            {`I'm Christopher. I build software, especially for the web and virtual reality, with a focus on tools that help people learn more effectively and live healthier lives. When I'm not coding, I enjoy sports, making music, reading manga and watching anime.`}
          </p>
        </div>
        <figure className={styles.figure}>
          <div className={styles.photoFrame}>
            <img
              src="/me_and_bruno_1x1.webp"
              alt="Me and Bruno"
              width={400}
              height={400}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption>{`Me and Bruno :)`}</figcaption>
        </figure>
      </div>
    </div>
  );
}
