import { axiosClient } from '../configuration';
import { AxiosResponse } from 'axios';
import {Comment, DisplayedImage, User} from "../../types";

export const getImageById = async (displayedImageId: string): Promise<AxiosResponse<DisplayedImage, any>> => axiosClient.get(`/image/${displayedImageId}`);
export const getAll = async (): Promise<AxiosResponse<DisplayedImage[], any>> => axiosClient.get('/image/');
export const addComment = async (comment: string, imageId: string): Promise<AxiosResponse<Comment[], any>> => axiosClient.post(`/image/comments`, { text: comment, imageId });
export const uploadImage = async (file: FormData): Promise<AxiosResponse<DisplayedImage, any>> => axiosClient.post('/image/upload', file,  {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const removePosts = async (postsIds: string[]): Promise<AxiosResponse<string, any>> => axiosClient.post('/image/remove/byIds', postsIds);
export const updatePost = async (postId: string, formData: FormData): Promise<AxiosResponse<DisplayedImage, any>> => axiosClient.post(`/image/${postId}/update`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});