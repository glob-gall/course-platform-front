"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormBase } from "./FormBase"
import { Button } from "../ui/button"
import Link from "next/link"

const schema = z.object({
  name: z.string().nonempty("Campo Obrigatório"),
  email: z.string().email({
    message: "Email invalido.",
  }),
  passsword: z.string().nonempty("Campo Obrigatório"),
})


const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => (
  <>
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input placeholder="Fulano de Tal" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="passsword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Senha</FormLabel>
          <FormControl>
            <Input placeholder="******" {...field} type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export function RegisterForm() {
  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
  };
  
  return (
    <FormBase
      title="Cadastre-se"
      subtitle=""
      schema={schema}
      defaultValues={{
        email:'',
        passsword:'',
        name:''
      }}
      fields={renderFields}
      onSubmit={handleSubmit}
      submitSection={
        <Link href="/">
          <Button type="button" variant='ghost'>
            Voltar para o login
          </Button>
        </Link>
      }
    />
  )
}
