"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Answer } from "../../entity/answer"


export const answerColumns: ColumnDef<Answer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header:"Tipo"
  },
  {
    accessorKey: "description",
    header:"Description"
  },
  {
    accessorKey: "resourceURL",
    header:"Recurso"
  },
  {
    accessorKey: "isCorrect",
    header:"Resposta certa"
  },
  {
    id: "actions",
    accessorKey:'id',
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
