// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Lecture } from "../../entity/lecture"
import { generateLectureMockData } from "./MOCK-DATA"
import { lectureColumns } from "./lecture-columns"

async function getData(): Promise<Lecture[]> {
  // Fetch data from your API here.
  return generateLectureMockData(25)
}

export async function LectureTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={lectureColumns} data={data} />
    </div>
  )
}
