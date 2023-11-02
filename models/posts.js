const { firebase } = require("../utils/firebase");

async function createPost(data) {
    // To do more error handling here
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/Posts");  //Set the current directory you are working in
        ref.push(data);
        resolve("Success");
    });
}

async function getPosts() {
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/Posts");  //Set the current directory you are working in
        ref.once("value", function (snapshot) {
            var response = snapshot.val();
            resolve(response);
        });

    });
}

async function getPost(req) {
    let postId = req.params.id;
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/Posts/" + postId);  //Set the current directory you are working in        
        ref.once("value", function (snapshot) {
            var response = snapshot.val();
            resolve(response);
        });

    });
}

module.exports = { createPost, getPosts };