import createHttpError from "http-errors";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";
import { ProductType } from "../../entities/Product";
import { Product } from "../../entities";

export function updateProduct(dependencies: Dependencies) {
  const { productRepository } = dependencies;

  if (!productRepository) {
    throw createHttpError(
      Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD)
    );
  }

  return (input: ProductType) => {
    const { id, name, description, images, price, meta } = input;
    const product = new Product({ id, name, description, images, price, meta });

    return productRepository.update(product);
  };
}
