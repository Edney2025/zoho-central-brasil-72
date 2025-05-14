
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
import { User, Search, FileText, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { supabase } from "@/integrations/supabase/client";

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
}

// Mock data for demonstration
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
    cpf: "123.456.789-00"
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
    cnpj: "12.345.678/0001-90"
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
    cpf: "987.654.321-00"
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
    cnpj: "98.765.432/0001-10"
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
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [deleteClienteId, setDeleteClienteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
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
  
  // Apply filters
  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm) ||
      (cliente.cpf && cliente.cpf.includes(searchTerm)) ||
      (cliente.cnpj && cliente.cnpj.includes(searchTerm));
    
    const matchesStatus = statusFilter === "todos" || cliente.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTipo = tipoFilter === "todos" || cliente.tipo.toLowerCase() === tipoFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesTipo;
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
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
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
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="pessoa física">Pessoa Física</SelectItem>
              <SelectItem value="pessoa jurídica">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
              <TableHead className="hidden md:table-cell">Data Cadastro</TableHead>
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
                      {cliente.nome}
                    </div>
                  </TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.tipo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cliente.status.toLowerCase() === 'ativo' ? 'bg-green-100 text-green-800' : 
                      cliente.status.toLowerCase() === 'inativo' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cliente.status}
                    </span>
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
                        <DropdownMenuItem onClick={() => onViewClick(cliente.id)} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" /> Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditClick(cliente.id)} className="flex items-center">
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
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
