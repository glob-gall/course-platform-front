"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, PenLine, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Course } from "../../entity/course"

export const courseColumns: ColumnDef<Course>[] = [
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
    accessorKey: "slug",
    header: () => <div className="text-right">Slug</div>,
    cell: ({ row }) => {
      const slug = row.getValue("slug")

 
      return <div className="text-right font-medium">{`${slug}`}</div>
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
