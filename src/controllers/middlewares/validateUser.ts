import { NextFunction, Request, Response } from "express";

import { OrderType } from "../../entities/Order";
import { ValidationError } from "../../frameworks/common";
import { Dependencies } from "../../dependencies";
import { userUseCase } from "../../useCases/users";

export default function (dependencies: Dependencies) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const getUserById = userUseCase.getUserById(dependencies);

      const { body = {} } = req;
      const { userId }: OrderType = body;
      const userNotFound = await getUserById(userId!);

      if (!userNotFound) {
        const validationError = new ValidationError({
          field: "userId",
          msg: `No user with id ${userId}`,
        });

        next(validationError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
