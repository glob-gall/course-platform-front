import { AxiosError, AxiosInstance } from "axios"
import { axiosInstance } from "./axios/axios.service"
import { ServiceError } from "./error/response.error"

interface CreateUserParams {
  name: string
  email: string
  password: string
}


export class UserService {
  private http: AxiosInstance 
  constructor(){
    this.http = axiosInstance
  }

  async create({email,password, name}:CreateUserParams){    
    try {
      const response = await this.http.post('/user',{ name, email, password })
      
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

export function makeUserService(){
  return new UserService()
}