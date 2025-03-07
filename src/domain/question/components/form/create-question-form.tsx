"use client"

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormBase } from "@/components/form/FormBase";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import { Answer } from "@/domain/answer/entity/answer";
import { CustomAnswerTable } from "@/domain/answer/components/table/custom-answer-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { CreateAnswerFormDialog } from "@/domain/answer/components/form/create-answer-form-dialog";


const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  description: z.string(),
  type: z.enum(['VIDEO','AUDIO','TEXT']),
  resourceUrl: z.string(),
})

const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => (
  <>
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Titulo</FormLabel>
          <FormControl>
            <Input placeholder="Titulo do módulo" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
   
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Descrição</FormLabel>
          <FormControl>

            <Textarea placeholder="descrição" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export function CreateQuestionForm() {

  const [answers,setAnswers] = useState<Answer[]>([])
  const addAnswer = useCallback((newAnswer:Answer)=>{
    setAnswers(s =>[...s, newAnswer])
  },[])
  const removeAnswer = (id:unknown)=>{
    console.log({answers,id});
    setAnswers(answers.filter(ans=>ans.id !== id))
  }

  const answerColumns: ColumnDef<Answer>[] = [
    {
      accessorKey: "type",
      header:"Tipo"
    },
    {
      accessorKey: "description",
      header:"Description"
    },
    {
      accessorKey: "resourceURL",
      header:"Recurso"
    },
    {
      accessorKey: "isCorrect",
      header:"Resposta certa"
    },
    {
      id: "actions",
      accessorKey:'id',
      header: () => <div className="text-right">Ações</div>,
      cell: (cel) => {
   
        return (
          <div className="flex">
            <div className="ml-auto">
              <Button variant="ghost" onClick={() =>removeAnswer(cel.renderValue())}>
                <Trash className="text-destructive" />
              </Button>
            </div>
          </div>
        )
      },
    },
  ]

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
  };
  const defaultValues: z.infer<typeof schema> = {
    description:'',
    resourceUrl:'',
    title:'',
    type:'TEXT'
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
      <div className="">
        <h2 className="font-bold text-lg">Respostas</h2>
        <CustomAnswerTable 
          data={answers}
          columns={answerColumns}
        />
        <div className="flex">
          <div className="ml-auto">
            <CreateAnswerFormDialog submitFunction={addAnswer} />
          </div>
        </div>
        <FormBase
          id="section-form"
          form={form}
          schema={schema}
          defaultValues={defaultValues}
          fields={renderFields}
          onSubmit={handleSubmit}
          buttonText="Create"
        />


      </div>
      
  )
}
