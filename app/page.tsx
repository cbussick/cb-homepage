import { ProjectCard } from "@/components/ui/CBProjectCard";
import { CBTextGradient } from "@/components/ui/CBTextGradient";
import Image from "next/image";
import Link from "next/link";

const pictureSize = 400;

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-4 items-center">
        <h1>
          <CBTextGradient>Hey</CBTextGradient> 👋🏻
        </h1>
        <p>{`I'm Christopher. I like to do software development in whatever form — for the web, virtual reality or something else. Besides that, I like doing sports, music production, reading manga and watching anime.`}</p>
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
        <ProjectCard
          title="Protégé-Chat"
          techStack="OpenAI API, React, TypeScript, Material UI"
          imageSrc="/protege-chat-teaching.png"
          imageAlt="A screenshot of Protégé-Chat"
          description={
            <div className="flex flex-col">
              <p>
                {`The Protégé-Chat is a way for students to learn using the "learning by teaching" method. The student takes on the role of the "teacher" and  has a conversation with a Large Language Model (LLM), which takes on the role of the "student".
                  Using this method, students can reinforce their knowledge and
                  identify knowledge gaps.`}
                <br />
                {`There are two variants of the Protégé-Chat:`}
              </p>
              <ol>
                <li>The student explains a topic to the LLM.</li>
                <li>
                  The LLM explains a topic to the student and the student
                  evaluates the explanation.
                </li>
              </ol>
              <p>
                {`I developed it as part of my
                    master's thesis
                    at the `}
                <Link
                  href="https://www.en.w-hs.de/"
                  target="_blank"
                  className="text-primary"
                >
                  WH
                </Link>
                .
              </p>
            </div>
          }
          href="https://www.dinas-lab.app/"
        />
        <ProjectCard
          title="DiNAs Lab"
          techStack="React, TypeScript, Material UI, Firebase"
          imageSrc="/stammbaumanalyse.png"
          imageAlt="A screenshot of DiNAs Lab"
          description={
            <p>
              DiNAs Lab is a website where students can learn biology. It
              features multiple different exercise types and aims to gamify the
              learning process. DiNAs Lab was developed by our group of 5
              students of the{" "}
              <Link
                href="https://www.en.w-hs.de/"
                target="_blank"
                className="text-primary"
              >
                WH
              </Link>
              {` as part of our master's degree.`}
            </p>
          }
          href="https://www.dinas-lab.app/"
        />
        <ProjectCard
          title="VR Office Exercises"
          techStack="Unreal Engine, Blueprints, Meta Quest 2"
          imageSrc="/vr-office-exercises-farm.png"
          imageAlt="A screenshot of VR Office Exercises"
          description={
            <p>
              Physical inactivity is a major cause of mortality worldwide. But
              motivating yourself to get up and exercise can often be hard. How
              about you put on a VR headset and do meaningful tasks in a virtual
              world while also doing exercise in the real world? For this reason
              I developed the VR Office Exercises as part of my bachelor thesis
              at the{" "}
              <Link
                href="https://www.en.w-hs.de/"
                target="_blank"
                className="text-primary"
              >
                WH
              </Link>
              . The player finds himself on a farm, helping an elderly farmer
              with harvesting and other tasks.
            </p>
          }
          href="https://www.youtube.com/watch?v=L4YNOIWra-A"
        />
        <ProjectCard
          title="Virtual Boxing Simulator"
          techStack="Unreal Engine, Blueprints, Meta Quest"
          imageSrc="/vbs-logo.svg"
          imageAlt="The Virtual Boxing Simulator logo"
          description={
            <p>
              A game simulating the sport of boxing in virtual reality. This
              project was made by our group of 6 students from the{" "}
              <Link
                href="https://www.en.w-hs.de/"
                target="_blank"
                className="text-primary"
              >
                WH
              </Link>{" "}
              as part of our respective curricula. It features a rhythm-based
              game mode with multiple difficulties, progress recording and
              character customization.
            </p>
          }
          href="https://www.youtube.com/watch?v=3zIW1LwYYDQ"
        />
      </div>
      <div className="flex flex-col gap-4 items-center" id="reach-out">
        <CBTextGradient as="h1">Reach out</CBTextGradient>
        <p>
          If you would like to get in touch with me, feel free to reach out via
          email:
        </p>
        <address>
          <a href="mailto:webmaster@example.com">
            bussick.christopher@gmail.com
          </a>
        </address>
      </div>
    </div>
  );
}
