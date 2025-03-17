// import { HttpService } from "./http.service";
// import { AxiosHttpService } from "./axios/axios.service";

import { AxiosError, AxiosInstance } from "axios"
import { axiosInstance } from "./axios/axios.service"
import { ServiceError } from "./error/response.error"

interface SignInParams {
  email: string
  password: string
}

export class AuthService {
  private http: AxiosInstance 
  constructor(){
    this.http = axiosInstance
  }

  async signiIn({email,password}:SignInParams){
    try {
      const response = await this.http.post('auth/sign-in',{email,password})
      return response
    } catch (error) {
      if(error instanceof AxiosError){
        throw new ServiceError({
          code: error.status ?? 500,
          message: error.response?.data?.message 
          ?? 'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe'
        })
      }
      throw new ServiceError({
        code: 500,
        message: 'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe'
      })
    }
  }
}

export const authService = new AuthService()