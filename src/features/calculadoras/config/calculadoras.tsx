import { 
  ShoppingBag, 
  Car, 
  Briefcase, 
  CreditCard, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  Calculator, 
  RefreshCcw, 
  DollarSign, 
  Home, 
  Smartphone, 
  PiggyBank, 
  GraduationCap, 
  Plane, 
  Scissors, 
  Coffee, 
  Headphones, 
  Film, 
  Landmark, 
  Globe, 
  BarChart, 
  Coins, 
  Clock, 
  Target, 
  Percent,
  Zap,
  Battery,
  Bike
} from 'lucide-react';
import { CalculadoraConfig } from '../types';

export const calculadoras: CalculadoraConfig[] = [
  // Veículos Elétricos
  {
    id: 'moto-eletrica',
    nome: 'Moto Elétrica',
    descricao: 'Financiamento de motos elétricas com condições especiais',
    categoria: 'financiamentos',
    icone: Zap,
    caminhoRota: '/calculadoras/moto-eletrica',
    mostrarNoMenu: true
  },
  {
    id: 'bicicleta-eletrica-nova',
    nome: 'Bicicleta Elétrica Nova',
    descricao: 'Financiamento para bicicletas elétricas novas',
    categoria: 'financiamentos',
    icone: Bike,
    caminhoRota: '/calculadoras/bicicleta-eletrica-nova',
    mostrarNoMenu: true
  },
  {
    id: 'bicicleta-eletrica-usada',
    nome: 'Bicicleta Elétrica Usada',
    descricao: 'Financiamento para bicicletas elétricas usadas',
    categoria: 'financiamentos',
    icone: Bike,
    caminhoRota: '/calculadoras/bicicleta-eletrica-usada',
    mostrarNoMenu: true
  },
  {
    id: 'patinete-eletrico',
    nome: 'Patinete Elétrico',
    descricao: 'Financiamento para patinetes elétricos',
    categoria: 'financiamentos',
    icone: Zap,
    caminhoRota: '/calculadoras/patinete-eletrico',
    mostrarNoMenu: true
  },
  {
    id: 'baterias',
    nome: 'Baterias',
    descricao: 'Financiamento para baterias de veículos elétricos',
    categoria: 'financiamentos',
    icone: Battery,
    caminhoRota: '/calculadoras/baterias',
    mostrarNoMenu: true
  },
  
  // Produtos
  {
    id: 'produtos-novos',
    nome: 'Produtos Novos',
    descricao: 'Financiamento de produtos novos como eletrodomésticos e eletrônicos',
    categoria: 'produtos',
    icone: ShoppingBag,
    caminhoRota: '/calculadoras/produtos-novos',
    mostrarNoMenu: true
  },
  {
    id: 'produtos-usados',
    nome: 'Produtos Usados',
    descricao: 'Financiamento de produtos usados com taxas diferenciadas',
    categoria: 'produtos',
    icone: RefreshCcw,
    caminhoRota: '/calculadoras/produtos-usados',
    mostrarNoMenu: true
  },
  {
    id: 'smartphones',
    nome: 'Smartphones',
    descricao: 'Financiamento específico para aparelhos celulares',
    categoria: 'produtos',
    icone: Smartphone,
    caminhoRota: '/calculadoras/smartphones',
    mostrarNoMenu: true
  },
  
  // Financiamentos
  {
    id: 'financiamento-imoveis',
    nome: 'Imóveis',
    descricao: 'Simulação para financiamento de imóveis',
    categoria: 'financiamentos',
    icone: Home,
    caminhoRota: '/calculadoras/financiamento-imoveis',
    mostrarNoMenu: true
  },
  {
    id: 'financiamento-veiculos',
    nome: 'Veículos',
    descricao: 'Simulação para financiamento de automóveis',
    categoria: 'financiamentos',
    icone: Car,
    caminhoRota: '/calculadoras/financiamento-veiculos',
    mostrarNoMenu: true
  },
  {
    id: 'financiamento-educacao',
    nome: 'Educação',
    descricao: 'Financiamento para cursos e faculdades',
    categoria: 'financiamentos',
    icone: GraduationCap,
    caminhoRota: '/calculadoras/financiamento-educacao',
    mostrarNoMenu: false
  },
  
  // Empréstimos
  {
    id: 'emprestimo-pessoal',
    nome: 'Empréstimo Pessoal',
    descricao: 'Cálculo de empréstimo pessoal com várias opções de prazo',
    categoria: 'emprestimos',
    icone: CreditCard,
    caminhoRota: '/calculadoras/emprestimo-pessoal',
    mostrarNoMenu: true
  },
  {
    id: 'emprestimo-consignado',
    nome: 'Consignado',
    descricao: 'Simulação de empréstimo consignado para aposentados e servidores',
    categoria: 'emprestimos',
    icone: PiggyBank,
    caminhoRota: '/calculadoras/emprestimo-consignado',
    mostrarNoMenu: true
  },
  {
    id: 'emprestimo-empresarial',
    nome: 'Empresarial',
    descricao: 'Cálculo de empréstimo para empresas e capital de giro',
    categoria: 'emprestimos',
    icone: Briefcase,
    caminhoRota: '/calculadoras/emprestimo-empresarial',
    mostrarNoMenu: true
  },
  
  // Transportes
  {
    id: 'calculo-frete',
    nome: 'Cálculo de Frete',
    descricao: 'Simulação de custo de frete baseado em distância e peso',
    categoria: 'transportes',
    icone: Truck,
    caminhoRota: '/calculadoras/calculo-frete',
    mostrarNoMenu: true
  },
  {
    id: 'transporte-passageiros',
    nome: 'Transporte de Passageiros',
    descricao: 'Cálculo para transporte de passageiros e viagens',
    categoria: 'transportes',
    icone: Plane,
    caminhoRota: '/calculadoras/transporte-passageiros',
    mostrarNoMenu: false
  },
  
  // Serviços
  {
    id: 'servicos-gerais',
    nome: 'Serviços Gerais',
    descricao: 'Cálculo de orçamentos para serviços diversos',
    categoria: 'servicos',
    icone: Wrench,
    caminhoRota: '/calculadoras/servicos-gerais',
    mostrarNoMenu: true
  },
  {
    id: 'servicos-beleza',
    nome: 'Serviços de Beleza',
    descricao: 'Orçamentos para salões, barbearias e estéticas',
    categoria: 'servicos',
    icone: Scissors,
    caminhoRota: '/calculadoras/servicos-beleza',
    mostrarNoMenu: false
  },
  {
    id: 'servicos-alimentacao',
    nome: 'Serviços de Alimentação',
    descricao: 'Orçamentos para restaurantes e serviços de buffet',
    categoria: 'servicos',
    icone: Coffee,
    caminhoRota: '/calculadoras/servicos-alimentacao',
    mostrarNoMenu: false
  },
  {
    id: 'servicos-tecnologia',
    nome: 'Serviços de Tecnologia',
    descricao: 'Orçamentos para desenvolvimento e suporte de TI',
    categoria: 'servicos',
    icone: Headphones,
    caminhoRota: '/calculadoras/servicos-tecnologia',
    mostrarNoMenu: false
  },
  {
    id: 'servicos-entretenimento',
    nome: 'Entretenimento',
    descricao: 'Orçamentos para eventos e produções',
    categoria: 'servicos',
    icone: Film,
    caminhoRota: '/calculadoras/servicos-entretenimento',
    mostrarNoMenu: false
  },
  
  // Garantias
  {
    id: 'garantia-estendida',
    nome: 'Garantia Estendida',
    descricao: 'Cálculo de garantia estendida para produtos',
    categoria: 'garantias',
    icone: ShieldCheck,
    caminhoRota: '/calculadoras/garantia-estendida',
    mostrarNoMenu: true
  },
  {
    id: 'seguro-produto',
    nome: 'Seguro de Produto',
    descricao: 'Cálculo de seguro para produtos diversos',
    categoria: 'garantias',
    icone: Target,
    caminhoRota: '/calculadoras/seguro-produto',
    mostrarNoMenu: false
  },
  
  // Outros
  {
    id: 'conversao-moedas',
    nome: 'Conversão de Moedas',
    descricao: 'Cálculo de valores em diferentes moedas',
    categoria: 'outros',
    icone: Globe,
    caminhoRota: '/calculadoras/conversao-moedas',
    mostrarNoMenu: true
  },
  {
    id: 'comparacao-investimentos',
    nome: 'Comparação de Investimentos',
    descricao: 'Compare diferentes tipos de investimentos',
    categoria: 'outros',
    icone: BarChart,
    caminhoRota: '/calculadoras/comparacao-investimentos',
    mostrarNoMenu: false
  },
  {
    id: 'calculo-aposentadoria',
    nome: 'Aposentadoria',
    descricao: 'Planejamento financeiro para aposentadoria',
    categoria: 'outros',
    icone: Clock,
    caminhoRota: '/calculadoras/calculo-aposentadoria',
    mostrarNoMenu: false
  },
  {
    id: 'calculo-impostos',
    nome: 'Cálculo de Impostos',
    descricao: 'Simulação de impostos para pessoas físicas e jurídicas',
    categoria: 'outros',
    icone: Landmark,
    caminhoRota: '/calculadoras/calculo-impostos',
    mostrarNoMenu: false
  },
  {
    id: 'cashback',
    nome: 'Cashback',
    descricao: 'Cálculo de retorno em programas de cashback',
    categoria: 'outros',
    icone: Coins,
    caminhoRota: '/calculadoras/cashback',
    mostrarNoMenu: false
  },
  {
    id: 'desconto-pagamento',
    nome: 'Desconto de Pagamento',
    descricao: 'Cálculo de descontos para pagamentos à vista',
    categoria: 'outros',
    icone: Percent,
    caminhoRota: '/calculadoras/desconto-pagamento',
    mostrarNoMenu: false
  },
  
  {
    id: 'renegociacao-dividas',
    nome: 'Renegociação de Dívidas',
    descricao: 'Calcule opções para renegociar suas dívidas',
    categoria: 'outros',
    icone: RefreshCcw,
    caminhoRota: '/calculadoras/renegociacao-dividas',
    mostrarNoMenu: true
  },
];

export const getCalculadoraConfig = (id: string): CalculadoraConfig | undefined => {
  return calculadoras.find(calc => calc.id === id);
};

export const getCalculadorasPorCategoria = (categoria: string) => {
  return calculadoras.filter(calc => calc.categoria === categoria);
};
