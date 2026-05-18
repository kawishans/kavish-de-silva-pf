import { motion } from 'framer-motion';
import ClientsMarquee from '../components/ClientsMarquee.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

const getFaviconUrl = (url) => {
  if (!url) return '';
  try {
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const domain = new URL(cleanUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch (e) {
    return '';
  }
};

const renderIcon = (url, platform, sizeClass = 'w-5 h-5') => {
  const src = getFaviconUrl(url);
  if (!src) {
    return (
      <svg className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return (
    <img
      src={src}
      alt={platform}
      className={`${sizeClass} object-contain rounded-md`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%23888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
      }}
      loading="lazy"
    />
  );
};

export default function Contact() {
  const { contactDetails, socialLinks } = usePortfolio();

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title mb-2 text-center lg:text-left"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="section-subtitle text-center lg:text-left mx-auto lg:mx-0"
        >
          Get in touch for music production, visual design, or creative collaboration inquiries.
        </motion.p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
        {/* Left Column: Image & Direct Channels */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 md:p-8 space-y-6 lg:col-span-5"
        >
          {/* Dynamic contact image */}
          <div className="overflow-hidden rounded-xl bg-black/10 aspect-[4/3] relative group shadow-lg border border-white/10 dark:border-white/5">
            <img
              src="/assets/images/Contact.jpg"
              alt="Kavish De Silva - Music Producer and Vocalist Studio Session"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Channels list */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-tight border-b border-white/10 dark:border-white/5 pb-2 text-[var(--text-base)]">
              Contact details
            </h3>
            
            <div className="space-y-4">
              {/* Email details */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-ibm text-[var(--text-muted)] uppercase tracking-wider font-semibold">Email</span>
                  <a href={`mailto:${contactDetails?.email || 'hello@kavishdesilva.com'}`} className="text-base font-medium hover:text-[var(--color-primary)] transition-colors text-[var(--text-base)]">
                    {contactDetails?.email || 'hello@kavishdesilva.com'}
                  </a>
                </div>
              </div>

              {/* Phone details */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.84c0 4.865 3.935 8.8 8.8 8.8h.084c.85 0 1.561-.6 1.747-1.427l.343-1.543a1.5 1.5 0 0 0-.96-1.69l-1.82-.73a1.5 1.5 0 0 0-1.74.52l-.84.84a12.012 12.012 0 0 1-4.78-4.78l.84-.84a1.5 1.5 0 0 0 .52-1.74l-.73-1.82a1.5 1.5 0 0 0-1.69-.96l-1.543.343A1.747 1.747 0 0 0 2.25 5.06v.084Z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-ibm text-[var(--text-muted)] uppercase tracking-wider font-semibold">Call or WhatsApp</span>
                  <div className="flex flex-col space-y-0.5">
                    {contactDetails?.phonePrimary && (
                      <a href={`tel:${contactDetails.phonePrimary}`} className="text-base font-medium hover:text-[var(--color-primary)] transition-colors text-[var(--text-base)]">
                        {contactDetails.phonePrimary} <span className="text-xs text-[var(--text-muted)] font-normal font-ibm">(Primary)</span>
                      </a>
                    )}
                    {contactDetails?.phoneBusiness && (
                      <a href={`tel:${contactDetails.phoneBusiness}`} className="text-base font-medium hover:text-[var(--color-primary)] transition-colors text-[var(--text-base)]">
                        {contactDetails.phoneBusiness} <span className="text-xs text-[var(--text-muted)] font-normal font-ibm">(Business)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Location details */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-ibm text-[var(--text-muted)] uppercase tracking-wider font-semibold">Location</span>
                  <span className="text-base font-medium text-[var(--text-base)]">
                    {contactDetails?.location || 'Colombo, Sri Lanka'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Social Media Links */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-7"
        >
          <div className="glass-panel p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-semibold tracking-tight border-b border-white/10 dark:border-white/5 pb-2 text-[var(--text-base)]">
              Social Media Links
            </h3>
            
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Connect with me on official platforms. I regularly share work-in-progress tracks, design projects, creative experiments, and behind-the-scenes updates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/20 hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-white/10 dark:bg-black/30 border border-white/10 dark:border-white/5 text-[var(--text-base)] group-hover:bg-[var(--color-primary)] group-hover:text-black group-hover:border-[var(--color-primary)] transition-all duration-300 shrink-0 flex items-center justify-center">
                    {renderIcon(link.url, link.platform, 'w-5 h-5')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold tracking-wide text-[var(--text-base)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                      {link.platform}
                    </span>
                    <span className="block text-xs text-[var(--text-muted)] truncate font-ibm">
                      {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <ClientsMarquee />
    </div>
  );
}
