import { SuccessResponse, ErrorResponse } from "../common";
import { Request, Response } from "express";
import { HttpException } from "../common/response";

export default (err: unknown, req: Request, res: Response) => {
  console.log("PASA");

  if (err instanceof HttpException) {
    const error = new ErrorResponse({
      status: err.status ?? 500,
      msg: err.message ?? "No message",
      reason: err.stack ?? "No reason",
      url: req.originalUrl,
      ip: req.ip,
    });

    req.statusCode = error.status;

    res.json(
      new SuccessResponse({
        status: false,
        content: null,
        error,
      })
    );
  }
};
