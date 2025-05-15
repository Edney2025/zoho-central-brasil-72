
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusStep } from './StatusStep';
import { StatusBadge } from './StatusBadge';
import { ChevronRight, Download, Printer } from 'lucide-react';
import { Pedido } from '../../hooks/usePedidosData';

interface PedidoDetailsDialogProps {
  open: boolean;
  pedido: Pedido | null;
  onOpenChange: (open: boolean) => void;
  onDownload: (pedidoId: string) => void;
  onPrint: () => void;
  isGeneratingPdf: boolean;
}

export const PedidoDetailsDialog: React.FC<PedidoDetailsDialogProps> = ({
  open,
  pedido,
  onOpenChange,
  onDownload,
  onPrint,
  isGeneratingPdf
}) => {
  if (!pedido) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido {pedido.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Informações do Pedido</h3>
              <div className="bg-muted/30 p-3 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Número:</span>
                  <span className="text-sm font-medium">{pedido.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Data:</span>
                  <span className="text-sm font-medium">{pedido.data}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Valor Total:</span>
                  <span className="text-sm font-medium">{pedido.valor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Forma de Pagamento:</span>
                  <span className="text-sm font-medium">{pedido.pagamento}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Previsão de Entrega:</span>
                  <span className="text-sm font-medium">{pedido.entrega}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status do Pedido</h3>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="mb-2 flex items-center">
                  <span className="font-medium mr-2">Status:</span>
                  <StatusBadge status={pedido.status} />
                </div>
                
                <StatusStep status={pedido.status} />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Produtos</h3>
            <div className="bg-muted/30 rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedido.produtos.map((produto, index) => (
                    <TableRow key={index}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell className="text-center">{produto.quantidade}</TableCell>
                      <TableCell className="text-right">{produto.valor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Comentários</h3>
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm">{pedido.comentarios}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-between">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => onDownload(pedido.id)}
                disabled={isGeneratingPdf}
              >
                <Download className="mr-2 h-4 w-4" /> Baixar PDF
              </Button>
              <Button variant="outline" onClick={onPrint}>
                <Printer className="mr-2 h-4 w-4" /> Imprimir
              </Button>
            </div>
            <Button onClick={() => onOpenChange(false)}>
              Fechar <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
