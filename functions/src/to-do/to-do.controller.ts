import * as logger from 'firebase-functions/logger';

import { toDoService } from './to-do.service';

import {
    BaseResponse,
    SuccessResponse,
    AuthRequest,
    TypedResponse,
    TypedRequest,
} from '../types';
import {
    ToDoListResponse,
    ToDoUpsertRequest,
    ToDoCreateResponse,
    ToDoItemParam,
} from './models';

export const getToDoList = async (
    req: TypedRequest<void, BaseResponse, ToDoUpsertRequest, void>,
    res: TypedResponse
) => {
    const user = (req as AuthRequest).user;
    logger.info(`Searching for to do for: ${user.email}`);

    const items = await toDoService.getToDoList(user.id);

    const response: SuccessResponse<ToDoListResponse> = {
        success: true,
        data: {
            user,
            items:
                items?.sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                ) ?? [],
        },
    };

    res.status(200).json(response);
};

export const createItem = async (
    req: TypedRequest<void, BaseResponse, ToDoUpsertRequest, void>,
    res: TypedResponse
) => {
    const user = (req as AuthRequest).user;
    logger.info(`Creating To Do Item for user with email: ${user.email}`);

    const result = await toDoService.createItem(user.id, req.body);

    const response: SuccessResponse<ToDoCreateResponse> = {
        success: true,
        data: result,
    };

    res.json(response);
};

export const updateItem = async (
    req: TypedRequest<ToDoItemParam, BaseResponse, ToDoUpsertRequest, void>,
    res: TypedResponse
) => {
    const user = (req as AuthRequest).user;
    const itemId = req.params.itemId;
    logger.info(
        `Updating To Do Item ${itemId} for user with email: ${user.email}`
    );

    const result = await toDoService.updateItem(user.id, itemId, req.body);

    if (result) {
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
};

export const deleteItem = async (
    req: TypedRequest<ToDoItemParam, BaseResponse, void, void>,
    res: TypedResponse
) => {
    const user = (req as AuthRequest).user;
    const itemId = req.params.itemId;
    logger.info(
        `Deleting To Do Item ${itemId} for user with email: ${user.email}`
    );

    const result = await toDoService.deleteItem(user.id, itemId);

    if (result) {
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
};
