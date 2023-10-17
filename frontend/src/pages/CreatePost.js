import { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'




const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]
export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNew(event) {
        event.preventDefault();

        const data = {
            title: title,
            summary: summary,
            content: content,
            cover: "",
        };
        let image_url = "";
        if (files && files.length > 0) {
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
            image_url = cloudinaryData.secure_url

        }
        data['cover'] = image_url;
        console.log(data);
        const response = await fetch('https://awesome-blogs-server.vercel.app/post', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });



        if (response.ok) {
            setRedirect(true);
        }
    }


    if (redirect) {
        return (<Navigate to={'/'}></Navigate>)
    }
    return (
        <form onSubmit={createNew}>
            <input type='title' placeholder={'Title'}
                value={title}
                onChange={event => { setTitle(event.target.value) }} />

            <input type='summary' placeholder={'Summary'}

                value={summary}
                onChange={event => { setSummary(event.target.value) }} />

            <input type='file' name='file'
                onChange={ev => { setFile(ev.target.files) }} />

            <ReactQuill value={content} modules={modules} formats={formats}
                onChange={newVal => { setContent(newVal) }} />

            <button style={{ marginTop: '5px' }}> Create Post</button>
        </form>
    );
}

