var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {

if(req.session.user_logged_in){
  res.sendFile(path.join(__dirname + '../../public/html/Home.html'));
}
else{
  res.end('You are not authorized to view this page!');
}
});

module.exports = router;