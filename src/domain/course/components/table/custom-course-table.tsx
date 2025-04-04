// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Course } from "../../entity/course"
import { ColumnDef } from "@tanstack/react-table"



type CustomCoursesTableProps = {
  data:Course[]
  columns: ColumnDef<Course>[]
}
export function CustomCourseTable({data,columns}:CustomCoursesTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} showColumnsButton={false}/>
    </div>
  )
}
