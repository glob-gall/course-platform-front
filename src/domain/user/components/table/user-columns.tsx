"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { User } from "../../entity/user"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header:"Nome"
  },
  {
    accessorKey: "createdAt",
    header:"Data Criação"
  },
  {
    accessorKey: "updatedAt",
    header:"Última atualização"
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    cell: () => {
 
      return (
        <div className="flex">
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">

                {/* <DropdownMenuItem>
                <PenLine /> Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                
                <DropdownMenuItem className=" flex items-center"> 
                  <Trash className="text-destructive" /> Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )
    },
  },
]
