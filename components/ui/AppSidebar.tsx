import { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { GitHubIcon } from "./CBGitHubIcon";
import { CBTextGradient } from "./CBTextGradient";

export interface NavMenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function AppSidebar({ items }: { items: NavMenuItem[] }) {
  return (
    <Sidebar className="md:hidden">
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2">
          <CBTextGradient className="pl-2">Christopher Bussick</CBTextGradient>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="group/header-menu-item">
                      <item.icon className="group-hover/header-menu-item:text-primary transition-colors duration-300" />
                      <span className="relative">
                        <span className="transition-opacity duration-300 group-hover/header-menu-item:opacity-0">
                          {item.title}
                        </span>
                        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/header-menu-item:opacity-100 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="GitHub">
                <SidebarMenuButton asChild>
                  <Link
                    href="https://github.com/cbussick"
                    target="_blank"
                    className="group/header-menu-item"
                  >
                    <GitHubIcon className="group-hover/header-menu-item:text-primary transition-colors duration-300" />
                    <span className="relative">
                      <span className="transition-opacity duration-300 group-hover/header-menu-item:opacity-0">
                        Me on GitHub
                      </span>
                      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/header-menu-item:opacity-100 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Me on GitHub
                      </span>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
