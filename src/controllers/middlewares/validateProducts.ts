import { NextFunction, Request, Response } from "express";

import { OrderType } from "../../entities/Order";
import { ValidationError } from "../../frameworks/common";
import { productUseCase } from "../../useCases/products";
import { Dependencies } from "../../dependencies";

export default function (dependencies: Dependencies) {
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

      if (productsNotFound) {
        const validationError = new ValidationError({
          field: "productsId",
          msg: `No products with ids ${productsNotFound.join(", ")}`,
        });

        next(validationError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
