import { Course } from "@/domain/entities/course";

export function generateCourseMockData(qnt:number = 10): Course[]{
  const courses:Course[] = []

  for (let i = 0; i < qnt; i++) {
    courses.push({
      id:`${i}`,
      title:`title ${i}`,
      slug:`title-${i}`,
      description:`description ${i}`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return courses
}