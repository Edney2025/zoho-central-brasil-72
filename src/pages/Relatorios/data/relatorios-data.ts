
// Dados de vendas mensais
export const vendasMensaisData = [
  { mes: 'Jan', valor: 12500, valorAnterior: 10200 },
  { mes: 'Fev', valor: 14300, valorAnterior: 11500 },
  { mes: 'Mar', valor: 18200, valorAnterior: 13800 },
  { mes: 'Abr', valor: 16700, valorAnterior: 15200 },
  { mes: 'Mai', valor: 21500, valorAnterior: 18100 },
  { mes: 'Jun', valor: 19800, valorAnterior: 17400 },
  { mes: 'Jul', valor: 22300, valorAnterior: 19700 },
  { mes: 'Ago', valor: 20100, valorAnterior: 21200 },
  { mes: 'Set', valor: 23400, valorAnterior: 20500 },
  { mes: 'Out', valor: 25700, valorAnterior: 22100 },
  { mes: 'Nov', valor: 28100, valorAnterior: 24300 },
  { mes: 'Dez', valor: 32400, valorAnterior: 27800 }
];

// Dados de produtos mais vendidos
export const topProdutosData = [
  { id: 1, nome: 'Smartphone XS Pro', categoria: 'Eletrônicos', quantidade: 125, valorTotal: 187500 },
  { id: 2, nome: 'Notebook Ultra', categoria: 'Eletrônicos', quantidade: 87, valorTotal: 261000 },
  { id: 3, nome: 'Smart TV 4K 55"', categoria: 'Eletrônicos', quantidade: 64, valorTotal: 192000 },
  { id: 4, nome: 'Sofá Retrátil', categoria: 'Móveis', quantidade: 43, valorTotal: 77400 },
  { id: 5, nome: 'Mesa de Jantar', categoria: 'Móveis', quantidade: 38, valorTotal: 45600 },
  { id: 6, nome: 'Serviço de Instalação', categoria: 'Serviços', quantidade: 156, valorTotal: 31200 },
  { id: 7, nome: 'Garantia Estendida', categoria: 'Serviços', quantidade: 231, valorTotal: 69300 }
];

// Dados de segmentação de clientes
export const clientesSegmentosData = [
  { segmento: 'Premium', valor: 87 },
  { segmento: 'Padrão', valor: 345 },
  { segmento: 'Ocasional', valor: 523 },
  { segmento: 'Novo', valor: 128 }
];

// Dados de recência de clientes
export const recenciaClientesData = [
  { periodo: '0-30 dias', quantidade: 245 },
  { periodo: '31-60 dias', quantidade: 187 },
  { periodo: '61-90 dias', quantidade: 156 },
  { periodo: '91-180 dias', quantidade: 234 },
  { periodo: '+180 dias', quantidade: 261 }
];

// Dados de top clientes
export const topClientesData = [
  { id: 1, nome: 'Empresa ABC Ltda', segmento: 'Premium', compras: 12, valorTotal: 87600, ultimaCompra: '10/05/2025' },
  { id: 2, nome: 'João Silva ME', segmento: 'Premium', compras: 8, valorTotal: 62400, ultimaCompra: '05/05/2025' },
  { id: 3, nome: 'Comércio XYZ', segmento: 'Padrão', compras: 15, valorTotal: 45000, ultimaCompra: '12/05/2025' },
  { id: 4, nome: 'Maria Pereira SA', segmento: 'Premium', compras: 6, valorTotal: 43200, ultimaCompra: '02/05/2025' },
  { id: 5, nome: 'Varejo Rápido', segmento: 'Padrão', compras: 9, valorTotal: 36000, ultimaCompra: '08/05/2025' }
];

// Dados de categorias de produtos
export const categoriasProdutosData = [
  { categoria: 'Eletrônicos', vendas: 456800 },
  { categoria: 'Móveis', vendas: 287400 },
  { categoria: 'Serviços', vendas: 145200 },
  { categoria: 'Acessórios', vendas: 98700 },
  { categoria: 'Decoração', vendas: 76500 }
];

// Dados de estoque de produtos
export const estoqueProdutosData = [
  { categoria: 'Eletrônicos', disponivel: 145, baixo: 28, critico: 12 },
  { categoria: 'Móveis', disponivel: 87, baixo: 15, critico: 5 },
  { categoria: 'Acessórios', disponivel: 234, baixo: 45, critico: 8 },
  { categoria: 'Decoração', disponivel: 98, baixo: 22, critico: 3 }
];

// Dados de fluxo de caixa
export const fluxoCaixaData = [
  { mes: 'Jan', receitas: 125000, despesas: 87500, liquido: 37500 },
  { mes: 'Fev', receitas: 143000, despesas: 92000, liquido: 51000 },
  { mes: 'Mar', receitas: 182000, despesas: 105000, liquido: 77000 },
  { mes: 'Abr', receitas: 167000, despesas: 98000, liquido: 69000 },
  { mes: 'Mai', receitas: 215000, despesas: 120000, liquido: 95000 },
  { mes: 'Jun', receitas: 198000, despesas: 115000, liquido: 83000 },
];
