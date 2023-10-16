import { Link } from "react-router-dom"
import { format } from "date-fns";
function Post(props) {

    return (
        <div className="post">

            <Link to={`/post/${props._id}`}>
                <img src={`https://awesome-blogs.vercel.app/${props.cover}`} alt="" />
            </Link>

            <div className="texts">
                <Link to={`/post/${props._id}`}>
                    <h2>{props.title}</h2>
                </Link>

                <p className="info">
                    <span className="author">{props.author.username}</span>
                    <time>{format(new Date(props.createdAt), 'd MMM, yyyy HH:mm')}</time>
                </p>
                <p className="summary">{props.summary}</p>
            </div>

        </div>
    );
}

export default Post;
