
export type CalculadoraCategory = 
  | 'produtos'
  | 'financiamentos'
  | 'emprestimos'
  | 'transportes'
  | 'servicos'
  | 'garantias'
  | 'outros';

export interface SimulacaoBase {
  id: string;
  titulo: string;
  data: Date;
  categoria: CalculadoraCategory;
  valorTotal: number;
  parcelas?: number;
  taxaJuros?: number;
  valorParcela?: number;
  valorEntrada?: number;
}

export interface ProdutoSimulacao extends SimulacaoBase {
  categoria: 'produtos';
  nome: string;
  quantidade: number;
  valorUnitario: number;
  estado: 'novo' | 'usado';
  garantiaEstendida?: boolean;
  valorGarantia?: number;
}

export interface FinanciamentoSimulacao extends SimulacaoBase {
  categoria: 'financiamentos';
  tipo: string;
  prazo: number;
  valorFinanciado: number;
  valorEntrada: number;
  cet: number; // Custo Efetivo Total
}

export interface EmprestimoSimulacao extends SimulacaoBase {
  categoria: 'emprestimos';
  tipo: string;
  prazo: number;
  valorSolicitado: number;
  valorLiberado: number;
  cet: number; // Custo Efetivo Total
}

export interface TransporteSimulacao extends SimulacaoBase {
  categoria: 'transportes';
  tipo: string;
  distancia: number;
  valorPorKm?: number;
  pesoTotal?: number;
  volumeTotal?: number;
}

export interface ServicosSimulacao extends SimulacaoBase {
  categoria: 'servicos';
  tipo: string;
  horas?: number;
  valorHora?: number;
  descricaoServico: string;
}

export interface GarantiaSimulacao extends SimulacaoBase {
  categoria: 'garantias';
  produtoAssociado?: string;
  prazoGarantia: number;
  valorProduto: number;
}

export interface OutrosSimulacao extends SimulacaoBase {
  categoria: 'outros';
  descricao: string;
}

export type Simulacao =
  | ProdutoSimulacao
  | FinanciamentoSimulacao
  | EmprestimoSimulacao
  | TransporteSimulacao
  | ServicosSimulacao
  | GarantiaSimulacao
  | OutrosSimulacao;

export interface CalculadoraConfig {
  id: string;
  nome: string;
  descricao: string;
  categoria: CalculadoraCategory;
  icone: React.ElementType;
  caminhoRota: string;
  mostrarNoMenu?: boolean;
}
