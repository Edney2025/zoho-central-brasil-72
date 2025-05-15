
import { 
  Users, DollarSign, Package, FileText, Calculator, Settings,
  LayoutDashboard, Receipt, ChartBar, CreditCard, Globe, ShieldCheck,
  BadgePercent, Calendar, MessageCircle, CircleDollarSign,
  Smartphone, Briefcase, Coins, Wallet, BadgePlus, TrendingUp, ShoppingBag
} from 'lucide-react';

export const menuSections = [
  {
    title: "Gestão Principal",
    items: [
      { 
        icon: LayoutDashboard, 
        title: "Dashboard Analítico", 
        description: "Visão completa dos indicadores financeiros", 
        path: "/dashboard/analytics",
        color: "bg-blue-100 dark:bg-blue-900/30" 
      },
      { 
        icon: Users, 
        title: "Clientes", 
        description: "Cadastro e gestão de clientes", 
        path: "/clientes",
        color: "bg-indigo-100 dark:bg-indigo-900/30" 
      },
      { 
        icon: FileText, 
        title: "Pedidos e Orçamentos", 
        description: "Gestão de propostas e pedidos", 
        path: "/pedidos",
        color: "bg-purple-100 dark:bg-purple-900/30" 
      },
      { 
        icon: DollarSign, 
        title: "Financeiro", 
        description: "Controle de contas e fluxo de caixa", 
        path: "/financeiro",
        color: "bg-green-100 dark:bg-green-900/30" 
      }
    ]
  },
  {
    title: "E-commerce & Produtos",
    items: [
      { 
        icon: ShoppingBag, 
        title: "Loja Online", 
        description: "Gerencie sua loja online e produtos", 
        path: "/ecommerce/produtos",
        color: "bg-rose-100 dark:bg-rose-900/30" 
      },
      { 
        icon: Package, 
        title: "Estoque", 
        description: "Gestão de produtos e serviços", 
        path: "/estoque",
        color: "bg-cyan-100 dark:bg-cyan-900/30" 
      },
      { 
        icon: Calculator, 
        title: "Calculadoras", 
        description: "Simulações de crédito e financiamentos", 
        path: "/calculadoras",
        color: "bg-amber-100 dark:bg-amber-900/30" 
      },
      { 
        icon: BadgePercent, 
        title: "Taxas e Juros", 
        description: "Configuração de taxas e parcelamentos", 
        path: "/configuracoes/taxas",
        color: "bg-orange-100 dark:bg-orange-900/30" 
      },
    ]
  },
  {
    title: "Inteligência e Análises",
    items: [
      { 
        icon: ChartBar, 
        title: "Relatórios", 
        description: "Análises detalhadas e exportação", 
        path: "/relatorios",
        color: "bg-violet-100 dark:bg-violet-900/30" 
      },
      { 
        icon: TrendingUp, 
        title: "Previsões", 
        description: "IA para projeções financeiras", 
        path: "/previsoes",
        color: "bg-teal-100 dark:bg-teal-900/30" 
      },
      { 
        icon: CircleDollarSign, 
        title: "Análise de Crédito", 
        description: "Modelos de pontuação e limite", 
        path: "/analise-credito",
        color: "bg-fuchsia-100 dark:bg-fuchsia-900/30" 
      },
      { 
        icon: Calendar, 
        title: "Agendamentos", 
        description: "Pagamentos e recebimentos futuros", 
        path: "/agendamentos",
        color: "bg-emerald-100 dark:bg-emerald-900/30" 
      }
    ]
  },
  {
    title: "Portal e Configurações",
    items: [
      { 
        icon: Smartphone, 
        title: "Portal do Cliente", 
        description: "Acesso externo para clientes", 
        path: "/portal-config",
        color: "bg-sky-100 dark:bg-sky-900/30" 
      },
      { 
        icon: MessageCircle, 
        title: "Comunicações", 
        description: "Notificações e mensagens", 
        path: "/comunicacoes",
        color: "bg-lime-100 dark:bg-lime-900/30" 
      },
      { 
        icon: Settings, 
        title: "Configurações", 
        description: "Personalização do sistema", 
        path: "/configuracoes",
        color: "bg-gray-100 dark:bg-gray-800/30" 
      },
      { 
        icon: Briefcase, 
        title: "Multi-CNPJ", 
        description: "Gestão de múltiplas empresas", 
        path: "/cnpj",
        color: "bg-blue-100 dark:bg-blue-900/30" 
      }
    ]
  },
  {
    title: "Produtos Financeiros",
    items: [
      { 
        icon: Coins, 
        title: "Empréstimos", 
        description: "Simular e gerenciar empréstimos", 
        path: "/emprestimos",
        color: "bg-yellow-100 dark:bg-yellow-900/30" 
      },
      { 
        icon: Wallet, 
        title: "Financiamentos", 
        description: "Financiamentos personalizados", 
        path: "/financiamentos",
        color: "bg-purple-100 dark:bg-purple-900/30" 
      },
      { 
        icon: ShieldCheck, 
        title: "Garantias", 
        description: "Gestão de garantias estendidas", 
        path: "/garantias",
        color: "bg-red-100 dark:bg-red-900/30" 
      },
      { 
        icon: BadgePlus, 
        title: "Outros Produtos", 
        description: "Produtos financeiros adicionais", 
        path: "/outros-produtos",
        color: "bg-indigo-100 dark:bg-indigo-900/30" 
      }
    ]
  }
];
