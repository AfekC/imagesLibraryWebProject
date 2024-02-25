import { axiosClient } from '../configuration';
import {GoogleUserData, User} from '../../types';
import { AxiosResponse } from 'axios';

export const loginUser = async (userDetails: User): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/login', userDetails);
export const registerUser = async (userDetails: User): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/signin', userDetails);
export const logoutUser = async (): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/logout');
export const updateUser = async (user: User): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/update', { user });
export const getUser = async (): Promise<AxiosResponse<User, any>> => axiosClient.get('/user/');
export const uploadProfileImage = async (file: FormData): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/update/image', file,  {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const getUserByUserId = async (id: string): Promise<AxiosResponse<User, any>> => axiosClient.get(`/user/id/${id}`);
export const getUserByUsername = async (userId: string): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/byUsername', userId);
export const getGoogleUserData = async (authToken: any): Promise<AxiosResponse<GoogleUserData, any>> => axiosClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authToken}`);
export const loginWithGoogle = async (googleUser: GoogleUserData):
    Promise<AxiosResponse<User, any>> => axiosClient.post('/user/auth/google', googleUser);