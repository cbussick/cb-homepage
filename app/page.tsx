import { CBTextGradient } from "@/components/ui/CBTextGradient";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

const pictureSize = 400;

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <NavigationMenu className="flex gap-2">
        <CBTextGradient>Christopher Bussick</CBTextGradient>
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="https://github.com/cbussick" target="_blank">
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={20}
                      height={20}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Me on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 items-center max-w-2xl">
          <h1>Hey 👋🏻</h1>
          <p>{`I'm Christopher. I like to do software development in whatever form - be it for the web, using LLMs, VR or something else. Besides that, I like doing sports, music production, reading manga and watching anime.`}</p>
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
      </div>
    </div>
  );
}
