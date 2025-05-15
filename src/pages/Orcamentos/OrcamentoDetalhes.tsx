
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { sonnerToast } from '@/components/ui/use-toast';
import { localStorageService } from '@/services/localStorageService';
import { OrcamentoDetalhado } from './types/orcamento';

// Components
import { HeaderActions } from './components/detalhes/HeaderActions';
import { OrcamentoInfo } from './components/detalhes/OrcamentoInfo';
import { ClienteInfo } from './components/detalhes/ClienteInfo';
import { ProximasAcoes } from './components/detalhes/ProximasAcoes';
import { HistoricoOrcamento } from './components/detalhes/HistoricoOrcamento';
import { AnexosLista } from './components/detalhes/AnexosLista';
import { AnaliseDesempenho } from './components/detalhes/AnaliseDesempenho';
import { LoadingSkeleton } from './components/detalhes/LoadingSkeleton';

const OrcamentoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orcamento, setOrcamento] = useState<OrcamentoDetalhado | null>(null);

  // Dados para os gráficos
  const vendasMensais = [
    { nome: 'Jan', valor: 12000 },
    { nome: 'Fev', valor: 14500 },
    { nome: 'Mar', valor: 18000 },
    { nome: 'Abr', valor: 16500 },
    { nome: 'Mai', valor: 21000 },
    { nome: 'Jun', valor: 19800 }
  ];
  
  const desempenhoCategorias = [
    { nome: 'Serviços', atual: 21000, anterior: 18500 },
    { nome: 'Produtos', atual: 16800, anterior: 15200 },
    { nome: 'Consultoria', atual: 8500, anterior: 7200 },
    { nome: 'Suporte', atual: 5200, anterior: 4800 }
  ];

  useEffect(() => {
    // Simula busca de dados do orçamento
    setTimeout(() => {
      // Busca de dados do serviço de localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const orcamentoEncontrado = orcamentos.find((orc: any) => orc.id === id);
      
      if (orcamentoEncontrado) {
        // Ensure the status is one of the allowed types
        const validStatus = orcamentoEncontrado.status as 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
        setOrcamento({
          ...orcamentoEncontrado,
          status: validStatus
        });
      } else {
        sonnerToast("Orçamento não encontrado", {
          description: `O orçamento #${id} não foi encontrado no sistema.`,
          duration: 5000,
        });
        navigate('/orcamentos');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);

  const handleApproveQuote = () => {
    if (orcamento) {
      const updatedOrcamento = { 
        ...orcamento, 
        status: 'aprovado' as const  // Explicitly type as const to match the union type
      };
      setOrcamento(updatedOrcamento);
      
      // Atualiza no localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const updatedOrcamentos = orcamentos.map((orc: any) => 
        orc.id === id ? {...orc, status: 'aprovado'} : orc
      );
      localStorageService.setData('orcamentos', updatedOrcamentos);
      
      toast({
        title: "Orçamento aprovado",
        description: `O orçamento #${id} foi aprovado com sucesso.`,
      });
    }
  };

  const handleRejectQuote = () => {
    if (orcamento) {
      const updatedOrcamento = { 
        ...orcamento, 
        status: 'reprovado' as const  // Explicitly type as const to match the union type
      };
      setOrcamento(updatedOrcamento);
      
      // Atualiza no localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const updatedOrcamentos = orcamentos.map((orc: any) => 
        orc.id === id ? {...orc, status: 'reprovado'} : orc
      );
      localStorageService.setData('orcamentos', updatedOrcamentos);
      
      toast({
        title: "Orçamento recusado",
        description: `O orçamento #${id} foi recusado.`,
      });
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!orcamento) {
    return null;
  }

  return (
    <div className="space-y-6">
      <HeaderActions 
        id={orcamento.id}
        status={orcamento.status}
        onApprove={handleApproveQuote}
        onReject={handleRejectQuote}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrcamentoInfo 
            id={orcamento.id}
            data={orcamento.data}
            validade={orcamento.validade}
            valor={orcamento.valor}
            items={orcamento.items}
            condicoesPagamento={orcamento.condicoesPagamento}
            observacoes={orcamento.observacoes}
          />
          
          <AnaliseDesempenho 
            vendasMensais={vendasMensais}
            desempenhoCategorias={desempenhoCategorias}
          />
          
          <HistoricoOrcamento historico={orcamento.historico} />
          
          <AnexosLista anexos={orcamento.anexos} />
        </div>
        
        {/* Sidebar com dados do cliente */}
        <div className="space-y-6">
          <ClienteInfo cliente={orcamento.cliente} />
          <ProximasAcoes status={orcamento.status} />
        </div>
      </div>
    </div>
  );
};

export default OrcamentoDetalhes;
