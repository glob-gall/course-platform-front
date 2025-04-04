import { Lecture,LectureType } from "../../entity/lecture"

export function generateLectureMockData(qnt:number = 10): Lecture[]{
  const Lectures:Lecture[] = []

  for (let i = 0; i < qnt; i++) {
    Lectures.push({
      id:`${i}`,
      title:`title ${i}`,
      type:LectureType.Other,
      resourceUrl:'http://localhost:3333/10523d.jpg',
      description:`description ${i}`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return Lectures
}