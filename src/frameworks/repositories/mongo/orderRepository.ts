import mongoose from "mongoose";

import { orderchema } from "../../database/mongo/schemas";
import { Order } from "../../../entities";

export class OrderRepository {
  entityName = "Order";
  Order = mongoose.model(this.entityName, orderchema);

  async add(order: Order) {
    const mongoObject = new this.Order({ ...order, createdAt: new Date() });
    return mongoObject.save();
  }

  async update(updatedOrder: Order) {
    const { id } = updatedOrder;
    delete updatedOrder.id;

    return this.Order.findByIdAndUpdate(
      id,
      {
        ...updatedOrder,
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async remove(id: string) {
    return this.Order.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async getById(id: string) {
    return this.Order.findOne({ _id: id });
  }
}
