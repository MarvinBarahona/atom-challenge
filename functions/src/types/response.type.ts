import { Response } from 'express';

export type BaseResponse = {
    success: boolean;
};

export type SuccessResponse<T> = BaseResponse & {
    success: true;
    data: T;
};

export type ErrorResponse = BaseResponse & {
    success: false;
    error: string;
};

export type TypedResponse = Response<BaseResponse>;
