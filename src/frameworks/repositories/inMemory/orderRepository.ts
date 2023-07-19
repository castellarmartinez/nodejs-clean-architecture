import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../../entities";

export class OrderRepository {
  async add(order: Order) {
    if (!order.id) {
      order.id = uuidv4();
    }

    inMemoryDB.orders.push(order);

    return order;
  }

  async update(updatedOrder: Order) {
    const index = inMemoryDB.orders.findIndex(
      (order) => order.id === updatedOrder.id
    );

    if (index >= 0) {
      inMemoryDB.orders[index] = updatedOrder;
      return inMemoryDB.orders[index];
    }

    return null;
  }

  async remove(id: string) {
    const index = inMemoryDB.orders.findIndex((order) => order.id === id);

    if (index >= 0) {
      inMemoryDB.orders.splice(index, 1);

      return true;
    }

    return null;
  }

  async getById(id: string) {
    return inMemoryDB.orders.find((order) => order.id === id);
  }
}
