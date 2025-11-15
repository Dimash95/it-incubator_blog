import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpResponses } from "../const";

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith((error) => ({
    message: error.msg,
    type: error.type,
  }));

  if (!errors.isEmpty()) {
    return res.status(HttpResponses.BAD_REQUEST).send({
      errorsMessages: errors.array(),
    });
  }

  return next();
};
