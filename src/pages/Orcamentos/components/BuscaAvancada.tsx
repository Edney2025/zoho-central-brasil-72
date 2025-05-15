
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Filter, Search, X } from 'lucide-react';
import { format } from 'date-fns';

interface BuscaAvancadaProps {
  onFilterChange: (filtros: any) => void;
}

const BuscaAvancada: React.FC<BuscaAvancadaProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    cliente: '',
    valorMinimo: '',
    valorMaximo: '',
    status: '',
    dataInicio: null as Date | null,
    dataFim: null as Date | null,
    formaPagamento: ''
  });

  const handleResetFiltros = () => {
    const resetFiltros = {
      cliente: '',
      valorMinimo: '',
      valorMaximo: '',
      status: '',
      dataInicio: null,
      dataFim: null,
      formaPagamento: ''
    };
    setFiltros(resetFiltros);
    onFilterChange(resetFiltros);
  };

  const handleAplicarFiltros = () => {
    onFilterChange(filtros);
    setOpen(false);
  };

  const handleChange = (campo: string, valor: any) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          Filtros avançados
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Busca avançada</h4>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                placeholder="Nome do cliente"
                value={filtros.cliente}
                onChange={(e) => handleChange('cliente', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="valorMinimo">Valor mínimo</Label>
                <Input
                  id="valorMinimo"
                  placeholder="R$ 0,00"
                  value={filtros.valorMinimo}
                  onChange={(e) => handleChange('valorMinimo', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="valorMaximo">Valor máximo</Label>
                <Input
                  id="valorMaximo"
                  placeholder="R$ 9.999,99"
                  value={filtros.valorMaximo}
                  onChange={(e) => handleChange('valorMaximo', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={filtros.status} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="reprovado">Reprovado</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="formaPagamento">Forma de pagamento</Label>
              <Select 
                value={filtros.formaPagamento} 
                onValueChange={(value) => handleChange('formaPagamento', value)}
              >
                <SelectTrigger id="formaPagamento">
                  <SelectValue placeholder="Selecione uma forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="avista">À vista</SelectItem>
                  <SelectItem value="parcelado">Parcelado</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Data inicial</Label>
                <DatePicker
                  date={filtros.dataInicio}
                  onSelect={(date) => handleChange('dataInicio', date)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label>Data final</Label>
                <DatePicker
                  date={filtros.dataFim}
                  onSelect={(date) => handleChange('dataFim', date)}
                  placeholder="Selecione"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetFiltros}
              >
                <X className="mr-2 h-4 w-4" /> Limpar
              </Button>
              <Button 
                size="sm"
                onClick={handleAplicarFiltros}
              >
                <Search className="mr-2 h-4 w-4" /> Aplicar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BuscaAvancada;
