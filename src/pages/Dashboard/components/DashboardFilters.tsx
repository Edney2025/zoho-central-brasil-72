
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface DashboardFiltersProps {
  onDateChange: (range: any) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  onDateChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Hoje</Button>
        <Button variant="outline" size="sm">7 dias</Button>
        <Button variant="outline" size="sm">30 dias</Button>
        <Button variant="outline" size="sm">Este mês</Button>
      </div>
      <Button variant="outline" size="sm">
        <Calendar className="h-4 w-4 mr-1" /> Período personalizado
      </Button>
    </div>
  );
};
