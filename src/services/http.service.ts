// import { Either } from "@/core/types/either"
export abstract class HttpService {
  abstract setAuthorization(token:string): void
  abstract get(url:string, options?:unknown): Promise<unknown>
  abstract post(url:string,data:unknown): Promise<unknown>
  abstract put(url:string,data:unknown): Promise<unknown>
  abstract delete(url:string): Promise<unknown>
}



