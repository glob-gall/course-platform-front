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
import { useMutation } from "@tanstack/react-query"
import { makeUserService } from "@/services/user.service"

const schema = z.object({
  name: z.string().nonempty("Campo Obrigatório"),
  email: z.string().email({
    message: "Email invalido.",
  }),
  password: z.string().nonempty("Campo Obrigatório"),
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
      name="password"
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
  
  
  const createUserMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const userService = makeUserService()
      await userService.create(values)
    }
  })
  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log("Form Submitted:", {values});

    createUserMutation.mutate({
      email: values.email,
      name: values.name,
      password: values.password,
    })
    
  };

  const defaultValues = {
    email:'',
    password:'',
    name:''
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  
  return (
    <div className="w-full md:px-8">
      <FormBase
        form={form}
        title="Cadastre-se"
        subtitle="Crie uma conta em segundos!"
        schema={schema}
        defaultValues={defaultValues}
        fields={renderFields}
        onSubmit={handleSubmit}
        submitSection={
          <Link href="/login">
            <Button type="button" variant='ghost'>
              Voltar para o login
            </Button>
          </Link>
        }
      />
    </div>

  )
}
