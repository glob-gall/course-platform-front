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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { FormBase } from "@/components/form/FormBase";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/form/SearchInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sectionService } from "@/services/section.service";
import { lectureService } from "@/services/lecture.service";
import { createSuccessToast } from "@/lib/create-success-toast";
import { createErrorToast } from "@/lib/create-error-toast";


const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  type: z.enum(['AUDIO' , 'VIDEO' , 'OTHER']),
  resourceUrl: z.string().nonempty('Campo Obrigatório'),
  description: z.string(),
  sectionId: z.string(),
})




export function CreateLectureForm() {

  const createSectionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      await lectureService.create({
        description: values.description,
        lectureDescription: values.description,
        lectureTitle: values.title,
        title: values.title,
        sectionId: values.sectionId,
        lectureAudioURL: values.type === 'AUDIO' ? values.resourceUrl : undefined,
        lectureVideoURL: values.type === 'VIDEO' ? values.resourceUrl : undefined,
        lectureExternalResource: values.type === 'OTHER' ? values.resourceUrl : undefined
      })
    },
    onSuccess:() => {
      form.reset()
      createSuccessToast({
        title: 'Aula criada com sucesso!',
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
              <FormItem className="w-full ">
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
        <div className="flex flex-row gap-2 not-sm:flex-wrap">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-1/3 not-sm:w-full">
                <FormLabel>Tipo</FormLabel>
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VIDEO">Vídeo</SelectItem>
                    <SelectItem value="AUDIO">Áudio</SelectItem>
                    <SelectItem value="OTHER">Outro</SelectItem>
                  </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="resourceUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>URL do recurso</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com/image.jpg" {...field} />
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

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
    createSectionMutation.mutate(values)
  };
  const defaultValues: z.infer<typeof schema> = {
    title:'',
    type:'OTHER',
    resourceUrl:'',
    description: '',
    sectionId: ''
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
