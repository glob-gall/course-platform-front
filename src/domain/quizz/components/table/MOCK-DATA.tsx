import { Quizz } from "../../entity/quizz"

export function generateQuizzMockData(qnt:number = 10): Quizz[]{
  const Quizzs:Quizz[] = []

  for (let i = 0; i < qnt; i++) {
    Quizzs.push({
      id:`${i}`,
      title:`title ${i}`,
      description:`description ${i}`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return Quizzs
}