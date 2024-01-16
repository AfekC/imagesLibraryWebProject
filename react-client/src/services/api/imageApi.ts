import { axiosClient } from '../configuration';
import { AxiosResponse } from 'axios';
import {Comment, DisplayedImage} from "../../types";

export const getImageById = async (displayedImageId: number): Promise<AxiosResponse<DisplayedImage, any>> => axiosClient.get(`/image/${displayedImageId}`);
export const getAll = async (): Promise<AxiosResponse<DisplayedImage[], any>> => axiosClient.get('/image/');
export const addComment = async (comment: string): Promise<AxiosResponse<Comment[], any>> => axiosClient.post('/:id/comments', { text: comment })