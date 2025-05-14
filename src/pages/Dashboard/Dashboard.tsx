
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, DollarSign, Package, FileText, Calculator, Settings,
  LayoutDashboard, Receipt, ChartBar, CreditCard, Globe, ShieldCheck,
  BadgePercent, Calendar, MessageCircle, CircleDollarSign,
  Smartphone, Briefcase, Coins, Wallet, BadgePlus, Graph
} from 'lucide-react';

const MenuItem = ({ 
  icon: Icon, 
  title, 
  description, 
  path, 
  color = "bg-primary/10 dark:bg-primary/20"
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  path: string;
  color?: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-muted-foreground/20"
      onClick={() => navigate(path)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-4 rounded-full ${color}`}>
            <Icon className="h-8 w-8 text-primary dark:text-primary" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  
  // Define menu sections
  const menuSections = [
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
      title: "Simulações e Produtos",
      items: [
        { 
          icon: Calculator, 
          title: "Calculadoras", 
          description: "Simulações de crédito e financiamentos", 
          path: "/calculadoras",
          color: "bg-amber-100 dark:bg-amber-900/30" 
        },
        { 
          icon: Package, 
          title: "Estoque", 
          description: "Gestão de produtos e serviços", 
          path: "/estoque",
          color: "bg-cyan-100 dark:bg-cyan-900/30" 
        },
        { 
          icon: BadgePercent, 
          title: "Taxas e Juros", 
          description: "Configuração de taxas e parcelamentos", 
          path: "/configuracoes/taxas",
          color: "bg-rose-100 dark:bg-rose-900/30" 
        },
        { 
          icon: Receipt, 
          title: "Contratos", 
          description: "Modelos e emissão de contratos", 
          path: "/contratos",
          color: "bg-orange-100 dark:bg-orange-900/30" 
        }
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
          icon: Graph, 
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Sistema Financeiro</h1>
        <p className="text-muted-foreground">
          Olá {user?.email}, selecione abaixo o módulo que deseja acessar
        </p>
      </div>
      
      {menuSections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.items.map((item, idx) => (
              <MenuItem 
                key={idx} 
                icon={item.icon} 
                title={item.title} 
                description={item.description} 
                path={item.path}
                color={item.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
