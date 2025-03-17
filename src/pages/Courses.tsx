'use client'
import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseTable } from "@/domain/course/components/table/course-table";
import { courseService } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";


export function CoursesPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await courseService.fetchMany({})
      console.log({queryResponse});
      return queryResponse.data.courses
    },
    
  })
  
  if(error) return <p>error</p>
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
            {isPending ? (
              <LoadingTable/>
            ):(
              <CourseTable data={data}/>
            )}
          </div>
        </div>
      </Container>
  )
}