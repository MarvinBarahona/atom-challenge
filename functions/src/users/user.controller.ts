import {Request, Response} from "express";
import * as logger from "firebase-functions/logger";

import {userService} from "./user.service";
import {User, UserData} from "./models/user.model";

export const checkUserExist = async (
  req: Request<void, {
  success: boolean,
  isUserRegistered: boolean
}, void, {email: string}>,
  res: Response<{ success: boolean, isUserRegistered: boolean }>
) => {
  const userEmail = req.query.email;
  logger.info(`Searching for user with email: ${userEmail}`);

  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      isUserRegistered: users.some((user) => user.email === userEmail),
    });
  } catch (error) {
    res.status(500).send({isUserRegistered: false, success: false});
  }
};

export const createUser = async (
  req: Request<void, User, UserData>,
  res: Response<User>
) => {
  logger.info(`Creating user with email: ${req.body.email}`);

  const newDocId = await userService.createUser(req.body);

  res.json({
    ...req.body,
    id: newDocId,
  });
};
