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
import { SearchInput } from "@/components/form/SearchInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/course.service";
import { Skeleton } from "@/components/ui/skeleton";
import { createSuccessToast } from "@/lib/create-success-toast";
import { createErrorToast } from "@/lib/create-error-toast";
import { sectionService } from "@/services/section.service";

const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  description: z.string(),
  courseId: z.string()
})


export function CreateSectionForm() {
  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await courseService.fetchMany({})
      const courseKeyValues = queryResponse.data.courses.map(course => ({
        value: course.id,
        label: course.title
      }))
      return courseKeyValues

    },
  })

  const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => {
    if(error) return <p>error</p>

    return ( 
      <>
      <div className="flex flex-row gap-2">
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
            name="courseId"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Curso</FormLabel>
                <FormControl>
                {isPending ?(
                  <Skeleton className="w-1/2 h-10"/>
                ):(
                  <SearchInput 
                    items={data}
                    notFoundMsg="item não encontrado"
                    placeholder="selecione um item"
                    fieldValue={field.value}
                    formSetValue={(value: string) => form.setValue('courseId',value)}
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
  };
  const createSectionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      await sectionService.create({
        title: values.title,
        courseId: values.courseId,
        description: values.description
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

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
    createSectionMutation.mutate(values)
  };
  const defaultValues: z.infer<typeof schema> = {
    title:'',
    description: '',
    courseId: ''
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
          isSubmiting={createSectionMutation.isPending}
        />
      </div>
  )
}
