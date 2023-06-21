import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { userUseCase } from "../../useCases/users";
import { SuccessResponse } from "../../frameworks/common";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body = {} } = req;
      const { id }: { id: string } = body;

      const getUserById = userUseCase.getUserById(dependencies);
      const response = await getUserById(id);
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
