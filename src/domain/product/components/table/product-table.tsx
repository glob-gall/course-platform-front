// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Product } from "../../entity/product"
import { productColumns } from "./product-columns"


interface ProductTableProps {
  data:Product[]
}

export function ProductTable({data}:ProductTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={productColumns} data={data} />
    </div>
  )
}
