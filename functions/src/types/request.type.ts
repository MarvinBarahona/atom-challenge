import {Request} from "express";

import {BaseResponse} from "./response.type";

export type TypedGetRequest<
    Params = void,
    ResBody = BaseResponse,
    ReqQuery = void,
> = Request<Params, ResBody, void, ReqQuery>;

export type TypedUpsertRequest<
    Params = void,
    ResBody = BaseResponse,
    ReqBody = void,
> = Request<Params, ResBody, ReqBody, void>;

export type TypedDeleteRequest<
    Params = void,
    ResBody = BaseResponse,
> = Request<Params, ResBody, void, void>;
