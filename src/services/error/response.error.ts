interface ErrorResponse {
  message: string
  code: number
}
export class ServiceError extends Error {
  
  constructor({code,message}:ErrorResponse){
    super()
    this.message = message
    this.name = `${code}`
  }
}