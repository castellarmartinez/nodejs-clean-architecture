import { Schema } from "mongoose";

interface Order {
  userId: string,
  productsId: string[],
  isPayed: boolean,
  meta: object,
  createdAt: Date,
  deletedAt: Date,
}

export default new Schema<Order>({
  userId: String,
  productsId: Array<string>,
  isPayed: Boolean,
  meta: Object,
  createdAt: Date,
  deletedAt: Date,
});
