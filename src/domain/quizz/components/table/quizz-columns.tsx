"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, PenLine, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Quizz } from "../../entity/quizz"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const quizzColumns: ColumnDef<Quizz>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header:"Description"
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

                <DropdownMenuItem>
                <PenLine /> Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
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
