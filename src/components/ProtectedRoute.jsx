import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

export default function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  // Show a premium glassmorphic loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          {/* Inner pulsating glow circle */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          {/* Frosted spinning wheel */}
          <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
        </div>
        <p className="font-space text-sm text-[var(--text-muted)] tracking-wider uppercase animate-pulse">
          Verifying authorization...
        </p>
      </div>
    );
  }

  // Show clean inline login gateway if not authenticated
  if (!user || !isAdmin) {
    return <Login />;
  }

  return children;
}
