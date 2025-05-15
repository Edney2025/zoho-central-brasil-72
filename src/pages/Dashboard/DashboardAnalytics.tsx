
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardFilters } from './components/DashboardFilters';
import { FinancialSummary } from './components/FinancialSummary';
import { DashboardCharts } from './components/DashboardCharts';
import { ActivityTabs } from './components/ActivityTabs';

// Define proper prop interfaces to match component expectations
interface DashboardHeaderProps {
  title: string;
  description: string;
}

interface DashboardFiltersProps {
  onDateChange: (range: any) => void;
}

interface FinancialSummaryProps {
  data: {
    receitas: string;
    despesas: string;
    lucroLiquido: string;
    ticketMedio: string;
    taxaConversao: string;
    crescimento: string;
  };
}

const DashboardAnalytics = () => {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  const vendasMensais = [
    { nome: 'Jan', valor: 4500 },
    { nome: 'Fev', valor: 5200 },
    { nome: 'Mar', valor: 6100 },
    { nome: 'Abr', valor: 5800 },
    { nome: 'Mai', valor: 7200 },
    { nome: 'Jun', valor: 6800 }
  ];

  const desempenhoCategorias = [
    { nome: 'Eletrônicos', atual: 8700, anterior: 7500 },
    { nome: 'Móveis', atual: 5400, anterior: 4900 },
    { nome: 'Serviços', atual: 3200, anterior: 2700 },
    { nome: 'Acessórios', atual: 2100, anterior: 1800 }
  ];

  const summaryData = {
    receitas: 'R$ 254.320,00',
    despesas: 'R$ 127.150,00',
    lucroLiquido: 'R$ 127.170,00',
    ticketMedio: 'R$ 1.240,00',
    taxaConversao: '23,5%',
    crescimento: '+12,3%'
  };

  const handleDateChange = (range: any) => {
    setDateRange(range);
    // Aqui você implementaria a lógica para atualizar os dados com base na data
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Analytics" 
        description="Análise detalhada de desempenho e métricas de vendas." 
      />
      
      <DashboardFilters onDateChange={handleDateChange} />
      
      <FinancialSummary data={summaryData} />
      
      <DashboardCharts 
        vendasMensais={vendasMensais} 
        desempenhoCategorias={desempenhoCategorias} 
      />
      
      <ActivityTabs />
    </div>
  );
};

export default DashboardAnalytics;
