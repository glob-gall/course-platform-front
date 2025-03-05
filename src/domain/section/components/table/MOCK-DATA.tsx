import { Section } from "../../entity/section"

export function generateSectionMockData(qnt:number = 10): Section[]{
  const Sections:Section[] = []

  for (let i = 0; i < qnt; i++) {
    Sections.push({
      id:`${i}`,
      title:`title ${i}`,
      description:`description ${i}`,
      createdAt:`${i}.20.2025`,
      updatedAt:`${i}.04.2025`,
      
    })
    
  }

  return Sections
}