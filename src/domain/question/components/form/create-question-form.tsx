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
import { useMutation, useQuery } from "@tanstack/react-query";
import { questionService } from "@/services/question.service";
import { createSuccessToast } from "@/lib/create-success-toast";
import { createErrorToast } from "@/lib/create-error-toast";
import { quizzService } from "@/services/quizz.service";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/form/SearchInput";


const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  description: z.string(),
  type: z.enum(['VIDEO','AUDIO','TEXT','IMAGE','OTHER']),
  resourceUrl: z.string(),
  quizzId: z.string(),
})



export function CreateQuestionForm() {

  const [answers,setAnswers] = useState<Answer[]>([])
  const addAnswer = useCallback((newAnswer:Answer)=>{
    setAnswers(s =>[...s, newAnswer])
  },[])
  const removeAnswer = (id:unknown)=>{
    console.log({answers,id});
    setAnswers(answers.filter(ans=>ans.id !== id))
  }

  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await quizzService.fetchMany({})
      const sectionKeyValues = queryResponse.data.quizzes.map(quizz => ({
        value: quizz.id,
        label: quizz.title
      }))
      return sectionKeyValues

    },
  })



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


const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => {
  
  if(error) return <p>error</p>
  return (
    <>
        <div className="flex flex-row gap-2 not-sm:flex-wrap">
          <FormField
            control={form.control}
            name="quizzId"
            render={({ field }) => (
              <FormItem className="w-1/2 not-sm:w-full">
                <FormLabel>Quizz</FormLabel>
                <FormControl>
                {isPending ?(
                  <Skeleton className="w-1/2 h-10 "/>
                ):(
                  <SearchInput 
                    items={data}
                    notFoundMsg="Quizz não encontrado"
                    placeholder="selecione um quizz"
                    fieldValue={field.value}
                    formSetValue={(value: string) => form.setValue('quizzId',value)}
                  />
                )}

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>
    
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
    )
  };

  const createSectionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      await questionService.create({
        audioURL: values.type==='AUDIO' ? values.resourceUrl :undefined,
        videoURL: values.type==='VIDEO' ? values.resourceUrl :undefined,
        imageURL: values.type==='IMAGE' ? values.resourceUrl :undefined,
        externalResource: values.type==='OTHER' ? values.resourceUrl :undefined,
        description: values.description,
        title: values.title,
        answers:answers,
        quizzId:values.quizzId
      })
    },
    onSuccess:() => {
      form.reset()
      setAnswers([])
      createSuccessToast({
        title: 'Questão criada com sucesso!',
      })
    },
    onError:(err) =>{
      createErrorToast({
        title: err.message,
      })
    },
  })


  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
    createSectionMutation.mutate(values)
  };
  const defaultValues: z.infer<typeof schema> = {
    description:'',
    resourceUrl:'',
    title:'',
    type:'TEXT',
    quizzId:''
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
