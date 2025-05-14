
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Package, AlertTriangle, FileText, Calculator } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
      <h1 className="text-3xl font-bold">Bem-vindo, {user?.email}</h1>
      
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
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
