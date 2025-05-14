
import React from 'react';
import { AppSidebar } from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const MainLayout = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-background">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Central Brasil</h1>
            <ThemeSwitcher />
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
