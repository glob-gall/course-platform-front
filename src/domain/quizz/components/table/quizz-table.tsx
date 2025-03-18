// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Quizz } from "../../entity/quizz"
import { quizzColumns } from "./quizz-columns"



interface QuizzTableProps {
  data: Quizz[]
}
export function QuizzTable({data}:QuizzTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={quizzColumns} data={data} />
    </div>
  )
}
