'use client'

import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubscriptionTable } from "@/domain/subscription/components/table/subscription-table";
import { subscriptionService } from "@/services/subscription.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function SubscriptionsPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['subscriptions'],
    queryFn: async () => {
      const queryResponse = await subscriptionService.fetchMany({})
      console.log({queryResponse});
      return queryResponse.data.subscriptions
    },
    
  })
  if(error) return <p>error...</p>
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Planos
            </Title>

            <div>
              <Link href="/subscriptions/create">
                <Button><Plus/> Novo</Button>
              </Link>
            </div>
          </div>
          <Separator/>
          <div>
            {isPending?(<LoadingTable />): (
              <SubscriptionTable data={data} />
            )}
          </div>
        </div>
      </Container>
  )
}