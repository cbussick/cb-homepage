import { Carousel } from "@/components/carousel/Carousel";
import { ProjectCard } from "@/components/project-card/ProjectCard";
import { CBTextGradient } from "@/components/shared/CBTextGradient";
import { projects } from "@/data/projects";
import styles from "./ProjectSection.module.css";

export function ProjectSection() {
  return (
    <div className={styles.section} id="projects">
      <h1>
        Some <CBTextGradient>Projects</CBTextGradient> I Worked on
      </h1>
      <Carousel>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Carousel>
    </div>
  );
}
