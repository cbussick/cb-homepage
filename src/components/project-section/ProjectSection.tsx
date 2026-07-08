import { ProjectCard } from "@/components/project-card/ProjectCard";
import { TextGradient } from "@/components/shared/TextGradient";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import styles from "./ProjectSection.module.css";

export function ProjectSection() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div className={styles.section} id="projects">
      <div
        ref={ref}
        className={[styles.sectionInner, isInView && styles.revealed]
          .filter(Boolean)
          .join(" ")}
      >
        <h1>
          Things I&apos;ve <TextGradient>Built</TextGradient>
        </h1>
        <div className={styles.cards}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
