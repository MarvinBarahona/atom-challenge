import {Router as expressRouter} from "express";
import {checkUserExist, createUser} from "./user.controller";
import {validateBody, validateQuery} from "../middlewares/validate";
import {checkUserQuerySchema, createUserBodySchema} from "./user.validators";
import {BaseResponse} from "../types";
import {CheckUserRequest, CreateUserRequest} from "./models";

const router = expressRouter();

router.get(
  "/check",
  validateQuery<void, BaseResponse, CheckUserRequest>(checkUserQuerySchema),
  checkUserExist
);
router.post("/",
  validateBody<void, BaseResponse, CreateUserRequest>(createUserBodySchema),
  createUser
);

export default router;
