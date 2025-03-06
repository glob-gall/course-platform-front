import { Question } from "../../entity/question"

export function generateQuestionMockData(qnt:number = 10): Question[]{
  const Questions:Question[] = []

  for (let i = 0; i < qnt; i++) {
    Questions.push({
      id:`${i}`,
      answers:[],
      title:`title ${i}`,
      description:`description ${i}`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return Questions
}