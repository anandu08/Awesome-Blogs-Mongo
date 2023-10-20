import { useState, useEffect,useContext } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from 'react-router-dom';
import { LoadingContext } from "../LoadingContext";
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
]
export default function EditPost() {

    const { setLoading } = useContext(LoadingContext);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {


        fetch('https://awesome-blogs-server.vercel.app/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])

    async function edit(ev) {
        setLoading(true)
        ev.preventDefault();
        const data = {
            id: id,
            title: title,
            summary: summary,
            content: content,
            cover: null,
        };
        let image_url = null;

        if (files?.[0]) {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('upload_preset', 'Awesome-blogs');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dytmgavdk/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const cloudinaryData = await response.json();
            image_url = cloudinaryData.secure_url;
        }
        data['cover'] = image_url;

        const response = await fetch('https://awesome-blogs-server.vercel.app/edit', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setLoading(false)
        if (response.ok) {
            setRedirect(true);
        }
        else
        return (<>Some error occured please retry</>)
    }


    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <form onSubmit={edit}>
            <input type='title' placeholder={'Title'}
                value={title}
                onChange={event => { setTitle(event.target.value) }} />

            <input type='summary' placeholder={'Summary'}

                value={summary}
                onChange={event => { setSummary(event.target.value) }} />

            <input type='file'
                onChange={ev => { setFile(ev.target.files) }} />

            <ReactQuill value={content} modules={modules} formats={formats}
                onChange={newVal => { setContent(newVal) }} />

            <button style={{ marginTop: '5px' }}>Update Post</button>
        </form>
    );


}