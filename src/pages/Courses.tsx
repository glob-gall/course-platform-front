import { Container } from "@/components/Container";
import DemoPage from "@/components/table/course/CourseTable";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export function CoursesPage() {
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Cursos
            </Title>

            <div>
              <Button><Plus/> Novo</Button>
            </div>
          </div>
          <Separator/>
          <div>
            <DemoPage />
          </div>
        </div>
      </Container>
  )
}