
import React from 'react';

interface DashboardWelcomeProps {
  userEmail?: string | null;
}

export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ userEmail }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Sistema Financeiro</h1>
      <p className="text-muted-foreground">
        Olá {userEmail}, selecione abaixo o módulo que deseja acessar
      </p>
    </div>
  );
};
