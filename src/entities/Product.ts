export interface ProductType {
  id?: string;
  name?: string;
  description?: string;
  images?: any[];
  price?: number;
  color?: string;
  meta?: object;
}

export class Product {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  images: any[];
  price: number | undefined;
  color: string | undefined;
  meta: object;

  constructor(input: ProductType) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.images = input.images || [];
    this.price = input.price;
    this.color = input.color;
    this.meta = input.meta || {};
  }
}
