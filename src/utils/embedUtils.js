/** Parse YouTube / SoundCloud / Spotify URLs and embed codes for iframes */

const SOUNDCLOUD_WIDGET = 'https://w.soundcloud.com/player/';

export function parseEmbedUrl(input = '') {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const iframeSrc = extractIframeSrc(trimmed);
  const candidate = iframeSrc || trimmed;

  if (/w\.soundcloud\.com\/player/i.test(candidate)) {
    const fromWidget = parseSoundCloudWidgetSrc(candidate);
    if (fromWidget) return fromWidget;
  }

  const youtubeId = getYouTubeId(candidate);
  if (youtubeId) {
    return {
      type: 'youtube',
      embedSrc: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  const trackUrl = normalizeSoundCloudTrackUrl(candidate);
  if (trackUrl) {
    return buildSoundCloudEmbed(trackUrl);
  }

  // Spotify Support
  const spotifyMatch = candidate.match(/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/i);
  if (spotifyMatch) {
    const type = spotifyMatch[1];
    const id = spotifyMatch[2];
    return {
      type: 'spotify',
      embedSrc: `https://open.spotify.com/embed/${type}/${id}`,
      height: 352,
    };
  }

  return null;
}

function extractIframeSrc(html) {
  const match = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function parseSoundCloudWidgetSrc(widgetSrc) {
  try {
    const absolute = widgetSrc.startsWith('//') ? `https:${widgetSrc}` : widgetSrc;
    const parsed = new URL(absolute.startsWith('http') ? absolute : `https://${absolute}`);
    const trackUrl = parsed.searchParams.get('url');
    if (!trackUrl) return null;
    return buildSoundCloudEmbed(trackUrl);
  } catch {
    return null;
  }
}

function normalizeSoundCloudTrackUrl(input) {
  if (/api\.soundcloud\.com\/tracks/i.test(input)) {
    try {
      const absolute = input.startsWith('http') ? input : `https://${input}`;
      return new URL(absolute).href;
    } catch {
      return input;
    }
  }

  if (!/soundcloud\.com/i.test(input)) return null;

  let href = input;
  if (!/^https?:\/\//i.test(href)) {
    href = `https://${href.replace(/^\/+/, '')}`;
  }

  try {
    const parsed = new URL(href);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host !== 'soundcloud.com' && !host.endsWith('.soundcloud.com')) return null;

    // Keep full path (includes private track secret tokens like /s-xxxxx)
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return null;
  }
}

function buildSoundCloudEmbed(trackUrl) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: '#00e0d5',
    auto_play: 'false',
    hide_related: 'false',
    show_comments: 'true',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'true',
    visual: 'true',
  });

  return {
    type: 'soundcloud',
    embedSrc: `${SOUNDCLOUD_WIDGET}?${params.toString()}`,
    height: 300,
  };
}

export function getYouTubeId(url) {
  if (/soundcloud\.com/i.test(url) || /w\.soundcloud\.com/i.test(url) || /spotify\.com/i.test(url)) {
    return null;
  }

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1).split('/')[0];
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2];
      }
      return parsed.searchParams.get('v');
    }
  } catch {
    // not a full URL
  }

  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return shortMatch[1];

  const idMatch = url.match(/(?:v=|\/embed\/)([\w-]{11})/);
  return idMatch ? idMatch[1] : null;
}

export function mediaKindFromPath(path = '') {
  const ext = path.split('.').pop()?.toLowerCase();
  if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
  return 'file';
}
