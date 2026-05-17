import { mediaKindFromPath, parseEmbedUrl, getYouTubeId, ensureHttps } from '../utils/embedUtils.js';

function resolveMediaSrc(src) {
  if (!src) return '';
  const secureSrc = ensureHttps(src);
  if (secureSrc.startsWith('http') || secureSrc.startsWith('/') || secureSrc.startsWith('assets/')) {
    return secureSrc.startsWith('assets/') ? `/${secureSrc}` : secureSrc;
  }
  return `/assets/pf_items/${secureSrc}`;
}

export default function DesignMedia({
  src,
  title,
  thumbnailUrl,
  className = '',
  variant = 'thumbnail',
}) {
  const isViewer = variant === 'viewer';
  const resolved = resolveMediaSrc(src);
  const embed = parseEmbedUrl(resolved);

  // If a custom thumbnailUrl is provided and we are not in full viewer mode
  if (!isViewer && thumbnailUrl) {
    const resolvedThumb = resolveMediaSrc(thumbnailUrl);
    const isModalEmbed = embed && ['youtube', 'soundcloud', 'spotify'].includes(embed.type);

    return (
      <div className={`relative w-full h-full min-h-[200px] overflow-hidden bg-black/40 rounded-lg group ${className}`}>
        <img
          src={resolvedThumb}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {isModalEmbed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-black shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallbacks if no custom thumbnailUrl is provided
  if (embed && embed.type === 'youtube') {
    const youtubeId = getYouTubeId(resolved);
    const ytThumb = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : '';
    return (
      <div className={`relative w-full h-full min-h-[200px] overflow-hidden bg-black/40 rounded-lg group ${className}`}>
        <img
          src={ytThumb}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-black shadow-lg scale-95 group-hover:scale-100 transition-all duration-300">
            <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (embed && embed.type === 'soundcloud') {
    return (
      <div className={`relative w-full h-full min-h-[200px] overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-black/60 flex items-center justify-center rounded-lg group ${className}`}>
        <div className="w-20 h-20 rounded-full border border-white/10 bg-black/80 flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-2xl relative">
          <div className="w-6 h-6 rounded-full border border-white/20 bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <div className="absolute inset-1.5 rounded-full border border-white/5" />
          <div className="absolute inset-3 rounded-full border border-white/5" />
          <div className="absolute inset-4.5 rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <span className="absolute bottom-3 right-3 text-[10px] font-space px-2 py-0.5 rounded bg-black/60 text-secondary border border-secondary/10 uppercase tracking-wider">
          SoundCloud
        </span>
      </div>
    );
  }

  if (embed && embed.type === 'spotify') {
    return (
      <div className={`relative w-full h-full min-h-[200px] overflow-hidden bg-gradient-to-br from-green-500/10 to-black/80 flex items-center justify-center rounded-lg group ${className}`}>
        <div className="w-14 h-14 rounded-full bg-[#1DB954] flex items-center justify-center shadow-2xl relative transition-transform duration-300 group-hover:scale-110">
          <svg className="w-8 h-8 fill-black" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-1.007-.333.074-.66-.14-.735-.472-.074-.333.14-.66.472-.735 3.856-.847 7.152-.472 9.808 1.152.295.18.387.565.207.86zm1.224-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.185-.412.126-.845-.105-.97-.517-.126-.412.105-.845.517-.97 3.673-1.115 8.243-.576 11.343 1.332.367.227.487.708.26 1.075zm.107-2.846C14.492 8.81 8.85 8.623 5.59 9.61c-.516.156-1.054-.137-1.21-.653-.156-.516.137-1.054.653-1.21 3.754-1.14 10.016-.92 14.36 1.66.467.277.62.88.343 1.347-.277.467-.88.62-1.347.343z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <span className="absolute bottom-3 right-3 text-[10px] font-space px-2 py-0.5 rounded bg-black/60 text-[#1DB954] border border-[#1DB954]/10 uppercase tracking-wider">
          Spotify
        </span>
      </div>
    );
  }

  const kind = mediaKindFromPath(resolved);

  if (kind === 'video') {
    return (
      <video
        src={resolved}
        className={`w-full h-full ${isViewer ? 'object-contain' : 'object-cover'} ${className}`}
        muted={!isViewer}
        loop={isViewer}
        playsInline
        autoPlay={isViewer}
        controls={isViewer}
        preload={isViewer ? 'auto' : 'metadata'}
      />
    );
  }

  if (kind === 'image') {
    return (
      <img
        src={resolved}
        alt={title}
        className={`w-full h-full ${isViewer ? 'object-contain' : 'object-cover'} ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`flex items-center justify-center p-4 text-sm text-description ${className}`}>
      <a href={resolved} target="_blank" rel="noreferrer" className="text-primary hover:underline font-space">
        Open file
      </a>
    </div>
  );
}
