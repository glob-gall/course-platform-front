import { left, right } from "@/core/types/either";
import { HttpSerive } from "./http.service";

interface CreateUserParams {
  name: string
  email: string
  password: string
}

export class UserService {
  constructor(private http: HttpSerive){}

  async create({email,password, name}:CreateUserParams){
    try {
      const response = await this.http.post('/user',{ name, email, password })
      return right(response.data)
    } catch (error) {
      return left(error)
    }
  }
}