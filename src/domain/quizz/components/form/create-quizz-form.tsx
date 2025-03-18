"use client"

import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormBase } from "@/components/form/FormBase";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { quizzService } from "@/services/quizz.service";
import { createSuccessToast } from "@/lib/create-success-toast";
import { createErrorToast } from "@/lib/create-error-toast";
import { sectionService } from "@/services/section.service";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/form/SearchInput";

const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  description: z.string(),
  sectionId: z.string(),
})




export function CreateQuizzForm() {
  const createSectionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      await quizzService.create({
        description: values.description,
        quizzDescription: values.description,
        quizzTitle: values.title,
        title: values.title,
        sectionId: values.sectionId
      })
    },
    onSuccess:() => {
      form.reset()
      createSuccessToast({
        title: 'Módulo criado com sucesso!',
      })
    },
    onError:(err) =>{
      createErrorToast({
        title: err.message,
      })
    },
  })

  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await sectionService.fetchMany({})
      const sectionKeyValues = queryResponse.data.sections.map(section => ({
        value: section.id,
        label: section.title
      }))
      return sectionKeyValues

    },
  })

  const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => {
    if(error) return <p>error</p>
    return (
      <>
      <div className="flex flex-row gap-2 not-sm:flex-wrap">
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
          name="sectionId"
          render={({ field }) => (
            <FormItem className="w-1/2 not-sm:w-full">
              <FormLabel>Módulo</FormLabel>
              <FormControl>
              {isPending ?(
                <Skeleton className="w-1/2 h-10 "/>
              ):(
                <SearchInput 
                  items={data}
                  notFoundMsg="módulo não encontrado"
                  placeholder="selecione um módulo"
                  fieldValue={field.value}
                  formSetValue={(value: string) => form.setValue('sectionId',value)}
                />
              )}
    
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
  }



  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
    createSectionMutation.mutate(values)
  };
  const defaultValues: z.infer<typeof schema> = {
    title:'',
    description: '',
    sectionId:''
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
      <div className="">
        <FormBase
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
