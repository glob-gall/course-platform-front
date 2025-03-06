import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuizzTable } from "@/domain/quizz/components/table/quizz-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export function QuizzesPage() {
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
            <QuizzTable />
          </div>
        </div>
      </Container>
  )
}