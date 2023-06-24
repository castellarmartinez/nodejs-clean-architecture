import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../dependencies";
import { userUseCase } from "../../useCases/users";
import { SuccessResponse } from "../../frameworks/common";
import { UserType } from "../../entities/User";

export default function (dependencies: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body = {} } = req;
      const { id, name, lastName, gender, meta }: UserType = body;

      const deleteUser = userUseCase.deleteUser(dependencies);
      const response = await deleteUser({ id, name, lastName, gender, meta });
      res.json(new SuccessResponse({ status: true, content: response }));

      next();
    } catch (error) {
      next(error);
    }
  };
}
