
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, UserCircle, LucideLayoutDashboard, FileText, Calculator } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Central Brasil</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Solução completa para gestão financeira, e-commerce e atendimento ao cliente
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <LucideLayoutDashboard className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Dashboard</h2>
              <p className="text-muted-foreground mb-4">
                Acesse o painel administrativo e gerencie seu negócio
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Acessar Dashboard
              </Button>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Loja Online</h2>
              <p className="text-muted-foreground mb-4">
                Compre produtos novos e usados ou anuncie os seus
              </p>
              <Button onClick={() => navigate('/ecommerce/produtos')}>
                Visitar Loja
              </Button>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <UserCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Portal do Cliente</h2>
              <p className="text-muted-foreground mb-4">
                Acompanhe seus pedidos e gerencie sua conta
              </p>
              <Button onClick={() => navigate('/portal/login')}>
                Acessar Portal
              </Button>
            </div>
          </div>
          
          <div className="mt-16">
            <p className="text-muted-foreground mb-4">Acesso Rápido</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate('/calculadoras')}>
                <Calculator className="mr-2 h-4 w-4" /> Calculadoras Financeiras
              </Button>
              <Button variant="outline" onClick={() => navigate('/pedidos')}>
                <FileText className="mr-2 h-4 w-4" /> Pedidos e Orçamentos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
