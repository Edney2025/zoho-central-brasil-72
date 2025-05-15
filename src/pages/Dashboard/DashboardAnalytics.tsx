
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DashboardCard } from './components/DashboardCard';
import { DashboardHeader } from './components/DashboardHeader';
import { FinancialSummary } from './components/FinancialSummary';
import { OrcamentosSection } from './components/OrcamentosSection';
import { DashboardCharts } from './components/DashboardCharts';
import { ActivityTabs } from './components/ActivityTabs';
import { vendasMensais, desempenhoCategorias } from './data/dashboard-data';
import { orcamentosMock, resumoFinanceiroMock } from './data/orcamentos-mock';

const DashboardAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
          value={resumoFinanceiroMock.receitaMensal}
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
      
      <FinancialSummary resumoFinanceiro={resumoFinanceiroMock} />
      
      <OrcamentosSection orcamentos={orcamentosMock} />

      {/* Gerenciar Meus Anúncios Button */}
      <div className="flex justify-end">
        <Button onClick={handleManageAds} className="bg-primary hover:bg-primary/90">
          Gerenciar Meus Anúncios
        </Button>
      </div>
      
      <DashboardCharts 
        vendasMensais={vendasMensais} 
        desempenhoCategorias={desempenhoCategorias} 
      />

      <ActivityTabs />
    </div>
  );
};

export default DashboardAnalytics;
