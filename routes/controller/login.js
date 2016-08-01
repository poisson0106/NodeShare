var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./nodeTest.sqlite');
var Q = require('q');
var user_dao_f = require('../dao/user_dao');
var user_dao = new user_dao_f(db);
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192','qy');
const decipher = crypto.createDecipher('aes192', 'qy');

/* GET Login page. */
router.get('/init', function(req, res, next) {
	if(req.cookies.pswd == "" || req.cookies.pswd == null){
		console.error("The cookie file lost");
		res.render('login', { title: 'Login' });
	}
	else{
		var uname = req.cookies.uname;
		var pswd = req.cookies.pswd
		var a =user_dao.getUser(uname).then(function(rows){
			rows.forEach(function(row) {
				if(row.pswd == pswd){
      				console.log("Yes this is correct.");
      				res.render('page',{username:uname,password:pswd});
      			}
				else{
      				console.error("The password has been changed");
      				res.render('login', { title: 'Login' });
      			}
			});
		},function(error){
			console.error("The db connection loss");
			res.render('login', { title: 'Login' });
		});
	}
});

router.post('/submit', function(req,res,next){
	var uname = req.param('username');
	var pswd = req.param('password');
	pswd = decipher.update(pswd,"hex","utf-8")
	pswd += decipher.final('utf-8')

	if(global.onlineList == uname){
		var err = new Error('User has already online');
  		err.status = 500;
  		next(err);
	}
	else{
		var a =user_dao.getUser(uname).then(function(rows){
			rows.forEach(function (row) {
    			console.log("row: "+row.pswd);
    			console.log("pswd: "+pswd);
      			if(row.pswd == pswd){
      				console.log("Yes this is correct.");
      				res.render('page',{username:uname,password:pswd});
      			}
      			else{
      				console.log("No this is incorrect");
      				res.render('login', { title: 'Login' });
      			}
    		});
		},function(error){
			console.log("No this is incorrect");
      		res.render('login', { title: 'Login' });
		})
	}
});


router.post('/register',function(req,res,next) {
	var uname = req.param('username');
	var pswd = req.param('password');
	pswd = cipher.update(pswd,"utf-8","hex");
	pswd += cipher.final("hex")
	db.run("INSERT INTO USER(USERNAME,PASSWORD) VALUES($uname,$pswd)",{
		$uname:uname,
		$pswd:pswd
	});
	res.render('page',{username:uname,password:pswd});
})

module.exports = router;
