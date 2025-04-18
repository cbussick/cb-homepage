import { AutoplayCarousel } from "@/components/ui/AutoplayCarousel";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "@/components/ui/CBProjectCard";
import { CBTextGradient } from "@/components/ui/CBTextGradient";
import { projects } from "@/data/projects";
import Image from "next/image";

const pictureSize = 400;

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-4 items-center">
        <h1>
          <CBTextGradient>Hey</CBTextGradient> 👋🏻
        </h1>
        <p>{`I'm Christopher. I like to do software development in whatever form — for the web, virtual reality or something else. Besides that, I like doing sports, making music, reading manga and watching anime.`}</p>
        <figure className="flex flex-col gap-1">
          <Image
            src="/me_and_bruno_1x1.png"
            alt="Me and Bruno"
            width={pictureSize}
            height={pictureSize}
            priority
          />
          <figcaption>{`Me and Bruno :)`}</figcaption>
        </figure>
      </div>
      <div className="flex flex-col gap-4 items-center" id="projects">
        <h1>
          Some <CBTextGradient>Projects</CBTextGradient> I worked on
        </h1>
        <AutoplayCarousel>
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.title}>
                <ProjectCard
                  title={project.title}
                  techStack={project.techStack}
                  imageSrc={project.imageSrc}
                  imageAlt={project.imageAlt}
                  href={project.href}
                  gitHubURL={project.gitHubURL}
                  description={project.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </AutoplayCarousel>
      </div>
      <div className="flex flex-col gap-4 items-center" id="reach-out">
        <CBTextGradient as="h1">Reach out</CBTextGradient>
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
    </div>
  );
}
