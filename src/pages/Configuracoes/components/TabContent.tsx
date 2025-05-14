
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TaxasTab from './TaxasTab';
import PerfilTab from './PerfilTab';
import EmpresaTab from './EmpresaTab';
import CalculadorasTab from './CalculadorasTab';
import FinanceiroTab from './FinanceiroTab';
import NotificacoesTab from './NotificacoesTab';
import SegurancaTab from './SegurancaTab';
import SistemaTab from './SistemaTab';

const TabContent = () => {
  return (
    <div className="flex-1">
      <TabsContent value="taxas">
        <TaxasTab />
      </TabsContent>
      
      <TabsContent value="perfil">
        <PerfilTab />
      </TabsContent>
      
      <TabsContent value="empresa">
        <EmpresaTab />
      </TabsContent>
      
      <TabsContent value="calculadoras">
        <CalculadorasTab />
      </TabsContent>
      
      <TabsContent value="financeiro">
        <FinanceiroTab />
      </TabsContent>
      
      <TabsContent value="notificacoes">
        <NotificacoesTab />
      </TabsContent>
      
      <TabsContent value="seguranca">
        <SegurancaTab />
      </TabsContent>
      
      <TabsContent value="sistema">
        <SistemaTab />
      </TabsContent>
    </div>
  );
};

export default TabContent;
