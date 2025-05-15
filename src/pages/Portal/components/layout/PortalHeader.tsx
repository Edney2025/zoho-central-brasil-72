
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NotificationDropdown from '../NotificationDropdown';
import { 
  Home, 
  ShoppingBag, 
  FileText, 
  MessageCircle, 
  HelpCircle, 
  User, 
  LogOut 
} from 'lucide-react';

interface PortalHeaderProps {
  user: any;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  onSignOut: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({ 
  user, 
  mobileNavOpen, 
  setMobileNavOpen, 
  onSignOut 
}) => {
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
                
                <Button variant="ghost" className="w-full justify-start mt-4" onClick={onSignOut}>
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
        <NotificationDropdown />
        <Avatar className="h-8 w-8">
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default PortalHeader;
