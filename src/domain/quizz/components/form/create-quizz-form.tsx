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

const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
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

export function CreateQuizzForm() {

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
  };
  const defaultValues = {
    title:'',
    description: '',
    slug:''
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
