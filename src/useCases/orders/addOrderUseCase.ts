import createHttpError from "http-errors";
import { isEmpty } from "lodash";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";
import { OrderType } from "../../entities/Order";
import { Order } from "../../entities";
import { ErrorResponse } from "../../frameworks/common";
import validateOrder from "./validator";

export function addOrder(dependencies: Dependencies) {
  const { orderRepository } = dependencies;

  if (!orderRepository) {
    throw createHttpError(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD)
    );
  }

  const getValidationErrors = validateOrder(dependencies);

  return async (input: OrderType) => {
    const { id, userId, productsId, date, isPayed, meta } = input;
    const order = new Order({ id, userId, productsId, date, isPayed, meta });

    const validationErrors = await getValidationErrors(order);

    if (!isEmpty(validationErrors)) {
      return Promise.reject(
        new ErrorResponse({
          status: 403,
          msg: "Validation Errors",
          reason: "Somebody sent bad data",
          validationErrors: [validationErrors],
          ip: "",
          url: "",
        })
      );
    }

    return orderRepository.add(order);
  };
}
