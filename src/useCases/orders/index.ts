import { addOrder } from "./addOrderUseCase";
import { getOrderById } from "./getOrderByIdUseCase";
import { deleteOrder } from "./deleteOrderUseCase";
import { updateOrder } from "./updateOrderUseCase";

export const orderUseCase = {
  addOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
};
