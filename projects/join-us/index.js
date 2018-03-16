var express      = require('express');
var faker        = require('faker');
var mysql        = require('mysql');
var bodyParser   = require('body-parser');
var livereload   = require('express-livereload');

var app = express();
livereload(app, config={});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/js"));

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
   var count = results[0].count;
   var msg = "We have " + count + " users";
   // res.send(msg);
   res.render("home", {data: count});
 });
});

// The '/register' post route: (Connecting the Form)
app.post('/register', function(req,res){
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
   console.log(err);
   console.log(result);
   res.redirect("/");
 });
});

// Add a /random_num route:
app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.listen(8888, function () {
 console.log('App listening on port 8888!');
});
