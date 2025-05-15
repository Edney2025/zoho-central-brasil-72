
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Home,
  ShoppingBag,
  FileText,
  MessageCircle,
  HelpCircle,
  User,
  LogOut,
  Store,
  Package,
  PackageOpen,
  Tag,
  Wrench,
  Plus
} from 'lucide-react';

interface PortalSidebarProps {
  user: any;
  onSignOut: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ user, onSignOut }) => {
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
      
      <div className="px-4 py-2">
        <Button variant="default" className="w-full justify-start" asChild>
          <NavLink to="/portal/anunciar">
            <Plus className="mr-2 h-4 w-4" />
            Vender um Item
          </NavLink>
        </Button>
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
        
        <div className="pt-2 pb-2">
          <Separator />
        </div>
        
        <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">Catálogo</h3>
        
        <NavLink
          to="/ecommerce/produtos?tipo=novos"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground font-medium" 
                : "text-foreground hover:bg-muted"
            )
          }
        >
          <Package className="h-5 w-5" />
          Produtos Novos
        </NavLink>
        
        <NavLink
          to="/ecommerce/produtos?tipo=usados"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground font-medium" 
                : "text-foreground hover:bg-muted"
            )
          }
        >
          <PackageOpen className="h-5 w-5" />
          Produtos Usados
        </NavLink>
        
        <NavLink
          to="/ecommerce/servicos"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground font-medium" 
                : "text-foreground hover:bg-muted"
            )
          }
        >
          <Wrench className="h-5 w-5" />
          Serviços
        </NavLink>
        
        <div className="pt-2 pb-2">
          <Separator />
        </div>
        
        <a
          href="/ecommerce/produtos"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-foreground hover:bg-muted"
        >
          <Store className="h-5 w-5" />
          Loja Online
        </a>
      </nav>
      
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={onSignOut}>
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default PortalSidebar;
