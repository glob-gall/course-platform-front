import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { Quizz } from "@/domain/quizz/entity/quizz";



interface CreateQuizzParams {
  description: string,
  title: string,
  quizzTitle: string,
  quizzDescription: string,
  sectionId: string,


}
interface UpdateQuizzParams {
  title: string;
  description: string;
}
interface FetchManyQuizzParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManyQuizzResponse  {
  quizzes: Quizz[]
}

export class QuizzService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({
      quizzDescription,
      quizzTitle,
      sectionId,
      description,
      title
    }:CreateQuizzParams){
    try {
      const response = await this.http.post
      ('/section-quizz',
        { 
          quizzDescription,
          quizzTitle,
          sectionId,
          description,
          title
        }
      )
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
  async update({description,title}:UpdateQuizzParams){
    try {
      const response = await this.http.put
      ('/quizz',
        { 
          description,
          title,
        }
      )
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
  async delete(quizzId:string){
    try {
      const response = await this.http.delete(`/quizz/${quizzId}`)
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
  async fetchMany({order,page,title}:FetchManyQuizzParams){
    try {
      const response = await this.http.get<FetchManyQuizzResponse>(`/quizz/`,{ 
        params:{order,page,title}
      })
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

export const quizzService = new QuizzService()