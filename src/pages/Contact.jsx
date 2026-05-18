import { motion } from 'framer-motion';
import ClientsMarquee from '../components/ClientsMarquee.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

function getSocialIcon(iconName) {
  const name = (iconName || '').toLowerCase().trim();
  switch (name) {
    case 'github':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      );
    case 'spotify':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .007c-6.627 0-12 5.372-12 12s5.373 12 12 12 12-5.372 12-12-5.373-12-12-12zm5.49 17.31c-.237.387-.743.51-1.13.273-3.156-1.93-7.13-2.367-11.807-1.302-.44.1-.877-.17-.977-.61-.1-.44.17-.878.61-.978 5.127-1.17 9.508-.68 13.03 1.48.388.238.51.743.274 1.13zm1.464-3.26c-.3.486-.933.645-1.42.345-3.614-2.222-9.126-2.862-13.4-1.564-.545.166-1.114-.144-1.28-.69-.166-.546.144-1.115.69-1.28 4.887-1.483 10.963-.77 15.065 1.76.487.3.646.932.346 1.42zm.127-3.39c-4.333-2.573-11.47-2.807-15.577-1.56-.666.202-1.376-.172-1.578-.838-.202-.666.172-1.376.838-1.578 4.747-1.44 12.634-1.16 17.625 1.803.6.356.8.133.444.733-.356.6-.134.8-.733.44zm0 0"/>
        </svg>
      );
    case 'soundcloud':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.333 11c-.736 0-1.333.645-1.333 1.44v1.12c0 .795.597 1.44 1.333 1.44h.334v-4h-.334zm1 .5v3h.334v-3h-.334zm1-.5v4h.334V11h-.334zm1 .5v3h.334v-3h-.334zm1-.5v4h.334V11h-.334zm1-.5v4.5h.334V10.5h-.334zm1 .5v3.5h.334V11h-.334zm1-1.5v5.5h.334V9.5h-.334zm1 1v4.5h.334V10.5h-.334zm1-1.5v6.5h.334V9h-.334zm1 .5v5.5h.334V9.5H11.5zm1-2.5v9h.334V7h-.334zm1 1.5v7.5h.334V8.5h-.334zm1 1v6.5h.334V9.5h-.334zm1-3.5v11.5h.334V5h-.334zm1 1.5v10h.334v-10h-.334zm1-.5v10.5h.334V6h-.334zm1 2h.334v8.5h-.334zm1 3.5c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      );
    case 'behance':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12.002c0-5.522-4.478-10-10-10s-10 4.478-10 10 4.478 10 10 10 10-4.478 10-10zM8.285 7.842c1.787 0 2.25.961 2.25 1.95 0 .97-.738 1.488-1.578 1.62.99.191 1.761.765 1.761 1.835 0 1.256-.975 2.146-2.825 2.146H4.25V7.842h4.035zm11.465 5.568h-5.076c.09 1.134.908 1.71 1.952 1.71.867 0 1.41-.36 1.73-.865h1.27c-.446 1.272-1.56 2.055-3 2.055-2.28 0-3.32-1.523-3.32-3.272 0-2.025 1.248-3.322 3.168-3.322 2.085 0 3.276 1.343 3.276 3.322v.372zm-3.136-2.52c-.93 0-1.636.575-1.846 1.442h3.69c-.066-.888-.732-1.442-1.844-1.442zM5.5 8.942v1.95h2.15c.675 0 1.162-.255 1.162-.975 0-.705-.487-.975-1.162-.975H5.5zm0 3.013v2.247h2.385c.78 0 1.29-.3 1.29-1.125 0-.825-.51-1.122-1.29-1.122H5.5zm11.12-3.113h3.5v.75h-3.5v-.75z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
        </svg>
      );
  }
}

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
                  <div className="p-3 rounded-lg bg-white/10 dark:bg-black/30 border border-white/10 dark:border-white/5 text-[var(--text-base)] group-hover:bg-[var(--color-primary)] group-hover:text-black group-hover:border-[var(--color-primary)] transition-all duration-300 shrink-0">
                    {getSocialIcon(link.icon)}
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
