
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CreditCard } from 'lucide-react';

const FinanceiroTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Financeiras</CardTitle>
        <CardDescription>
          Configure parâmetros financeiros.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="taxa-padrao">Taxa de Juros Padrão (%)</Label>
          <Input id="taxa-padrao" type="number" defaultValue="1.99" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parcelas-max">Parcelas Máximas</Label>
          <Input id="parcelas-max" type="number" defaultValue="96" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="simular-automatico" />
          <Label htmlFor="simular-automatico">Simular automaticamente ao abrir calculadoras</Label>
        </div>
        <Button>Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
};

export default FinanceiroTab;
