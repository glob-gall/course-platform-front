// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Question } from "../../entity/question"
import { generateQuestionMockData } from "./MOCK-DATA"
import { questionColumns } from "./question-columns"

async function getData(): Promise<Question[]> {
  // Fetch data from your API here.
  return generateQuestionMockData(25)
}

export async function QuestionTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={questionColumns} data={data} />
    </div>
  )
}
