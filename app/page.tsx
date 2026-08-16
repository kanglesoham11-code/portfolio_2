import { GlassHero } from "@/components/glass-hero";
import { StickyNav } from "@/components/sticky-nav";
import { NavDock } from "@/components/nav-dock";
import { AboutSection } from "@/components/about-section";
import { CertificateInfiniteSlider } from "@/components/certificate-infinite-slider";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { AchievementsSection } from "@/components/achievements-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <GlassHero />
      <StickyNav />
      <NavDock />
      <CertificateInfiniteSlider />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
