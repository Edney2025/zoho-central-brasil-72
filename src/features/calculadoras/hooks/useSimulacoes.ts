
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Simulacao } from '../types';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useSimulacoes = () => {
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [selectedSimulacoes, setSelectedSimulacoes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar simulações salvas do localStorage ao inicializar
  useEffect(() => {
    const savedSimulacoes = localStorage.getItem('simulacoes');
    if (savedSimulacoes) {
      try {
        const parsed = JSON.parse(savedSimulacoes);
        // Converter strings de data de volta para objetos Date
        const processedSimulacoes = parsed.map((sim: any) => ({
          ...sim,
          data: new Date(sim.data)
        }));
        setSimulacoes(processedSimulacoes);
      } catch (error) {
        console.error('Erro ao carregar simulações:', error);
      }
    }
  }, []);

  // Salvar simulações no localStorage quando houver mudanças
  useEffect(() => {
    if (simulacoes.length > 0) {
      localStorage.setItem('simulacoes', JSON.stringify(simulacoes));
    }
  }, [simulacoes]);

  const addSimulacao = (simulacao: Omit<Simulacao, 'id' | 'data'>) => {
    const newSimulacao = {
      ...simulacao,
      id: uuidv4(),
      data: new Date()
    } as Simulacao;
    
    setSimulacoes(prev => [...prev, newSimulacao]);
    toast({
      title: "Sucesso",
      description: 'Simulação salva com sucesso!'
    });
    return newSimulacao;
  };

  const updateSimulacao = (id: string, simulacao: Partial<Simulacao>) => {
    setSimulacoes(prev => 
      prev.map(sim => 
        sim.id === id ? { ...sim, ...simulacao } as Simulacao : sim
      )
    );
    toast({
      title: "Sucesso",
      description: 'Simulação atualizada com sucesso!'
    });
  };

  const removeSimulacao = (id: string) => {
    setSimulacoes(prev => prev.filter(sim => sim.id !== id));
    setSelectedSimulacoes(prev => prev.filter(simId => simId !== id));
    toast({
      title: "Sucesso",
      description: 'Simulação removida com sucesso!'
    });
  };

  const toggleSelectSimulacao = (id: string) => {
    setSelectedSimulacoes(prev => 
      prev.includes(id)
        ? prev.filter(simId => simId !== id)
        : [...prev, id]
    );
  };

  const clearSelectedSimulacoes = () => {
    setSelectedSimulacoes([]);
  };

  const getSelectedSimulacoes = () => {
    return simulacoes.filter(sim => selectedSimulacoes.includes(sim.id));
  };

  const createOrcamentoFromSimulacao = async (simulacaoId: string) => {
    setLoading(true);
    try {
      const simulacao = simulacoes.find(sim => sim.id === simulacaoId);
      
      if (!simulacao) {
        throw new Error('Simulação não encontrada');
      }
      
      // Aqui implementaríamos a lógica para criar um orçamento baseado na simulação
      // Esta é uma versão simplificada - futuramente integraremos com a API do Supabase
      
      // Simulando uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvando localmente no localStorage para testes
      const orcamentos = JSON.parse(localStorage.getItem('orcamentos') || '[]');
      const novoOrcamento = {
        id: uuidv4(),
        simulacaoId: simulacao.id,
        data: new Date(),
        status: 'pendente',
        valorTotal: simulacao.valorTotal,
        detalhes: simulacao
      };
      
      localStorage.setItem('orcamentos', JSON.stringify([...orcamentos, novoOrcamento]));
      
      toast({
        title: "Sucesso",
        description: 'Orçamento criado com sucesso!'
      });
      return { success: true, simulacao };
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      toast({
        title: "Erro",
        description: 'Erro ao criar orçamento. Tente novamente.',
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const shareSimulacao = async (simulacaoId: string) => {
    const simulacao = simulacoes.find(sim => sim.id === simulacaoId);
    
    if (!simulacao) {
      toast({
        title: "Erro",
        description: 'Simulação não encontrada',
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `Simulação: ${simulacao.titulo}\nValor Total: R$ ${simulacao.valorTotal.toFixed(2)}\n` +
        (simulacao.parcelas ? `Em ${simulacao.parcelas}x de R$ ${(simulacao.valorParcela || 0).toFixed(2)}\n` : '') +
        `Gerado em ${simulacao.data.toLocaleDateString()}`
      );
      toast({
        title: "Sucesso",
        description: 'Informações copiadas para a área de transferência!'
      });
    } catch (error) {
      console.error('Erro ao compartilhar simulação:', error);
      toast({
        title: "Erro",
        description: 'Erro ao compartilhar simulação.',
        variant: "destructive"
      });
    }
  };

  return {
    simulacoes,
    selectedSimulacoes,
    loading,
    addSimulacao,
    updateSimulacao,
    removeSimulacao,
    toggleSelectSimulacao,
    clearSelectedSimulacoes,
    getSelectedSimulacoes,
    createOrcamentoFromSimulacao,
    shareSimulacao
  };
};
