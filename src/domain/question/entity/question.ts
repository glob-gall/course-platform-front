import { Answer } from "@/domain/answer/entity/answer";

export type Question = {
  id: string,
  title: string,
  description: string,
  audioURL?: string,
  videoURL?: string,
  quizzId?: string,
  answers: Answer[],
  
  createdAt: string,
  updatedAt: string,
}
