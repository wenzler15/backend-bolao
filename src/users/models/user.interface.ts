/* eslint-disable prettier/prettier */
export interface User {
    id?: number;
    email?: string;
    name?: string;
    favoriteTeam?: string;
    password?: string;
    createdAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
