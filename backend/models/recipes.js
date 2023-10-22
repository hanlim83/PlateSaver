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

module.exports = { createRecipe, getRecipes };