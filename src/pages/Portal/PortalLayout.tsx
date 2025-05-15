
import React, { useEffect, useState } from 'react';
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
  Bell,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

export const PortalLayout = () => {
  const { user, isLoading, signOut, isCustomer } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Seu orçamento foi aprovado', read: false },
    { id: 2, text: 'Atualize seus dados cadastrais', read: false },
    { id: 3, text: 'Novo status no seu pedido #12345', read: true }
  ]);
  
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px] mt-4" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/portal/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/portal/dashboard' },
    { icon: ShoppingBag, label: 'Pedidos', path: '/portal/pedidos' },
    { icon: FileText, label: 'Orçamentos', path: '/portal/orcamentos' },
    { icon: MessageCircle, label: 'Suporte', path: '/portal/suporte' },
    { icon: HelpCircle, label: 'FAQ', path: '/portal/faq' },
    { icon: User, label: 'Meu Perfil', path: '/portal/profile' },
  ];

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : '??';
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notificações",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
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
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-2">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="py-4">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted mb-4">
                    <Avatar>
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">Cliente</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileNavOpen(false)}
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
                    
                    <Button variant="ghost" className="w-full justify-start mt-4" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Sair
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="font-bold text-lg md:hidden">Portal do Cliente</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notificações</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllNotificationsAsRead}
                    className="text-xs h-7"
                  >
                    Marcar todas como lidas
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className="cursor-pointer flex items-start p-2"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 mt-1 rounded-full bg-primary flex-shrink-0" />
                        )}
                        <div className={cn("flex-1", notification.read ? "text-muted-foreground" : "")}>
                          <p className="text-sm">{notification.text}</p>
                          <p className="text-xs text-muted-foreground">Há 2 horas atrás</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Nenhuma notificação
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
