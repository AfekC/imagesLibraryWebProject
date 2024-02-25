import { User, Comment } from '../../types';
import { userState } from './state';
import { createSlice } from '@reduxjs/toolkit'
import {DisplayedImage} from "../../types";

export const chatSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateCurrentUser: (state, { payload: user } : { payload: User }): void =>  {
      state.user = user;
    },
    updateImages: (state, { payload: images } : { payload: Record<string, DisplayedImage> }): void =>  {
      state.images = images;
    },
    addCommentToImage: (state, { payload: { imageId, comment } } : { payload: { imageId: string, comment: Comment} }): void =>  {
      // Create a new comments array to avoid direct mutation
      const newComments = state.images[imageId]?.comments
          ? [...state.images[imageId].comments, comment]
          : [comment];

      // Update the state using immer, which automatically creates a new draft
      state.images[imageId] = {
        ...state.images[imageId],
        comments: newComments,
      };
    },
    addImage: (state, { payload: image } : { payload: DisplayedImage }): void =>  {
      console.log('Adding image:', image);
      state.images = { ...state.images, [image._id]: image};
    },
    updateCurrentUserImage: (state, { payload: image } : { payload: string }): void =>  {
      state.user.image = image;
    },
    logOutCurrentUser: (state): void =>  {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      state.user = {
        _id: '',
        username: '',
        password: ''
      };
    }
  }
})

export const { updateCurrentUser, logOutCurrentUser, updateCurrentUserImage, updateImages, addImage, addCommentToImage } = chatSlice.actions
export default chatSlice.reducer;
