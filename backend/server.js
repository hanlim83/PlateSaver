const express = require('express');
const { db } = require('./utils/firebase.js');
const {createUser, getUsers} = require('./models/users.js');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hooray the Express server loaded!'
    });
});

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
    console.log(response);
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