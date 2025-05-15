
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define types
export interface PedidoItem {
  nome: string;
  quantidade: number;
  valor: string;
}

export interface Pedido {
  id: string;
  data: string;
  valor: string;
  status: 'aprovado' | 'pendente' | 'concluido' | 'reprovado' | 'processando';
  produtos: PedidoItem[];
  entrega: string;
  pagamento: string;
  comentarios: string;
}

// Mock data for the orders
const pedidosExemplo: Pedido[] = [
  { 
    id: 'PED001', 
    data: '15/05/2023',
    valor: 'R$ 12.500,00',
    status: 'aprovado', 
    produtos: [
      { nome: 'Produto A', quantidade: 5, valor: 'R$ 2.500,00' },
      { nome: 'Produto B', quantidade: 2, valor: 'R$ 10.000,00' }
    ],
    entrega: '30/05/2023',
    pagamento: 'À vista',
    comentarios: 'Pedido aprovado. Em produção.'
  },
  { 
    id: 'PED002', 
    data: '18/05/2023',
    valor: 'R$ 5.800,00', 
    status: 'pendente',
    produtos: [
      { nome: 'Produto C', quantidade: 3, valor: 'R$ 1.800,00' },
      { nome: 'Produto D', quantidade: 1, valor: 'R$ 4.000,00' }
    ],
    entrega: '02/06/2023',
    pagamento: 'Parcelado (3x)',
    comentarios: 'Aguardando aprovação.'
  },
  { 
    id: 'PED003', 
    data: '20/05/2023',
    valor: 'R$ 8.200,00', 
    status: 'concluido',
    produtos: [
      { nome: 'Produto E', quantidade: 2, valor: 'R$ 3.200,00' },
      { nome: 'Produto F', quantidade: 1, valor: 'R$ 5.000,00' }
    ],
    entrega: '25/05/2023',
    pagamento: 'À vista',
    comentarios: 'Pedido entregue e concluído.'
  }
];

export function usePedidosData() {
  const [pedidos] = useState<Pedido[]>(pedidosExemplo);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const viewPedidoDetails = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setOpenDetails(true);
  };

  const handleDownloadPdf = (pedidoId: string) => {
    setIsGeneratingPdf(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast({
        title: "PDF Gerado",
        description: `O PDF do pedido ${pedidoId} foi gerado com sucesso.`
      });
      setIsGeneratingPdf(false);
    }, 1500);
  };
  
  const handlePrintPedido = () => {
    toast({
      title: "Impressão iniciada",
      description: "O documento foi enviado para impressão."
    });
  };

  return {
    pedidos,
    selectedPedido,
    openDetails,
    isGeneratingPdf,
    setOpenDetails,
    viewPedidoDetails,
    handleDownloadPdf,
    handlePrintPedido
  };
}
