import { left, right } from "@/core/types/either";
import { HttpService } from "./http.service";
import { AxiosHttpService } from "./axios/axios.service";

interface CreateUserParams {
  name: string
  email: string
  password: string
}

export class UserService {
  constructor(private http: HttpService){}

  async create({email,password, name}:CreateUserParams){    
    try {
      const response = await this.http.post('/user',{ name, email, password })
      
      return right(response)
    } catch (error) {
      return left(error)
    }
  }
}

export function makeUserService(){
  const axiosService = new AxiosHttpService()
  const userService = new UserService(axiosService)
  return userService
}