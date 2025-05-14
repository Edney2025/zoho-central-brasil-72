
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, File, Trash, Upload } from "lucide-react";

interface FormFileUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({ files, setFiles }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Documentos do Cliente</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-10 w-10 mb-2 mx-auto text-muted-foreground" />
        
        <div className="mb-4">
          <p className="text-muted-foreground">
            Arraste e solte arquivos aqui ou clique para selecionar
          </p>
          <p className="text-xs text-muted-foreground">
            Suportados: PDF, JPG, PNG (Max. 5MB)
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Selecionar Arquivos
        </Button>
        
        <input
          id="fileInput"
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">
            {files.length} {files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="overflow-hidden">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div className="truncate max-w-[180px] sm:max-w-[300px]">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeFile(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground mt-2 flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>
          Documentos como RG, CPF, comprovante de residência e outros documentos
          relevantes.
        </span>
      </div>
    </div>
  );
};

export default FormFileUpload;
