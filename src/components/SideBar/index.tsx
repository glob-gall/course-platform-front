import {  Home, NotepadText, Settings, GraduationCap, UserRound, FolderOpen, SquareCheckBig, Apple } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "../ui/separator"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Usários",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Cursos",
    url: "#",
    icon: GraduationCap,
  },
  {
    title: "Módulos",
    url: "#",
    icon: FolderOpen,
  },
  {
    title: "Aulas",
    url: "#",
    icon: Apple,
  },
  {
    title: "Quizzes",
    url: "#",
    icon: SquareCheckBig,
  },
  {
    title: "Questões",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
        <SidebarTrigger  className=""/>
        <Separator/>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
