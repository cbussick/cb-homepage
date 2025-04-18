import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./button";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { GitHubIcon } from "./CBGitHubIcon";
import { CBTextGradient } from "./CBTextGradient";
import { Separator } from "./separator";

export interface Project {
  title: string;
  techStack: string;
  imageSrc: string;
  imageAlt: string;
  description: ReactNode;
  href: string;
  gitHubURL?: string;
}

function ProjectCard({
  title,
  techStack,
  imageSrc,
  imageAlt,
  description,
  href,
  gitHubURL,
}: Project) {
  return (
    <Card>
      <CardHeader>
        <CBTextGradient as="h2" className="w-fit">
          {title}
        </CBTextGradient>
        <p>Tech Stack: {techStack}</p>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4 items-center">
        <Image src={imageSrc} alt={imageAlt} width={700} height={1} />
        {description}
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Link
          href={href}
          target="_blank"
          className={buttonVariants({ variant: "default" })}
        >
          Take me to the project
        </Link>
        {gitHubURL && (
          <Link href={gitHubURL} target="_blank">
            <GitHubIcon className="text-foreground hover:text-primary transition-colors duration-300" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export { ProjectCard };
