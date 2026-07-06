import { Carousel } from "@/components/carousel/Carousel";
import { ProjectCard } from "@/components/project-card/ProjectCard";
import { TextGradient } from "@/components/shared/TextGradient";
import { projects } from "@/data/projects";
import styles from "./ProjectSection.module.css";

export function ProjectSection() {
  return (
    <div className={styles.section} id="projects">
      <h1>
        Some <TextGradient>Projects</TextGradient> I Worked on
      </h1>
      <Carousel>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Carousel>
    </div>
  );
}
