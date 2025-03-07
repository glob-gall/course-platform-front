// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Answer } from "../../entity/answer"
import { ColumnDef } from "@tanstack/react-table"



type CustomAnswersTableProps = {
  data:Answer[]
  columns: ColumnDef<Answer>[]
}
export function CustomAnswerTable({data,columns}:CustomAnswersTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} showColumnsButton={false}/>
    </div>
  )
}
