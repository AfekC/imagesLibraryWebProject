import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    RouterProvider,
} from "react-router-dom";
import { Header } from './components/Header/header'
import { router } from "./router";
import { useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './services';
import { updateCurrentUser } from './store/user/userReducer';
import { AxiosResponse } from 'axios';
import { User } from './types';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    getUser().then((user: AxiosResponse<User, any>) => {
      dispatch(updateCurrentUser(user.data));
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;