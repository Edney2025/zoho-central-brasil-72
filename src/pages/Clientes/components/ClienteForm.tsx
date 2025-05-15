
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import FormProgressSteps from "./form/FormProgressSteps";
import FormPersonalInfo from "./form/FormPersonalInfo";
import FormDocuments from "./form/FormDocuments";
import FormAddress from "./form/FormAddress";
import FormFileUpload from "./form/FormFileUpload";
import FormReview from "./form/FormReview";
import FormPersonalTabs from "./form/FormPersonalTabs";
import FormLoading from "./form/FormLoading";
import FormStepNavigation from "./form/FormStepNavigation";
import { useClienteForm, formSteps } from "./form/useClienteForm";

interface ClienteFormProps {
  clienteId: string | null;
  onSaved: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ clienteId, onSaved }) => {
  const {
    form,
    step,
    files,
    isLoading,
    activeTab,
    tipoPessoa,
    nextStep,
    prevStep,
    onSubmit,
    setFiles,
    setActiveTab,
    fetchClientData
  } = useClienteForm(clienteId, onSaved);
  
  // Load client data if clienteId exists
  useEffect(() => {
    if (clienteId) {
      fetchClientData();
    }
  }, [clienteId, fetchClientData]);

  // Render step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <FormPersonalInfo form={form} />
            <FormPersonalTabs 
              form={form}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </>
        );
      case 1:
        return <FormDocuments form={form} tipoPessoa={tipoPessoa} />;
      case 2:
        return (
          <>
            <FormAddress form={form} />
            <div className="mt-6">
              <FormPersonalInfo.AdditionalInfo form={form} />
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
    return <FormLoading />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormProgressSteps currentStep={step} steps={formSteps} />
        
        <div className="bg-card border rounded-lg p-6">
          {renderStepContent()}
        </div>
        
        <FormStepNavigation 
          currentStep={step}
          totalSteps={formSteps.length}
          isLoading={isLoading}
          onPrevious={prevStep}
          onNext={nextStep}
          clienteId={clienteId}
        />
      </form>
    </Form>
  );
};

export default ClienteForm;
