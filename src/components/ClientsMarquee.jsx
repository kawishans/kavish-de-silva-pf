import { useAssetManifest } from '../hooks/useAssetManifest.js';

export default function ClientsMarquee({ title = 'Clients I\'ve worked with' }) {
  const { clients } = useAssetManifest();
  const logos = clients ?? [];

  if (!logos.length) return null;

  const track = [...logos, ...logos];

  return (
    <section className="py-10 md:py-14">
      <h2 className="text-center text-sm font-medium uppercase tracking-widest text-[var(--text-muted)] mb-8">
        {title}
      </h2>
      <div className="relative overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee gap-10 md:gap-16 items-center">
          {track.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className="h-12 md:h-16 w-auto max-w-[140px] object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
