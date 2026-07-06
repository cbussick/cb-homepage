import { Header } from "@/components/header/Header";
import { HeroSection } from "@/components/hero-section/HeroSection";
import { ProjectSection } from "@/components/project-section/ProjectSection";
import { ReachOutSection } from "@/components/reach-out-section/ReachOutSection";
import styles from "./App.module.css";

export function App() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Header />
        <HeroSection />
        <ProjectSection />
        <ReachOutSection />
      </div>
    </main>
  );
}
