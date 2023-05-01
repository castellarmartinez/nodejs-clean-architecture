export interface OrderType {
  id?: string;
  userId?: string;
  productsId?: string[];
  date?: Date;
  isPayed?: boolean;
  meta?: object;
}

export class Order {
  id: string | undefined;
  userId: string | undefined;
  productsId: string[];
  date: Date;
  isPayed: boolean;
  meta: object;

  constructor(input: OrderType) {
    this.id = input.id;
    this.userId = input.userId;
    this.productsId = input.productsId || [];
    this.date = input.date || new Date();
    this.isPayed = input.isPayed || false;
    this.meta = input.meta || {};
  }
}
