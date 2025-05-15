
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAutoLogin = () => {
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
  
  return { isLoading, user };
};
