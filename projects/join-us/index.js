var express = require('express');
var faker   = require('faker');
var mysql   = require('mysql');

var app = express();

/**********Connecting to Database**********/

var connection = mysql.createConnection({
  host      :'localhost',
  user      :'root',
  database  :'join_us_db'
})

/**********Generating 500 fake email and time and inserting into users table**********/

// var data = [];
// for(var i = 0; i < 500; i++){
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ]);
// }
//
// var sql = 'INSERT INTO users (email, created_at) VALUES ?';
//
// connection.query(sql, [data], function(err, result) {
//   console.log(err);
//   console.log(result);
// });
//
// connection.end();

// Connecting Express and MySQL
app.get("/", function(req, res){
 var sql = 'SELECT COUNT(*) as count FROM users';

 connection.query(sql, function (error, results) {
   if (error) throw error;
   var msg = "We have " + results[0].count + " users";
   res.send(msg);
 });
});

// Add a /joke route:
app.get("/joke", function(req, res){
 var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
 res.send(joke);
});

// Add a /random_num route:
app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.listen(8888, function () {
 console.log('App listening on port 8888!');
});
