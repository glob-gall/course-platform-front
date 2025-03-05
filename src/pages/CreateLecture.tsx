import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreateLectureForm } from "@/domain/lecture/components/form/create-lecture-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CreateLecturePage() {

  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Link href="/lectures">
                <Button className="mr-2" variant="ghost">
                  <ArrowLeft />
                </Button>
              </Link>
              <Title>
                Criar Aula
              </Title>
            </div>

          </div>
          <Separator/>
          <div className="rounded-md border mt-4 p-6">
            <CreateLectureForm />
          </div>
        </div>
      </Container>
  )
}