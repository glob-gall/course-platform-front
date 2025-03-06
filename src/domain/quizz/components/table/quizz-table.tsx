// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Quizz } from "../../entity/quizz"
import { generateQuizzMockData } from "./MOCK-DATA"
import { quizzColumns } from "./quizz-columns"

async function getData(): Promise<Quizz[]> {
  // Fetch data from your API here.
  return generateQuizzMockData(25)
}

export async function QuizzTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={quizzColumns} data={data} />
    </div>
  )
}
