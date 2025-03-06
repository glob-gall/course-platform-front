// import { Payment, columns } from "./columns"
import { DataTable } from "@/components/table/base-table"
import { User } from "../../entity/user"
import { generateUserMockData } from "./MOCK-DATA"
import { userColumns } from "./user-columns"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return generateUserMockData(25)
}

export async function UserTable() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={userColumns} data={data} />
    </div>
  )
}
