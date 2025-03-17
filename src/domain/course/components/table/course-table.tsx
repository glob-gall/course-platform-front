// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Course } from "../../entity/course"
import { courseColumns } from "./course-columns"

interface CourseTableProps {
  data:Course[]
}

export function CourseTable({data}:CourseTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={courseColumns} data={data} />
    </div>
  )
}
