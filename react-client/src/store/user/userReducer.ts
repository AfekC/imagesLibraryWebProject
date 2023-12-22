import { User } from '../../types/User';
import { userState } from './state';
import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../services/api/userApi'

export const chatSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateCurrentUser: (state, { payload: user } : { payload: User }): void =>  {
      state.user = user;
      localStorage.setItem('username', user.username);
      localStorage.setItem('password', user.password);
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

// Action creators are generated for each case reducer function
export const { updateCurrentUser, logOutCurrentUser } = chatSlice.actions

export default chatSlice.reducer;
