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
    url: "/",
    icon: Home,
  },
  {
    title: "Usários",
    url: "users",
    icon: UserRound,
  },
  {
    title: "Cursos",
    url: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Módulos",
    url: "/sections",
    icon: FolderOpen,
  },
  {
    title: "Aulas",
    url: "lectures",
    icon: Apple,
  },
  {
    title: "Quizzes",
    url: "quizzes",
    icon: SquareCheckBig,
  },
  {
    title: "Questões",
    url: "questions",
    icon: NotepadText,
  },
  {
    title: "Settings",
    url: "settings",
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
