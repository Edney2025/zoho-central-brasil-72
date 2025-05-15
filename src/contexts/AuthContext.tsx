import { createContext, useContext, useState, useEffect } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

// Define the AuthContext type
interface AuthContextType {
  supabaseClient: SupabaseClient | null;
  session: Session | null;
  user: Session['user'] | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  supabaseClient: null,
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

// AuthProvider component
export function AuthProvider({ children, supabaseClient }: { children: React.ReactNode; supabaseClient: SupabaseClient }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
    }).finally(() => {
      setIsLoading(false);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });
  }, [supabaseClient]);

  useEffect(() => {
    if (user) {
      // Check if customer data exists
      supabase
        .from('customers' as any)
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error && error.code === 'PGRST116') {
            // No customer data exists, so create it
            supabase.from('customers').insert([
              {
                user_id: user.id,
                email: user.email,
              },
            ]);
          }
        });
    }
  }, [user]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  const value: AuthContextType = { supabaseClient, session, user, isLoading, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const supabase = new SupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
