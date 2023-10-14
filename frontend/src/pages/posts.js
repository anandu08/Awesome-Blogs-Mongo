import { useEffect, useState } from "react";
import Post from "../post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        fetch('http://localhost:4000/posts').then(response => {
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