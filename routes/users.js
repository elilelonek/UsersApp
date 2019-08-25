var express = require('express');
var router = express.Router();
var httpresponse = require('../moduls/HttpResponse')

count = 0;
countforAuth = 0;

users = [
    { name: "Eli", age: 33, id: count++, phone: "0526670100" },
    { name: "Saar", age: 38, id: count++, phone: "0525005001" },
    { name: "Tomer", age: 22, id: count++, phone: "0526006001" }
];

usersAuth = [];

/* GET users listing. */
router.get('/', function (req, res, next) {

    var response = new httpresponse();

    if (req.session.user_logged_in) {

        response.data = users;
    } else {
        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You Are Not Allowed To Run This Function!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }

    res.json(response);
});

router.delete('/', function (req, res, next) {

    var response = new httpresponse();

    if (req.session.user_logged_in) {
        response.message = "Users List"
    } else {
        response.success = false;
        response.message = "You Are Not Allowed To Run This Function!"
    }

    res.json(response);
});

router.put('/addUser', function (req, res, next) {

    var response = new httpresponse();

    var user_name = req.body.user;
    var user_pass = req.body.password;

    req.session.user_logged_in = checkUserData()

    if (req.session.user_logged_in) {

        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>User already registered!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`

    } else{

        let new_user = {
            name: req.body.user,
            age: req.body.age,
            id: count++,
            phone: req.body.phone
        }
        let user_Auth = {
            name: user_name,
            pass: user_pass
        };
    
        users.push(new_user);
        usersAuth.push(user_Auth)

        response.redirect = "http://localhost:3000/homepage";
        response.success = true;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>User has Added!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }

    res.json(response);
});

router.delete('/deleteUser', function (req, res, next) {

    var response = new httpresponse();

    if (req.session.user_logged_in) {
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>User has Deleted</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    } else {
        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"You Are Not Allowed To Run This Function!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }

    res.json(response);
});

router.post('/login', function (req, res, next) {

    var response = new httpresponse();
    
    var user_name = req.body.user;
    var user_pass = req.body.password;
    
    req.session.user_logged_in = checkUserData(user_name, user_pass);

    if (req.session.user_logged_in) {
        req.session.user_logged_in = user_name

        response.spinnertext = "User Credentials is OK, Redirecting Please wait..."
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"User Logged In!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
        response.redirect = "http://localhost:3000/homepage"
    } else {
        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"User NOT Found!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }

    res.json(response);
});

function checkUserData(user_name, user_pass) {
    for (let i = 0; i < usersAuth.length; i++){
        if ( usersAuth[i].name == user_name){
            if ( usersAuth[i].pass == user_pass){
                return true;
            }
        }
    }
}

module.exports = router;