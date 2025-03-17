// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Section } from "../../entity/section"
import { sectionColumns } from "./section-columns"


interface SectionTableProps {
  data: Section[]
}
export function SectionTable({data}:SectionTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={sectionColumns} data={data} />
    </div>
  )
}
