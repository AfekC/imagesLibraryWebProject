import { User } from '../../types/User';
import { userState } from './state';
import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateCurrentUser: (state, { payload: user } : { payload: User }): void =>  {
      state.user = user;
      localStorage.setItem('username', user.username);
      if (user.password) {
        localStorage.setItem('password', user.password);
      }
    },
    logOutCurrentUser: (state): void =>  {
      state.user = {
        username: '',
        password: ''
      };
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
    }
  }
})

export const { updateCurrentUser, logOutCurrentUser } = chatSlice.actions
export default chatSlice.reducer;
