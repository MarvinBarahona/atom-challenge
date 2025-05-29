import {Request} from "express";

import {TypedResponse} from "./response.type";

export type TypedGetRequest<
    Params = void,
    ResBody = TypedResponse,
    ReqQuery = void,
> = Request<Params, ResBody, void, ReqQuery>;

export type TypedUpsertRequest<
    Params = void,
    ResBody = TypedResponse,
    ReqBody = void,
> = Request<Params, ResBody, ReqBody, void>;

export type TypedDeleteRequest<
    Params = void,
    ResBody = TypedResponse,
> = Request<Params, ResBody, void, void>;
