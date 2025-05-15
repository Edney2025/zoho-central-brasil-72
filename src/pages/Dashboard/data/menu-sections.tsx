
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ShoppingCart,
  Package,
  FileText,
  Calculator,
  Settings,
  CalendarClock,
  MessageSquare,
  Building2,
  Landmark,
  CarFront,
  Home,
  Combine,
  BellRing,
  Store,
  FileBarChart,
} from "lucide-react";

export const menuSections = [
  {
    title: "Gestão",
    items: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        href: "/dashboard",
        description: "Visão geral do sistema",
      },
      {
        title: "Clientes",
        icon: <Users className="w-5 h-5" />,
        href: "/clientes",
        description: "Gerenciar clientes",
      },
      {
        title: "Financeiro",
        icon: <CreditCard className="w-5 h-5" />,
        href: "/financeiro",
        description: "Controle financeiro",
      },
      {
        title: "Pedidos",
        icon: <ShoppingCart className="w-5 h-5" />,
        href: "/pedidos",
        description: "Gestão de pedidos",
      },
      {
        title: "Orçamentos",
        icon: <FileBarChart className="w-5 h-5" />,
        href: "/orcamentos",
        description: "Gerenciar orçamentos",
        highlight: true,
      },
      {
        title: "Estoque",
        icon: <Package className="w-5 h-5" />,
        href: "/estoque",
        description: "Controle de estoque",
      },
      {
        title: "Contratos",
        icon: <FileText className="w-5 h-5" />,
        href: "/contratos",
        description: "Gerenciar contratos",
      },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      {
        title: "Calculadoras",
        icon: <Calculator className="w-5 h-5" />,
        href: "/calculadoras",
        description: "Simuladores financeiros",
      },
      {
        title: "Análise de Crédito",
        icon: <FileBarChart className="w-5 h-5" />,
        href: "/analise-credito",
        description: "Avaliar crédito de clientes",
      },
      {
        title: "Agendamentos",
        icon: <CalendarClock className="w-5 h-5" />,
        href: "/agendamentos",
        description: "Gerenciar agenda",
      },
      {
        title: "Comunicações",
        icon: <MessageSquare className="w-5 h-5" />,
        href: "/comunicacoes",
        description: "Mensagens e notificações",
      },
      {
        title: "Portal do Cliente",
        icon: <BellRing className="w-5 h-5" />,
        href: "/portal-config",
        description: "Configurar portal do cliente",
      },
      {
        title: "E-Commerce",
        icon: <Store className="w-5 h-5" />,
        href: "/ecommerce/produtos",
        description: "Loja virtual",
      },
    ],
  },
  {
    title: "Produtos e Serviços",
    items: [
      {
        title: "Consulta CNPJ",
        icon: <Building2 className="w-5 h-5" />,
        href: "/cnpj",
        description: "Verificação de empresas",
      },
      {
        title: "Empréstimos",
        icon: <CreditCard className="w-5 h-5" />,
        href: "/emprestimos",
        description: "Produtos de crédito",
      },
      {
        title: "Financiamentos",
        icon: <Landmark className="w-5 h-5" />,
        href: "/financiamentos",
        description: "Opções de financiamento",
      },
      {
        title: "Financiamento Veículos",
        icon: <CarFront className="w-5 h-5" />,
        href: "/calculadoras/financiamento-veiculos",
        description: "Simulações para veículos",
      },
      {
        title: "Financiamento Imóveis",
        icon: <Home className="w-5 h-5" />,
        href: "/calculadoras/financiamento-imoveis",
        description: "Simulações para imóveis",
      },
      {
        title: "Outros Produtos",
        icon: <Combine className="w-5 h-5" />,
        href: "/outros-produtos",
        description: "Produtos adicionais",
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        title: "Configurações",
        icon: <Settings className="w-5 h-5" />,
        href: "/configuracoes",
        description: "Configurações do sistema",
      },
      {
        title: "Relatórios",
        icon: <FileBarChart className="w-5 h-5" />,
        href: "/relatorios",
        description: "Relatórios gerenciais",
      },
    ],
  },
];
