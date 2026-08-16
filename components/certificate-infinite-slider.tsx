import { InfiniteSlider } from '@/components/core/infinite-slider';

export function CertificateInfiniteSlider() {
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
    <section className="py-16 md:py-24 overflow-hidden w-full max-w-full">
      <div className="mx-auto flex flex-col gap-6 max-w-[100vw]">
        <InfiniteSlider speed={60} speedOnHover={30} gap={32}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="relative group flex items-center justify-center overflow-hidden rounded-2xl border border-[rgba(170,190,215,0.25)] bg-[rgba(237,245,255,0.4)] backdrop-blur-sm p-2 transition-transform duration-500 ease-out hover:scale-[1.03] hover:shadow-lg hover:border-[rgba(170,190,215,0.5)]"
            >
              <img
                src={`/certificates/${cert}`}
                alt={`Certificate ${index + 1}`}
                className="h-[140px] md:h-[180px] w-auto object-contain rounded-xl opacity-90 transition-opacity duration-300 group-hover:opacity-100 mix-blend-multiply"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
