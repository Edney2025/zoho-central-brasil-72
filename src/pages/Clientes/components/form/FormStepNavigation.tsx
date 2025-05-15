
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, Loader2 } from "lucide-react";

interface FormStepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  clienteId: string | null;
}

const FormStepNavigation: React.FC<FormStepNavigationProps> = ({
  currentStep,
  totalSteps,
  isLoading,
  onPrevious,
  onNext,
  clienteId
}) => {
  return (
    <div className="flex justify-between pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isLoading}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      
      <div>
        {currentStep < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {clienteId ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepNavigation;
