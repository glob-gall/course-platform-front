// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Section } from "../../entity/section"
import { generateSectionMockData } from "./MOCK-DATA"
import { sectionColumns } from "./section-columns"

async function getData(): Promise<Section[]> {
  // Fetch data from your API here.
  return generateSectionMockData(25)
}

export async function SectionTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={sectionColumns} data={data} />
    </div>
  )
}
