import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kds-portfolio-highlights';

export const defaultHighlights = [
  {
    id: 'music',
    title: 'Music Production',
    desc: 'Beats, mixes, and sound design.',
    to: '/music',
    image: '/assets/images/me%20me.jpg',
  },
  {
    id: 'design',
    title: 'Visual Design',
    desc: 'Branding, UI, and creative direction.',
    to: '/design',
    image: '/assets/images/me%20me%2002.jpg',
  },
];

const HighlightsContext = createContext(null);

function readHighlights() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultHighlights;
    const parsed = JSON.parse(raw);
    return defaultHighlights.map((def) => {
      const saved = parsed.find((h) => h.id === def.id);
      return saved ? { ...def, ...saved } : def;
    });
  } catch {
    return defaultHighlights;
  }
}

export function HighlightsProvider({ children }) {
  const [highlights, setHighlights] = useState(readHighlights);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
  }, [highlights]);

  const updateHighlight = useCallback((id, updates) => {
    setHighlights((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const resetHighlights = useCallback(() => {
    setHighlights(defaultHighlights);
  }, []);

  const value = useMemo(
    () => ({ highlights, updateHighlight, resetHighlights, defaultHighlights }),
    [highlights, updateHighlight, resetHighlights],
  );

  return <HighlightsContext.Provider value={value}>{children}</HighlightsContext.Provider>;
}

export function useHighlights() {
  const ctx = useContext(HighlightsContext);
  if (!ctx) throw new Error('useHighlights must be used within HighlightsProvider');
  return ctx;
}
