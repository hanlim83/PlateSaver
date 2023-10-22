const express = require('express');
const { db } = require('./utils/firebase.js');
const cors = require('cors')
const app = express();
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

const vuePath = __dirname + "/../frontend/dist/";

const {createUser, getUsers} = require('./models/users.js');
const {createPost, getPosts} = require('./models/posts.js');

app.use(express.json())
app.use(cors());
app.use(express.static(vuePath));


app.get('/', (req, res) => {
    res.sendFile(vuePath + "index.html");
});

//Users
app.post('/user', async (req, res) => {
    // console.log("request: ", req.body);
    let response = await createUser(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
})

app.get('/users', async (req, res) => {
    let response = await getUsers();
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

//Posts
app.post('/post', async (req, res) => {
    // console.log("request: ", req.body);
    let response = await createPost(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
})

app.get('/posts', async (req, res) => {
    let response = await getPosts();
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});