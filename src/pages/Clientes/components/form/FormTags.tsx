
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

// Updated interface to ensure tags are strings
interface FormTagsProps {
  defaultTags?: string[];
  onChange?: (tags: string[]) => void;
}

const FormTags: React.FC<FormTagsProps> = ({ 
  defaultTags = [], 
  onChange 
}) => {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [inputValue, setInputValue] = useState("");
  
  // Update parent component when tags change
  useEffect(() => {
    if (onChange) {
      onChange(tags);
    }
  }, [tags, onChange]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
      }
      setInputValue("");
    }
  };
  
  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            {tag}
            <button 
              type="button" 
              className="ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma etiqueta adicionada
          </p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Adicionar etiqueta..."
          className="flex-grow"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={addTag}
          disabled={!inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormTags;
