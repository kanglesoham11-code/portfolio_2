import { GlassHero } from "@/components/glass-hero";
import { StickyNav } from "@/components/sticky-nav";
import { NavDock } from "@/components/nav-dock";
import { MiniSoham } from "@/components/mini-soham";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { AchievementsSection } from "@/components/achievements-section";
import { EducationSection } from "@/components/education-section";
import { CertificatesSection } from "@/components/certificates-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <GlassHero />
      <StickyNav />
      <NavDock />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <EducationSection />
      <CertificatesSection />
      <ContactSection />
      <MiniSoham />
    </main>
  );
}
