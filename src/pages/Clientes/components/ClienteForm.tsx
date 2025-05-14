
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Building, CreditCard, FileText, Shield, Check, Upload, ArrowRight, ArrowLeft,
  Trash2, Eye
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Form schemas using Zod
const pessoalSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF inválido"),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  genero: z.string().optional(),
  endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  cidade: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  estado: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  cep: z.string().regex(/^\d{5}-\d{3}$|^\d{8}$/, "CEP inválido"),
  isPessoaJuridica: z.boolean().default(false),
});

const empresarialSchema = z.object({
  razaoSocial: z.string().min(3, "Razão Social deve ter pelo menos 3 caracteres").optional(),
  nomeFantasia: z.string().min(2, "Nome Fantasia deve ter pelo menos 2 caracteres").optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, "CNPJ inválido").optional(),
  inscricaoEstadual: z.string().optional(),
  segmento: z.string().optional(),
  naturezaJuridica: z.string().optional(),
  enderecoComercial: z.string().optional(),
});

const emprestimosSchema = z.object({
  tipoEmprestimo: z.string().optional(),
  valorSolicitado: z.string().optional(),
  finalidade: z.string().optional(),
  prazoPagamento: z.string().optional(),
  taxaJuros: z.string().optional(),
  numeroParcelas: z.string().optional(),
  valorParcelas: z.string().optional(),
});

const creditoSchema = z.object({
  scoreCredito: z.string().optional(),
  referenciaBancaria: z.string().optional(),
  contaCorrente: z.string().optional(),
  garantiasOferecidas: z.string().optional(),
});

const pagamentoSchema = z.object({
  formaPagamento: z.string().optional(),
  dataVencimento: z.string().optional(),
  limiteCredito: z.string().optional(),
  primeiraParcela: z.string().optional(),
});

const documentosSchema = z.object({
  rgCpf: z.boolean().default(false),
  comprovanteResidencia: z.boolean().default(false),
  comprovanteRenda: z.boolean().default(false),
  contrato: z.boolean().default(false),
});

const declaracoesSchema = z.object({
  consentimentoAnaliseCredito: z.boolean().default(false),
  aceitaTermos: z.boolean().default(false),
});

// Combined schema for full form
const clienteSchema = z.object({
  pessoal: pessoalSchema,
  empresarial: empresarialSchema.optional(),
  emprestimos: emprestimosSchema.optional(),
  credito: creditoSchema.optional(),
  pagamento: pagamentoSchema.optional(),
  documentos: documentosSchema.optional(),
  declaracoes: declaracoesSchema.optional(),
});

type ClienteFormValues = z.infer<typeof clienteSchema>;

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
  preview?: string;
  uploaded?: boolean;
  path?: string;
}

