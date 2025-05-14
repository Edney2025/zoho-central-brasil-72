
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Package, AlertTriangle } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Próximas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em breve: Lista de atividades e compromissos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em breve: Lista de notificações importantes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
