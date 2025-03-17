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
import { authService } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { createErrorToast } from "@/lib/create-error-toast"
import { createSuccessToast } from "@/lib/create-success-toast"

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
  const router = useRouter()

  const createUserMutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      await authService.signiIn({
        email: values.email,
        password: values.passsword
      })
    },
    onSuccess:() => {
      router.push('/')
      createSuccessToast({
        title: 'Bem-vindo',
        description:'Login realizado com sucesso!'
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
    createUserMutation.mutate(values)
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
