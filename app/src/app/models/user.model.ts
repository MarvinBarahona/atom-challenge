export interface User {
    id: string;
    email: string;
}

export interface CreateUserRequest {
    email: string;
}

export interface CreateUserResponse {
    userId: string;
}

export interface CheckUserResponse {
    isUserRegistered: boolean;
    userId: string;
}
