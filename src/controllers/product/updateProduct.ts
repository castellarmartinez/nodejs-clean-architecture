import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { SuccessResponse } from "../../frameworks/common";
import { productUseCase } from "../../useCases/products";
import { ProductType } from "../../entities/Product";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body = {}, params = {} } = req;
      const { id } = params;
      const { name, description, images, price, color, meta }: ProductType =
        body;

      const updateProduct = productUseCase.updateProduct(dependencies);
      const response = await updateProduct({
        id,
        name,
        description,
        images,
        price,
        color,
        meta,
      });
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
