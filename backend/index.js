const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./mongoconnect");
const User = require("./models/user");
const bcrypt = require('bcryptjs');
const Post = require('./models/post');
require('dotenv').config();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const multer = require('multer')
const fs = require('fs')

// const uploader = multer({ dest: 'uploads/' });

var salt = bcrypt.genSaltSync(10);
var secret = process.env.SECRET_KEY;
app.use(cors({
    credentials: true,
    origin: 'https://awesome-blogs.vercel.app',
    methods: ["POST", "GET"],
}));

app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));


connectToMongo();



app.get("/test", (req, res) => {
    res.json('test ok');
})


app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.send("User Created Successfully");
    }
    catch (error) {
        res.status(400).json(error);
    }

})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {

        const UserDoc = await User.findOne({ username });

        const flag = bcrypt.compareSync(password, UserDoc.password);

        //    res.json(flag);

        if (flag) {
            jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
                if (err)
                    throw err;
                res.cookie('token', token).json({
                    id: UserDoc._id,
                    username,
                });
            })
        }
        else {
            res.status(400).json("Wrong Credentials");
        }

    }
    catch (error) {

        res.status(400).json(error);
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err)
            throw err;
        res.json(info);
    });

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');;
})


app.post('/post', (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err)
            throw err;

        const { title, summary, content } = req.body;
        try {
            const PostDoc = await Post.create({
                title: title,
                summary: summary,
                content: content,
                cover: "",
                author: info.id
            });

            res.json(PostDoc);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    });


})

app.get('/posts', async (req, res) => {

    const posts = await (Post.find().populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20));

    res.json(posts);

})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const postDoc = await Post.findById(id).populate('author', ['username']);

        res.json(postDoc);
    }
    catch (err) {
        console.log(err)
    }

})

app.put('/edit', async (req, res) => {
    let newPath = null;

    if (req.file) {

        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        if (!postDoc) {
            return res.json("No Post found ");

        }
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not the author!!!');
        }
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover;

        try {
            await postDoc.save();
            res.json(postDoc);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    });

});
app.listen(process.env.PORT || 4000, () => {
    console.log("Server started")
});