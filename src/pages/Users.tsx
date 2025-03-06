import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserTable } from "@/domain/user/components/table/user-table";
import { Plus } from "lucide-react";

export function UsersPage() {
  return (
    <Container>  
        <div className="p-4 w-full">
          <div className="flex justify-between mb-4">
            <Title>
              Usuários
            </Title>

            <div>
                <Button disabled><Plus/> Convidar usuário</Button>
            </div>
          </div>
          <Separator/>
          <div>
            <UserTable />
          </div>
        </div>
      </Container>
  )
}