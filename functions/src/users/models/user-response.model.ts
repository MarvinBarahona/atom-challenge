export type CreateUserResponse = {
    userId: string;
};

export type CheckUserResponse = {
    isUserRegistered: boolean;
    userId?: string;
};
