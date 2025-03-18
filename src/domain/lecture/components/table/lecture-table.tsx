// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Lecture } from "../../entity/lecture"
import { lectureColumns } from "./lecture-columns"

interface LectureTableProps {
  data:Lecture[]
}
export function LectureTable({data}:LectureTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={lectureColumns} data={data} />
    </div>
  )
}
