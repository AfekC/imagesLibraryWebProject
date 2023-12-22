import { axiosClient } from '../configuration';
import { User } from '../../types/User';
import { AxiosResponse } from 'axios';

export const loginUser = async (userDetails: User): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/login');
export const registerUser = async (userDetails: User): Promise<AxiosResponse<User, any>> => axiosClient.post('/user/register');