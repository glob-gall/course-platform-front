// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Answer } from "../../entity/answer"
import { answerColumns } from "./answer-columns"



type AnswersTableProps = {
  data:Answer[]
}
export function AnswerTable({data}:AnswersTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={answerColumns} data={data} showColumnsButton={false}/>
    </div>
  )
}
