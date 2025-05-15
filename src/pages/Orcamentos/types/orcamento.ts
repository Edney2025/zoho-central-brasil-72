
export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface Item {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: string;
  valorTotal: string;
}

export interface EventoHistorico {
  data: string;
  evento: string;
  usuario: string;
}

export interface Anexo {
  nome: string;
  tamanho: string;
}

export interface OrcamentoDetalhado {
  id: string;
  cliente: Cliente;
  valor: string;
  data: string;
  validade: string;
  status: 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
  items: Item[];
  historico: EventoHistorico[];
  condicoesPagamento: string;
  observacoes: string;
  anexos: Anexo[];
}

export interface VendaMensal {
  nome: string;
  valor: number;
}

export interface DesempenhoCategoria {
  nome: string;
  atual: number;
  anterior: number;
}
