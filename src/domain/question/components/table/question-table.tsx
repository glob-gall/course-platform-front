// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Question } from "../../entity/question"
import { questionColumns } from "./question-columns"


interface QuestionTableProps {
  data:Question[]
}

export function QuestionTable({data}:QuestionTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={questionColumns} data={data} />
    </div>
  )
}
