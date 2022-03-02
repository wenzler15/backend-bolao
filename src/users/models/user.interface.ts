export interface User {
    id?: number;
    email?: string;
    name?: string;
    favoriteTeam?: number;
    password?: string;
    createdAt?: Date;
    facebookToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}