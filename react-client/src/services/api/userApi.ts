import { axiosClient } from '../configuration';
import { User } from '../../types/User';
import { AxiosResponse } from 'axios';

export const loginUser = async (userDetails: User): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/login', userDetails);
export const registerUser = async (userDetails: User): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/signin', userDetails);
export const logout = async (): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/logout');
export const updateUser = async (user: User): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/update');
export const getUser = async (): Promise<AxiosResponse<User, any>> => axiosClient.get('/user/');
export const uploadProfileImage = async (file: { file: File }): Promise<AxiosResponse<void, any>> => axiosClient.post('/user/update/image', { file });
export const getUserByUsername = async (userId: string): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/byUsername', userId);