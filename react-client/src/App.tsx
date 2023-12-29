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

function App() {
  return (
    <div className="App">
      <Header/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;