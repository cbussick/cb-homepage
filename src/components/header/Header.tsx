import { MobileDrawer } from "@/components/mobile-drawer/MobileDrawer";
import { GitHubIcon } from "@/components/shared/CBGitHubIcon";
import { CBTextGradient } from "@/components/shared/CBTextGradient";
import type { NavItem } from "@/components/shared/navItem";
import { Tooltip } from "@/components/shared/Tooltip";
import { Hammer, MessageCircleMore } from "lucide-react";
import styles from "./Header.module.css";

const navItems: NavItem[] = [
  { title: "Projects", href: "#projects", icon: Hammer },
  { title: "Reach out", href: "#reach-out", icon: MessageCircleMore },
];

export function Header() {
  return (
    <div className={styles.header}>
      <MobileDrawer items={navItems} />
      <nav>
        <ul className={styles.navList}>
          <li>
            <CBTextGradient>Christopher Bussick</CBTextGradient>
          </li>
          {navItems.map((item) => (
            <li key={item.title} className={styles.desktopOnly}>
              <a href={item.href} className={styles.navLink}>
                <item.icon className={styles.icon} />
                <span className={styles.label}>
                  <span className={styles.labelText}>{item.title}</span>
                  <span className={styles.labelGradient}>{item.title}</span>
                </span>
              </a>
            </li>
          ))}
          <li className={styles.desktopOnly}>
            <Tooltip label="Me on GitHub">
              <a
                href="https://github.com/cbussick"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon className={styles.githubIcon} />
              </a>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </div>
  );
}
