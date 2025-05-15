
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "@/components/ui/use-toast";
import { Cliente } from '../types/cliente';

// Mock data with additional fields
const mockClientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@example.com",
    telefone: "(11) 98765-4321",
    tipo: "Pessoa Física",
    dataCadastro: "2023-10-15",
    status: "Ativo",
    isPessoaJuridica: false,
    cpf: "123.456.789-00",
    tags: ["VIP", "Contrato Mensal"],
    proximoContato: "2023-11-25",
    classificacao: "Premium"
  },
  {
    id: "2",
    nome: "Empresa ABC",
    email: "contato@empresaabc.com",
    telefone: "(11) 3456-7890",
    tipo: "Pessoa Jurídica",
    dataCadastro: "2023-09-22",
    status: "Ativo",
    isPessoaJuridica: true,
    cnpj: "12.345.678/0001-90",
    tags: ["Parceiro", "Corporate"],
    proximoContato: "2023-12-10",
    classificacao: "Platinum"
  },
  {
    id: "3",
    nome: "Maria Souza",
    email: "maria@example.com",
    telefone: "(21) 98765-1234",
    tipo: "Pessoa Física",
    dataCadastro: "2023-08-30",
    status: "Inativo",
    isPessoaJuridica: false,
    cpf: "987.654.321-00",
    tags: ["Inadimplente"],
    classificacao: "Regular"
  },
  {
    id: "4",
    nome: "Comércio XYZ",
    email: "contato@xyz.com",
    telefone: "(31) 3456-1234",
    tipo: "Pessoa Jurídica",
    dataCadastro: "2023-10-01",
    status: "Em Análise",
    isPessoaJuridica: true,
    cnpj: "98.765.432/0001-10",
    tags: ["Novo", "Em Avaliação"],
    proximoContato: "2023-11-05",
    classificacao: "Regular"
  },
];

export interface ClientesFilters {
  searchTerm: string;
  statusFilter: string;
  tipoFilter: string;
  tagFilter: string;
  classificacaoFilter: string;
}

export function useClientesData() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [deleteClienteId, setDeleteClienteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filters, setFilters] = useState<ClientesFilters>({
    searchTerm: "",
    statusFilter: "todos",
    tipoFilter: "todos",
    tagFilter: "todos",
    classificacaoFilter: "todos"
  });
  const { toast } = useToast();
  
  // All available tags extracted from clients
  const allTags = [...new Set(mockClientes.flatMap(c => c.tags || []))];
  
  // Effect to fetch clients from Supabase
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        // In a real app, this would be connected to Supabase
        // const { data, error } = await supabase
        //   .from('clientes')
        //   .select('*')
        
        // if (error) throw error;
        // setClientes(data);
        
        // Using mock data for now
        setClientes(mockClientes);
      } catch (error) {
        console.error('Error fetching clientes:', error);
        toast({
          title: "Erro ao carregar clientes",
          description: "Ocorreu um erro ao buscar os dados dos clientes.",
          variant: "destructive"
        });
      }
    };
    
    fetchClientes();
  }, [toast]);
  
  // Function to handle client deletion
  const handleDeleteCliente = async () => {
    if (!deleteClienteId) return;
    
    try {
      // In a real app, this would delete from Supabase
      // const { error } = await supabase
      //   .from('clientes')
      //   .delete()
      //   .eq('id', deleteClienteId);
      
      // if (error) throw error;
      
      // For now, filter out the deleted client from state
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== deleteClienteId));
      
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting cliente:', error);
      toast({
        title: "Erro ao excluir cliente",
        description: "Ocorreu um erro ao excluir o cliente.",
        variant: "destructive"
      });
    } finally {
      setDeleteClienteId(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Function to handle reminder creation
  const handleAddReminder = (cliente: Cliente) => {
    sonnerToast.success("Lembrete adicionado", {
      description: `Próximo contato com ${cliente.nome} foi agendado.`,
      action: {
        label: "Ver",
        onClick: () => console.log("Viewing reminder")
      }
    });
  };
  
  // Function to export client data
  const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
    toast({
      title: "Exportando dados",
      description: `Os dados dos clientes serão exportados em formato ${format.toUpperCase()}.`
    });
    
    // Simulação de download
    setTimeout(() => {
      sonnerToast.success("Dados exportados com sucesso!", {
        description: `O arquivo ${format.toUpperCase()} foi baixado.`
      });
    }, 2000);
  };
  
  const updateFilters = (newFilters: Partial<ClientesFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Apply filters
  const filteredClientes = clientes.filter(cliente => {
    // Search filter
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      cliente.telefone.includes(filters.searchTerm) ||
      (cliente.cpf && cliente.cpf.includes(filters.searchTerm)) ||
      (cliente.cnpj && cliente.cnpj.includes(filters.searchTerm));
    
    // Status, type filters
    const matchesStatus = filters.statusFilter === "todos" || cliente.status.toLowerCase() === filters.statusFilter.toLowerCase();
    const matchesTipo = filters.tipoFilter === "todos" || cliente.tipo.toLowerCase() === filters.tipoFilter.toLowerCase();
    
    // Tag filter
    const matchesTag = filters.tagFilter === "todos" || (cliente.tags && cliente.tags.includes(filters.tagFilter));
    
    // Classification filter
    const matchesClassificacao = filters.classificacaoFilter === "todos" || 
      (cliente.classificacao && cliente.classificacao.toLowerCase() === filters.classificacaoFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesTipo && matchesTag && matchesClassificacao;
  });
  
  return {
    clientes: filteredClientes,
    allTags,
    deleteClienteId,
    setDeleteClienteId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    filters,
    updateFilters,
    handleDeleteCliente,
    handleAddReminder,
    handleExportData
  };
}
