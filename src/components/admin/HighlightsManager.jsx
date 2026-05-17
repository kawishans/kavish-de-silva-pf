import { useEffect, useState } from 'react';
import { useHighlights } from '../../context/HighlightsContext.jsx';
import { useAssetManifest } from '../../hooks/useAssetManifest.js';

const inputClass =
  'w-full rounded-xl px-3 py-2 text-sm bg-white/10 dark:bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40';

const labels = { music: 'Music Production card', design: 'Visual Design card' };

export default function HighlightsManager() {
  const { highlights, updateHighlight, resetHighlights, defaultHighlights } = useHighlights();
  const manifest = useAssetManifest();
  const images = manifest.images ?? [];

  const [drafts, setDrafts] = useState(() =>
    Object.fromEntries(highlights.map((h) => [h.id, { ...h }])),
  );

  useEffect(() => {
    setDrafts(Object.fromEntries(highlights.map((h) => [h.id, { ...h }])));
  }, [highlights]);

  const setDraft = (id, field, value) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const saveCard = (id) => {
    const draft = drafts[id];
    if (!draft?.title?.trim()) return;
    updateHighlight(id, {
      title: draft.title.trim(),
      desc: draft.desc.trim(),
      to: draft.to.trim() || '/',
      image: draft.image,
    });
  };

  const handleReset = () => {
    resetHighlights();
    setDrafts(Object.fromEntries(defaultHighlights.map((h) => [h.id, { ...h }])));
  };

  return (
    <section className="glass-panel p-6 space-y-6">
      <div>
        <h2 className="font-space font-semibold text-lg">What I do cards</h2>
        <p className="text-description text-sm text-[var(--text-muted)]">
          Edit titles, descriptions, links, and 1×1 images for the two home page cards. Add images to{' '}
          <code className="text-primary font-space">my assets/images</code> then restart dev to sync.
        </p>
      </div>

      <div className="space-y-8">
        {highlights.map((card) => {
          const draft = drafts[card.id] ?? card;
          const imageOptions =
            images.length > 0
              ? images
              : draft.image
                ? [draft.image]
                : [];

          return (
            <div key={card.id} className="border border-white/10 rounded-xl p-4 space-y-4">
              <h3 className="font-space font-medium">{labels[card.id]}</h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="aspect-square w-32 sm:w-36 shrink-0 rounded-xl overflow-hidden bg-black/20">
                  {draft.image ? (
                    <img src={draft.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[var(--text-muted)]">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs mb-1 font-space">Title</label>
                    <input
                      className={inputClass}
                      value={draft.title}
                      onChange={(e) => setDraft(card.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs mb-1 font-space">Description</label>
                    <textarea
                      className={`${inputClass} resize-y min-h-[72px]`}
                      value={draft.desc}
                      onChange={(e) => setDraft(card.id, 'desc', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-space">Link path</label>
                    <input
                      className={inputClass}
                      value={draft.to}
                      onChange={(e) => setDraft(card.id, 'to', e.target.value)}
                      placeholder="/music"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-space">Image</label>
                    <select
                      className={inputClass}
                      value={draft.image}
                      onChange={(e) => setDraft(card.id, 'image', e.target.value)}
                    >
                      {imageOptions.map((src) => (
                        <option key={src} value={src}>
                          {decodeURIComponent(src.split('/').pop())}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button type="button" className="btn-primary text-sm" onClick={() => saveCard(card.id)}>
                Save {labels[card.id]}
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className="btn-ghost text-sm" onClick={handleReset}>
        Reset cards to defaults
      </button>
    </section>
  );
}
