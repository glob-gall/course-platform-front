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
import { Checkbox } from "@/components/ui/checkbox";
import { Answer } from "../../entity/answer";
import { UniqueEntityID } from "@/utils/randomUUID";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const schema = z.object({
  description: z.string().nonempty('Campo obrigatório'),
  type: z.enum(['VIDEO','AUDIO','TEXT']),
  resourceUrl: z.string(),
  isCorrect: z.boolean()
})

const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => (
  <div className="flex flex-col w-full justify-around gap-2 not-sm:flex-wrap">
    <div className="flex flex-row gap-2">
    <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="">
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
                  <SelectItem value="TEXT">Texto</SelectItem>
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
            <FormLabel>Link do recurso</FormLabel>
            <FormControl>
              <Input placeholder="http://www.example.resource.jpg" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={form.control}
      name="isCorrect"
      render={({ field }) => (
        <FormItem className="w-full flex my-6">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                />
            </FormControl>
            <FormLabel>Resposta certa</FormLabel>
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
  </div>
);

export type  CreateAnswerFormProps = {
  submit: (answer: Answer) => void
}

export function CreateAnswerForm({submit}:CreateAnswerFormProps) {


  const defaultValues: z.infer<typeof schema> = {
    description:'',
    resourceUrl:'',
    isCorrect:false,
    type:'TEXT'
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
    submit({
      id: UniqueEntityID(),
      description: values.description,
      isCorrect: values.isCorrect,
      resourceURL: values.resourceUrl,
      type: values.type
    })
    form.reset()
  };

  return (
      <div className="">
        <FormBase
          id="create-answer-form"
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
