import { ObjectId, Schema, Types } from "mongoose";

interface Order {
  userId: Types.ObjectId;
  productsId: Types.Array<Types.ObjectId>;
  isPayed: boolean;
  meta: object;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default new Schema<Order>({
  userId: Types.ObjectId,
  productsId: Array<ObjectId>,
  isPayed: Boolean,
  meta: Object,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});
