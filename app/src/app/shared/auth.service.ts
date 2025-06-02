import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userId?: string;

    login(userId: string): void {
        this.userId = userId;
    }

    logout(): void {
        this.userId = undefined;
    }

    loggedIn(): boolean {
        return this.userId !== undefined;
    }
}
