import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/SideBar";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>

      <AppSidebar />
      <main className="w-full">
        {children}
      </main>
      <div className="absolute top-4 right-4">
        <Header/>
      </div>
    </SidebarProvider>   
  );
}
