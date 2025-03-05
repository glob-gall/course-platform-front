"use client"

import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormBase } from "@/components/form/FormBase"
import { Button } from "@/components/ui/button"

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

  const defaultValues = {
    email:'',
    passsword:'',
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  
  return (
    <div className="w-full md:px-8">
      <FormBase
        form={form}
        title="Login"
        subtitle="Seja bem-vindo"
        schema={schema}
        defaultValues={defaultValues}
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
    </div>
  )
}
