
import { useState, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';

// Definindo os tipos para os pedidos
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

// Dados de exemplo (mantenha os mesmos dados do arquivo original)
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

export interface UsePedidosDataReturn {
  pedidos: Pedido[];
  filteredPedidos: Pedido[];
  selectedPedido: Pedido | null;
  openDetails: boolean;
  isGeneratingPdf: boolean;
  setSelectedPedido: (pedido: Pedido | null) => void;
  setOpenDetails: (open: boolean) => void;
  viewPedidoDetails: (pedido: Pedido) => void;
  handleDownloadPdf: (pedidoId: string) => void;
  handlePrintPedido: () => void;
  filterPedidos: (searchTerm: string, activeTab: string, selectedDate: Date | undefined) => Pedido[];
}

export function usePedidosData(): UsePedidosDataReturn {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Usando pedidosExemplo diretamente em vez de ter outro estado
  const pedidos = useMemo(() => pedidosExemplo, []);
  
  const filterPedidos = (searchTerm: string, activeTab: string, selectedDate: Date | undefined) => {
    return pedidos.filter(pedido => {
      // Apply status filter
      if (activeTab !== 'todos' && pedido.status !== activeTab) {
        return false;
      }
      
      // Apply search filter
      if (
        !pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pedido.valor.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pedido.data.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      
      // Apply date filter
      if (selectedDate) {
        const pedidoDate = new Date(pedido.data.split('/').reverse().join('-'));
        const filterDate = new Date(selectedDate);
        
        if (
          pedidoDate.getDate() !== filterDate.getDate() ||
          pedidoDate.getMonth() !== filterDate.getMonth() ||
          pedidoDate.getFullYear() !== filterDate.getFullYear()
        ) {
          return false;
        }
      }
      
      return true;
    });
  };
  
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
    filteredPedidos: pedidos, // Este valor será sobrescrito no componente principal
    selectedPedido,
    openDetails,
    isGeneratingPdf,
    setSelectedPedido,
    setOpenDetails,
    viewPedidoDetails,
    handleDownloadPdf,
    handlePrintPedido,
    filterPedidos
  };
}
