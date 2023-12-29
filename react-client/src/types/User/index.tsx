export interface User {
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    token?: string;
    email?: string;
    image?: File;
}