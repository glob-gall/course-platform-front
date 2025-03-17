"use client"

import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { ReactNode } from "react"

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"

interface FormProps<T extends z.ZodTypeAny> {
  title?: string;
  buttonText?:string;
  subtitle?: string;
  schema: T;
  form: UseFormReturn<z.infer<T>>;
  defaultValues: z.infer<T>;
  fields: (props: { form: ReturnType<typeof useForm<z.infer<T>>> }) => ReactNode; // Pass a function to render fields
  onSubmit: (values: z.infer<T>) => void;
  submitSection?: ReactNode
  id?:string

  isSubmiting?:boolean
}

export function FormBase<T extends z.ZodTypeAny>({ id,form, fields, onSubmit,submitSection,isSubmiting,subtitle,title,buttonText }: FormProps<T>) {


  function onSubmitWrapper(data: z.infer<T>) {
    onSubmit(data);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form id={id} onSubmit={form.handleSubmit(onSubmitWrapper)} className=" space-y-6">

        <div className="flex flex-col items-center gap-2 text-center">
          {title && (
            <h1 className="text-2xl font-bold">{title}</h1>
          )}
          {subtitle && (
            <p className="text-balance text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

          {fields({ form })} {/* Render the fields passed as props */}
          <div className="flex gap-1">
            <div className="ml-auto">
              {submitSection}
            </div>

            <Button type="submit" form={id} disabled={isSubmiting}>
              {isSubmiting && (
                <Loader2 className="animate-spin" />
              )}
              {buttonText ?? 'Enviar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}