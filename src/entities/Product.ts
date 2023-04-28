export interface ProductType {
  id?: string;
  name?: string;
  description?: string;
  images?: object[];
  price?: number;
  color?: string;
  meta?: object;
}

export class Product {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  images: object[];
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
