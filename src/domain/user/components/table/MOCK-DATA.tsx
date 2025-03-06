import { User } from "../../entity/user"

export function generateUserMockData(qnt:number = 10): User[]{
  const Users:User[] = []

  for (let i = 0; i < qnt; i++) {
    Users.push({
      id:`${i}`,
      name:`user ${i}`,
      email:`user${i}@email.com`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return Users
}