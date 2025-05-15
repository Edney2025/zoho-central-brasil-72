
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { localStorageService } from '@/services/localStorageService';

// Import our new components
import PortalSidebar from './components/layout/PortalSidebar';
import PortalHeader from './components/layout/PortalHeader';
import MobileFooterNav from './components/layout/MobileFooterNav';
import LoadingPortalLayout from './components/layout/LoadingPortalLayout';

export const PortalLayout = () => {
  const { user, isLoading, signOut, isCustomer } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // Initialize localStorage service
  useEffect(() => {
    localStorageService.initializeDefaultData();
  }, []);
  
  // Check if user is logged in and is a customer
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/portal/login');
    } else if (!isLoading && user && !isCustomer) {
      // If user is logged in but not a customer, redirect to profile update
      navigate('/portal/profile');
      toast({
        title: "Por favor, complete seu cadastro",
        description: "Complete seu perfil para utilizar todos os recursos do portal",
        duration: 5000,
      });
    }
  }, [user, isLoading, navigate, isCustomer]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/portal/login');
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingPortalLayout />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <PortalSidebar user={user} onSignOut={handleSignOut} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <PortalHeader 
          user={user} 
          mobileNavOpen={mobileNavOpen} 
          setMobileNavOpen={setMobileNavOpen} 
          onSignOut={handleSignOut} 
        />

        {/* Access to e-commerce banner */}
        <div className="bg-primary/10 p-2 text-center">
          <span className="text-sm">
            Acesse nossa <a href="/ecommerce/produtos" className="font-bold text-primary hover:underline">Loja Online</a> com produtos novos e usados!
          </span>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
        
        {/* Mobile Footer Navigation */}
        <MobileFooterNav />
      </div>
    </div>
  );
};

export default PortalLayout;
