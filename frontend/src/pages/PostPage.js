import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../UserContext";


export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://awesome-blogs-server.vercel.app/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);

                })
            })

    }, [])

    if (!postInfo)
        return '';
    return (

        <div className="post-page">
            <h1>{postInfo.title} </h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author"> by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">

                    <Link to={`/edit/${postInfo._id}`} className="edit-btn" href=""> <i class="fa-solid fa-pen-to-square svg"></i> Edit this Post</Link>

                </div>
            )}
            <div className="image">

                <img src={`https://awesome-blogs-server.vercel.app/${postInfo.cover}`} alt="" />
            </div>


            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

        </div>
    )
}