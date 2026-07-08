import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { TextGradient } from "@/components/shared/TextGradient";
import { ReactNode } from "react";
import styles from "./ProjectCard.module.css";

export interface Project {
  title: string;
  techStack: string[];
  imageSrc: string;
  imageAlt: string;
  isLogoImage?: boolean;
  description: ReactNode;
  href: string;
  gitHubURL?: string;
}

function formatTechStack(items: string[]): string {
  return items.join(" · ");
}

export function ProjectCard({
  title,
  techStack,
  imageSrc,
  imageAlt,
  isLogoImage,
  description,
  href,
  gitHubURL,
}: Project) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <TextGradient as="h3" className={styles.title}>
          {title}
        </TextGradient>
        <p className={styles.techTag}>{formatTechStack(techStack)}</p>
      </header>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <img
          src={imageSrc}
          alt={imageAlt}
          width={700}
          loading="lazy"
          className={isLogoImage ? styles.logoImage : undefined}
        />
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
          <a
            href={gitHubURL}
            target="_blank"
            rel="noopener"
            className={styles.githubIconAnchor}
          >
            <GitHubIcon className={styles.githubIcon} />
          </a>
        )}
      </footer>
    </article>
  );
}
