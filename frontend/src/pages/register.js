import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { LoadingContext } from "../LoadingContext";
export default function Register() {

    const { setLoading } = useContext(LoadingContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext)

    async function register(event) {

        event.preventDefault();
        setLoading(true)
        const response = await fetch('https://awesome-blogs-server.vercel.app/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        setLoading(false)
        if (response.status !== 200) {
            alert("Registration Failed Consider trying with a different username");
        }
        else if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }
        else {
            console.log(response);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (


        <form action="" className="register" onSubmit={register}>
            <input type="text" value={username} placeholder="username" onChange={event => { setUsername(event.target.value) }} />
            <input type="password" value={password} placeholder="password" onChange={event => { setPassword(event.target.value) }} />
            <button >Register</button>
        </form>
    );
}