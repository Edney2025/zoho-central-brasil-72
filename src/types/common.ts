
export type Status = 'ativo' | 'inativo' | 'pendente' | 'em análise';
export type PedidoStatus = 'aprovado' | 'pendente' | 'concluido' | 'reprovado' | 'processando';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface SelectOption {
  value: string;
  label: string;
}
