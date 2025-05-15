
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export type TipoNotificacao = 'aniversario' | 'renovacao' | 'reuniao' | 'pagamento' | 'outro';

export interface NotificacaoCliente {
  id: string;
  clienteId: string;
  clienteNome: string;
  tipo: TipoNotificacao;
  data: string;
  descricao: string;
  status: string;
  criada: string;
}

/**
 * Verifica se a data é hoje
 */
export function isToday(data: string): boolean {
  const hoje = new Date();
  const dataCompare = new Date(data);
  
  return (
    dataCompare.getDate() === hoje.getDate() &&
    dataCompare.getMonth() === hoje.getMonth() &&
    dataCompare.getFullYear() === hoje.getFullYear()
  );
}

/**
 * Formata a data da notificação para exibição
 */
export function formatarDataNotificacao(data: string): string {
  const dataObj = new Date(data);
  
  if (isToday(data)) {
    return `Hoje, ${format(dataObj, 'HH:mm')}`;
  }
  
  return format(dataObj, "dd 'de' MMMM", { locale: ptBR });
}

/**
 * Verifica e filtra notificações do dia atual
 */
export function verificarNotificacoesDoDia(notificacoes: NotificacaoCliente[]): NotificacaoCliente[] {
  return notificacoes.filter(notif => 
    isToday(notif.data) && notif.status === 'pendente'
  );
}
