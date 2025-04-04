'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent, DialogFooter, DialogHeader, DialogTrigger
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { SearchInput,SearchItem } from "@/components/form/SearchInput"
import { useState } from "react"
import { Label } from "@/components/ui/label"

type SelectCourseFormDialogProps = {
  submitFunction: (courseId:string) => void
  courses: SearchItem[]
}

export function SelectCourseFormDialog({submitFunction,courses}:SelectCourseFormDialogProps) {
  const [currentCourse,setCurrentCourse] = useState<string>('')

 const handleSubmit = () => {
  submitFunction(currentCourse)
  setCurrentCourse('')
 }

 const fieldIsEmpty = currentCourse === ''
  return(
    <Dialog>
      <DialogTrigger asChild>
      <Button variant='secondary'  type="button">
        <Plus/> Curso
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Selecione um curso</DialogTitle>
          </DialogHeader>
        
          <Label>Curso</Label>
          <SearchInput 
            items={courses}
            notFoundMsg="curso não encontrado"
            placeholder="Selecione um curso"
            fieldValue={currentCourse}
            formSetValue={(value: string) => setCurrentCourse(value)}
          />
                

          <DialogFooter>
            <Button onClick={handleSubmit} disabled={fieldIsEmpty}>Adicionar</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}