import * as logger from 'firebase-functions/logger';

import { userService } from './user.service';

import {
    BaseResponse,
    ErrorResponse,
    SuccessResponse,
    TypedRequest,
    TypedResponse,
} from '../types';
import {
    CheckUserRequest,
    CheckUserResponse,
    CreateUserRequest,
    CreateUserResponse,
} from './models';

export const checkUserExist = async (
    req: TypedRequest<void, BaseResponse, void, CheckUserRequest>,
    res: TypedResponse
) => {
    const userEmail = req.query.email;
    logger.info(`Searching for user with email: ${userEmail}`);

    try {
        const user = await userService.getUserByEmail(userEmail);

        const response: SuccessResponse<CheckUserResponse> = {
            success: true,
            data: {
                isUserRegistered: !!user,
                userId: user?.id,
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
    req: TypedRequest<void, BaseResponse, CreateUserRequest, void>,
    res: TypedResponse
) => {
    const userEmail = req.body.email;
    logger.info(`Creating user with email: ${userEmail}`);

    const user = await userService.getUserByEmail(userEmail);

    if (!user) {
        const newDocId = await userService.createUser(req.body);

        const response: SuccessResponse<CreateUserResponse> = {
            success: true,
            data: {
                userId: newDocId,
            },
        };

        res.json(response);
    } else {
        const response: ErrorResponse = {
            success: false,
            error: 'The email already exists',
        };
        res.status(400).send(response);
    }
};
