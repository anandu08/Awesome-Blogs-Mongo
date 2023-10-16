import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('https://awesome-blogs-server.vercel.app/profile', {
      credentials: 'include',

    }).then(response => {
      response.json().then(userInfo => {

        setUserInfo(userInfo.username);
      })
    })
  }, []);

  function logout() {

    fetch('https://awesome-blogs-server.vercel.app/logout', {
      method: "POST",

    });
    setUserInfo(null);
  }
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className='logo'> Awesome Blogs</Link>

      <nav>
        {username &&

          <>

            <Link to="/create"> Create a post</Link>
            <a onClick={logout}>Logout</a>

          </>
        }
        {
          !username &&
          <>
            <Link to="login">Login</Link>
            <Link to="register">Register</Link>
          </>
        }





      </nav>
    </header>)
}

export default Header;