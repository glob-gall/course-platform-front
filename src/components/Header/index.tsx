"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ThemeMenuItem from "./ThemeMenuItem"
import { LogOut, User } from "lucide-react"
import { deleteSession } from "@/actions/delete-session"
  

export default function Header () {
  
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger><User /></MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={deleteSession}>
          <LogOut/> Sair
          </MenubarItem>
        </MenubarContent>

        <ThemeMenuItem />
      </MenubarMenu>
    </Menubar>  
  )
}