import { AxiosError, AxiosInstance } from "axios"
import { axiosInstance } from "./axios/axios.service"
import { ServiceError } from "./error/response.error"

interface CreateProductParams {
  title: string;
  description?: string;
  priceInCents: number;
  promoPriceInCents?: number | null;
  maxDatePromoPrice?: Date | null;

  courses: string[];
}


export class ProductService {
  private http: AxiosInstance 
  constructor(){
    this.http = axiosInstance
  }

  async create({courses,priceInCents,title,description,maxDatePromoPrice,promoPriceInCents}:CreateProductParams){    
    try {
      const response = await this.http.post('/product',{ courses,priceInCents,title,description,maxDatePromoPrice,promoPriceInCents })
      
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

  async fetchMany(){
    return {
      data:{
        products:[]
      }
    }
  }
}

export const productService = new ProductService()
