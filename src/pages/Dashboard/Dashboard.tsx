
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, DollarSign, Package, AlertTriangle, FileText, Calculator, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const vendasMensais = [
  { nome: 'Jan', valor: 12000 },
  { nome: 'Fev', valor: 15000 },
  { nome: 'Mar', valor: 18000 },
  { nome: 'Abr', valor: 14000 },
  { nome: 'Mai', valor: 21000 },
  { nome: 'Jun', valor: 25000 },
];

const desempenhoCategorias = [
  { nome: 'Bicicletas', atual: 15, anterior: 12 },
  { nome: 'Patinetes', atual: 8, anterior: 10 },
  { nome: 'Peças', atual: 20, anterior: 15 },
  { nome: 'Acessórios', atual: 12, anterior: 8 },
  { nome: 'Serviços', atual: 7, anterior: 5 },
];

const DashboardCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string;
  icon: any;
  description: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Bem-vindo, {user?.email}</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" /> Últimos 30 dias
          </Button>
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total de Clientes"
          value="124"
          icon={Users}
          description="12 novos este mês"
        />
        <DashboardCard
          title="Receita Mensal"
          value="R$ 45.231,89"
          icon={DollarSign}
          description="+20,1% em relação ao mês anterior"
        />
        <DashboardCard
          title="Produtos em Estoque"
          value="1.234"
          icon={Package}
          description="45 produtos com estoque baixo"
        />
        <DashboardCard
          title="Alertas"
          value="3"
          icon={AlertTriangle}
          description="Faturas vencidas"
        />
        <DashboardCard
          title="Pedidos Pendentes"
          value="8"
          icon={FileText}
          description="2 aguardando aprovação"
        />
        <DashboardCard
          title="Cálculos Financeiros"
          value="15"
          icon={Calculator}
          description="Realizados esta semana"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
            <CardDescription>Evolução de vendas dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  vendas: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendasMensais}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="valor" fill="var(--color-vendas)" name="Vendas (R$)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Categoria</CardTitle>
            <CardDescription>Comparativo com o mês anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  atual: { theme: { light: '#22C55E', dark: '#4ADE80' } },
                  anterior: { theme: { light: '#94A3B8', dark: '#64748B' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={desempenhoCategorias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="atual" stroke="var(--color-atual)" name="Mês Atual" />
                    <Line type="monotone" dataKey="anterior" stroke="var(--color-anterior)" name="Mês Anterior" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-auto">
            <ul className="space-y-2">
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Novo cliente cadastrado</div>
                <div className="text-sm text-muted-foreground">Hoje, 10:45</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Orçamento aprovado - #5123</div>
                <div className="text-sm text-muted-foreground">Ontem, 15:30</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Produto abaixo do estoque mínimo</div>
                <div className="text-sm text-muted-foreground">Ontem, 09:15</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Simulação de financiamento realizada</div>
                <div className="text-sm text-muted-foreground">2 dias atrás, 14:22</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Venda finalizada - #4982</div>
                <div className="text-sm text-muted-foreground">2 dias atrás, 11:05</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-auto">
            <ul className="space-y-2">
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Confirmar pagamento do cliente XYZ</div>
                <div className="text-sm text-muted-foreground">Vence hoje</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Atualizar estoque de produtos</div>
                <div className="text-sm text-muted-foreground">Vence em 2 dias</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Revisar orçamentos pendentes</div>
                <div className="text-sm text-muted-foreground">Vence em 3 dias</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Contatar fornecedores para reposição</div>
                <div className="text-sm text-muted-foreground">Vence em 3 dias</div>
              </li>
              <li className="p-3 bg-muted/50 rounded-md">
                <div className="font-medium">Preparar relatório mensal</div>
                <div className="text-sm text-muted-foreground">Vence em 5 dias</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>Serviços conectados à plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 border rounded-md p-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 11H14V14H17V11Z" fill="#2563EB" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M14 6H5V18H19V11H14V6ZM12 8H7V16H17V13H12V8Z" fill="#2563EB" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Zoho CRM</h3>
                <p className="text-sm text-muted-foreground">Integração ativa</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-md p-4 border-dashed">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9H7V7H17V9Z" fill="#64748B" />
                  <path d="M7 13H17V11H7V13Z" fill="#64748B" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5ZM6 5H18V19H6V5Z" fill="#64748B" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Zoho Books</h3>
                <p className="text-sm text-muted-foreground">Conexão pendente</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-md p-4 border-dashed">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 10H17V8H19V10Z" fill="#64748B" />
                  <path d="M19 15H17V17H19V15Z" fill="#64748B" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 3H21V21H3V3ZM5 5V19H19V5H5Z" fill="#64748B" />
                  <path d="M7 12C7 11.4477 7.44772 11 8 11H12C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13H8C7.44772 13 7 12.5523 7 12Z" fill="#64748B" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Zoho Invoice</h3>
                <p className="text-sm text-muted-foreground">Conexão pendente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
