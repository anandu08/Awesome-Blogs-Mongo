import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    async function register(event) {

        event.preventDefault();
        const response = await fetch('https://awesome-blogs-server.vercel.app/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status !== 200) {
            alert("Registration Failed Consider registering with a different username");
        }
        else {
            alert("Registration Succeeded you may Login now")
            console.log("Registration Succeeded");
        }
    }
    return (


        <form action="" className="register" onSubmit={register}>
            <input type="text" value={username} placeholder="username" onChange={event => { setUsername(event.target.value) }} />
            <input type="password" value={password} placeholder="password" onChange={event => { setPassword(event.target.value) }} />
            <button >Register</button>
        </form>
    );
}
