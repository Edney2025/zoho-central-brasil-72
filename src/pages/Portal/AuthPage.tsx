
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, signIn } = useAuth();
  
  useEffect(() => {
    // Automatically redirect if already logged in
    if (user) {
      navigate('/portal/dashboard');
      return;
    }
    
    // If not logged in, automatically sign in without showing the form
    const autoLogin = async () => {
      if (!isLoading && !user) {
        const { error } = await signIn('admin@gmail.com', '123456789');
        
        if (error) {
          toast({
            title: "Erro ao acessar",
            description: "Ocorreu um problema ao tentar acessar o portal",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login automático",
            description: "Bem-vindo ao Portal do Cliente"
          });
          navigate('/portal/dashboard');
        }
      }
    };
    
    autoLogin();
  }, [user, isLoading, signIn, navigate]);

  // Show a simple loading message while the automatic login happens
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Portal do Cliente</h1>
        <p className="text-muted-foreground mb-8">Acessando automaticamente...</p>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthPage;
