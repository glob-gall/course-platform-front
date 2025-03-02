import { left, right } from "@/core/types/either";
import { HttpSerive } from "./http.service";
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
  constructor(private http: HttpSerive){}

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
      return right(response.data)
    } catch (error) {
      return left(error)
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
      return right(response.data)
    } catch (error) {
      return left(error)
    }
  }
  async delete(courseId:string){
    try {
      const response = await this.http.delete(`/courses/${courseId}`)
      return right(response.data)
    } catch (error) {
      return left(error)
    }
  }
  async fetchMany({order,page,title}:FetchManyCourseParams){
    try {
      const response = await this.http.get(`/courses/`,{ 
        params:{order,page,title}
      })
      return right(response.data)
    } catch (error) {
      return left(error)
    }
  }
}