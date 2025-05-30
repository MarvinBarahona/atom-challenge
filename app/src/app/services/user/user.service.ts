import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CheckUserResponse, CreateUserRequest, CreateUserResponse} from "../../models/user.model";
import {environment} from "../../../environments/environment";
import {BaseResponse} from "../../models/base.model";

@Injectable()
export class UserService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    checkUser(email: string): Observable<string | null> {
        return this.http.get<BaseResponse<CheckUserResponse>>(`${this.apiUrl}/users/check`,{ params: {
                email
            }}).pipe(
            map(res => {
                return res.data.isUserRegistered ? res.data.userId : null;
            })
        );
    }

    createUser(request: CreateUserRequest): Observable<string> {
        return this.http.post<BaseResponse<CreateUserResponse>>(`${this.apiUrl}/users`, request).pipe(
            map(res => {
                return res.data.userId
            })
        );
    }
}
