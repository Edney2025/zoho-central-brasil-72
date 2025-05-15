
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Package,
  FileText,
  Calculator,
  Settings,
  FileBarChart,
  Clock,
  CreditCard,
  Building,
  CalendarDays,
  Globe,
  MessageSquare,
  Briefcase,
  BadgeDollarSign,
  Car,
  ShieldCheck,
  Boxes
} from 'lucide-react';

export const menuSections = [
  {
    title: "Principal",
    items: [
      {
        icon: LayoutDashboard,
        title: "Dashboard",
        description: "Visão geral do sistema",
        path: "/dashboard"
      },
      {
        icon: Users,
        title: "Clientes",
        description: "Gestão de clientes",
        path: "/clientes"
      },
      {
        icon: DollarSign,
        title: "Financeiro",
        description: "Controle financeiro",
        path: "/financeiro",
        color: "bg-green-100 dark:bg-green-900/30"
      },
      {
        icon: Package,
        title: "Estoque",
        description: "Gestão de produtos",
        path: "/estoque",
        color: "bg-amber-100 dark:bg-amber-900/30"
      }
    ]
  },
  {
    title: "Vendas",
    items: [
      {
        icon: FileText,
        title: "Pedidos",
        description: "Gestão de pedidos",
        path: "/pedidos"
      },
      {
        icon: FileText,
        title: "Orçamentos",
        description: "Gestão de orçamentos",
        path: "/orcamentos"
      },
      {
        icon: Calculator,
        title: "Calculadoras",
        description: "Ferramentas de cálculo",
        path: "/calculadoras",
        color: "bg-blue-100 dark:bg-blue-900/30"
      },
      {
        icon: FileBarChart,
        title: "Relatórios",
        description: "Análise de dados",
        path: "/relatorios"
      }
    ]
  },
  {
    title: "Mais Ferramentas",
    items: [
      {
        icon: Clock,
        title: "Histórico",
        description: "Registro de atividades",
        path: "/previsoes"
      },
      {
        icon: CreditCard,
        title: "Análise de Crédito",
        description: "Avaliação financeira",
        path: "/analise-credito"
      },
      {
        icon: CalendarDays,
        title: "Agendamentos",
        description: "Gestão de calendário",
        path: "/agendamentos"
      },
      {
        icon: Settings,
        title: "Configurações",
        description: "Preferências do sistema",
        path: "/configuracoes"
      }
    ]
  },
  {
    title: "Produtos e Serviços",
    items: [
      {
        icon: Building,
        title: "CNPJ",
        description: "Serviços para empresas",
        path: "/cnpj"
      },
      {
        icon: Globe,
        title: "Portal do Cliente",
        description: "Configurações do portal",
        path: "/portal-config"
      },
      {
        icon: MessageSquare,
        title: "Comunicações",
        description: "Gestão de comunicações",
        path: "/comunicacoes"
      }
    ]
  },
  {
    title: "Financeiro",
    items: [
      {
        icon: Briefcase,
        title: "Contratos",
        description: "Gestão de contratos",
        path: "/contratos"
      },
      {
        icon: BadgeDollarSign,
        title: "Empréstimos",
        description: "Gestão de empréstimos",
        path: "/emprestimos",
        color: "bg-emerald-100 dark:bg-emerald-900/30"
      },
      {
        icon: Car,
        title: "Financiamentos",
        description: "Gestão de financiamentos",
        path: "/financiamentos"
      },
      {
        icon: ShieldCheck,
        title: "Garantias",
        description: "Gestão de garantias",
        path: "/garantias"
      },
      {
        icon: Boxes,
        title: "Outros Produtos",
        description: "Produtos adicionais",
        path: "/outros-produtos"
      }
    ]
  }
];
