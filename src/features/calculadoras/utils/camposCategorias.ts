
// Utility for getting the correct fields to display based on category

interface CampoConfig {
  key: string;
  label: string;
  formato?: 'moeda';
}

/**
 * Returns the appropriate fields to display for a specific category of simulation
 */
export const getCamposPorCategoria = (categoria: string): CampoConfig[] => {
  switch (categoria) {
    case 'produtos':
      return [
        { key: 'nome', label: 'Produto' },
        { key: 'quantidade', label: 'Qtd' },
        { key: 'valorUnitario', label: 'Valor Unit.', formato: 'moeda' },
        { key: 'estado', label: 'Estado' },
      ];
    case 'financiamentos':
      return [
        { key: 'tipo', label: 'Tipo' },
        { key: 'prazo', label: 'Prazo' },
        { key: 'valorFinanciado', label: 'Valor Financiado', formato: 'moeda' },
        { key: 'valorEntrada', label: 'Entrada', formato: 'moeda' },
        { key: 'cet', label: 'CET %' },
      ];
    case 'emprestimos':
      return [
        { key: 'tipo', label: 'Tipo' },
        { key: 'prazo', label: 'Prazo' },
        { key: 'valorSolicitado', label: 'Valor Solicitado', formato: 'moeda' },
        { key: 'valorLiberado', label: 'Valor Liberado', formato: 'moeda' },
        { key: 'cet', label: 'CET %' },
      ];
    case 'transportes':
      return [
        { key: 'tipo', label: 'Tipo' },
        { key: 'distancia', label: 'Distância' },
        { key: 'valorPorKm', label: 'Valor/Km', formato: 'moeda' },
      ];
    default:
      return [];
  }
};

export type { CampoConfig };
