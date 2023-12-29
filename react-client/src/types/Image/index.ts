import {User} from "../User";

export interface DisplayedImage {
    name: string;
    size: number;
    creator: User;
    createdAt: Date;
    comments: Comment[];
    imageRef: string;
}

export interface Comment {
    comment: string;
    userId: string;
    createdAt: Date;
}