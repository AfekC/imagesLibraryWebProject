import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import {Comment, DisplayedImage} from '../types';
import { getAll, uploadImage, addComment, removePosts, updatePost } from "../services";
import { useAuth } from "./AuthContext";
import cloneDeep from 'lodash/cloneDeep';

interface MediaContextProps {
    images?: Record<string, DisplayedImage>;
    currentImage: DisplayedImage;
    addPost: (formData: FormData) => Promise<void>;
    updateComments: (text: string, imageId: string) => Promise<void>;
    setComments: (comment: Comment[], imageId: string) => void;
    updateCurrentImage: (imageId: string) => void;
    deletePosts: (postsIds: string[]) => Promise<void>
    editPost: (imageId: string, imageData: FormData) => Promise<void>;
    updateImages: () => Promise<void>;
}

const MediaContext = createContext<MediaContextProps | undefined>(undefined);

interface MediaProviderProps {
    children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
    const [images, setImages] = useState<Record<string, DisplayedImage>>({});
    const [currentImage, setCurrentImage] = useState<DisplayedImage>({} as DisplayedImage);
    const { isLogged } = useAuth();

    useEffect(() => {
        if (isLogged) {
            updateImages();
        }
    }, [isLogged]);


    const updateImages = async () => {
        try {
            const media = await getAll();
            setImages({});
            media.data.forEach((post) => {
                setImages((prevImages) => ({ ...prevImages, [post._id]: post}));
            });
        } catch (error: any) {
            console.error("cannot fetch posts");
        }
    };

    const addPost = async (formData: FormData) => {
        const { data: post } = await uploadImage(formData);
        setImages((prevImages) => ({ ...prevImages, [post._id]: post}));
    };

    const setComments = async (comments: Comment[], imageId: string) => {
        images[imageId].comments = comments;
    };

    const editPost = async (imageId: string, imageData: FormData) => {
        imageData.append("_id", imageId);
        const image = await updatePost(imageId, imageData)
        setImages((prev) => ({
            ...prev,
            [imageId]: image.data
        }));
        setCurrentImage(image.data);
    };

    const updateComments = async (text: string, imageId: string) => {
        const { data: comments } = await addComment(text, imageId);
        if (images && images[imageId]) {
            setComments(comments, imageId);
            setCurrentImage((prevImage) => ({
                ...prevImage,
                comments: comments
            }));
        }
    };

    const updateCurrentImage = (imageId: string) => {
        setCurrentImage(cloneDeep(images[imageId]));
    };

    const deletePosts = async (postsIds: string[]) => {
        await removePosts(postsIds);
        const currentImages: Record<string, DisplayedImage> = {};
        Object.values(images).forEach((post) => {
            if (!postsIds.includes(post._id)) {
                currentImages[post._id] = images[post._id];
            }
        });
        setImages(currentImages);
    }

    return (
        <MediaContext.Provider
            value={{
                images,
                currentImage,
                addPost,
                updateComments,
                setComments,
                updateCurrentImage,
                deletePosts,
                editPost,
                updateImages
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};