import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { SuccessResponse } from "../../frameworks/common";
import { productUseCase } from "../../useCases/products";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const getProductById = productUseCase.getProductById(dependencies);
      const response = await getProductById(id);
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
