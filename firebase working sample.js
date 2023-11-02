//Loading Firebase Package
var firebase = require("firebase");

/**
* Update your Firebase Project
* Credentials and Firebase Database
* URL
*/
firebase.initializeApp({
  serviceAccount: "./serviceAccountKey.json",
  databaseURL: "https://is216-project-99edb-default-rtdb.asia-southeast1.firebasedatabase.app"
});  //by adding your credentials, you get authorized to read and write from the database


/**
* Loading Firebase Database and refering 
* to user_data Object from the Database
*/
var db = firebase.database();
var ref = db.ref("/user_data");  //Set the current directory you are working in

/**
* Setting Data Object Value
*/
ref.set([
{
    id:20,
    name:"Jane Doe",
    email:"jane@doe.com",
    website:"https://jane.foo.bar"
},
{
    id:21,
    name:"John doe",
    email:"john@doe.com",
    website:"https://foo.bar"
}
]);

/**
* Pushing New Value
* in the Database Object
*/
ref.push({
    id:22,
    name:"Jane Doe",
    email:"jane@doe.com",
    website:"https://jane.foo.bar"
});

/**
* Reading Value from
* Firebase Data Object
*/
ref.once("value", function(snapshot) {
  var data = snapshot.val();   //Data is in JSON format.
  console.log(data);
});