interface ClienteFormProps {
  clienteId?: string | null;
  onSaved?: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ clienteId, onSaved }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pessoal");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [step, setStep] = useState(1);
  const [solicitaEmprestimo, setSolicitaEmprestimo] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, DocumentFile[]>>({
    rgCpf: [],
    comprovanteResidencia: [],
    comprovanteRenda: [],
    contrato: []
  });
  const [previewFile, setPreviewFile] = useState<DocumentFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteFileInfo, setDeleteFileInfo] = useState<{file: DocumentFile, type: string} | null>(null);
  const [isDeleteFileDialogOpen, setIsDeleteFileDialogOpen] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      pessoal: {
        isPessoaJuridica: false,
      },
      documentos: {
        rgCpf: false,
        comprovanteResidencia: false,
        comprovanteRenda: false,
        contrato: false,
      },
      declaracoes: {
        consentimentoAnaliseCredito: false,
        aceitaTermos: false,
      }
    },
    mode: "onChange"
  });
  
  // Load client data if editing
  useEffect(() => {
    if (clienteId) {
      const fetchClienteData = async () => {
        setIsLoadingData(true);
        try {
          // In a real app, this would fetch from Supabase
          // const { data, error } = await supabase
          //   .from('clientes')
          //   .select('*')
          //   .eq('id', clienteId)
          //   .single();
          
          // if (error) throw error;
          
          // For demo purposes, use mock data
          const mockCliente = {
            id: "1",
            pessoal: {
              nome: "João Silva",
              email: "joao@example.com",
              telefone: "(11) 98765-4321",
              cpf: "123.456.789-00",
              dataNascimento: "1985-06-15",
              genero: "masculino",
              endereco: "Rua das Flores, 123",
              cidade: "São Paulo",
              estado: "SP",
              cep: "01234-567",
              isPessoaJuridica: false,
            },
            solicitaEmprestimo: true,
            emprestimos: {
              tipoEmprestimo: "pessoal",
              valorSolicitado: "10000",
              finalidade: "capital_giro",
              prazoPagamento: "12",
              taxaJuros: "1.99",
              numeroParcelas: "12",
              valorParcelas: "916.67",
            },
            credito: {
              scoreCredito: "750",
              referenciaBancaria: "Banco XYZ",
              contaCorrente: "1234-5",
              garantiasOferecidas: "sem_garantia",
            },
            pagamento: {
              formaPagamento: "boleto",
              dataVencimento: "10",
              limiteCredito: "15000",
              primeiraParcela: "2023-11-10",
            },
            documentos: {
              rgCpf: true,
              comprovanteResidencia: true,
              comprovanteRenda: false,
              contrato: false,
            },
            declaracoes: {
              consentimentoAnaliseCredito: true,
              aceitaTermos: true,
            },
          };
          
          // Populate form with client data
          form.reset(mockCliente);
          setSolicitaEmprestimo(mockCliente.solicitaEmprestimo || false);
          
          // Mock uploaded documents
          setUploadedFiles({
            rgCpf: [{
              id: "1",
              name: "documento_identidade.pdf",
              type: "application/pdf",
              size: 1500000,
              file: new File([""], "documento_identidade.pdf", { type: "application/pdf" }),
              uploaded: true,
              path: "/uploads/documento_identidade.pdf",
            }],
            comprovanteResidencia: [{
              id: "2",
              name: "conta_luz.pdf",
              type: "application/pdf",
              size: 980000,
              file: new File([""], "conta_luz.pdf", { type: "application/pdf" }),
              uploaded: true,
              path: "/uploads/conta_luz.pdf",
            }],
            comprovanteRenda: [],
            contrato: [],
          });
          
        } catch (error) {
          console.error("Erro ao buscar dados do cliente:", error);
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar os dados do cliente.",
            variant: "destructive"
          });
        } finally {
          setIsLoadingData(false);
        }
      };
      
      fetchClienteData();
    }
  }, [clienteId, form, toast]);
  
  const isPessoaJuridica = form.watch("pessoal.isPessoaJuridica");
  
  const handleNextStep = async () => {
    let canContinue = false;
    
    // Validate current step
    if (step === 1) {
      const result = await form.trigger("pessoal");
      canContinue = result;
      if (canContinue) setActiveTab(isPessoaJuridica ? "empresarial" : solicitaEmprestimo ? "emprestimos" : "documentos");
    } 
    else if (step === 2 && isPessoaJuridica) {
      const result = await form.trigger("empresarial");
      canContinue = result;
      if (canContinue) setActiveTab(solicitaEmprestimo ? "emprestimos" : "documentos");
    }
    else if (step === 2 && solicitaEmprestimo || step === 3 && isPessoaJuridica && solicitaEmprestimo) {
      const result = await form.trigger("emprestimos");
      canContinue = result;
      if (canContinue) setActiveTab("credito");
    }
    else if (step === 3 && solicitaEmprestimo || step === 4 && isPessoaJuridica && solicitaEmprestimo) {
      const result = await form.trigger("credito");
      canContinue = result;
      if (canContinue) setActiveTab("pagamento");
    }
    else if (step === 4 && solicitaEmprestimo || step === 5 && isPessoaJuridica && solicitaEmprestimo) {
      const result = await form.trigger("pagamento");
      canContinue = result;
      if (canContinue) setActiveTab("documentos");
    }
    else if ((step === 2 && !isPessoaJuridica && !solicitaEmprestimo) || 
             (step === 3 && isPessoaJuridica && !solicitaEmprestimo) ||
             (step === 5 && !isPessoaJuridica && solicitaEmprestimo) ||
             (step === 6 && isPessoaJuridica && solicitaEmprestimo)) {
      const result = await form.trigger("documentos");
      canContinue = result;
      if (canContinue) setActiveTab("declaracoes");
    }
    else {
      canContinue = true;
    }
    
    if (canContinue) {
      setStep(prevStep => prevStep + 1);
    } else {
      toast({
        title: "Validação falhou",
        description: "Por favor, corrija os erros do formulário para continuar.",
        variant: "destructive"
      });
    }
  };
  
  const handlePrevStep = () => {
    let prevTab = "pessoal";
    
    if (activeTab === "empresarial") prevTab = "pessoal";
    else if (activeTab === "emprestimos") prevTab = isPessoaJuridica ? "empresarial" : "pessoal";
    else if (activeTab === "credito") prevTab = "emprestimos";
    else if (activeTab === "pagamento") prevTab = "credito";
    else if (activeTab === "documentos") {
      if (solicitaEmprestimo) prevTab = "pagamento";
      else prevTab = isPessoaJuridica ? "empresarial" : "pessoal";
    }
    else if (activeTab === "declaracoes") prevTab = "documentos";
    
    setActiveTab(prevTab);
    setStep(prevStep => prevStep - 1);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile: DocumentFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        file: file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      };
      
      setUploadedFiles(prev => ({
        ...prev,
        [type]: [...(prev[type] || []), newFile]
      }));
      
      // Auto-check the corresponding field in the form
      if (type === 'rgCpf') form.setValue('documentos.rgCpf', true);
      if (type === 'comprovanteResidencia') form.setValue('documentos.comprovanteResidencia', true);
      if (type === 'comprovanteRenda') form.setValue('documentos.comprovanteRenda', true);
      if (type === 'contrato') form.setValue('documentos.contrato', true);
    }
  };
  
  const handleDeleteFile = (file: DocumentFile, type: string) => {
    setDeleteFileInfo({ file, type });
    setIsDeleteFileDialogOpen(true);
  };
  
  const confirmDeleteFile = () => {
    if (!deleteFileInfo) return;
    
    const { file, type } = deleteFileInfo;
    
    // In a real app, we would also delete from storage
    // if (file.path) {
    //   await supabase.storage.from('client-documents').remove([file.path]);
    // }
    
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((f) => f.id !== file.id)
    }));
    
    // If no files left, uncheck the form field
    if (uploadedFiles[type].length <= 1) {
      if (type === 'rgCpf') form.setValue('documentos.rgCpf', false);
      if (type === 'comprovanteResidencia') form.setValue('documentos.comprovanteResidencia', false);
      if (type === 'comprovanteRenda') form.setValue('documentos.comprovanteRenda', false);
      if (type === 'contrato') form.setValue('documentos.contrato', false);
    }
    
    setIsDeleteFileDialogOpen(false);
    setDeleteFileInfo(null);
    
    toast({
      title: "Arquivo removido",
      description: `${file.name} foi removido com sucesso.`
    });
  };
  
  const handlePreviewFile = (file: DocumentFile) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };
  
  const uploadFile = async (file: File, path: string) => {
    // In a real app, this would upload to Supabase Storage
    // const fileName = `${crypto.randomUUID()}-${file.name}`;
    // const filePath = `${path}/${fileName}`;
    
    // const { data, error } = await supabase.storage
    //   .from('client-documents')
    //   .upload(filePath, file);
    
    // if (error) throw error;
    
    // return data.path;
    
    // Mock successful upload
    return `uploads/${path}/${file.name}`;
  };
  
  const onSubmit = async (data: ClienteFormValues) => {
    try {
      setIsLoading(true);
      
      // Upload any new documents
      const uploadPromises = [];
      
      for (const [type, files] of Object.entries(uploadedFiles)) {
        for (const file of files) {
          if (!file.uploaded) {
            uploadPromises.push(
              uploadFile(file.file, type)
                .then(path => {
                  // Update the file with the uploaded path
                  setUploadedFiles(prev => ({
                    ...prev,
                    [type]: prev[type].map(f => 
                      f.id === file.id ? { ...f, uploaded: true, path } : f
                    )
                  }));
                })
            );
          }
        }
      }
      
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      
      // Prepare data for submission
      const documentPaths = {};
      for (const [type, files] of Object.entries(uploadedFiles)) {
        documentPaths[type] = files.map(f => f.path).filter(Boolean);
      }
      
      const clienteData = {
        ...data,
        solicitaEmprestimo,
        documentPaths,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // In a real application, this would be connected to Supabase
      console.log("Cliente data to submit:", clienteData);
      
      // if (clienteId) {
      //   // Update existing client
      //   const { data: updatedCliente, error } = await supabase
      //     .from('clientes')
      //     .update(clienteData)
      //     .eq('id', clienteId)
      //     .select();
      //   
      //   if (error) throw error;
      // } else {
      //   // Create new client
      //   const { data: insertedCliente, error } = await supabase
      //     .from('clientes')
      //     .insert(clienteData)
      //     .select();
      //   
      //   if (error) throw error;
      // }
      
      toast({
        title: clienteId ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!",
        description: `O cliente ${data.pessoal.nome} foi ${clienteId ? 'atualizado' : 'cadastrado'}.`,
      });
      
      // Call the onSaved callback if provided
      if (onSaved) {
        onSaved();
      } else {
        // Reset form
        form.reset();
        setStep(1);
        setActiveTab("pessoal");
        setSolicitaEmprestimo(false);
        setUploadedFiles({
          rgCpf: [],
          comprovanteResidencia: [],
          comprovanteRenda: [],
          contrato: []
        });
      }
      
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      toast({
        title: "Erro ao salvar cliente",
        description: "Ocorreu um erro ao salvar os dados. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate max step based on selections
  const getMaxSteps = () => {
    if (isPessoaJuridica && solicitaEmprestimo) return 7;
    if (isPessoaJuridica || solicitaEmprestimo) return 6;
    return 4;
  };
  
  const maxSteps = getMaxSteps();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-3 text-lg">Carregando dados do cliente...</p>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{clienteId ? "Editar Cliente" : "Cadastro de Cliente"}</CardTitle>
            <CardDescription>
              Preencha os dados do cliente. Campos obrigatórios estão marcados com <span className="text-red-500">*</span>
            </CardDescription>
            
            <div className="w-full bg-muted h-2 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${(step / maxSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Etapa {step} de {maxSteps}</span>
              <span>{Math.round((step / maxSteps) * 100)}% concluído</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="pessoal" disabled={step !== 1} className="flex gap-1.5 items-center">
                  <User className="h-4 w-4" /> Pessoal
                </TabsTrigger>
                {isPessoaJuridica && (
                  <TabsTrigger value="empresarial" disabled={step !== 2} className="flex gap-1.5 items-center">
                    <Building className="h-4 w-4" /> Empresa
                  </TabsTrigger>
                )}
                {solicitaEmprestimo && (
                  <>
                    <TabsTrigger 
                      value="emprestimos" 
                      disabled={isPessoaJuridica ? step !== 3 : step !== 2} 
                      className="flex gap-1.5 items-center"
                    >
                      <CreditCard className="h-4 w-4" /> Empréstimo
                    </TabsTrigger>
                    <TabsTrigger 
                      value="credito" 
                      disabled={isPessoaJuridica ? step !== 4 : step !== 3} 
                      className="flex gap-1.5 items-center"
                    >
                      <Shield className="h-4 w-4" /> Crédito
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pagamento" 
                      disabled={isPessoaJuridica ? step !== 5 : step !== 4} 
                      className="flex gap-1.5 items-center"
                    >
                      <CreditCard className="h-4 w-4" /> Pagamento
                    </TabsTrigger>
                  </>
                )}
                <TabsTrigger 
                  value="documentos" 
                  disabled={
                    (isPessoaJuridica && !solicitaEmprestimo) ? step !== 3 :
                    (!isPessoaJuridica && !solicitaEmprestimo) ? step !== 2 :
                    (isPessoaJuridica && solicitaEmprestimo) ? step !== 6 :
                    step !== 5
                  } 
                  className="flex gap-1.5 items-center"
                >
                  <FileText className="h-4 w-4" /> Documentos
                </TabsTrigger>
                <TabsTrigger 
                  value="declaracoes" 
                  disabled={
                    (isPessoaJuridica && !solicitaEmprestimo) ? step !== 4 :
                    (!isPessoaJuridica && !solicitaEmprestimo) ? step !== 3 :
                    (isPessoaJuridica && solicitaEmprestimo) ? step !== 7 :
                    step !== 6
                  } 
                  className="flex gap-1.5 items-center"
                >
                  <Check className="h-4 w-4" /> Declarações
                </TabsTrigger>
              </TabsList>

              {/* Dados Pessoais */}
              <TabsContent value="pessoal" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pessoal.nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo do cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="pessoal.dataNascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="cliente@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pessoal.genero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o gênero" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                            <SelectItem value="nao_informado">Prefiro não informar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.isPessoaJuridica"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Pessoa Jurídica</FormLabel>
                          <FormDescription>
                            Marque se o cliente é uma empresa
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-6">Endereço</h3>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="pessoal.endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Completo <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, número, complemento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="pessoal.cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pessoal.cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-6">
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Solicitar Empréstimo</FormLabel>
                      <FormDescription>
                        Marque se o cliente deseja solicitar empréstimo
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={solicitaEmprestimo}
                        onCheckedChange={setSolicitaEmprestimo}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </TabsContent>

              {/* Dados Empresariais */}
              <TabsContent value="empresarial" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Dados Empresariais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="empresarial.razaoSocial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Razão Social da Empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="empresarial.nomeFantasia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Nome Fantasia da Empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="empresarial.cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000/0000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="empresarial.inscricaoEstadual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input placeholder="Inscrição Estadual" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="empresarial.segmento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segmento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o segmento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="comercio">Comércio</SelectItem>
                            <SelectItem value="servicos">Serviços</SelectItem>
                            <SelectItem value="industria">Indústria</SelectItem>
                            <SelectItem value="agronegocio">Agronegócio</SelectItem>
                            <SelectItem value="construcao">Construção Civil</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="saude">Saúde</SelectItem>
                            <SelectItem value="tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="empresarial.naturezaJuridica"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Natureza Jurídica</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a natureza jurídica" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mei">MEI</SelectItem>
                            <SelectItem value="ei">Empresário Individual</SelectItem>
                            <SelectItem value="eireli">EIRELI</SelectItem>
                            <SelectItem value="ltda">Sociedade Limitada</SelectItem>
                            <SelectItem value="sa">Sociedade Anônima</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="empresarial.enderecoComercial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Comercial</FormLabel>
                        <FormControl>
                          <Input placeholder="Endereço comercial completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Empréstimos */}
              <TabsContent value="emprestimos" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Solicitação de Empréstimo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emprestimos.tipoEmprestimo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Empréstimo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pessoal">Empréstimo Pessoal</SelectItem>
                            <SelectItem value="empresarial">Empréstimo Empresarial</SelectItem>
                            <SelectItem value="consignado">Empréstimo Consignado</SelectItem>
                            <SelectItem value="automovel">Financiamento de Automóvel</SelectItem>
                            <SelectItem value="imovel">Financiamento Imobiliário</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emprestimos.valorSolicitado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Solicitado (R$)</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emprestimos.finalidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Finalidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a finalidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="capital_giro">Capital de Giro</SelectItem>
                            <SelectItem value="investimento">Investimento</SelectItem>
                            <SelectItem value="expansao">Expansão de Negócio</SelectItem>
                            <SelectItem value="quitacao">Quitação de Dívidas</SelectItem>
                            <SelectItem value="reforma">Reforma</SelectItem>
                            <SelectItem value="compra">Compra de Equipamentos</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emprestimos.prazoPagamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prazo de Pagamento (meses)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="emprestimos.taxaJuros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emprestimos.numeroParcelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Parcelas</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emprestimos.valorParcelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor das Parcelas (R$)</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Análise de Crédito */}
              <TabsContent value="credito" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Análise de Crédito</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="credito.scoreCredito"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score de Crédito</FormLabel>
                        <FormControl>
                          <Input placeholder="Score de crédito" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="credito.referenciaBancaria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referência Bancária</FormLabel>
                        <FormControl>
                          <Input placeholder="Banco, agência e conta" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="credito.contaCorrente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta Corrente</FormLabel>
                        <FormControl>
                          <Input placeholder="Banco, agência e número da conta" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="credito.garantiasOferecidas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garantias Oferecidas</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de garantia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sem_garantia">Sem Garantia</SelectItem>
                            <SelectItem value="avalista">Avalista/Fiador</SelectItem>
                            <SelectItem value="veiculo">Veículo</SelectItem>
                            <SelectItem value="imovel">Imóvel</SelectItem>
                            <SelectItem value="equipamento">Equipamentos</SelectItem>
                            <SelectItem value="aplicacao">Aplicação Financeira</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Condições de Pagamento */}
              <TabsContent value="pagamento" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Condições de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pagamento.formaPagamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Forma de Pagamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a forma de pagamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="boleto">Boleto Bancário</SelectItem>
                            <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                            <SelectItem value="debito">Débito Automático</SelectItem>
                            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pagamento.dataVencimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Vencimento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o dia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">Dia 5</SelectItem>
                            <SelectItem value="10">Dia 10</SelectItem>
                            <SelectItem value="15">Dia 15</SelectItem>
                            <SelectItem value="20">Dia 20</SelectItem>
                            <SelectItem value="25">Dia 25</SelectItem>
                            <SelectItem value="30">Dia 30</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pagamento.limiteCredito"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limite de Crédito (R$)</FormLabel>
                        <FormControl>
                          <Input placeholder="0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pagamento.primeiraParcela"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data da Primeira Parcela</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Documentação */}
              <TabsContent value="documentos" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Documentação</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">RG/CPF <span className="text-red-500">*</span></h4>
                    <div className="relative">
                      <label
                        htmlFor="rgCpfUpload"
                        className={`w-full h-36 bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer 
                        ${uploadedFiles.rgCpf.length > 0 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
                      >
                        <Upload className={`h-8 w-8 ${uploadedFiles.rgCpf.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <p className="text-sm text-muted-foreground mt-2">
                          {uploadedFiles.rgCpf.length > 0 
                            ? `${uploadedFiles.rgCpf.length} ${uploadedFiles.rgCpf.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}`
                            : "Arraste ou clique para fazer upload"
                          }
                        </p>
                        <input
                          id="rgCpfUpload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileChange(e, 'rgCpf')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    
                    {uploadedFiles.rgCpf.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {uploadedFiles.rgCpf.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                            </div>
                            <div className="flex gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => handlePreviewFile(file)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Visualizar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-destructive"
                                      onClick={() => handleDeleteFile(file, 'rgCpf')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Excluir</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="documentos.rgCpf"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={uploadedFiles.rgCpf.length === 0}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Confirmar documento enviado
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Comprovante de Residência <span className="text-red-500">*</span></h4>
                    <div className="relative">
                      <label
                        htmlFor="comprovanteResidenciaUpload"
                        className={`w-full h-36 bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer 
                        ${uploadedFiles.comprovanteResidencia.length > 0 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
                      >
                        <Upload className={`h-8 w-8 ${uploadedFiles.comprovanteResidencia.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <p className="text-sm text-muted-foreground mt-2">
                          {uploadedFiles.comprovanteResidencia.length > 0 
                            ? `${uploadedFiles.comprovanteResidencia.length} ${uploadedFiles.comprovanteResidencia.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}`
                            : "Arraste ou clique para fazer upload"
                          }
                        </p>
                        <input
                          id="comprovanteResidenciaUpload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileChange(e, 'comprovanteResidencia')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    
                    {uploadedFiles.comprovanteResidencia.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {uploadedFiles.comprovanteResidencia.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                            </div>
                            <div className="flex gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => handlePreviewFile(file)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Visualizar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-destructive"
                                      onClick={() => handleDeleteFile(file, 'comprovanteResidencia')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Excluir</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="documentos.comprovanteResidencia"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={uploadedFiles.comprovanteResidencia.length === 0}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Confirmar documento enviado
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {solicitaEmprestimo && (
                    <>
                      <div className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium">Comprovante de Renda <span className="text-red-500">*</span></h4>
                        <div className="relative">
                          <label
                            htmlFor="comprovanteRendaUpload"
                            className={`w-full h-36 bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer 
                            ${uploadedFiles.comprovanteRenda.length > 0 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
                          >
                            <Upload className={`h-8 w-8 ${uploadedFiles.comprovanteRenda.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <p className="text-sm text-muted-foreground mt-2">
                              {uploadedFiles.comprovanteRenda.length > 0 
                                ? `${uploadedFiles.comprovanteRenda.length} ${uploadedFiles.comprovanteRenda.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}`
                                : "Arraste ou clique para fazer upload"
                              }
                            </p>
                            <input
                              id="comprovanteRendaUpload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleFileChange(e, 'comprovanteRenda')}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        </div>
                        
                        {uploadedFiles.comprovanteRenda.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {uploadedFiles.comprovanteRenda.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-primary" />
                                  <span className="text-sm font-medium">{file.name}</span>
                                  <span className="ml-2 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                                </div>
                                <div className="flex gap-1">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8"
                                          onClick={() => handlePreviewFile(file)}
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Visualizar</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8 text-destructive"
                                          onClick={() => handleDeleteFile(file, 'comprovanteRenda')}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Excluir</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="documentos.comprovanteRenda"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={uploadedFiles.comprovanteRenda.length === 0}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Confirmar documento enviado
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium">Contrato Assinado</h4>
                        <div className="relative">
                          <label
                            htmlFor="contratoUpload"
                            className={`w-full h-36 bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer 
                            ${uploadedFiles.contrato.length > 0 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
                          >
                            <Upload className={`h-8 w-8 ${uploadedFiles.contrato.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <p className="text-sm text-muted-foreground mt-2">
                              {uploadedFiles.contrato.length > 0 
                                ? `${uploadedFiles.contrato.length} ${uploadedFiles.contrato.length === 1 ? 'arquivo enviado' : 'arquivos enviados'}`
                                : "Arraste ou clique para fazer upload"
                              }
                            </p>
                            <input
                              id="contratoUpload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleFileChange(e, 'contrato')}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        </div>
                        
                        {uploadedFiles.contrato.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {uploadedFiles.contrato.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-primary" />
                                  <span className="text-sm font-medium">{file.name}</span>
                                  <span className="ml-2 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                                </div>
                                <div className="flex gap-1">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8"
                                          onClick={() => handlePreviewFile(file)}
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Visualizar</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8 text-destructive"
                                          onClick={() => handleDeleteFile(file, 'contrato')}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Excluir</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="documentos.contrato"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={uploadedFiles.contrato.length === 0}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Confirmar documento enviado
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* Declarações */}
              <TabsContent value="declaracoes" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Declarações</h3>
                
                {solicitaEmprestimo && (
                  <FormField
                    control={form.control}
                    name="declaracoes.consentimentoAnaliseCredito"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Consentimento para Análise de Crédito <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormDescription>
                            Autorizo a consulta aos órgãos de proteção ao crédito (SPC, Serasa) para análise de crédito.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="declaracoes.aceitaTermos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Aceite dos Termos e Condições <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormDescription>
                          Declaro que li e aceito os termos de serviço, política de privacidade e autorizo o tratamento dos meus dados pessoais de acordo com a LGPD.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="pt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-2">Resumo do Cadastro</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Nome</p>
                            <p className="font-medium">{form.watch("pessoal.nome") || "Não preenchido"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{form.watch("pessoal.email") || "Não preenchido"}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">CPF</p>
                            <p className="font-medium">{form.watch("pessoal.cpf") || "Não preenchido"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Telefone</p>
                            <p className="font-medium">{form.watch("pessoal.telefone") || "Não preenchido"}</p>
                          </div>
                        </div>
                        
                        {isPessoaJuridica && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Razão Social</p>
                              <p className="font-medium">{form.watch("empresarial.razaoSocial") || "Não preenchido"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">CNPJ</p>
                              <p className="font-medium">{form.watch("empresarial.cnpj") || "Não preenchido"}</p>
                            </div>
                          </div>
                        )}
                        
                        {solicitaEmprestimo && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Valor Solicitado</p>
                              <p className="font-medium">{form.watch("emprestimos.valorSolicitado") || "Não preenchido"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Prazo</p>
                              <p className="font-medium">{form.watch("emprestimos.prazoPagamento") || "Não preenchido"} meses</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 1 || isLoading}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
            
            {step < maxSteps ? (
              <Button 
                type="button" 
                onClick={handleNextStep}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                Próximo <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                    {clienteId ? "Atualizando..." : "Salvando..."}
                  </>
                ) : (
                  clienteId ? "Atualizar Cliente" : "Finalizar Cadastro"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
      
      {/* File Preview Dialog */}
      <AlertDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {previewFile?.name}
            </AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="max-h-[70vh] overflow-auto">
            {previewFile?.preview ? (
              <AspectRatio ratio={16/9}>
                <img 
                  src={previewFile.preview} 
                  alt={previewFile.name} 
                  className="rounded-md object-contain w-full h-full"
                />
              </AspectRatio>
            ) : (
              <div className="bg-muted h-64 flex items-center justify-center rounded-md">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <p className="ml-3">Visualização não disponível</p>
              </div>
            )}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogAction>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete File Dialog */}
      <AlertDialog open={isDeleteFileDialogOpen} onOpenChange={setIsDeleteFileDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o arquivo "{deleteFileInfo?.file.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteFile} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default ClienteForm;
