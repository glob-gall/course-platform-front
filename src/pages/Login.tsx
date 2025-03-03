import { LoginForm } from "@/components/form/LoginForm";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function LoginPage() {
  return (
    <div className="flex flex-row h-screen">

      <div className="p-2 w-3xl flex justify-center items-center h-full flex-col ">
        
        <LoginForm />

        <div className="md:w-60  flex flex-col items-center mt-8">

          <Separator/>
          <Button
            className="mt-4" 
            type="button" 
            variant='ghost'
          >
            Esqueci minha senha
          </Button>
        </div>
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