
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: { email: string };
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // Usuário mockado para desenvolvimento sem autenticação
  const mockUser = { email: 'desenvolvimento@exemplo.com' };
  
  useEffect(() => {
    // Simulando carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={{ user: mockUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
