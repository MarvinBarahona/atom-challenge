export interface CreateUserResponse {
    id: string;
}

export interface CheckUserResponse {
    isUserRegistered: boolean;
    userId?: string;
}
