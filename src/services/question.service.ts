import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { Question } from "@/domain/question/entity/question";

interface AnswerData  {
  description: string 
  isCorrect: boolean
  audioURL?: string 
  externalResource?: string 
  imageURL?: string 
  videoURL?: string 
}

interface CreateQuestionParams {
  description: string
  title: string
  quizzId: string
  audioURL?: string
  videoURL?: string
  imageURL?: string
  externalResource?: string
  answers: AnswerData[]
}


interface UpdateQuestionParams {
  title: string;
  description: string;
}
interface FetchManyQuestionParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManyQuestionResponse  {
  questions: Question[]
}

export class QuestionService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({answers,audioURL,description,quizzId,title,videoURL}:CreateQuestionParams){
    try {
      const response = await this.http.post
      ('/question',
        { 
          answers,
          audioURL,
          description,
          quizzId,
          title,
          videoURL
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
  async update({description,title}:UpdateQuestionParams){
    try {
      const response = await this.http.put
      ('/questions',
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
  async delete(questionId:string){
    try {
      const response = await this.http.delete(`/questions/${questionId}`)
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
  async fetchMany({order,page,title}:FetchManyQuestionParams){
    try {
      const response = await this.http.get<FetchManyQuestionResponse>(`/question/`,{ 
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

export const questionService = new QuestionService()