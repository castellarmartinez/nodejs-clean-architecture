import { NextFunction, Request, Response } from "express";

import { OrderType } from "../../entities/Order";
import { Dependencies } from "../../dependencies";
import { userUseCase } from "../../useCases/users";
import { HttpException } from "../../frameworks/common/response";
import { isEmpty } from "lodash";

export function validateUser(dependencies: Dependencies) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { body = {} } = req;
      const { userId }: OrderType = body;

      const getUserById = userUseCase.getUserById(dependencies);
      const userNotFound = await getUserById(userId!);

      if (isEmpty(userNotFound)) {
        next();
      }

      const validationError = new HttpException(
        404,
        `No user with id ${userId}`
      );

      return next(validationError);
    } catch (error) {
      next(error);
    }
  };
}
