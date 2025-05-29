import * as logger from "firebase-functions/logger";

import {userService} from "./user.service";

import {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
  TypedGetRequest,
  TypedResponse,
  TypedUpsertRequest,
} from "../types";
import {
  CheckUserRequest,
  CheckUserResponse,
  CreateUserRequest,
  CreateUserResponse,
} from "./models";

export const checkUserExist = async (
  req: TypedGetRequest<void, BaseResponse, CheckUserRequest>,
  res: TypedResponse
) => {
  const userEmail = req.query.email;
  logger.info(`Searching for user with email: ${userEmail}`);

  try {
    const users = await userService.getAllUsers();

    const response: SuccessResponse<CheckUserResponse> = {
      success: true,
      data: {
        isUserRegistered: users.some((user) => user.email === userEmail),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    const response: ErrorResponse = {
      success: false,
      error: String(error),
    };
    res.status(500).send(response);
  }
};

export const createUser = async (
  req: TypedUpsertRequest<void, BaseResponse, CreateUserRequest>,
  res: TypedResponse
) => {
  logger.info(`Creating user with email: ${req.body.email}`);

  const newDocId = await userService.createUser(req.body);

  const response: SuccessResponse<CreateUserResponse> = {
    success: true,
    data: {
      id: newDocId,
    },
  };

  res.json(response);
};
