
export type PaymentCycle =
  | 'WEEKLY' //semana
  | 'BIWEEKLY' // 2 semanas
  | 'MONTHLY' // 1 mes
  | 'QUARTERLY' // 4 meses
  | 'SEMIANNUALLY' // 6 meses
  | 'YEARLY'; // 1 ano

export type Subscription = {
  id: string,
  title: string,
  description:string,
  cycle: PaymentCycle,
  priceInCents: number,

  updatedAt: Date,
  createdAt: Date,
}
