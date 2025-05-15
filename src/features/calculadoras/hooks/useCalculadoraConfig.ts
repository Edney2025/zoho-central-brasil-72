
import { useState, useEffect } from 'react';
import { localStorageService } from '@/services/localStorageService';

export interface ConfiguracaoCalculadora {
  taxasProdutosNovos: number;
  taxasProdutosUsados: number;
  taxasEmprestimos: number;
  taxasFinanciamentos: number;
  taxasTransportes: number;
  taxasServicos: number;
  taxasGarantias: number;
  parcelasMax: number;
  parcelasDisponiveis: number[];
  entradasDisponiveis: number[];
}

export const useCalculadoraConfig = () => {
  const [config, setConfig] = useState<ConfiguracaoCalculadora>({
    taxasProdutosNovos: 1.99,
    taxasProdutosUsados: 2.49,
    taxasEmprestimos: 2.99,
    taxasFinanciamentos: 1.89,
    taxasTransportes: 1.79,
    taxasServicos: 0,
    taxasGarantias: 0.99,
    parcelasMax: 96,
    parcelasDisponiveis: [3, 6, 9, 12, 18, 24, 36, 48, 60, 72, 84, 96],
    entradasDisponiveis: [0, 10, 20, 30, 40, 50]
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadConfig = () => {
      try {
        setIsLoading(true);
        const settings = localStorageService.getData('settings') || [];
        const taxasConfig = settings.find(
          (setting: any) => setting.category === 'taxas'
        );
        
        if (taxasConfig) {
          setConfig(prev => ({
            ...prev,
            taxasProdutosNovos: taxasConfig.produtosNovos || prev.taxasProdutosNovos,
            taxasProdutosUsados: taxasConfig.produtosUsados || prev.taxasProdutosUsados,
            taxasEmprestimos: taxasConfig.emprestimos || prev.taxasEmprestimos,
            parcelasMax: taxasConfig.parcelasMax || prev.parcelasMax
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfig();
  }, []);
  
  const getTaxaJuros = (categoria: string): number => {
    switch (categoria) {
      case 'produtos':
        return config.taxasProdutosNovos;
      case 'emprestimos':
        return config.taxasEmprestimos;
      case 'financiamentos':
        return config.taxasFinanciamentos;
      case 'transportes':
        return config.taxasTransportes;
      case 'servicos':
        return config.taxasServicos;
      case 'garantias':
        return config.taxasGarantias;
      default:
        return config.taxasProdutosNovos;
    }
  };
  
  const calcularPrestacao = (
    valorTotal: number, 
    numParcelas: number, 
    taxaJuros: number,
    valorEntrada: number = 0
  ): { valorParcela: number, valorTotalComJuros: number } => {
    const valorFinanciado = valorTotal - valorEntrada;
    
    if (taxaJuros === 0) {
      return {
        valorParcela: valorFinanciado / numParcelas,
        valorTotalComJuros: valorTotal
      };
    }
    
    // Taxa em formato decimal (ex: 1.99% = 0.0199)
    const taxaDecimal = taxaJuros / 100;
    
    // Fórmula de prestação com juros compostos: PMT = PV * (i * (1 + i)^n) / ((1 + i)^n - 1)
    const prestacao = valorFinanciado * 
      (taxaDecimal * Math.pow(1 + taxaDecimal, numParcelas)) / 
      (Math.pow(1 + taxaDecimal, numParcelas) - 1);
    
    const valorTotalComJuros = prestacao * numParcelas + valorEntrada;
    
    return {
      valorParcela: prestacao,
      valorTotalComJuros
    };
  };
  
  return {
    config,
    isLoading,
    getTaxaJuros,
    calcularPrestacao
  };
};
