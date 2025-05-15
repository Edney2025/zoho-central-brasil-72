
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, Tag, Download, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types for client data
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  dataCadastro: string;
  status: string;
  isPessoaJuridica?: boolean;
  cpf?: string;
  cnpj?: string;
  tags?: string[];
  proximoContato?: string;
  classificacao?: string;
}

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

interface ClientesTableProps {
  onAddClick: () => void;
  onEditClick: (id: string) => void;
  onViewClick: (id: string) => void;
}

const ClientesTable: React.FC<ClientesTableProps> = ({ onAddClick, onEditClick, onViewClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [tagFilter, setTagFilter] = useState<string>("todos");
  const [classificacaoFilter, setClassificacaoFilter] = useState<string>("todos");
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [deleteClienteId, setDeleteClienteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
  
  // Apply filters
  const filteredClientes = clientes.filter(cliente => {
    // Search filter
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm) ||
      (cliente.cpf && cliente.cpf.includes(searchTerm)) ||
      (cliente.cnpj && cliente.cnpj.includes(searchTerm));
    
    // Status, type filters
    const matchesStatus = statusFilter === "todos" || cliente.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTipo = tipoFilter === "todos" || cliente.tipo.toLowerCase() === tipoFilter.toLowerCase();
    
    // Tag filter
    const matchesTag = tagFilter === "todos" || (cliente.tags && cliente.tags.includes(tagFilter));
    
    // Classification filter
    const matchesClassificacao = classificacaoFilter === "todos" || 
      (cliente.classificacao && cliente.classificacao.toLowerCase() === classificacaoFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesTipo && matchesTag && matchesClassificacao;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, CPF/CNPJ..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Formato de exportação</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExportData('excel')}>
                Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('pdf')}>
                PDF (.pdf)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('csv')}>
                CSV (.csv)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
            <SelectItem value="em análise">Em Análise</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={tipoFilter} onValueChange={setTipoFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo de Pessoa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="pessoa física">Pessoa Física</SelectItem>
            <SelectItem value="pessoa jurídica">Pessoa Jurídica</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Etiquetas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as Etiquetas</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={classificacaoFilter} onValueChange={setClassificacaoFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Classificação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de clientes cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Etiquetas</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div>{cliente.nome}</div>
                        {cliente.proximoContato && (
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Próximo contato: {new Date(cliente.proximoContato).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.tipo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {cliente.tags && cliente.tags.length > 0 ? 
                        cliente.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 gap-1 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-primary/60 mr-1"></span>
                            {tag}
                          </Badge>
                        ))
                      : (
                        <span className="text-muted-foreground text-xs">Sem etiquetas</span>
                      )}
                      {cliente.tags && cliente.tags.length > 2 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="text-xs px-1.5 py-0">
                                +{cliente.tags.length - 2}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                {cliente.tags.slice(2).map(tag => (
                                  <div key={tag} className="text-xs">{tag}</div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cliente.status.toLowerCase() === 'ativo' ? 'bg-green-100 text-green-800' : 
                        cliente.status.toLowerCase() === 'inativo' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cliente.status}
                      </span>
                      
                      {cliente.classificacao && (
                        <Badge variant="secondary" className="text-xs">
                          {cliente.classificacao}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => onViewClick(cliente.id)} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" /> Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditClick(cliente.id)} className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleAddReminder(cliente)} 
                            className="flex items-center"
                          >
                            <Bell className="h-4 w-4 mr-2" /> Adicionar Lembrete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => {
                            setDeleteClienteId(cliente.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-destructive flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum cliente encontrado com os filtros atuais
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCliente} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientesTable;
