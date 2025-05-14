
import React from 'react';
import { Users, DollarSign, Package, AlertTriangle, FileText, Calculator } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardCard } from './components/DashboardCard';
import { SalesChart } from './components/SalesChart';
import { CategoryPerformanceChart } from './components/CategoryPerformanceChart';
import { ActivityList } from './components/ActivityList';
import { TaskList } from './components/TaskList';
import { DashboardHeader } from './components/DashboardHeader';
import { vendasMensais, desempenhoCategorias } from './data/dashboard-data';

const DashboardAnalytics = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
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
        <SalesChart data={vendasMensais} />
        <CategoryPerformanceChart data={desempenhoCategorias} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ActivityList />
        <TaskList />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
