/* eslint-disable prettier/prettier */
export interface User {
    id?: number;
    email?: string;
    name?: string;
    pix?: string;
    cpf?: string;
    bankName?: string;
    agencyNumber?: string;
    accountNumber?: string;
    accountType?: string;
    favoriteTeam?: number;
    password?: string;
    createdAt?: Date;
    facebookToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
