import { Schema } from "mongoose";

interface User {
  name: string;
  lastName: string;
  gender: number;
  meta: object;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default new Schema<User>({
  name: String,
  lastName: String,
  gender: Number,
  meta: Object,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});
