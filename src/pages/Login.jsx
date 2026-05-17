import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If already authenticated as an admin, redirect immediately to administrative dashboard
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      // Wait for AuthState to update, AuthProvider handles verification
      navigate('/admin');
    } catch (err) {
      console.error('Authentication Error:', err);
      // Standardize user-friendly error messages
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid administrator email or password credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Access temporarily restricted.');
      } else {
        setError('Failed to authenticate. Please verify credentials and network connection.');
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center w-full px-4 relative">
      {/* Background Decorative Mesh lights */}
      <div className="absolute top-[20%] left-[20%] w-[25rem] h-[25rem] rounded-full bg-primary/5 filter blur-[100px] pointer-events-none z-[-1]" />
      <div className="absolute bottom-[20%] right-[20%] w-[25rem] h-[25rem] rounded-full bg-secondary/5 filter blur-[100px] pointer-events-none z-[-1]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
          {/* Edge glow effect */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-space font-semibold tracking-tight mb-2">
              Secure Gateway
            </h1>
            <p className="text-sm font-ibm text-[var(--text-muted)]">
              Authorized Administrator Sign In
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 text-xs font-ibm leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-space font-medium tracking-wide uppercase text-[var(--text-muted)]">
                Admin Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={submitting}
                className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 
                  text-[var(--text-base)] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-space font-medium tracking-wide uppercase text-[var(--text-muted)]">
                Password Key
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={submitting}
                className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 
                  text-[var(--text-base)] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 rounded-xl flex items-center justify-center font-space font-medium transition-all duration-300 relative overflow-hidden"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
