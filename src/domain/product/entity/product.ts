import { Course } from "@/domain/course/entity/course";

export type Product = {
  id: string;
  title: string;
  description?: string;
  priceInCents: number;
  promoPriceInCents?: number | null;
  maxDatePromoPrice?: Date | null;

  courses: Course[];

  createdAt: Date;
  updatedAt?: Date | null;
}
