import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div className="sh">
        <span className="sh__num">{number}</span>
        <h2 className="sh__title">{title}</h2>
        {subtitle && <p className="sh__sub">{subtitle}</p>}
      </div>
    </ScrollReveal>
  );
}
