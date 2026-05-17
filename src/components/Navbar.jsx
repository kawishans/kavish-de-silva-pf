import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/music', label: 'Music' },
  { to: '/design', label: 'Design' },
  { to: '/tools', label: 'Tools' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) =>
  [
    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300',
    isActive
      ? 'text-primary bg-primary/10'
      : 'text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-white/10 dark:hover:bg-white/5',
  ].join(' ');

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4
          backdrop-blur-md bg-white/10 dark:bg-black/20
          border border-white/10 dark:border-white/5 shadow-xl rounded-2xl"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <NavLink to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img
              src={isDark ? '/logo-dark.svg' : '/logo.svg'}
              alt="Kavish De Silva"
              className="h-9 w-auto"
              width={120}
              height={40}
            />
          </NavLink>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-ghost p-2.5"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v2m0 14v2M5.64 5.64l1.41 1.41m10.9 10.9l1.41 1.41M3 12h2m14 0h2M5.64 18.36l1.41-1.41m10.9-10.9l1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="md:hidden btn-ghost p-2.5"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/10 dark:border-white/5"
            >
              <ul className="flex flex-col gap-1 py-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={linkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
