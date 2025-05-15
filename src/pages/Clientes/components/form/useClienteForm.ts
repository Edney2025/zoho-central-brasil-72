
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { clienteFormSchema, defaultValues, ClienteFormValues, formSteps } from "./schema";
import { v4 as uuidv4 } from "uuid";

export function useClienteForm(clienteId: string | null, onSaved: () => void) {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
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
      
      // Notify about important events
      if (data.proximoContato) {
        // This is a custom window method that may not exist, commenting out to avoid errors
        // window.addNotification?.({
        //   title: "Lembrete adicionado",
        //   message: `Próximo contato com ${data.nome} agendado para ${new Date(data.proximoContato).toLocaleDateString('pt-BR')}`,
        //   type: "info"
        // });
      }
      
      toast({
        title: clienteId ? "Cliente atualizado" : "Cliente cadastrado",
        description: clienteId
          ? "Os dados do cliente foram atualizados com sucesso"
          : "O novo cliente foi cadastrado com sucesso",
        variant: "default",
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

  // Mock function to fetch client data
  const fetchClientData = useCallback(() => {
    if (clienteId) {
      setIsLoading(true);
      // Simulate fetching client data
      setTimeout(() => {
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
          lembreteTipo: "ligacao",
          lembreteDescricao: "Verificar satisfação com último serviço",
          status: "Ativo",
          classificacao: "Premium"
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [clienteId, form]);

  return {
    form,
    step,
    files,
    isLoading,
    activeTab,
    tipoPessoa: form.watch("tipoPessoa"),
    nextStep,
    prevStep,
    onSubmit,
    setFiles,
    setActiveTab,
    fetchClientData
  };
}

export { formSteps };
