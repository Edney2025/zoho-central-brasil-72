
import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  ShoppingBag,
  FileText,
  MessageCircle,
  HelpCircle,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const PortalLayout = () => {
  const { user, loading, signOut, isCustomer } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/portal/login');
    } else if (!loading && user && !isCustomer) {
      // If user is logged in but not a customer, redirect to profile update
      navigate('/portal/profile');
    }
  }, [user, loading, navigate, isCustomer]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/portal/login');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px] mt-4" />
      </div>
    );
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/portal/dashboard' },
    { icon: ShoppingBag, label: 'Pedidos', path: '/portal/pedidos' },
    { icon: FileText, label: 'Orçamentos', path: '/portal/orcamentos' },
    { icon: MessageCircle, label: 'Suporte', path: '/portal/suporte' },
    { icon: HelpCircle, label: 'FAQ', path: '/portal/faq' },
    { icon: User, label: 'Meu Perfil', path: '/portal/profile' },
  ];

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : '??';

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="font-bold text-xl">Portal do Cliente</h1>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
            <Avatar>
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Cliente</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex md:hidden items-center justify-between p-4 border-b bg-background">
          <h1 className="font-bold text-lg">Portal do Cliente</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
        
        {/* Mobile footer navigation */}
        <nav className="md:hidden flex items-center justify-around border-t bg-background py-2">
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-1",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PortalLayout;
