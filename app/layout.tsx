import { AppSidebar, NavMenuItem } from "@/components/ui/AppSidebar";
import { GitHubIcon } from "@/components/ui/CBGitHubIcon";
import { HeaderMenuItem } from "@/components/ui/CBHeaderMenuItem";
import { CBTextGradient } from "@/components/ui/CBTextGradient";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Hammer, MessageCircleMore } from "lucide-react";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christopher Bussick",
  description: "Christopher Bussick's personal website",
};

const items: NavMenuItem[] = [
  {
    title: "Projects",
    href: "#projects",
    icon: Hammer,
  },
  {
    title: "Reach out",
    href: "#reach-out",
    icon: MessageCircleMore,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable}`}>
        <SidebarProvider>
          <AppSidebar items={items} />

          <main className="flex flex-col items-center px-4 pt-4 pb-20 w-full">
            <div className="flex flex-col gap-10 max-w-5xl">
              <div className="flex gap-4 items-center">
                <SidebarTrigger className="md:hidden" />
                <NavigationMenu>
                  <NavigationMenuList className="flex gap-10">
                    <CBTextGradient>Christopher Bussick</CBTextGradient>
                    <HeaderMenuItem
                      icon={Hammer}
                      label="Projects"
                      href="#projects"
                      className="hidden md:block"
                    />
                    <HeaderMenuItem
                      icon={MessageCircleMore}
                      label="Reach out"
                      href="#reach-out"
                      className="hidden md:block"
                    />
                    <NavigationMenuItem className="hidden md:flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link
                              href="https://github.com/cbussick"
                              target="_blank"
                            >
                              <GitHubIcon className="text-foreground hover:text-primary transition-colors duration-300" />
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
              </div>

              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
