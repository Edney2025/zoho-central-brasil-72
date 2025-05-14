
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Lock } from 'lucide-react';

const SegurancaTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>
          Gerencie suas configurações de segurança.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="senha-atual">Senha Atual</Label>
          <Input id="senha-atual" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nova-senha">Nova Senha</Label>
          <Input id="nova-senha" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
          <Input id="confirmar-senha" type="password" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="dois-fatores" />
          <Label htmlFor="dois-fatores">Ativar autenticação de dois fatores</Label>
        </div>
        <Button>Atualizar Senha</Button>
      </CardContent>
    </Card>
  );
};

export default SegurancaTab;
