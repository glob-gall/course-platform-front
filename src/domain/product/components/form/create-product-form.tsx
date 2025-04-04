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
import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { createSuccessToast } from "@/lib/create-success-toast";
import { createErrorToast } from "@/lib/create-error-toast";
import { useCallback, useState } from "react";
import { Course } from "@/domain/course/entity/course";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CustomCourseTable } from "@/domain/course/components/table/custom-course-table";
import { SelectCourseFormDialog } from "@/domain/course/components/form/select-course-form-dialog";
import { courseService } from "@/services/course.service";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyInput } from "@/components/form/CurrencyInput";
import { DatePicker } from "@/components/form/DatePicker";


const schema = z.object({
  title: z.string().min(8, 'O titulo não pode ter menos de 8 letras'),
  description: z.string().optional(),
  priceInCents: z.number(),
  promoPriceInCents:  z.number(),
  maxDatePromoPrice: z.date().optional(),
})


export function CreateProductForm() {

  const [allCourses,setAllCourses] = useState<Course[]>([])
  const [selectedCourses,setSelectedCourses] = useState<Course[]>([])
 

  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await courseService.fetchMany({})
      setAllCourses(queryResponse.data.courses)
      const sectionKeyValues = queryResponse.data.courses.map(quizz => ({
        value: quizz.id,
        label: quizz.title
      }))
      return sectionKeyValues

    },
  })


  const addCourse = useCallback((courseId:string)=>{
    const newCourse = allCourses.find(c => c.id === courseId)
    
    if(newCourse)
      setSelectedCourses(s =>{
        const alreadyInSelectedArray = s.find(c => c.id === courseId)
        if(alreadyInSelectedArray) return s
        return [...s, newCourse]
      })

  },[allCourses])

  const removeSelectedCourse = (id:unknown)=>{
    console.log({selectedCourses,id});
    setSelectedCourses(selectedCourses.filter(ans=>ans.id !== id))
  }

  const answerColumns: ColumnDef<Course>[] = [
    {
      accessorKey: "title",
      header:"Titulo"
    },
    {
      accessorKey: "slug",
      header:"Slug"
    },
    {
      accessorKey: "description",
      header:"Description"
    },
    {
      id: "actions",
      accessorKey:'id',
      header: () => <div className="text-right">Ações</div>,
      cell: (cel) => {
   
        return (
          <div className="flex">
            <div className="ml-auto">
              <Button variant="ghost" onClick={() =>removeSelectedCourse(cel.renderValue())}>
                <Trash className="text-destructive" />
              </Button>
            </div>
          </div>
        )
      },
    },
  ]


const renderFields = ({ form }: { form: UseFormReturn<z.infer<typeof schema>> }) => {
  
  return (
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
        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)</FormLabel>
              <FormControl>

                <CurrencyInput placeholder="00.00" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 not-sm:flex-wrap">
          <FormField
            control={form.control}
            name="promoPriceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Promocional</FormLabel>
                <FormControl>

                  <CurrencyInput placeholder="00.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxDatePromoPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data limite da Promoção</FormLabel>
                <FormControl>

                  <DatePicker onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </>
    )
  };

  const createSectionMutation = useMutation({
    mutationFn: async ({
      maxDatePromoPrice,
      priceInCents,
      promoPriceInCents,
      title,
      description
    }: z.infer<typeof schema>) => {
      await productService.create({
        courses: selectedCourses.map(c => c.id),
        priceInCents,
        title,
        description,
        maxDatePromoPrice,
        promoPriceInCents,

      })
    },
    onSuccess:() => {
      form.reset()
      setSelectedCourses([])
      createSuccessToast({
        title: 'Questão criada com sucesso!',
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
    if(false){
      createSectionMutation.mutate(values)
    }
  };
  const defaultValues: z.infer<typeof schema> = {
    maxDatePromoPrice: undefined,
    priceInCents:0,
    promoPriceInCents:0,
    title:'',
    description:''

    
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
      <div className="">
        <h2 className="font-bold text-lg">Cursos</h2>
        <CustomCourseTable 
          data={selectedCourses}
          columns={answerColumns}
        />
        <div className="flex">
          <div className="ml-auto">
            {
              (isPending || error) ? (
                <Skeleton />
              ) :(
                <SelectCourseFormDialog submitFunction={addCourse} courses={data} />
              )
            }
          </div>
        </div>
        <FormBase
          id="section-form"
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
