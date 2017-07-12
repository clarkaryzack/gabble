const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');

router.get('/', function(req, res){
		if (req.session && req.session.authenticated) {
			models.post.findAll({
				include: [{
					model: models.user,
					as: 'userALIAS'
				}]
			}).then(function(posts){
				function compare(a,b) {
					if (a.id > b.id)
		      	return -1;
		  		if (a.id < b.id)
		        return 1;
		    }
		    posts = posts.sort(compare);
				res.render('index', {posts: posts})
			})
		} else {
				res.redirect('/login');
				}
});

router.post('/login', function(req, res){
	models.user.findOne({
				where: {
					username: req.body.username,
				}
			}
		).then(function(user){
		    if (req.body.username === user.username && req.body.password === user.password)
				{
		      req.session.authenticated = true;
		      console.log('User & Password Authenticated');
		    } else {
		      return false;
		    };
  if (req.session && req.session.authenticated){
		req.session.userId = user.id;
		console.log("redirecting to main")
    res.redirect('/');
  } else {
		console.log("redirecting back to login")
    res.redirect('login');
  }
		// })
})});

// router.get('/', function (req, res) {
// 	console.log("In router.get, req.body.username =" +req.body.username)
//   authenticate(req, req.body.username, req.body.password);
// 	if (req.session && req.session.authenticated) {
// 		models.post.findAll({
// 			include: [{
// 				model: models.user,
// 				as: 'userALIAS'
// 			}]
// 		}).then(function(posts){
// 			function compare(a,b) {
// 				if (a.id > b.id)
// 	      	return -1;
// 	  		if (a.id < b.id)
// 	        return 1;
// 	    }
// 	    posts = posts.sort(compare);
// 			console.log(posts)
// 			res.render('index', {posts: posts})
// 		})
// 	} else {
// 			res.redirect('/login');
// 			}
// 	});

//this worked?
// function authenticate(req, username, password){
//   var authenticatedUser =
// 		models.user.findOne({
// 			where: {
// 				username: username,
// 			}
// 		}
// 	).then(function(user){
// 	    if (username === user.username && password === user.password)
// 			{
// 	      req.session.authenticated = true;
// 	      console.log('User & Password Authenticated');
// 	    } else {
// 	      return false;
// 	    }
// 		})
//   return req.session;
// 	next();
// };

router.get('/login', function (req, res) {
		res.render('login');
	});

router.post('/post', function (req, res){
	if (req.body.newPost === "") {
		res.redirect('/')
	};
	// console.log(models.posts.length)
	const post = models.post.build({
			body: req.body.newPost,
			userId: req.session.userId
		});
	post.save().then(function(postnow){
		res.redirect('/');
	});
});

router.post('/like', function (req, res){
	console.log("liking now"),
	console.log(req.body.likebuttonid);
	const like = models.like.build({
		postId: req.body.likebuttonid,
		userId: req.session.userId
	})
	like.save().then(function(likenow){
		res.redirect('/');
	})
});

router.post('/delete', function (req, res){
	console.log('deleting');
	console.log(req.body);
	console.log(req.body.deletebuttonid);
	models.post.destroy({
		where: {
			id: req.body.deletebuttonid
		}
	}).then(function(postnow){
		res.redirect('/');
	})
})

module.exports = router;
