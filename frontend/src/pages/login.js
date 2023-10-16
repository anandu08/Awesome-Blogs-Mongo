import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext)
    async function loginBackend(ev) {
        ev.preventDefault();

        const response = await fetch('https://awesome-blogs.vercel.app/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })

        }
        else {
            alert("Wrong Credentials");
        }

    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (


        <form action="" className="login" onSubmit={loginBackend}>
            <input type="text" placeholder="username"
                value={username}
                onChange={event => { setUsername(event.target.value) }} />
            <input type="password" placeholder="password"
                value={password}
                onChange={event => { setPassword(event.target.value) }} />
            <button>Login</button>
        </form>
    );
}