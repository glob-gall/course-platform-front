// import { Payment, columns } from "./columns"
import { DataTable } from "../base-table"
import { generateCourseMockData } from "./MOCK-DATA"
import { columnsTeste } from "./teste"
import { Course } from "@/domain/entities/course"

async function getData(): Promise<Course[]> {
  // Fetch data from your API here.
  return generateCourseMockData(25)
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columnsTeste} data={data} />
    </div>
  )
}
