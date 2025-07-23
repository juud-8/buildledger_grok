import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      console.log('Checking session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session data:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('Syncing user:', session.user.id, session.user.email);
        const { error } = await supabase.from('users').upsert({
          id: session.user.id,
          email: session.user.email,
        }, { onConflict: 'id' });
        if (error) console.error('Error syncing user:', error);
      }
      setLoading(false);
      console.log('Loading set to false, user:', user);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { error } = await supabase.from('users').upsert({
          id: session.user.id,
          email: session.user.email,
        }, { onConflict: 'id' });
        if (error) console.error('Error syncing user on auth change:', error);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);