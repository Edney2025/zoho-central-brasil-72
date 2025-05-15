
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

import { WelcomeHeader } from './components/dashboard/WelcomeHeader';
import { ProfileCompletion } from './components/dashboard/ProfileCompletion'; 
import { SummaryCards } from './components/dashboard/SummaryCards';
import { ActivitySection } from './components/dashboard/ActivitySection';
import { EventsCard } from './components/dashboard/EventsCard';
import { NotificationsCard } from './components/dashboard/NotificationsCard';
import { FinancialSummaryCard } from './components/dashboard/FinancialSummaryCard';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  status?: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: 'act1',
    type: 'pedido',
    title: 'Pedido #12345',
    description: 'Pedido recebido e em processamento',
    date: '15/05/2023',
    status: 'processando'
  },
  {
    id: 'act2',
    type: 'orçamento',
    title: 'Orçamento #54321',
    description: 'Orçamento aprovado',
    date: '12/05/2023',
    status: 'aprovado'
  },
  {
    id: 'act3',
    type: 'mensagem',
    title: 'Novo contato',
    description: 'Sua solicitação foi respondida pela equipe de suporte',
    date: '10/05/2023'
  }
];

// Mock data for the dashboard summary cards
const summaryData = {
  pedidosPendentes: 2,
  pedidosConcluidos: 5,
  orcamentosPendentes: 1,
  orcamentosAprovados: 3,
  proximoPagamento: {
    data: '25/05/2023',
    valor: 'R$ 1.250,00'
  },
  ultimaAtualizacao: '15/05/2023 às 10:30'
};

// Mock upcoming events
const proximosEventos = [
  {
    id: 'evt1',
    titulo: 'Entrega pedido #12345',
    data: '20/05/2023',
    tipo: 'entrega'
  },
  {
    id: 'evt2',
    titulo: 'Vencimento da fatura',
    data: '25/05/2023',
    tipo: 'pagamento'
  },
  {
    id: 'evt3',
    titulo: 'Manutenção programada',
    data: '28/05/2023',
    tipo: 'manutenção'
  }
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completionPercentage] = useState(75);

  const handleUpdateProfile = () => {
    navigate('/portal/profile');
  };

  const handleViewAllNotifications = () => {
    // This would navigate to a notifications page in a real app
    toast({
      title: "Notificações",
      description: "Funcionalidade em implementação"
    });
  };

  return (
    <div className="space-y-6">
      <WelcomeHeader 
        userName={user?.email?.split('@')[0] || ''}
        lastUpdated={summaryData.ultimaAtualizacao}
        onViewOrders={() => navigate('/portal/pedidos')}
      />
      
      <ProfileCompletion 
        completionPercentage={completionPercentage}
        onUpdateProfile={handleUpdateProfile}
      />
      
      <SummaryCards 
        summaryData={summaryData}
        navigate={navigate}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivitySection recentActivity={recentActivity} />
        </div>
        
        <div className="space-y-6">
          <EventsCard events={proximosEventos} />
          <NotificationsCard onViewAllNotifications={handleViewAllNotifications} />
          <FinancialSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
