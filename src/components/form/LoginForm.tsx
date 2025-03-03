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
  email: z.string().email({
    message: "Email invalido.",
  }),
  passsword: z.string().nonempty("Campo Obrigatório"),
})


const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => (
  <>
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

export function LoginForm() {
  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", values);
  };
  
  return (
    <FormBase
      title="Login"
      subtitle="Seja bem-vindo"
      schema={schema}
      defaultValues={{
        email:'',
        passsword:'',
      }}
      fields={renderFields}
      onSubmit={handleSubmit}
      submitSection={
        <Link href="/register">
          <Button type="button" variant='outline'>
            Cadastre-se
          </Button>
        </Link>
      }
    />
  )
}
