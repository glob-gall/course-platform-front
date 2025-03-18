'use client'

import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LectureTable } from "@/domain/lecture/components/table/lecture-table";
import { lectureService } from "@/services/lecture.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function LecturesPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['lectures'],
    queryFn: async () => {
      const queryResponse = await lectureService.fetchMany({})
      console.log({queryResponse});
      return queryResponse.data.lectures
    },
    
  })
  if(error) return <p>error...</p>
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Aulas
            </Title>

            <div>
              <Link href="/lectures/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            {isPending?(<LoadingTable />): (
              <LectureTable data={data} />
            )}
          </div>
        </div>
      </Container>
  )
}