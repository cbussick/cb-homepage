import { MobileDrawer } from "@/components/mobile-drawer/MobileDrawer";
import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { TextGradient } from "@/components/shared/TextGradient";
import type { NavItem } from "@/components/shared/navItem";
import { Tooltip } from "@/components/shared/Tooltip";
import styles from "./Header.module.css";

const navItems: NavItem[] = [
  { title: "Projects", href: "#projects" },
  { title: "Reach out", href: "#reach-out" },
];

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <MobileDrawer items={navItems} />
        <nav>
          <ul className={styles.navList}>
            <li>
              <TextGradient className={styles.brand}>
                Christopher Bussick
              </TextGradient>
            </li>
            {navItems.map((item) => (
              <li key={item.title} className={styles.desktopOnly}>
                <a href={item.href} className={styles.navLink}>
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
                  aria-label="Me on GitHub"
                >
                  <GitHubIcon className={styles.githubIcon} />
                </a>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
