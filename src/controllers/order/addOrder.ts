import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { SuccessResponse } from "../../frameworks/common";
import { orderUseCase } from "../../useCases/orders";
import { OrderType } from "../../entities/Order";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body = {} } = req;
      const { id, userId, productsId, date, isPayed, meta }: OrderType = body;

      const addOrder = orderUseCase.addOrder(dependencies);
      const response = await addOrder({
        id,
        userId,
        productsId,
        date,
        isPayed,
        meta,
      });
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
