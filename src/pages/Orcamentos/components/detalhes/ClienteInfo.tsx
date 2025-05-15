
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { Cliente } from '../../types/orcamento';

interface ClienteInfoProps {
  cliente: Cliente;
}

export const ClienteInfo: React.FC<ClienteInfoProps> = ({ cliente }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Cliente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="font-medium text-lg">{cliente.nome}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <a href={`mailto:${cliente.email}`} className="text-sm hover:underline">
              {cliente.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <a href={`tel:${cliente.telefone}`} className="text-sm hover:underline">
              {cliente.telefone}
            </a>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Endereço</p>
          <p className="text-sm">{cliente.endereco}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm" className="w-full">
          Ver Perfil Completo
        </Button>
      </CardFooter>
    </Card>
  );
};
