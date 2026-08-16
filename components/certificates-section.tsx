"use client";

import { InfiniteSlider } from '@/components/core/infinite-slider';
import { SectionHeader } from "./section-header";

export function CertificatesSection() {
  const certificates = [
    "Screenshot 2026-07-05 173825.png",
    "Screenshot 2026-07-05 174841.png",
    "Screenshot 2026-07-05 174903.png",
    "Screenshot 2026-07-05 175323.png",
    "Screenshot 2026-07-05 175354.png",
    "Screenshot 2026-07-05 175413.png",
    "Screenshot 2026-07-05 175433.png",
    "Screenshot 2026-07-05 175544.png",
    "Screenshot 2026-07-05 175613.png",
    "Screenshot 2026-07-05 175618.png"
  ];

  return (
    <section id="certificates" className="portfolio-section pb-16 md:pb-24">
      <SectionHeader number="06" title="Certificates" />

      <div className="mt-12 md:mt-16 w-full max-w-[100vw] overflow-hidden">
        <InfiniteSlider speed={60} speedOnHover={20} gap={24}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="relative group flex items-center justify-center overflow-hidden rounded-2xl border border-[rgba(170,190,215,0.25)] bg-[rgba(237,245,255,0.4)] backdrop-blur-sm p-4 transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-lg hover:border-[rgba(170,190,215,0.5)] w-[280px] md:w-[350px] aspect-[4/3]"
            >
              <img
                src={`/certificates/${cert}`}
                alt={`Certificate ${index + 1}`}
                className="h-full w-full object-contain rounded-xl opacity-90 transition-opacity duration-300 group-hover:opacity-100 mix-blend-multiply"
                loading="lazy"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
