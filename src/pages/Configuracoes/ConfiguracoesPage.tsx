
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import TabList from './components/TabList';
import TabContent from './components/TabContent';

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="taxas" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <TabList />
          <TabContent />
        </div>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
