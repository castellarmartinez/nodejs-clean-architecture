import { NextFunction, Request, Response } from "express";

import { OrderType } from "../../entities/Order";
import { ValidationError } from "../../frameworks/common";
import { productUseCase } from "../products";
import { Dependencies } from "../../dependencies";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getProductById = productUseCase.getProductById(dependencies);

      const { body = {} } = req;
      const { productsId }: OrderType = body;

      const products = await Promise.all(
        productsId!.map((id) => getProductById(id))
      );

      const nonExistingProducts = productsId!.filter(
        (_product, index) => !products[index]
      );

      if (nonExistingProducts) {
        return new ValidationError({
          field: "productsId",
          msg: `No products with ids ${nonExistingProducts.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
