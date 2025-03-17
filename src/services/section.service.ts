import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { Section } from "@/domain/section/entity/section";

interface CreateSectionParams {
  title: string
  courseId: string
  description: string
}
interface UpdateSectionParams {
  title: string;
  description: string;
}
interface FetchManySectionParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManySectionResponse  {
  sections: Section[]
}

export class SectionService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({courseId,description,title}:CreateSectionParams){
    try {
      const response = await this.http.post
      ('/section',
        { 
          courseId,
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
  async update({description,title}:UpdateSectionParams){
    try {
      const response = await this.http.put
      ('/sections',
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
  async delete(sectionId:string){
    try {
      const response = await this.http.delete(`/sections/${sectionId}`)
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
  async fetchMany({order,page,title}:FetchManySectionParams){
    try {
      const response = await this.http.get<FetchManySectionResponse>(`/section/`,{ 
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

export const sectionService = new SectionService()