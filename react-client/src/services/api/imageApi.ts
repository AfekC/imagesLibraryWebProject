import { axiosClient } from '../configuration';
import { AxiosResponse } from 'axios';
import { DisplayedImage } from "../../types";

export const getImageById = async (displayedImageId: number): Promise<AxiosResponse<DisplayedImage, any>> => axiosClient.get(`/image/${displayedImageId}`);
export const getAll = async (): Promise<AxiosResponse<DisplayedImage[], any>> => axiosClient.get('/image/');