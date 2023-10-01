const { firebase } = require("../utils/firebase");

async function createUser(data) {
    // To do more error handling here
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/Users");  //Set the current directory you are working in
        ref.push(data);
        resolve("Success");
    });
}

async function getUsers() {
    return new Promise((resolve) => {
        var db = firebase.database();
        var ref = db.ref("/Users");  //Set the current directory you are working in
        ref.once("value", function (snapshot) {
            // console.log(response);
            var response = snapshot.val();
            resolve(response);
        });

    });
}

module.exports = { createUser, getUsers };