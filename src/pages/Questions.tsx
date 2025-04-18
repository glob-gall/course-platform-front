'use client'
import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuestionTable } from "@/domain/question/components/table/question-table";
import { questionService } from "@/services/question.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function QuestionsPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['questions'],
    queryFn: async () => {
      const queryResponse = await questionService.fetchMany({})
      console.log({queryResponse});
      return queryResponse.data.questions
    },
    
  })

  if(error) return <p>error</p>
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Questões
            </Title>

            <div>
              <Link href="/questions/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            {
              isPending ?(
                <LoadingTable/>
              ):(
                <QuestionTable data={data}/>
              )
            }
          </div>
        </div>
      </Container>
  )
}