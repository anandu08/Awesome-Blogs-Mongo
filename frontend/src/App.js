// eslint-disable-next-line

import './App.css';
import Layout from './Layout';
import Login from './pages/login';
import Posts from './pages/posts';
import { Route, Routes } from "react-router-dom";
import Register from './pages/register';
import { UserContext, UserContextProvider } from './UserContext';
function App() {
  return (

    <UserContextProvider>

      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Posts />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Route>

      </Routes>

    </UserContextProvider>

  );
}

export default App;
