// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Course } from "../../entity/course"
import { generateCourseMockData } from "./MOCK-DATA"
import { courseColumns } from "./course-columns"

async function getData(): Promise<Course[]> {
  // Fetch data from your API here.
  return generateCourseMockData(25)
}

export async function CourseTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={courseColumns} data={data} />
    </div>
  )
}
