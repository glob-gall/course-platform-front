import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionTable } from "@/domain/section/components/table/section-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export function SectionsPage() {
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Módulos
            </Title>

            <div>
              <Link href="/sections/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            <SectionTable />
          </div>
        </div>
      </Container>
  )
}