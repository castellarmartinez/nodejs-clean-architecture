import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { productUseCase } from "../../useCases/products";
import { SuccessResponse } from "../../frameworks/common";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const deleteProduct = productUseCase.deleteProduct(dependencies);
      const response = await deleteProduct(id);
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
