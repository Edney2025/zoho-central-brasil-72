
import React from 'react';

const AuthLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Portal do Cliente</h1>
        <p className="text-muted-foreground mb-8">Acessando automaticamente...</p>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthLoading;
