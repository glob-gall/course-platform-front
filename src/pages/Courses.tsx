import { Container } from "@/components/Container";
import CourseTable from "@/components/table/course/CourseTable";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

export function CoursesPage() {
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Cursos
            </Title>

            <div>
              <Link href="/courses/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            <CourseTable />
          </div>
        </div>
      </Container>
  )
}