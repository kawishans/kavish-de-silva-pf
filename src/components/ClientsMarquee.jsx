import { useAssetManifest } from '../hooks/useAssetManifest.js';

export default function ClientsMarquee({ title = 'Clients I\'ve worked with' }) {
  const { clients } = useAssetManifest();
  const logos = clients ?? [];

  if (!logos.length) return null;

  const track = [...logos, ...logos];

  return (
    <section className="py-10 md:py-14">
      <h2 className="text-center text-2xl md:text-3xl font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-10">
        {title}
      </h2>
      <div className="relative overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee gap-12 md:gap-20 items-center">
          {track.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className="h-[53px] md:h-[70px] w-auto max-w-[152px] object-contain opacity-80 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 invert dark:invert-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
