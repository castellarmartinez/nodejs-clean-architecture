import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { SuccessResponse } from "../../frameworks/common";
import { orderUseCase } from "../../useCases/orders";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const getOrderById = orderUseCase.getOrderById(dependencies);
      const response = await getOrderById(id);
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
