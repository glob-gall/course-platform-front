import { LoginForm } from "@/components/form/login-form";
import ModeToggle from "@/components/ModeToggle";
import Image from "next/image";

export function LoginPage() {
  return (
    <div className="flex flex-row h-screen">

      <div className="p-2 w-3xl flex justify-center items-center h-full ">
        
        <LoginForm/>
      </div>
      
      <div className="bg-red-500 relative h-screen w-full not-md:hidden">
        <Image 
        className="object-cover"
          src="/space.jpg" 
          alt=""
          fill
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <ModeToggle/>
      </div>
    </div>
  )
}