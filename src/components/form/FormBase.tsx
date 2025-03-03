"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReactNode } from "react"

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

interface FormProps<T extends z.ZodTypeAny> {
  title?: string;
  subtitle?: string;
  schema: T;
  defaultValues: z.infer<T>;
  fields: (props: { form: ReturnType<typeof useForm<z.infer<T>>> }) => ReactNode; // Pass a function to render fields
  onSubmit: (values: z.infer<T>) => void;
  submitSection?: ReactNode

}

export function FormBase<T extends z.ZodTypeAny>({ defaultValues, schema, fields, onSubmit,submitSection,subtitle,title }: FormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmitWrapper(data: z.infer<T>) {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitWrapper)} className="w-2/3 space-y-6">

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

          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}