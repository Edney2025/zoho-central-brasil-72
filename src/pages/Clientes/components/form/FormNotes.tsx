
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ClienteFormValues } from "./schema";
import { v4 as uuidv4 } from "uuid";

interface FormNotesProps {
  form: UseFormReturn<ClienteFormValues>;
}

const FormNotes: React.FC<FormNotesProps> = ({ form }) => {
  const [newNote, setNewNote] = useState("");
  const notes = form.watch("notes") || [];

  const addNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [
        ...notes,
        {
          id: uuidv4(),
          text: newNote.trim(),
          date: new Date().toISOString()
        }
      ];
      form.setValue("notes", updatedNotes, { shouldValidate: true });
      setNewNote("");
    }
  };

  const removeNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    form.setValue("notes", updatedNotes, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Notas</label>
        <p className="text-xs text-muted-foreground">
          Adicione notas ou observações sobre o cliente
        </p>
        <div className="flex gap-2">
          <Input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Nova nota..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addNote();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addNote} 
            size="sm" 
            variant="secondary"
            disabled={!newNote.trim()}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma nota adicionada</p>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="relative group">
              <CardContent className="p-3">
                <div className="flex justify-between">
                  <p className="text-sm">{note.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remover nota</span>
                  </Button>
                </div>
                <time className="text-xs text-muted-foreground">
                  {new Date(note.date).toLocaleString()}
                </time>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FormNotes;
