var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./nodeTest.sqlite');

/* GET Login page. */
router.get('/init', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/submit', function(req,res,next){
	var uname = req.param('username');
	var pswd = req.param('password');

	if(global.onlineList == uname){
		var err = new Error('User has already online');
  		err.status = 500;
  		next(err);
	}
	else{
		db.all("SELECT PASSWORD AS pswd FROM USER WHERE USERNAME=?", uname, function(err, rows) {
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
		});
	}
});

router.post('/register',function(req,res,next) {
	var uname = req.param('username');
	var pswd = req.param('password');
	db.run("INSERT INTO USER(USERNAME,PASSWORD) VALUES($uname,$pswd)",{
		$uname:uname,
		$pswd:pswd
	});
	res.render('page',{username:uname,password:pswd});
})

module.exports = router;
