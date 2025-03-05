import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseTable } from "@/domain/course/components/table/course-table";
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