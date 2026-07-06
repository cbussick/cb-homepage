import { ReactNode } from "react";
import { CBTextGradient } from "@/components/shared/CBTextGradient";
import { GitHubIcon } from "@/components/shared/CBGitHubIcon";
import styles from "./ProjectCard.module.css";

export interface Project {
  title: string;
  techStack: string;
  imageSrc: string;
  imageAlt: string;
  description: ReactNode;
  href: string;
  gitHubURL?: string;
}

export function ProjectCard({
  title,
  techStack,
  imageSrc,
  imageAlt,
  description,
  href,
  gitHubURL,
}: Project) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <CBTextGradient as="h2" className={styles.title}>
          {title}
        </CBTextGradient>
        <p>Tech Stack: {techStack}</p>
      </header>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <img src={imageSrc} alt={imageAlt} width={700} loading="lazy" />
        <div className={styles.description}>{description}</div>
      </div>
      <footer className={styles.footer}>
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className={styles.ctaButton}
        >
          Take me to the project
        </a>
        {gitHubURL && (
          <a href={gitHubURL} target="_blank" rel="noopener">
            <GitHubIcon className={styles.githubIcon} />
          </a>
        )}
      </footer>
    </article>
  );
}
