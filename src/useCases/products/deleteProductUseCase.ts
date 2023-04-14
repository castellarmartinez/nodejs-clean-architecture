import createHttpError from "http-errors";

import { Product } from "../../entities";
import { Constants } from "../../constants";
import { ProductType } from "../../entities/Product";
import { Dependencies } from "../../dependencies";

export function deleteProduct(dependencies: Dependencies) {
  const { productRepository } = dependencies;

  if (!productRepository) {
    throw createHttpError(
      Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD)
    );
  }

  return (input: ProductType = {}) => {
    const { id, name, description, images, price, meta } = input;
    const product = new Product({ id, name, description, images, price, meta });

    return productRepository.remove(product);
  };
}
