import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { Course } from "@/domain/course/entity/course";

interface CreateCourseParams {
  description: string;
  title: string;
  slug?: string;
}
interface UpdateCourseParams {
  description: string;
  title: string;
  slug?: string;
}
interface FetchManyCourseParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManyCourseResponse  {
  courses: Course[]
}

export class CourseService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({description,title,slug}:CreateCourseParams){
    try {
      const response = await this.http.post
      ('/course',
        { 
          description,
          title,
          slug 
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
  async update({description,title,slug}:UpdateCourseParams){
    try {
      const response = await this.http.put
      ('/courses',
        { 
          description,
          title,
          slug 
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
  async delete(courseId:string){
    try {
      const response = await this.http.delete(`/courses/${courseId}`)
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
  async fetchMany({order,page,title}:FetchManyCourseParams){
    try {
      const response = await this.http.get<FetchManyCourseResponse>(`/course/`,{ 
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

export const courseService = new CourseService()