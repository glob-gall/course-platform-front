'use client'

import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionTable } from "@/domain/section/components/table/section-table";
import { sectionService } from "@/services/section.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function SectionsPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['courses'],
    queryFn: async () => {
      const queryResponse = await sectionService.fetchMany({})
      return queryResponse.data.sections
    },
  })
  
  if(error) return <p>error</p>
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
            {isPending ?(
              <LoadingTable/>
            ) :(

              <SectionTable data={data}/>
            )}
          </div>
        </div>
      </Container>
  )
}