/* eslint-disable prettier/prettier */
export interface User {
    id?: number;
    email?: string;
    name?: string;
    pix?: string;
    bankName?: string;
    position?: number;
    agencyNumber?: string;
    accountNumber?: string;
    accountType?: string;
    lastName?: string;
    codeArea?: string;
    phone?: string;
    cpf?: string;
    zipCode?: string;
    streetName?: string;
    houseNumber?: number;
    favoriteTeam?: number;
    password?: string;
    points?: number;
    createdAt?: Date;
    facebookToken?: string;
    googleToken?: string;
    winsNumberLeftOne?: number;
    winsNumber?: number;
    profileUrl?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
