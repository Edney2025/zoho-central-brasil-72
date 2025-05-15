
import React from 'react';
import { Users, DollarSign, Package, AlertTriangle, FileText, Calculator, TrendingUp, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardCard } from './components/DashboardCard';
import { SalesChart } from './components/SalesChart';
import { CategoryPerformanceChart } from './components/CategoryPerformanceChart';
import { ActivityList } from './components/ActivityList';
import { TaskList } from './components/TaskList';
import { DashboardHeader } from './components/DashboardHeader';
import { vendasMensais, desempenhoCategorias } from './data/dashboard-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Mock data for orçamentos
const orcamentos = [
  {
    id: 'orc1',
    cliente: 'Maria Silva',
    descricao: 'Orçamento para financiamento de veículo',
    valor: 'R$ 35.000,00',
    data: '15/05/2023',
    status: 'pendente'
  },
  {
    id: 'orc2',
    cliente: 'João Oliveira',
    descricao: 'Crédito pessoal',
    valor: 'R$ 12.500,00',
    data: '14/05/2023',
    status: 'pendente'
  },
  {
    id: 'orc3',
    cliente: 'Fernanda Santos',
    descricao: 'Financiamento de móveis',
    valor: 'R$ 8.200,00',
    data: '13/05/2023',
    status: 'pendente'
  }
];

// Mock data for financial summary
const resumoFinanceiro = {
  receitaTotal: 'R$ 125.430,00',
  receitaMensal: 'R$ 42.150,00',
  pedidosAceitos: 28,
  pedidosPendentes: 12,
  ticketMedio: 'R$ 1.505,35'
};

const DashboardAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleAcceptOrcamento = (id: string) => {
    toast({
      title: "Orçamento aceito",
      description: `O orçamento ${id} foi aceito com sucesso.`,
    });
  };
  
  const handleRejectOrcamento = (id: string) => {
    toast({
      title: "Orçamento recusado",
      description: `O orçamento ${id} foi recusado.`,
    });
  };
  
  const handleManageAds = () => {
    navigate('/ecommerce/meus-anuncios');
  };
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total de Clientes"
          value="124"
          icon={Users}
          description="12 novos este mês"
        />
        <DashboardCard
          title="Receita Mensal"
          value={resumoFinanceiro.receitaMensal}
          icon={DollarSign}
          description="+20,1% em relação ao mês anterior"
        />
        <DashboardCard
          title="Produtos em Estoque"
          value="1.234"
          icon={Package}
          description="45 produtos com estoque baixo"
        />
      </div>
      
      {/* Resumo Financeiro */}
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Resumo Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
              <p className="text-2xl font-bold">{resumoFinanceiro.receitaTotal}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Pedidos Aceitos</p>
              <p className="text-2xl font-bold">{resumoFinanceiro.pedidosAceitos}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Pedidos Pendentes</p>
              <p className="text-2xl font-bold">{resumoFinanceiro.pedidosPendentes}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Ticket Médio</p>
              <p className="text-2xl font-bold">{resumoFinanceiro.ticketMedio}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Orçamentos Recebidos */}
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Orçamentos Recebidos
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/pedidos')}
          >
            Ver todos
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {orcamentos.map((orcamento) => (
              <div key={orcamento.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{orcamento.cliente}</p>
                  <p className="text-sm text-muted-foreground">{orcamento.descricao}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{orcamento.valor}</Badge>
                    <span className="text-xs text-muted-foreground">{orcamento.data}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-700"
                    onClick={() => handleAcceptOrcamento(orcamento.id)}
                  >
                    <Check className="h-4 w-4 mr-1" /> Aceitar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-700"
                    onClick={() => handleRejectOrcamento(orcamento.id)}
                  >
                    <X className="h-4 w-4 mr-1" /> Recusar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gerenciar Meus Anúncios Button */}
      <div className="flex justify-end">
        <Button onClick={handleManageAds} className="bg-primary hover:bg-primary/90">
          Gerenciar Meus Anúncios
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <SalesChart data={vendasMensais} />
        <CategoryPerformanceChart data={desempenhoCategorias} />
      </div>

      <Tabs defaultValue="atividades" className="w-full">
        <TabsList>
          <TabsTrigger value="atividades">Atividades Recentes</TabsTrigger>
          <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
        </TabsList>
        <TabsContent value="atividades" className="pt-4">
          <ActivityList />
        </TabsContent>
        <TabsContent value="tarefas" className="pt-4">
          <TaskList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAnalytics;
