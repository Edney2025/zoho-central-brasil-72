
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, User, Building, Calculator, CreditCard, Bell, Lock, Settings } from 'lucide-react';

const TabList = () => {
  return (
    <TabsList className="flex md:flex-col h-auto p-1 md:p-2 md:w-48 space-y-1">
      <TabsTrigger value="taxas" className="w-full justify-start gap-2 px-2">
        <Tag className="h-4 w-4" />
        <span>Taxas</span>
      </TabsTrigger>
      <TabsTrigger value="perfil" className="w-full justify-start gap-2 px-2">
        <User className="h-4 w-4" />
        <span>Perfil</span>
      </TabsTrigger>
      <TabsTrigger value="empresa" className="w-full justify-start gap-2 px-2">
        <Building className="h-4 w-4" />
        <span>Empresa</span>
      </TabsTrigger>
      <TabsTrigger value="calculadoras" className="w-full justify-start gap-2 px-2">
        <Calculator className="h-4 w-4" />
        <span>Calculadoras</span>
      </TabsTrigger>
      <TabsTrigger value="financeiro" className="w-full justify-start gap-2 px-2">
        <CreditCard className="h-4 w-4" />
        <span>Financeiro</span>
      </TabsTrigger>
      <TabsTrigger value="notificacoes" className="w-full justify-start gap-2 px-2">
        <Bell className="h-4 w-4" />
        <span>Notificações</span>
      </TabsTrigger>
      <TabsTrigger value="seguranca" className="w-full justify-start gap-2 px-2">
        <Lock className="h-4 w-4" />
        <span>Segurança</span>
      </TabsTrigger>
      <TabsTrigger value="sistema" className="w-full justify-start gap-2 px-2">
        <Settings className="h-4 w-4" />
        <span>Sistema</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
