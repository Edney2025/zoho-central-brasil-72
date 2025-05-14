
// Cliente model
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf_cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  observacoes?: string;
  data_cadastro: string;
  ultimo_contato?: string;
  status: 'ativo' | 'inativo' | 'pendente';
  documentos?: Documento[];
}

// Documento model
export interface Documento {
  id: string;
  nome: string;
  tipo: string;
  url: string;
  data_upload: string;
  cliente_id: string;
}

// Produto model
export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  custo: number;
  estoque_atual: number;
  estoque_minimo: number;
  categoria: string;
  unidade: string;
  codigo: string;
  fornecedor?: string;
  data_cadastro: string;
  status: 'ativo' | 'inativo';
}

// Pedido model
export interface Pedido {
  id: string;
  cliente_id: string;
  data_pedido: string;
  data_entrega?: string;
  status: 'novo' | 'aprovado' | 'em_andamento' | 'entregue' | 'cancelado';
  valor_total: number;
  desconto?: number;
  valor_final: number;
  forma_pagamento?: string;
  observacoes?: string;
  itens: ItemPedido[];
}

// Item do pedido
export interface ItemPedido {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  desconto?: number;
}

// Orçamento model
export interface Orcamento {
  id: string;
  cliente_id: string;
  data_orcamento: string;
  validade: string;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'expirado';
  valor_total: number;
  desconto?: number;
  valor_final: number;
  observacoes?: string;
  itens: ItemOrcamento[];
}

// Item do orçamento
export interface ItemOrcamento {
  id: string;
  orcamento_id: string;
  produto_id: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  desconto?: number;
}

// Calculadora Financeira
export interface CalculadoraFinanceira {
  id: string;
  nome: string;
  tipo: 'moto_eletrica' | 'bicicleta_eletrica' | 'consorcio' | 'credito' | 'financiamento' | 'outro';
  descricao: string;
  parametros: Record<string, any>;
}

// Resultado de cálculo
export interface ResultadoCalculo {
  id: string;
  calculadora_id: string;
  cliente_id?: string;
  data_calculo: string;
  parametros_entrada: Record<string, any>;
  resultado: Record<string, any>;
  observacoes?: string;
}

// Transação financeira
export interface TransacaoFinanceira {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'cancelado';
  forma_pagamento?: string;
  cliente_id?: string;
  pedido_id?: string;
  categoria: string;
  observacoes?: string;
}
