var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.cookie('uname',null,{maxAge:0});
    res.cookie('pswd',null,{maxAge:0});
    res.render('login', { title: 'Login' });
});

module.exports = router;