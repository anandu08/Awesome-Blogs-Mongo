import { useContext,useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext)
    
    async function register(event) {

        event.preventDefault();
        const response = await fetch('https://awesome-blogs-server.vercel.app/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status !== 200) {
            alert("Registration Failed Consider trying again with a different username");
        }
        else {
              response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })

            console.log("Registration Succeeded");
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
