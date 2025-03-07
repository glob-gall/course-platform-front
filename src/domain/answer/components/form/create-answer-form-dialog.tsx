import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent, DialogHeader, DialogTrigger
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Answer } from "../../entity/answer"
import { CreateAnswerForm } from "./create-answer-form"
import { DialogTitle } from "@radix-ui/react-dialog"

type CreateAnswerFormDialogProps = {
  submitFunction: (answer:Answer) => void
}

export function CreateAnswerFormDialog({submitFunction}:CreateAnswerFormDialogProps) {
  return(
    <Dialog>
      <DialogTrigger asChild>
      <Button variant='secondary'  type="button">
        <Plus/> Resposta
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Criar Resposta</DialogTitle>
          </DialogHeader>
        <CreateAnswerForm submit={submitFunction}/>

      </DialogContent>
    </Dialog>
  )
}