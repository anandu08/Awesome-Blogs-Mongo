// eslint-disable-next-line

import './App.css';
import Layout from './Layout';
import Login from './pages/login';
import Posts from './pages/posts';
import { Route, Routes } from "react-router-dom";
import Register from './pages/register';
import PostPage from './pages/PostPage';
import { UserContext, UserContextProvider } from './UserContext';
import { LoadingProvider } from "./LoadingContext";
import CreatePost from './pages/CreatePost';
import EditPost from './pages/editPost';
function App() {
  return (

    <UserContextProvider>
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </LoadingProvider>
    </UserContextProvider>

  );
}

export default App;
