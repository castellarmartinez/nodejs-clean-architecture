import createHttpError from "http-errors";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";

export function deleteProduct(dependencies: Dependencies) {
  const { productRepository } = dependencies;

  if (!productRepository) {
    throw createHttpError(
      Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD)
    );
  }

  return (id: string) => productRepository.remove(id);
}
