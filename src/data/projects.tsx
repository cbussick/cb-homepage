import { Project } from "@/components/project-card/ProjectCard";

export const projects: Project[] = [
  {
    title: "Protégé-Chat",
    techStack: ["OpenAI API", "React", "TypeScript", "Next.js", "Material UI"],
    imageSrc: "/protege-chat-teaching.webp",
    imageAlt: "A screenshot of Protégé-Chat",
    href: "https://dinas-lab.vercel.app/",
    gitHubURL: "https://github.com/cbussick/cb-masterthesis",
    description: (
      <>
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
            The LLM explains a topic to the student and the student evaluates
            the explanation.
          </li>
        </ol>
        <p>
          {`I developed the Protégé-Chat as part of my
        master's thesis
        at the `}
          <a href="https://www.en.w-hs.de/" target="_blank" rel="noopener">
            WH
          </a>
          . It was built on top of the e-learning website DiNAs Lab which I
          co-developed.
        </p>
      </>
    ),
  },
  {
    title: "DiNAs Lab",
    techStack: ["React", "TypeScript", "Next.js", "Material UI", "Firebase"],
    imageSrc: "/stammbaumanalyse.webp",
    imageAlt: "A screenshot of DiNAs Lab",
    href: "https://dinas-lab.vercel.app/",
    gitHubURL: "https://github.com/cbussick/cb-masterthesis",
    description: (
      <p>
        {`DiNAs Lab is a learning platform where students can study biology. It features multiple different exercise types and aims to gamify the learning process. DiNAs Lab was developed by our group of 5 students at the `}
        <a href="https://www.en.w-hs.de/" target="_blank" rel="noopener">
          WH
        </a>
        {` as part of our master's degree.`}
      </p>
    ),
  },
  {
    title: "VR Office Exercises",
    techStack: ["Unreal Engine", "Meta Quest 2"],
    imageSrc: "/vr-office-exercises-farm.webp",
    imageAlt: "A screenshot of VR Office Exercises",
    href: "https://www.youtube.com/watch?v=L4YNOIWra-A",
    description: (
      <p>
        Physical inactivity is a major cause of mortality worldwide. But
        motivating yourself to get up and exercise can often be hard. How about
        you put on a VR headset and do meaningful tasks in a virtual world while
        also doing exercise in the real world? For this reason I developed the
        VR Office Exercises as part of my bachelor thesis at the{" "}
        <a href="https://www.en.w-hs.de/" target="_blank" rel="noopener">
          WH
        </a>
        . The player finds himself on a farm, helping an elderly farmer with
        harvesting and other tasks.
      </p>
    ),
  },
  {
    title: "Virtual Boxing Simulator",
    techStack: ["Unreal Engine", "Meta Quest"],
    imageSrc: "/vbs-logo.svg",
    imageAlt: "The Virtual Boxing Simulator logo",
    isLogoImage: true,
    href: "https://www.youtube.com/watch?v=3zIW1LwYYDQ",
    description: (
      <p>
        A game simulating the sport of boxing in virtual reality. This project
        was made by our group of 6 students from the{" "}
        <a href="https://www.en.w-hs.de/" target="_blank" rel="noopener">
          WH
        </a>
        {` as part of our bachelor's degree. It features a rhythm-based game mode
        with multiple difficulties, progress recording and character
        customization.`}
      </p>
    ),
  },
  {
    title: "cbussick.dev",
    techStack: ["TypeScript", "React", "CSS Modules", "Vite"],
    imageSrc: "/personal-website.webp",
    imageAlt: "A screenshot of my personal website",
    href: "https://cbussick.dev",
    gitHubURL: "https://github.com/cbussick/cb-homepage",
    ctaText: "Infinite loop 👀",
    description: (
      <p>
        The website you are currently on! My place on the Internet. I
        occasionally use this website to play around with new technologies or
        designs.
      </p>
    ),
  },
];
