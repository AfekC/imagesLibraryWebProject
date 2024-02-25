export interface DisplayedImage {
    _id: string;
    name: string;
    size: number;
    creator: string;
    createdAt: Date;
    comments: Comment[];
    imageRef: string;
}

export interface Comment {
    text: string;
    userId: string;
    createdAt: Date;
}