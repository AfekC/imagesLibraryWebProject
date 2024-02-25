export interface User {
    _id: string;
    firstname?: string;
    lastname?: string;
    username: string;
    password?: string;
    image?: string;
}

export interface GoogleUserData {
    name: string;
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
}

export interface GoogleCredentials {
    clientId: string,
    credential: string
}