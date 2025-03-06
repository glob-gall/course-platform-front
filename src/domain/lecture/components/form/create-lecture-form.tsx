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


const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  type: z.string(),
  resourceUrl: z.string().nonempty('Campo Obrigatório'),
  description: z.string(),
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
    <div className="flex w-full justify-around gap-2 not-sm:flex-wrap">
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Tipo</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
                <SelectTrigger className="w-[180px]">
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
    
      {/* <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Tipo</FormLabel>
            <FormControl>
              <Input placeholder="Titulo do módulo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
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
);

export function CreateLectureForm() {

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
  };
  const defaultValues = {
    title:'',
    type:'OTHER',
    resourceUrl:'',
    description: '',
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
