import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./button";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { CBTextGradient } from "./CBTextGradient";
import { Separator } from "./separator";

export interface Project {
  title: string;
  techStack: string;
  imageSrc: string;
  imageAlt: string;
  description: ReactNode;
  href: string;
}

function ProjectCard({
  title,
  techStack,
  imageSrc,
  imageAlt,
  description,
  href,
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
      <CardFooter>
        <Link
          href={href}
          target="_blank"
          className={buttonVariants({ variant: "default" })}
        >
          Take me to the project
        </Link>
      </CardFooter>
    </Card>
  );
}

export { ProjectCard };
