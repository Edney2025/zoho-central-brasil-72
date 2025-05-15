
import React from 'react';
import { AppSidebar } from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const MainLayout = () => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-background">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Central Brasil</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/portal">
                  <ExternalLink className="mr-2 h-4 w-4" /> 
                  Portal do Cliente
                </Link>
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
