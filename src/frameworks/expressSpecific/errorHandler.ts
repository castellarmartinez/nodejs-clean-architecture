import { SuccessResponse, ErrorResponse } from "../common";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../common/response";

export default (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpException) {
    const error = new ErrorResponse({
      status: err.status ?? 500,
      msg: err.message ?? "No message",
      reason: err.stack ?? "No reason",
      url: req.originalUrl,
      ip: req.ip,
    });

    res.status(error.status);
    res.json(
      new SuccessResponse({
        status: false,
        content: null,
        error,
      })
    );
  } else {
    res.json({Hola: "Mundo"});
  }
};
