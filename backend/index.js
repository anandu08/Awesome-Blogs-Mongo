const express = require("express");
const app = express();
const cors = require("cors");
const connectToMongo = require("./mongoconnect");
const User = require("./models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

var salt = bcrypt.genSaltSync(10);
var secret = "somerandomdfsfjalfdlfjl";
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
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
app.listen(4000, () => {
    console.log("Server started at port 4000")
});