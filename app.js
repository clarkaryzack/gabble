const express = require('express');
const app = express()
const models = require('./models');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');

const mustacheExpress = require('mustache-express');
const routes = require('./routes');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(routes);

// app.listen(3000, function() {
// 	console.log('Example app listening on port 3000!')
// });

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
Add Comment




// const user = models.user.build({
// 	username: "clarkaryzack",
// 	password: "zackspassword",
// 	displayname: "Zack",
// })

// const user = models.user.build({
// 	username: "merrparr",
// 	password: "merrickspassword",
// 	displayname: "Merrick",
// })

// const user = models.user.build({
// 	username: "woody",
// 	password: "tylerspassword",
// 	displayname: "Tyler",
// })

//delete the user
// models.user.destroy({
// 	where: {
// 		id: "2"
// 	}
// }).then(function(users){
//
// })

// fetch all users
// models.user.findAll().then(function(users){
// 	console.log(users)
// })

//fetch by ID
// models.user.findById(1).then(function(user){
// 	console.log(user)
// })

//fetch a particular user
// models.user.findOne({
// 	where: {
// 		username: "clarkaryzack"
// 	}
// }).then(function(user){
// 	console.log(user)
// })

// saving a new user
// user.save().then(function(newUser){
// 	console.log(newUser)
// })

//plain find one method with no filter
// models.user.findOne().then(function(user){
// 	console.log(user)
// })

// const post = models.post.build({
// 	title: "Zack's Post",
// 	body: "Hello, world!",
// 	userId: 1,
// })
//
// post.save().then(function(newPost){
// 	console.log(newPost)
// })
