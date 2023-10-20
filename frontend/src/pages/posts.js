import { useEffect, useState, useContext } from "react";
import Post from "./post";
import { LoadingContext } from "../LoadingContext";

export default function Posts() {
    const { setLoading } = useContext(LoadingContext);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        setLoading(true);
        fetch('https://awesome-blogs-server.vercel.app/posts').then(response => {
            response.json().then(posts => {
                setPosts(posts);
                setLoading(false)

            })
        })
    }, []);


    if (posts.length === 0) {
        return <>No Posts found, Login to create one!!!</>;
    }

    return (
        <>
            {posts.map(post => (<Post key={post._id} {...post} />))}
        </>
    );
}