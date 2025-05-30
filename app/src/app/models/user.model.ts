export interface User {
    id: string;
    email: string;
}

export interface CreateUserRequest {
    email: string;
}

export type CreateUserResponse = {
    userId: string;
}

export type CheckUserResponse = {
    isUserRegistered: boolean;
    userId: string;
}
