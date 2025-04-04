import { AxiosError, AxiosInstance } from "axios";
import { ServiceFilters } from "@/core/services/filters";
import { axiosInstance } from "./axios/axios.service";
import { ServiceError } from "./error/response.error";
import { PaymentCycle, Subscription } from "@/domain/subscription/entity/subscription";



interface CreateSubscriptionParams {
  courses: string[]
  cycle: PaymentCycle
  priceInCents: number
  title: string
  description?: string
}

interface FetchManySubscriptionParams extends ServiceFilters {
  title?: string;
  page?: number;
}

interface FetchManySubscriptionResponse  {
  subscriptions: Subscription[]
}

export class SubscriptionService {
  private http: AxiosInstance  
  constructor(){
    this.http = axiosInstance
  }

  async create({
      courses,cycle,priceInCents,title,description
    }:CreateSubscriptionParams){
    try {
      const response = await this.http.post
      ('/subscription',
        { 
          courses,cycle,priceInCents,title,description
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

  async fetchMany({order,page,title}:FetchManySubscriptionParams){
    try {
      const response = await this.http.get<FetchManySubscriptionResponse>(`/subscription/`,{ 
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

export const subscriptionService = new SubscriptionService()