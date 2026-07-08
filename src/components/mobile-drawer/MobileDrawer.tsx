import { PanelLeftIcon, XIcon } from "lucide-react";
import { useEffect, useRef, type MouseEvent } from "react";
import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { TextGradient } from "@/components/shared/TextGradient";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { NavItem } from "@/components/shared/navItem";
import styles from "./MobileDrawer.module.css";

interface MobileDrawerProps {
  items: NavItem[];
}

export function MobileDrawer({ items }: MobileDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) dialogRef.current?.close();
  }, [isMobile]);

  function closeDrawer() {
    dialogRef.current?.close();
  }

  function closeIfBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const clickedInsideDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!clickedInsideDialog) dialog.close();
  }

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Toggle navigation menu"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PanelLeftIcon />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={closeIfBackdropClick}
      >
        <div className={styles.header}>
          <TextGradient className={styles.title}>
            Christopher Bussick
          </TextGradient>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close navigation menu"
            onClick={closeDrawer}
          >
            <XIcon />
          </button>
        </div>
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className={styles.navLink}
                onClick={closeDrawer}
              >
                <span>{item.title}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/cbussick"
              target="_blank"
              rel="noopener"
              className={styles.navLink}
              onClick={closeDrawer}
            >
              <GitHubIcon className={styles.icon} />
              <span>Me on GitHub</span>
            </a>
          </li>
        </ul>
      </dialog>
    </>
  );
}
