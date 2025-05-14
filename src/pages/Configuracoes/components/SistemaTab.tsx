
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

const SistemaTab = () => {
  const { theme, setTheme } = useTheme();

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As preferências do sistema foram atualizadas com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Sistema</CardTitle>
        <CardDescription>
          Personalize a aparência e comportamento do sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Tema do Sistema</h3>
          <div className="flex flex-wrap gap-4">
            <div 
              className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setTheme('light')}
            >
              <div className="h-12 mb-2 bg-white border rounded-md"></div>
              <p className="text-center text-sm">Claro</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <div className="h-12 mb-2 bg-slate-800 border rounded-md"></div>
              <p className="text-center text-sm">Escuro</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'corporate' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setTheme('corporate')}
            >
              <div className="h-12 mb-2 bg-blue-600 border rounded-md"></div>
              <p className="text-center text-sm">Corporativo</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'elegant' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setTheme('elegant')}
            >
              <div className="h-12 mb-2 bg-amber-800 border rounded-md"></div>
              <p className="text-center text-sm">Elegante</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-3">Preferências Gerais</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo compacto</p>
                <p className="text-sm text-muted-foreground">Reduz o espaçamento entre os elementos</p>
              </div>
              <Switch id="compact-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Exibir margem de lucro</p>
                <p className="text-sm text-muted-foreground">Mostra a margem de lucro nos relatórios</p>
              </div>
              <Switch id="show-profit" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas sonoros</p>
                <p className="text-sm text-muted-foreground">Ativa sons para notificações importantes</p>
              </div>
              <Switch id="sound-alerts" />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
};

export default SistemaTab;
