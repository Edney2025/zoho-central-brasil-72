
import React from 'react';
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FormLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">Carregando dados do cliente...</p>
      
      <div className="w-full max-w-3xl mt-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

export default FormLoading;
