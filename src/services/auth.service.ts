import { left, right } from "@/core/types/either";
import { HttpSerive } from "./http.service";

interface SignInParams {
  email: string
  password: string
}

export class AuthService {
  constructor(private http: HttpSerive){}

  async signiIn({email,password}:SignInParams){
    try {
      const response = await this.http.post('/sign-in',{email,password})
      return right(response.data)
    } catch (error) {
      return left(error)
    }
  }
}