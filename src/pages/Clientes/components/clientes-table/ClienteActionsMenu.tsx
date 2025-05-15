
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, Bell, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Cliente } from '../../types/cliente';

interface ClienteActionsMenuProps {
  cliente: Cliente;
  onViewClick: (id: string) => void;
  onEditClick: (id: string) => void;
  onAddReminder: (cliente: Cliente) => void;
  onDeleteClick: (id: string) => void;
}

const ClienteActionsMenu: React.FC<ClienteActionsMenuProps> = ({
  cliente,
  onViewClick,
  onEditClick,
  onAddReminder,
  onDeleteClick
}) => {
  return (
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
          <DropdownMenuItem 
            onClick={() => onViewClick(cliente.id)} 
            className="flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" /> Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onEditClick(cliente.id)} 
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddReminder(cliente)} 
            className="flex items-center"
          >
            <Bell className="h-4 w-4 mr-2" /> Adicionar Lembrete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onDeleteClick(cliente.id)}
          className="text-destructive flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-2" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClienteActionsMenu;
