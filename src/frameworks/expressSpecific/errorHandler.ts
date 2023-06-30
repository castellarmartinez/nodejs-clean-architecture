import { SuccessResponse, ErrorResponse } from "../common";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/response";
import { Constants } from "../../constants";

export default (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  let error: ErrorResponse;

  if (err instanceof HttpException) {
    error = new ErrorResponse({
      status: err.status,
      msg: err.message,
      reason: err.stack ?? "No reason reported",
      url: req.originalUrl,
      ip: req.ip,
    });
  } else {
    error = new ErrorResponse({
      status: Constants.httpErrors.INTERNAL_ERROR.httpCode,
      msg: Constants.httpErrors.INTERNAL_ERROR.code,
      reason: Constants.httpErrors.INTERNAL_ERROR.message,
      url: req.originalUrl,
      ip: req.ip,
    });
  }

  res.status(error.status);
  res.json(
    new SuccessResponse({
      status: false,
      content: null,
      error,
    })
  );
};
