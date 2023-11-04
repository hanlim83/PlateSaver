const express = require('express');
const { db } = require('./utils/firebase.js');
const cors = require('cors')
const app = express();
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

const vuePath = __dirname + "/frontend/dist/";

//Imports from models
const { createPost, getPosts, getPost } = require('./models/posts.js');
const { createUser, getUsers } = require('./models/users.js');
const { createRecipe, getRecipes, getRecipe, createComment, updateImage } = require('./models/recipes.js');
const { search } = require('./models/edamane.js');

app.use(express.json())
app.use(cors());
app.use(express.static(vuePath));

//Users
app.post('/user', async (req, res) => {
    // console.log("request: ", req.body);
    let response = await createUser(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
});

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

//Posts
app.post('/post', async (req, res) => {
    // console.log("request: ", req.body);
    let response = await createPost(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
})

app.get('/post/:id', async (req, res) => {
    let response = await getPost(req);
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

app.get('/posts', async (req, res) => {
    let response = await getPosts();
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

//Recipes
app.get('/recipes', async (req, res) => {
    let response = await getRecipes();
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

app.get('/recipe/:id', async (req, res) => {
    let response = await getRecipe(req);
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

app.post('/recipe', async (req, res) => {
    let response = await createRecipe(req.body);
    res.json({
        status: 200,
        message: "Success",
        data: response
    })
});
app.post('/recipe/comment', async (req, res) => {
    let response = await createComment(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
});
app.post('/recipe/image', async (req, res) => {
    let response = await updateImage(req.body);
    res.json({
        status: 200,
        message: "Success"
    })
});

// Edaman
app.get('/edamane/search', async (req, res) => {
    let response = await search(req);
    res.json({
        status: 200,
        message: "Success",
        data: response
    });
});

app.get('*', (req, res) => {
    res.sendFile(vuePath + "index.html");
});

//Keep this last
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});