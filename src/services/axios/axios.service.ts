import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpSerive } from "../http.service";




export default class AxiosHttpService implements HttpSerive {
  private axiosInstance: AxiosInstance
  constructor(){
    this.axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUNT) ?? 5000,
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
