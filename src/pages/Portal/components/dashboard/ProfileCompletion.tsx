
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

interface ProfileCompletionProps {
  completionPercentage: number;
  onUpdateProfile: () => void;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ 
  completionPercentage, 
  onUpdateProfile 
}) => {
  if (completionPercentage >= 100) {
    return null;
  }
  
  return (
    <Alert className="bg-primary/10 border-primary/20 text-primary">
      <Info className="h-5 w-5" />
      <AlertTitle>Perfil Incompleto</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Complete seu perfil para aproveitar todos os recursos</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <Button variant="outline" size="sm" onClick={onUpdateProfile}>
            Atualizar Perfil
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
