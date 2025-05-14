
import React from 'react';
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
import { User, Search, Plus, FileText } from 'lucide-react';

// Mock data for demonstration
const mockClientes = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@example.com",
    telefone: "(11) 98765-4321",
    tipo: "Pessoa Física",
    dataCadastro: "2023-10-15",
    status: "Ativo"
  },
  {
    id: "2",
    nome: "Empresa ABC",
    email: "contato@empresaabc.com",
    telefone: "(11) 3456-7890",
    tipo: "Pessoa Jurídica",
    dataCadastro: "2023-09-22",
    status: "Ativo"
  },
  {
    id: "3",
    nome: "Maria Souza",
    email: "maria@example.com",
    telefone: "(21) 98765-1234",
    tipo: "Pessoa Física",
    dataCadastro: "2023-08-30",
    status: "Inativo"
  },
  {
    id: "4",
    nome: "Comércio XYZ",
    email: "contato@xyz.com",
    telefone: "(31) 3456-1234",
    tipo: "Pessoa Jurídica",
    dataCadastro: "2023-10-01",
    status: "Análise"
  },
];

interface ClientesTableProps {
  onAddClick: () => void;
}

const ClientesTable = ({ onAddClick }: ClientesTableProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredClientes = mockClientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onAddClick} className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Novo Cliente
        </Button>
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
              <TableHead>Ações</TableHead>
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
                      cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                      cliente.status === 'Inativo' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cliente.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum cliente encontrado com esse termo de busca
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientesTable;
