import createHttpError from "http-errors";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";
import { OrderType } from "../../entities/Order";
import { Order } from "../../entities";

export function addOrder(dependencies: Dependencies) {
  const { orderRepository } = dependencies;

  if (!orderRepository) {
    throw createHttpError(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD)
    );
  }

  return (input: OrderType) => {
    const { id, userId, productsId, date, isPayed, meta } = input;
    const order = new Order({ id, userId, productsId, date, isPayed, meta });

    return orderRepository.add(order);
  };
}
