
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  ShoppingBag,
  FileText,
  MessageCircle,
  Store
} from 'lucide-react';

export const MobileFooterNav = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/portal/dashboard' },
    { icon: ShoppingBag, label: 'Pedidos', path: '/portal/pedidos' },
    { icon: FileText, label: 'Orçamentos', path: '/portal/orcamentos' },
    { icon: MessageCircle, label: 'Suporte', path: '/portal/suporte' },
    { icon: Store, label: 'Loja', path: '/ecommerce/produtos' },
  ];

  return (
    <nav className="md:hidden flex items-center justify-around border-t bg-background py-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center p-1",
              isActive && item.path.includes('/portal')
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
  );
};

export default MobileFooterNav;
