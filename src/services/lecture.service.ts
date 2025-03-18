import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { Lecture } from "@/domain/lecture/entity/lecture";



interface CreateLectureParams {
  description: string,
  title: string,
  lectureDescription: string,
  lectureTitle: string,
  sectionId: string,
  lectureAudioURL?: string,
  lectureExternalResource?: string,
  lectureVideoURL?: string,
}
interface UpdateLectureParams {
  title: string;
  description: string;
}
interface FetchManyLectureParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManyLectureResponse  {
  lectures: Lecture[]
}

export class LectureService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({
      lectureAudioURL,
      lectureDescription,
      lectureExternalResource,
      lectureTitle,
      lectureVideoURL,
      sectionId,
      description,
      title
    }:CreateLectureParams){
    try {
      const response = await this.http.post
      ('/section-lecture',
        { 
          lectureAudioURL,
          lectureDescription,
          lectureExternalResource,
          lectureTitle,
          lectureVideoURL,
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
  async update({description,title}:UpdateLectureParams){
    try {
      const response = await this.http.put
      ('/lectures',
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
  async delete(lectureId:string){
    try {
      const response = await this.http.delete(`/lectures/${lectureId}`)
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
  async fetchMany({order,page,title}:FetchManyLectureParams){
    try {
      const response = await this.http.get<FetchManyLectureResponse>(`/lecture/`,{ 
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

export const lectureService = new LectureService()