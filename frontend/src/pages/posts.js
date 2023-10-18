import { useEffect, useState } from "react";
import Post from "./post";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://awesome-blogs-server.vercel.app/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return <> No Posts found, Login to create one!!!</>;
    }

    return (
        <>
            {posts.map(post => (<Post key={post._id} {...post} />))}
        </>
    );
}
