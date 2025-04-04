'use client'
import { Container } from "@/components/Container";
import { LoadingTable } from "@/components/loading/loading-table";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductTable } from "@/domain/product/components/table/product-table";
import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ProductsPage() {
  const {data,error,isPending} = useQuery({
    queryKey:['products'],
    queryFn: async () => {
      const queryResponse = await productService.fetchMany()
      console.log({queryResponse});
      return queryResponse.data.products
    },
    
  })

  if(error) return <p>error</p>
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Produtos
            </Title>

            <div>
              <Link href="/products/create">
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
                <ProductTable data={data}/>
              )
            }
          </div>
        </div>
      </Container>
  )
}