import { useEffect, useState } from "react";
import Post from "./post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        fetch('https://awesome-blogs-server.vercel.app/posts').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, []);

    if (posts.length == 0)
        return (<> No Posts found, Login to create one!!!</>)
    return (
        <>
            {
                posts.length > 0 && posts.map(post => (<Post {...post} />))
            }

        </>


    );

}