"use client"
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeMenuItem(){
  const { setTheme } = useTheme()

  return (
    <MenubarMenu>
      <MenubarTrigger>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => setTheme("system")}>System</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}