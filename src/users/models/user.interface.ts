/* eslint-disable prettier/prettier */
export interface User {
    id?: number;
    email?: string;
    name?: string;
    lastName?: string;
    codeArea?: number;
    phone?: number;
    cpf?: number;
    zipCode?: string;
    streetName?: string;
    houseNumber?: number;
    favoriteTeam?: number;
    password?: string;
    points?: number;
    createdAt?: Date;
    facebookToken?: string;
    googleToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
