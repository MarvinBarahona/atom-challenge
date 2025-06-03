import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../models/base.model';
import {
    ToDoUpsertRequest,
    ToDoListResponse,
    ToDoItem,
} from '../../models/to-do.model';

@Injectable()
export class ToDoService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getToDoList(): Observable<ToDoListResponse> {
        return this.http
            .get<BaseResponse<ToDoListResponse>>(`${this.apiUrl}/to-do`)
            .pipe(
                map((res) => {
                    return res.data;
                })
            );
    }

    createToDoItem(request: ToDoUpsertRequest): Observable<string> {
        return this.http
            .post<BaseResponse<ToDoItem>>(`${this.apiUrl}/to-do`, request)
            .pipe(map((res) => res.data.id));
    }

    updateToDoItem(
        itemId: string,
        request: ToDoUpsertRequest
    ): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/to-do/${itemId}`, request);
    }

    deleteToDoItem(itemId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/to-do/${itemId}`);
    }
}
