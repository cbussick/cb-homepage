import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { TextGradient } from "@/components/shared/TextGradient";
import { useInView } from "@/hooks/useInView";
import { CSSProperties, ReactNode } from "react";
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
  ctaText?: string;
}

interface ProjectCardProps extends Project {
  index: number;
}

const revealStaggerStepMs = 80;
const revealStaggerMaxSteps = 3;

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
  ctaText = "Take me to the project",
  index,
}: ProjectCardProps) {
  const [ref, isInView] = useInView<HTMLElement>();
  const revealDelay = `${Math.min(index, revealStaggerMaxSteps) * revealStaggerStepMs}ms`;

  return (
    <article
      ref={ref}
      className={[styles.card, isInView && styles.revealed]
        .filter(Boolean)
        .join(" ")}
      style={{ "--reveal-delay": revealDelay } as CSSProperties}
    >
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
          {ctaText}
        </a>
        {gitHubURL && (
          <a
            href={gitHubURL}
            target="_blank"
            rel="noopener"
            className={styles.githubIconAnchor}
            aria-label={`View ${title} GitHub repository`}
          >
            <GitHubIcon className={styles.githubIcon} />
          </a>
        )}
      </footer>
    </article>
  );
}
