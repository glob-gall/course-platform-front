import { Product } from "../../entity/product"

export function generateProductMockData(qnt:number = 10): Product[]{
  const Products:Product[] = []

  for (let i = 0; i < qnt; i++) {
    Products.push({
      id:`${i}`,
      courses:[],
      title:`title ${i}`,
      description:`description ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      priceInCents: Math.random()*1000
    })
    
  }

  return Products
}