import { useEffect, useState, useContext } from "react";
import Post from "./post";
import { LoadingContext } from "../LoadingContext";

export default function Posts() {
    const { setLoading } = useContext(LoadingContext);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        setLoading(true);
        fetch('https://awesome-blogs-server.vercel.app/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                setPosts(posts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Make sure to set loading to false in case of an error
            });
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