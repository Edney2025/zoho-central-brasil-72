
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const ReportFilters = () => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="data-inicio">Data Inicial</Label>
          <Input id="data-inicio" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="data-fim">Data Final</Label>
          <Input id="data-fim" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Select>
            <SelectTrigger id="categoria">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as categorias</SelectItem>
              <SelectItem value="eletronicos">Eletrônicos</SelectItem>
              <SelectItem value="moveis">Móveis</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-4 flex justify-end gap-2">
          <Button variant="outline">Limpar Filtros</Button>
          <Button>Aplicar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  );
};
