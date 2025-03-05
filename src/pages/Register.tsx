import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "@/domain/auth/form/register-form";
import Image from "next/image";

export function RegisterPage() {
  return (
    <div className="flex flex-row h-screen">

      <div className="p-2 w-3xl flex justify-center items-center h-full flex-col ">
        
        <RegisterForm />

        <div className="md:w-60  flex flex-col items-center mt-8">
          <Separator/>
        </div>
      </div>
      
      <div className="bg-red-500 relative h-screen w-full not-md:hidden">
        <Image 
        className="object-cover"
          src="/space2.jpg" 
          alt=""
          fill
        />
      </div>
    </div>
  )
}