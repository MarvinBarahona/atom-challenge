import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userId?: string;

    constructor() {
        this.userId = localStorage.getItem('userId') ?? undefined;
    }

    login(userId: string): void {
        this.userId = userId;
        localStorage.setItem('userId', this.userId);
    }

    logout(): void {
        this.userId = undefined;
        localStorage.removeItem('userId');
    }

    loggedIn(): boolean {
        return this.userId !== undefined;
    }
}
