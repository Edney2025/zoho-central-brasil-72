
import { createContext, useContext, useState, useEffect } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Define the AuthContext type
interface AuthContextType {
  supabaseClient: SupabaseClient | null;
  session: Session | null;
  user: Session['user'] | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  isCustomer: boolean;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  supabaseClient: null,
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  isCustomer: false,
});

// AuthProvider component
export function AuthProvider({ children, supabaseClient }: { children: React.ReactNode; supabaseClient: SupabaseClient }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
    }).finally(() => {
      setIsLoading(false);
    });

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    // Simular um usuário admin para teste
    if (typeof window !== 'undefined') {
      // Verifica se o email e senha estão armazenados localmente
      const storedEmail = localStorage.getItem('admin_email');
      const storedPassword = localStorage.getItem('admin_password');
      
      // Se não estiverem armazenados, armazena o email e senha do admin
      if (!storedEmail || !storedPassword) {
        localStorage.setItem('admin_email', 'admin@gmail.com');
        localStorage.setItem('admin_password', '123456789');
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseClient]);

  useEffect(() => {
    if (user) {
      // Check if customer data exists
      supabaseClient
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error && error.code === 'PGRST116') {
            // No customer data exists, so create it
            supabaseClient.from('customers').insert([
              {
                user_id: user.id,
                email: user.email,
              },
            ]);
            setIsCustomer(false);
          } else if (data) {
            setIsCustomer(true);
          }
        });
    }
  }, [user, supabaseClient]);

  const signIn = async (email: string, password: string) => {
    try {
      // Verificar se é o usuário admin simulado
      const adminEmail = localStorage.getItem('admin_email');
      const adminPassword = localStorage.getItem('admin_password');
      
      if (email === adminEmail && password === adminPassword) {
        // Criar uma sessão fictícia para o admin
        const adminUser = {
          id: 'admin-id',
          email: adminEmail,
          role: 'admin',
        };
        
        // Simular uma sessão para o admin
        setUser(adminUser as any);
        setIsCustomer(true);
        
        return { error: null };
      }
      
      // Se não for o admin, continua com o fluxo normal do Supabase
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    navigate('/portal/login');
  };

  const value: AuthContextType = { 
    supabaseClient, 
    session, 
    user, 
    isLoading, 
    signOut,
    signIn,
    signUp,
    isCustomer
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a supabase client
export const supabase = new SupabaseClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);
