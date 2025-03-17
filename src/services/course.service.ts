import { HttpService } from "./http.service";
import { ServiceFilters } from "@/core/services/filters";

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
  title: string;
  page: number;
}

export class CourseService {
  constructor(private http: HttpService){}

  async create({description,title,slug}:CreateCourseParams){
    try {
      const response = await this.http.post
      ('/courses',
        { 
          description,
          title,
          slug 
        }
      )
      return response
    } catch (error) {
      return error
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
      return error
    }
  }
  async delete(courseId:string){
    try {
      const response = await this.http.delete(`/courses/${courseId}`)
      return response
    } catch (error) {
      return error
    }
  }
  async fetchMany({order,page,title}:FetchManyCourseParams){
    try {
      const response = await this.http.get(`/courses/`,{ 
        params:{order,page,title}
      })
      return response
    } catch (error) {
      return error
    }
  }
}