
import { format, differenceInDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos de notificações para clientes
export type TipoNotificacao = 
  | 'aniversario'
  | 'renovacao'
  | 'acompanhamento'
  | 'pagamento'
  | 'reuniao'
  | 'outro';

export interface NotificacaoCliente {
  id: string;
  clienteId: string;
  clienteNome: string;
  tipo: TipoNotificacao;
  data: string; // Data no formato ISO
  descricao: string;
  status: 'pendente' | 'concluida' | 'cancelada';
  criada: string; // Data no formato ISO
}

// Função para verificar se há notificações para a data atual
export const verificarNotificacoesDoDia = (notificacoes: NotificacaoCliente[]): NotificacaoCliente[] => {
  const hoje = new Date();
  return notificacoes.filter(notif => {
    const dataNotif = parseISO(notif.data);
    return (
      dataNotif.getDate() === hoje.getDate() &&
      dataNotif.getMonth() === hoje.getMonth() &&
      dataNotif.getFullYear() === hoje.getFullYear() &&
      notif.status === 'pendente'
    );
  });
};

// Função para verificar notificações que estão próximas (nos próximos X dias)
export const verificarNotificacoesProximas = (
  notificacoes: NotificacaoCliente[],
  dias: number = 7
): NotificacaoCliente[] => {
  const hoje = new Date();
  return notificacoes.filter(notif => {
    const dataNotif = parseISO(notif.data);
    const diff = differenceInDays(dataNotif, hoje);
    return diff > 0 && diff <= dias && notif.status === 'pendente';
  });
};

// Função para formatar a data da notificação
export const formatarDataNotificacao = (data: string): string => {
  return format(parseISO(data), "PPP", { locale: ptBR });
};

// Função para enviar notificação ao usuário
export const enviarNotificacao = (notificacao: NotificacaoCliente): void => {
  // Aqui integraríamos com o sistema de notificações
  if (typeof window !== 'undefined' && window.addNotification) {
    const dataFormatada = formatarDataNotificacao(notificacao.data);
    
    let titulo = '';
    switch (notificacao.tipo) {
      case 'aniversario':
        titulo = `Aniversário de ${notificacao.clienteNome}`;
        break;
      case 'renovacao':
        titulo = `Renovação de contrato - ${notificacao.clienteNome}`;
        break;
      case 'acompanhamento':
        titulo = `Acompanhamento - ${notificacao.clienteNome}`;
        break;
      case 'pagamento':
        titulo = `Pagamento - ${notificacao.clienteNome}`;
        break;
      case 'reuniao':
        titulo = `Reunião - ${notificacao.clienteNome}`;
        break;
      default:
        titulo = `Lembrete - ${notificacao.clienteNome}`;
    }
    
    window.addNotification({
      title: titulo,
      message: `${notificacao.descricao} - ${dataFormatada}`,
      type: "info"
    });
  }
};

// Função para criar uma nova notificação
export const criarNotificacaoCliente = (
  clienteId: string,
  clienteNome: string,
  tipo: TipoNotificacao,
  data: Date,
  descricao: string
): NotificacaoCliente => {
  return {
    id: Date.now().toString(),
    clienteId,
    clienteNome,
    tipo,
    data: data.toISOString(),
    descricao,
    status: 'pendente',
    criada: new Date().toISOString()
  };
};

// No futuro, aqui implementaríamos o armazenamento persistente das notificações
// usando Supabase ou outra solução de backend
