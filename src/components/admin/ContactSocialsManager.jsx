import { useState, useEffect } from 'react';
import { usePortfolio, defaultSocialLinks } from '../../context/PortfolioContext.jsx';

const inputClass =
  'w-full rounded-xl px-3 py-2 text-sm bg-white/10 dark:bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 text-[var(--text-base)]';

export default function ContactSocialsManager() {
  const {
    contactDetails,
    socialLinks,
    updateContactDetails,
    updateSocialLinks,
  } = usePortfolio();

  // Contact Details state management
  const [email, setEmail] = useState(contactDetails?.email || '');
  const [phonePrimary, setPhonePrimary] = useState(contactDetails?.phonePrimary || '');
  const [phoneBusiness, setPhoneBusiness] = useState(contactDetails?.phoneBusiness || '');
  const [location, setLocation] = useState(contactDetails?.location || '');

  // Keep contact details inputs in sync with database load
  useEffect(() => {
    if (contactDetails) {
      setEmail(contactDetails.email || '');
      setPhonePrimary(contactDetails.phonePrimary || '');
      setPhoneBusiness(contactDetails.phoneBusiness || '');
      setLocation(contactDetails.location || '');
    }
  }, [contactDetails]);

  // Social Links state management
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (socialLinks) {
      setLinks([...socialLinks]);
    }
  }, [socialLinks]);

  // Contact Details Actions
  const handleSaveContact = async () => {
    await updateContactDetails({
      email: email.trim(),
      phonePrimary: phonePrimary.trim(),
      phoneBusiness: phoneBusiness.trim(),
      location: location.trim(),
    });
    alert('Contact Details saved successfully!');
  };

  // Social Links Actions
  const updateLink = (id, field, value) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const handleSaveSocials = async () => {
    // Clean up empty links, limit to 10, and assign sortOrder
    const cleanedLinks = links
      .filter((l) => l.platform.trim() && l.url.trim())
      .slice(0, 10)
      .map((link, idx) => ({
        id: link.id,
        platform: link.platform.trim(),
        url: link.url.trim(),
        icon: link.icon || 'other',
        sortOrder: idx,
      }));

    await updateSocialLinks(cleanedLinks);
    alert('Social Media links updated successfully!');
  };

  const addLink = () => {
    if (links.length >= 10) {
      alert('You can manage up to 10 social links maximum.');
      return;
    }
    const newId = Date.now().toString();
    setLinks((prev) => [
      ...prev,
      { id: newId, platform: 'New Link', url: 'https://', icon: 'other', sortOrder: prev.length },
    ]);
  };

  const deleteLink = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const moveLink = (index, direction) => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= links.length) return;

    const list = [...links];
    const temp = list[index];
    list[index] = list[swapIndex];
    list[swapIndex] = temp;

    setLinks(list);
  };

  const handleResetSocials = () => {
    if (window.confirm('Reset social links to defaults? This will erase custom additions.')) {
      setLinks([...defaultSocialLinks]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact details section */}
      <section className="glass-panel p-6 md:p-8 space-y-6">
        <div>
          <h2 className="font-space font-semibold text-lg">📞 Contact Channels</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Manage your email address, phone numbers, and studio location shown on the Contact page.
          </p>
        </div>

        <hr className="border-white/10 dark:border-white/5" />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@kavishdesilva.com"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Studio Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Colombo, Sri Lanka"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Primary Phone / WhatsApp
            </label>
            <input
              type="text"
              value={phonePrimary}
              onChange={(e) => setPhonePrimary(e.target.value)}
              placeholder="+94 77 123 4567"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-space font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Business / Office Phone
            </label>
            <input
              type="text"
              value={phoneBusiness}
              onChange={(e) => setPhoneBusiness(e.target.value)}
              placeholder="+94 11 234 5678"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleSaveContact}
            className="btn-primary text-sm font-medium px-5 py-2.5 shadow-md shadow-primary/20 hover:shadow-primary/30"
          >
            Save Contact Details
          </button>
        </div>
      </section>

      {/* Social Links Manager section */}
      <section className="glass-panel p-6 md:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-space font-semibold text-lg">🔗 Social Media Links</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Manage up to 10 social links displayed beautifully with icons in your footer.
            </p>
          </div>
          <button
            type="button"
            onClick={addLink}
            disabled={links.length >= 10}
            className="btn-ghost text-sm px-4 py-2 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Add Social Link ({links.length}/10)
          </button>
        </div>

        <hr className="border-white/10 dark:border-white/5" />

        {links.length === 0 ? (
          <div className="text-center py-8 text-sm text-[var(--text-muted)] bg-white/5 rounded-2xl border border-white/5">
            No social links added yet. Click "Add Social Link" above to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link, idx) => (
              <div
                key={link.id}
                className="flex items-center gap-3 border border-white/10 p-4 rounded-2xl bg-white/5 dark:bg-black/10 transition-all duration-300"
              >
                {/* Reordering Controls */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveLink(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 hover:bg-white/10 rounded text-[var(--text-muted)] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLink(idx, 'down')}
                    disabled={idx === links.length - 1}
                    className="p-1 hover:bg-white/10 rounded text-[var(--text-muted)] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    ▼
                  </button>
                </div>

                {/* Input Fields */}
                <div className="grid gap-3 grid-cols-1 md:grid-cols-12 flex-1">
                  {/* Platform Name */}
                  <div className="md:col-span-3">
                    <label className="block text-[10px] mb-1 font-space text-[var(--text-muted)] uppercase">
                      Platform
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={link.platform}
                      onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                      placeholder="e.g. SoundCloud"
                    />
                  </div>

                  {/* URL */}
                  <div className="md:col-span-6">
                    <label className="block text-[10px] mb-1 font-space text-[var(--text-muted)] uppercase">
                      URL
                    </label>
                    <input
                      type="url"
                      className={inputClass}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Icon choice */}
                  <div className="md:col-span-3">
                    <label className="block text-[10px] mb-1 font-space text-[var(--text-muted)] uppercase">
                      Icon representation
                    </label>
                    <select
                      className={inputClass}
                      value={link.icon || 'other'}
                      onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                      <option value="spotify">Spotify</option>
                      <option value="soundcloud">SoundCloud</option>
                      <option value="youtube">YouTube</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="facebook">Facebook</option>
                      <option value="behance">Behance</option>
                      <option value="other">Generic Link / Globe</option>
                    </select>
                  </div>
                </div>

                {/* Trash/Delete button */}
                <button
                  type="button"
                  onClick={() => deleteLink(link.id)}
                  className="p-3 shrink-0 rounded-xl hover:bg-red-500/10 text-red-500 hover:text-red-400 border border-transparent hover:border-red-500/20"
                  title="Remove Link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSaveSocials}
            className="btn-primary text-sm font-medium px-5 py-2.5 shadow-md shadow-primary/20 hover:shadow-primary/30"
          >
            Save Social Media Links
          </button>
          <button
            type="button"
            onClick={handleResetSocials}
            className="btn-ghost text-sm px-4 py-2 hover:bg-white/5 text-[var(--text-muted)] hover:text-white"
          >
            Reset to defaults
          </button>
        </div>
      </section>
    </div>
  );
}
