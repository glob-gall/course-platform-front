'use client'
import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuizzTable } from "@/domain/quizz/components/table/quizz-table";
import { quizzService } from "@/services/quizz.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function QuizzesPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['quizzes'],
    queryFn: async () => {
      const queryResponse = await quizzService.fetchMany({})
      console.log({queryResponse});
      return queryResponse.data.quizzes
    },
    
  })
  if(error) return <p>error...</p>
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Quizzes
            </Title>

            <div>
              <Link href="/quizzes/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            {isPending ? (
              <LoadingTable/>
            ) : (
              <QuizzTable data={data}/>
            )}
          </div>
        </div>
      </Container>
  )
}