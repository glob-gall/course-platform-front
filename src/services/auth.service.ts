import { left, right } from "@/core/types/either";
import { HttpService } from "./http.service";
import { AxiosHttpService } from "./axios/axios.service";

interface SignInParams {
  email: string
  password: string
}

export class AuthService {
  constructor(private http: HttpService){}

  async signiIn({email,password}:SignInParams){
    try {
      const response = await this.http.post('auth/sign-in',{email,password})
      return right(response)
    } catch (error) {
      return left(error)
    }
  }
}

export const authService = new AuthService(new AxiosHttpService())