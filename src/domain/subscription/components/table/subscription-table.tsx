// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { Subscription } from "../../entity/subscription"
import { subscriptionColumns } from "./subscription-columns"

interface SubscriptionTableProps {
  data:Subscription[]
}
export function SubscriptionTable({data}:SubscriptionTableProps) {

  return (
    <div className="container mx-auto">
      <DataTable columns={subscriptionColumns} data={data} />
    </div>
  )
}
