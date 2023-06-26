import createHttpError from "http-errors";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";

export function deleteOrder(dependencies: Dependencies) {
  const { orderRepository } = dependencies;

  if (!orderRepository) {
    throw createHttpError(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD)
    );
  }

  return (id: string) => orderRepository.remove(id);
}
