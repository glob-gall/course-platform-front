// import { Either } from "@/core/types/either"

import { AxiosResponse } from "axios";

export abstract class HttpSerive {
  abstract setAuthorization(token:string): void
  abstract get(url:string, options?:unknown): Promise<AxiosResponse>
  abstract post(url:string,data:unknown): Promise<AxiosResponse>
  abstract put(url:string,data:unknown): Promise<AxiosResponse>
  abstract delete(url:string): Promise<AxiosResponse>
}



