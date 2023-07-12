import { Schema } from "mongoose";

interface Product {
  name: string,
  description: string,
  images: object[],
  price: number,
  color: string,
  meta: object,
  createdAt: Date,
  deletedAt: Date,
}

export default new Schema<Product>({
  name: String,
  description: String,
  images: Array<object>,
  price: Number,
  color: String,
  meta: Object,
  createdAt: Date,
  deletedAt: Date,
});
