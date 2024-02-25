import { User } from "../../types/User";
import {DisplayedImage} from "../../types";

export const userState = {
    user: {},
    images: {}
} as { user: User,images: Record<string, DisplayedImage> };