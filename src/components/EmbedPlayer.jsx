import { parseEmbedUrl } from '../utils/embedUtils.js';

export default function EmbedPlayer({ url, title }) {
  const embed = parseEmbedUrl(url);

  if (!embed) {
    return (
      <div className="rounded-xl border border-dashed border-white/20 flex items-center justify-center text-sm text-[var(--text-muted)] p-4 text-center min-h-[120px]">
        Invalid or missing embed URL. Paste a SoundCloud, Spotify, or YouTube URL.
      </div>
    );
  }

  if (embed.type === 'soundcloud') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
        <iframe
          title={title || 'SoundCloud player'}
          width="100%"
          height={embed.height}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          src={embed.embedSrc}
          className="w-full block"
          loading="lazy"
        />
      </div>
    );
  }

  if (embed.type === 'spotify') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30">
        <iframe
          title={title || 'Spotify player'}
          src={embed.embedSrc}
          width="100%"
          height={embed.height}
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="w-full block"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-video">
      <iframe
        title={title || 'YouTube player'}
        src={embed.embedSrc}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
