
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { User, Calendar } from 'lucide-react';
import { Cliente } from '../../types/cliente';
import ClienteTags from './ClienteTags';
import ClienteStatusBadge from './ClienteStatusBadge';
import ClienteActionsMenu from './ClienteActionsMenu';

interface ClientesTableContentProps {
  clientes: Cliente[];
  onViewClick: (id: string) => void;
  onEditClick: (id: string) => void;
  onAddReminder: (cliente: Cliente) => void;
  onDeleteClick: (id: string) => void;
}

const ClientesTableContent: React.FC<ClientesTableContentProps> = ({
  clientes,
  onViewClick,
  onEditClick,
  onAddReminder,
  onDeleteClick
}) => {
  return (
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
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
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
                  <ClienteTags tags={cliente.tags} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <ClienteStatusBadge 
                    status={cliente.status} 
                    classificacao={cliente.classificacao} 
                  />
                </TableCell>
                <TableCell className="text-right">
                  <ClienteActionsMenu 
                    cliente={cliente}
                    onViewClick={onViewClick}
                    onEditClick={onEditClick}
                    onAddReminder={onAddReminder}
                    onDeleteClick={onDeleteClick}
                  />
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
  );
};

export default ClientesTableContent;
