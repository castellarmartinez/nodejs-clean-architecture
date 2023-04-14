import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../../entities";

export async function add(order: Order) {
  if (!order.id) {
    order.id = uuidv4();
  }

  inMemoryDB.orders.push(order);

  return order;
}

export async function update(updatedOrder: Order) {
  const index = inMemoryDB.orders.findIndex(
    (order) => order.id === updatedOrder.id
  );

  if (index >= 0) {
    inMemoryDB.orders[index] = updatedOrder;
    return inMemoryDB.orders[index];
  }

  return null;
}

export async function remove(orderToRemove: Order) {
  const index = inMemoryDB.orders.findIndex(
    (order) => order.id === orderToRemove.id
  );

  if (index >= 0) {
    inMemoryDB.orders.splice(index, 1);

    return inMemoryDB.orders;
  }

  return null;
}

export async function getById(id: string) {
  return inMemoryDB.orders.find((order) => order.id === id);
}
