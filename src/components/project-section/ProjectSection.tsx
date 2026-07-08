import { ProjectCard } from "@/components/project-card/ProjectCard";
import { TextGradient } from "@/components/shared/TextGradient";
import { projects } from "@/data/projects";
import styles from "./ProjectSection.module.css";

export function ProjectSection() {
  return (
    <div className={styles.section} id="projects">
      <div className={styles.sectionInner}>
        <h1>
          Some <TextGradient>Projects</TextGradient> I Worked on
        </h1>
        <div className={styles.cards}>
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
