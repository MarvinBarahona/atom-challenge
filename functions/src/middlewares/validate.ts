import {NextFunction} from "express";
import {ZodSchema} from "zod";
import {
  ErrorResponse,
  TypedRequest,
  TypedResponse,
} from "../types";

export const validateBody = (schema: ZodSchema) =>
  (
    req: TypedRequest,
    res: TypedResponse,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const response: ErrorResponse = {
        success: false,
        error: "Validation errors!",
      };
      res.status(400).json(response);
      return;
    }
    req.body = result.data;
    next();
  };

export const validateQuery = (schema: ZodSchema) =>
  (
    req: TypedRequest,
    res: TypedResponse,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const response: ErrorResponse = {
        success: false,
        error: "Validation errors!",
      };
      res.status(400).json(response);
      return;
    }
    req.query = result.data;
    next();
  };
