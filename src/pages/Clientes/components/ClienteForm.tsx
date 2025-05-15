
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { clienteFormSchema, defaultValues, formSteps } from "./form/schema";
import FormProgressSteps from "./form/FormProgressSteps";
import FormPersonalInfo from "./form/FormPersonalInfo";
import FormDocuments from "./form/FormDocuments";
import FormAddress from "./form/FormAddress";
import FormFileUpload from "./form/FormFileUpload";
import FormReview from "./form/FormReview";
import FormAdditionalInfo from "./form/FormAdditionalInfo";
import FormTags from "./form/FormTags"; // Novo componente
import FormNotes from "./form/FormNotes"; // Novo componente
import FormReminders from "./form/FormReminders"; // Novo componente
import { ChevronLeft, ChevronRight, Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClienteFormValues } from "./form/schema";

interface ClienteFormProps {
  clienteId: string | null;
  onSaved: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ clienteId, onSaved }) => {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // Nova propriedade para os tabs
  
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const tipoPessoa = form.watch("tipoPessoa");
  
  // Here we would fetch client data if clienteId exists
  useEffect(() => {
    if (clienteId) {
      setIsLoading(true);
      // Simulate fetching client data
      setTimeout(() => {
        // This would be replaced with an actual API call
        form.reset({
          nome: "Cliente Existente",
          email: "cliente@exemplo.com",
          telefone: "(11) 99999-9999",
          tipoPessoa: "fisica",
          cpfCnpj: "123.456.789-00",
          rgInscricao: "12.345.678-9",
          cep: "01234-567",
          endereco: "Avenida Exemplo",
          numero: "123",
          complemento: "Apto 45",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          observacoes: "Cliente VIP",
          profissao: "Engenheiro",
          dataNascimento: "1990-01-01",
          tags: ["VIP", "Contrato Mensal"],
          notes: [
            {
              id: "1",
              text: "Cliente solicitou desconto na próxima compra.",
              date: new Date().toISOString()
            }
          ],
          proximoContato: "2023-06-15",
          status: "Ativo",
          classificacao: "Premium"
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [clienteId, form]);

  // Function to go to next step
  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    
    // Validate fields for current step before proceeding
    const stepValid = await form.trigger(fields as any);
    
    if (stepValid) {
      setStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  // Function to go to previous step
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  // Get fields that should be validated for each step
  const getFieldsForStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return ["nome", "email", "telefone", "tipoPessoa"];
      case 1:
        return ["cpfCnpj", "rgInscricao"];
      case 2:
        return ["cep", "endereco", "numero", "bairro", "cidade", "estado"];
      case 3:
        return []; // File upload step doesn't have form fields
      default:
        return [];
    }
  };

  // Submit form handler
  const onSubmit = async (data: ClienteFormValues) => {
    setIsLoading(true);
    
    try {
      // Here we would send data to the backend
      console.log("Form data:", data);
      console.log("Files:", files);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Criando notificações para eventos importantes
      if (data.proximoContato) {
        window.addNotification?.({
          title: "Lembrete adicionado",
          message: `Próximo contato com ${data.nome} agendado para ${new Date(data.proximoContato).toLocaleDateString('pt-BR')}`,
          type: "info"
        });
      }
      
      toast({
        title: clienteId ? "Cliente atualizado" : "Cliente cadastrado",
        description: clienteId
          ? "Os dados do cliente foram atualizados com sucesso"
          : "O novo cliente foi cadastrado com sucesso",
      });
      
      onSaved();
    } catch (error) {
      console.error("Error saving client:", error);
      toast({
        title: "Erro",
        description: "Houve um erro ao salvar os dados do cliente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <FormPersonalInfo form={form} />
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Informações Adicionais</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="tags">Etiquetas</TabsTrigger>
                  <TabsTrigger value="notes">Notas</TabsTrigger>
                  <TabsTrigger value="reminders">Lembretes</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="pt-2">
                  <FormAdditionalInfo form={form} />
                </TabsContent>
                <TabsContent value="tags" className="pt-2">
                  <FormTags defaultTags={form.watch("tags")} />
                </TabsContent>
                <TabsContent value="notes" className="pt-2">
                  <FormNotes />
                </TabsContent>
                <TabsContent value="reminders" className="pt-2">
                  <FormReminders />
                </TabsContent>
              </Tabs>
            </div>
          </>
        );
      case 1:
        return <FormDocuments form={form} tipoPessoa={tipoPessoa} />;
      case 2:
        return (
          <>
            <FormAddress form={form} />
            <div className="mt-6">
              <FormAdditionalInfo form={form} />
            </div>
          </>
        );
      case 3:
        return <FormFileUpload files={files} setFiles={setFiles} />;
      case 4:
        return <FormReview data={form.getValues()} files={files} />;
      default:
        return null;
    }
  };

  if (isLoading && clienteId) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Carregando dados do cliente...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormProgressSteps currentStep={step} steps={formSteps} />
        
        <div className="bg-card border rounded-lg p-6">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 0 || isLoading}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <div>
            {step < formSteps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
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
      </form>
    </Form>
  );
};

export default ClienteForm;
