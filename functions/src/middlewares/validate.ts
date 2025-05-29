import {NextFunction} from "express";
import {ZodSchema} from "zod";
import {
  BaseResponse,
  ErrorResponse,
  TypedGetRequest,
  TypedResponse,
  TypedUpsertRequest,
} from "../types";

export const validateBody = <
    Params = void,
    ResBody = BaseResponse,
    ReqBody = void
>(schema: ZodSchema) =>
    (
      req: TypedUpsertRequest<Params, ResBody, ReqBody>,
      res: TypedResponse, next: NextFunction
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

export const validateQuery = <
    Params = void,
    ResBody = BaseResponse,
    ReqQuery = void
>(schema: ZodSchema) =>
    (
      req: TypedGetRequest<Params, ResBody, ReqQuery>,
      res: TypedResponse, next: NextFunction
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
