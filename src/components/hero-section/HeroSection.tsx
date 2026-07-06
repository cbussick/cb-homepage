import { TextGradient } from "@/components/shared/TextGradient";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <div className={styles.section}>
      <h1>
        <TextGradient>Hey</TextGradient> 👋🏻
      </h1>
      <p>
        {`I'm Christopher. I build software, especially for the web and virtual reality, with a focus on tools that help people learn more effectively and live healthier lives. When I'm not coding, I enjoy sports, making music, reading manga and watching anime.`}
      </p>
      <figure className={styles.figure}>
        <img
          src="/me_and_bruno_1x1.webp"
          alt="Me and Bruno"
          width={400}
          height={400}
        />
        <figcaption>{`Me and Bruno :)`}</figcaption>
      </figure>
    </div>
  );
}
