export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ServiceFilters {
  order: Order;
}
