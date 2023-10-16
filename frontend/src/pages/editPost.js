import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from 'react-router-dom';
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
export default function EditPost() {


    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {


        fetch('https://awesome-blogs.vercel.app/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])

    async function edit(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);

        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('https://awesome-blogs.vercel.app/edit', {
            method: 'PUT',
            body: data,
            credentials: 'include',

        });

        if (response.ok)
            setRedirect(true);

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