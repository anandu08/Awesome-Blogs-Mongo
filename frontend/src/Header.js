import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
        try  {
            const response = await  fetch('https://awesome-blogs-server.vercel.app/profile', {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const userInfoData = await response.json();
            
            setUserInfo(userInfoData.username);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    fetchData();
}, []);


  function logout() {

    fetch('https://awesome-blogs-server.vercel.app/logout', {
      method: "POST",

    });
    setUserInfo(null);
    setLoading(false);
  }
let username = "";
  if(loading===false)
 {  username = userInfo?.username;

}
if(!loading)
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
