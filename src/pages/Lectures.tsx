import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LectureTable } from "@/domain/lecture/components/table/lecture-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export function LecturesPage() {
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
            <LectureTable />
          </div>
        </div>
      </Container>
  )
}