
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from '@/components/ui/use-toast';
import { 
  verificarNotificacoesDoDia, 
  NotificacaoCliente, 
  TipoNotificacao
} from '@/services/notificacoesClientesService';
import { ToastAction } from '@/components/ui/toast';
import React from 'react';

// Hook customizado para gerenciar notificações de clientes
export function useClientesNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<NotificacaoCliente[]>([]);
  const [notificacoesHoje, setNotificacoesHoje] = useState<NotificacaoCliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Carregar notificações (simulação)
  const carregarNotificacoes = useCallback(async () => {
    setIsLoading(true);
    try {
      // Em um app real, aqui faria uma chamada à API ou Supabase
      // Simulando uma chamada API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      const mockNotificacoes: NotificacaoCliente[] = [
        {
          id: '1',
          clienteId: '1',
          clienteNome: 'João Silva',
          tipo: 'aniversario',
          data: new Date().toISOString(), // Hoje
          descricao: 'Aniversário do cliente',
          status: 'pendente',
          criada: new Date(Date.now() - 86400000).toISOString() // Ontem
        },
        {
          id: '2',
          clienteId: '2',
          clienteNome: 'Empresa ABC',
          tipo: 'renovacao',
          data: new Date(Date.now() + 86400000 * 3).toISOString(), // Daqui a 3 dias
          descricao: 'Renovação do contrato anual',
          status: 'pendente',
          criada: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ];
      
      setNotificacoes(mockNotificacoes);
      
      // Verificar notificações do dia
      const notifHoje = verificarNotificacoesDoDia(mockNotificacoes);
      setNotificacoesHoje(notifHoje);
      
      // Exibir notificações do dia
      if (notifHoje.length > 0) {
        notifHoje.forEach(notif => {
          sonnerToast({
            title: `${notif.tipo === 'aniversario' ? '🎂' : '📅'} Hoje: ${notif.descricao}`,
            description: notif.clienteNome,
            action: (
              <ToastAction altText="Ver notificação" onClick={() => console.log("Ver notificação", notif.id)}>
                Ver
              </ToastAction>
            )
          });
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as notificações",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const marcarComoConcluida = useCallback((id: string) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, status: 'concluida' } : notif
      )
    );
    
    // Atualizar notificações do dia
    setNotificacoesHoje(prev => prev.filter(notif => notif.id !== id));
    
    toast({
      title: "Notificação concluída",
      description: "A notificação foi marcada como concluída"
    });
  }, [toast]);

  const cancelarNotificacao = useCallback((id: string) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, status: 'cancelada' } : notif
      )
    );
    
    // Atualizar notificações do dia
    setNotificacoesHoje(prev => prev.filter(notif => notif.id !== id));
    
    toast({
      title: "Notificação cancelada",
      description: "A notificação foi cancelada"
    });
  }, [toast]);

  // Carregar notificações ao iniciar
  useEffect(() => {
    carregarNotificacoes();
  }, [carregarNotificacoes]);

  return {
    notificacoes,
    notificacoesHoje,
    isLoading,
    carregarNotificacoes,
    marcarComoConcluida,
    cancelarNotificacao
  };
}
