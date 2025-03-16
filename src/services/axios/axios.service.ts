import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpService } from "../http.service";




export class AxiosHttpService implements HttpService {
  private axiosInstance: AxiosInstance
  constructor(){
    this.axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) ?? 5000,
        withCredentials:true
        
      })
  }

  setAuthorization(token:string) {    
    this.axiosInstance.defaults.headers.Authorization = token
  }
  removeAuthorization() {    
    delete this.axiosInstance.defaults.headers.Authorization
  }
  
  async get(url:string, options?:AxiosRequestConfig<unknown>){
    return this.axiosInstance.get(url,options)
  }

  async post(url:string,data:unknown){
    return this.axiosInstance.post(url,data)
  }

  async put(url:string,data:unknown){
    return this.axiosInstance.put(url,data)
  }

  async delete(url:string){
    return this.axiosInstance.delete(url)
  }
}

