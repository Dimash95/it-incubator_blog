import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpResponses } from "../const";

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const formattedErrors = result.formatWith((error: any) => ({
      message: error.msg,
      field: error.param,
    }));

    return res.status(HttpResponses.BAD_REQUEST).send({
      errorsMessages: formattedErrors.array({ onlyFirstError: true }),
    });
  }

  return next();
};
