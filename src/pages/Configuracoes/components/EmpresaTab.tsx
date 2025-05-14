
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';

const EmpresaTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empresa</CardTitle>
        <CardDescription>
          Configure os dados da empresa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="empresa-nome">Nome da Empresa</Label>
          <Input id="empresa-nome" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input id="cnpj" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="telefone-empresa">Telefone</Label>
            <Input id="telefone-empresa" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-empresa">E-mail</Label>
            <Input id="email-empresa" type="email" />
          </div>
        </div>
        <Button>Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
};

export default EmpresaTab;
