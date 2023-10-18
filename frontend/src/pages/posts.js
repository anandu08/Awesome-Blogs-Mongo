import { useEffect, useState } from "react";
import Post from "./post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://awesome-blogs-server.vercel.app/posts').then(response => {
            response.json().then(posts => {
                setPosts(posts);
                setLoading(false); // Set loading to false after fetch is complete
            })
        })
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    if (posts.length === 0) {
        return <>No Posts found, Login to create one!!!</>;
    }

    return (
        <>
            {posts.map(post => (<Post key={post._id} {...post} />))}
        </>
    );
}
