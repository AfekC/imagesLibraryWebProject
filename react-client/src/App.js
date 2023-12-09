import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header } from './Header/header';
import { Login } from './Login/login';

function App() {
  const title = "התחברות";
  return (
    <div className="App">
      <Header title={title}/>
      <Login/>
    </div>
  );
}

export default App;
