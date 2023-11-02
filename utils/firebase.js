//Loading Firebase Package
var firebase = require("firebase");


//Can update URL
firebase.initializeApp({
  serviceAccount: "./serviceAccountKey.json",
  databaseURL: "https://is216-project-99edb-default-rtdb.asia-southeast1.firebasedatabase.app"
});  //by adding your credentials, you get authorized to read and write from the database

module.exports = {firebase};

