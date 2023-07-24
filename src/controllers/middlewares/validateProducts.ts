import { NextFunction, Request, Response } from "express";

import { OrderType } from "../../entities/Order";
import { productUseCase } from "../../useCases/products";
import { Dependencies } from "../../dependencies";
import { HttpException } from "../../frameworks/common/response";

export function validateProducts(dependencies: Dependencies) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const getProductById = productUseCase.getProductById(dependencies);

      const { body = {} } = req;
      const { productsId }: OrderType = body;

      const products = await Promise.all(
        productsId!.map((id) => getProductById(id))
      );

      const productsNotFound = productsId!.filter(
        (_product, index) => !products[index]
      );

      if (productsNotFound.length > 0) {
        const validationError = new HttpException(
          404,
          `No products with ids ${productsNotFound.join(", ")}`
        );

        next(validationError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
