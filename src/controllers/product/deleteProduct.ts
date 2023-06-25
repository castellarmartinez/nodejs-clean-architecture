import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { userUseCase } from "../../useCases/users";
import { SuccessResponse } from "../../frameworks/common";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const deleteUser = userUseCase.deleteUser(dependencies);
      const response = await deleteUser(id);
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
