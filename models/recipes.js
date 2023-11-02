const { firebase } = require("../utils/firebase");

async function createRecipe(data) {
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/recipes");  //Set the current directory you are working in
        ref.push(data);
        resolve("Success");
    });
}

async function getRecipes() {
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/recipes");  //Set the current directory you are working in
        ref.once("value", function (snapshot) {
            var response = snapshot.val();
            resolve(response);
        });

    });
}

async function getRecipe(req) {
    let recipeId = req.params.id;
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/recipes/" + recipeId);  //Set the current directory you are working in        
        ref.once("value", function (snapshot) {
            var response = snapshot.val();
            resolve(response);
        });

    });
}

async function createComment(data){
    let recipeId = data.recipeId;
    let comment = data.comment;
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/recipes/" + recipeId + "/comments");  //Set the current directory you are working in
        ref.push(comment);
        resolve("Success");
    });

}

module.exports = { createRecipe, getRecipes, getRecipe, createComment};