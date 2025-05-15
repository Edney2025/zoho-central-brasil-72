
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Package,
  Settings,
  Calculator,
  FileText,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AppSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      title: "Clientes",
      icon: Users,
      path: "/clientes"
    },
    {
      title: "Financeiro",
      icon: DollarSign,
      path: "/financeiro"
    },
    {
      title: "Estoque",
      icon: Package,
      path: "/estoque"
    },
    {
      title: "Pedidos & Orçamentos",
      icon: FileText,
      path: "/pedidos"
    },
    {
      title: "Loja Online",
      icon: ShoppingBag,
      path: "/ecommerce/produtos"
    },
    {
      title: "Calculadoras",
      icon: Calculator,
      path: "/calculadoras"
    },
    {
      title: "Configurações",
      icon: Settings,
      path: "/configuracoes"
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
