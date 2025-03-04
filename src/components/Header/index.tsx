import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ThemeMenuItem from "./ThemeMenuItem"
import { LogOut, User } from "lucide-react"


export default function Header () {

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger><User /></MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
          <LogOut/> Sair
          </MenubarItem>
        </MenubarContent>

        <ThemeMenuItem />
      </MenubarMenu>
      
      
    </Menubar>
  )
}