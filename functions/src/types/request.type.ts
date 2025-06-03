import { Request } from 'express';

import { BaseResponse } from './response.type';
import { User } from '../users/models';

export type TypedRequest<
    Params = unknown,
    ResBody = BaseResponse,
    ReqBody = unknown,
    ReqQuery = unknown,
> = Request<Params, ResBody, ReqBody, ReqQuery>;

export interface AuthRequest<
    Params = unknown,
    ResBody = BaseResponse,
    ReqBody = unknown,
    ReqQuery = unknown,
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user: User;
}
