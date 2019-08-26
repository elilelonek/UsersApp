var express = require('express');
var router = express.Router();
var httpresponse = require('../moduls/HttpResponse')

count = 0;
countforAuth = 0;
countforadmin = 1;

users = [
    { name: "admin", age: null, id: count++, phone: null },
    { name: "eli", age: 33, id: count++, phone: "0526670100" },
    { name: "saar", age: 38, id: count++, phone: "0525005001" },
    { name: "tomer", age: 22, id: count++, phone: "0526006001" }
];

AdminUsers = [
    { name: "admin", id: 0 }
];

usersAuth = [
    { name: "admin", password: "1234" }
];

/* GET users listing. */
router.get('/', function (req, res, next) {

    var response = new httpresponse();
    CheckLoggedInAdmin = checkisAdmin(req.session.user_logged_in);

    if (req.session.user_logged_in && CheckLoggedInAdmin) {
        
        response.redirect = "http://localhost:3000/adminhome"
        response.success = true;
        response.data = users;
        response.AdminUsers = AdminUsers;
    } else if(req.session.user_logged_in && !CheckLoggedInAdmin){

        response.redirect = "http://localhost:3000/homepage"
        response.success = true;
        response.data = users;
        response.AdminUsers = AdminUsers;
    }
    else{
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

router.delete('/deleteuser', function (req, res, next) {

    var response = new httpresponse();
    var user_name = req.session.user_logged_in
    CheckisAdmin = checkisAdmin(user_name);
    console.log(req.session.user_logged_in)

    if (req.session.user_logged_in && CheckisAdmin) {
        response.success = true;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>User has been Deleted!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`;
        users.map((user, index) => {
            if (user.id == req.body.user_id) {
                users.splice(index, 1);
                count -= 1
            }
        });
    } else {
        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You Are Not Allowed To Run This Function!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`;
    }

    res.json(response);
});

router.delete('/deleteadmin', function (req, res, next) {

    var response = new httpresponse();
    var user_name = req.session.user_logged_in
    CheckisAdmin = checkisAdmin(user_name);
    console.log(req.session.user_logged_in)

    if (req.session.user_logged_in && CheckisAdmin) {
        response.success = true;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Admin User has been Deleted!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`;
        AdminUsers.map((user, index) => {
            if (user.id == req.body.user_id) {
                AdminUsers.splice(index, 1);
                count -= 1
            }
        });
    } else {
        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>You Are Not Allowed To Run This Function!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`;
    }

    res.json(response);
});

router.delete('/deletesession', function (req, res, next) {

    var response = new httpresponse();

    if (req.session.user_logged_in) {
        response.success = true;

        response.redirect = "http://localhost:3000/"
        req.session.user_logged_in = null;
    } else {
        response.success = false;
        response.message = "You Are Not Allowed To Run This Function!"
    }

    res.json(response);
});

router.put('/addadminuser', function (req, res, next) {

    var response = new httpresponse();

    var user_name = req.body.name;
    var user_pass = req.body.password;

    CheckisAdmin = checkisAdmin(user_name);
    CheckLoggedInAdmin = checkisAdmin(req.session.user_logged_in);

        if(CheckisAdmin == true){
            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Admin User already registered!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
        else if(CheckLoggedInAdmin){

            response.success = true;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Admin User has Added!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
            var user_admin = {
                name: user_name,
                password: user_pass,
                id: countforadmin++
            }
            
            let new_user = {
                name: req.body.name,
                age: req.body.age,
                id: count++,
                phone: req.body.phone
            }
            let user_Auth = {
                name: user_name,
                password: user_pass
            };
        
            users.push(new_user);
            usersAuth.push(user_Auth)
    
            AdminUsers.push(user_admin);
        }
        else{
            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>You Are Not Allowed To Run This Function!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`;
        }

    res.json(response);
});

router.put('/registeruser', function (req, res, next) {
    var response = new httpresponse();

    var user_name = req.body.name;
    var user_pass = req.body.password;

    CheckUserRegStatus = checkUser(user_name)

        if (CheckUserRegStatus) {

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User already registered!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
        else{
            let new_user = {
                name: req.body.name,
                age: req.body.age,
                id: count++,
                phone: req.body.phone
            }

            let user_Auth = {
                name: user_name,
                password: user_pass
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

router.put('/addUser', function (req, res, next) {

    var response = new httpresponse();

    var user_name = req.body.name;
    var user_pass = req.body.password;

    CheckLoggedInAdmin = checkisAdmin(req.session.user_logged_in);
    CheckUserRegStatus = checkUser(user_name)

        if (CheckUserRegStatus) {

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User already registered!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
        else if(!CheckLoggedInAdmin){

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>You Are Not Allowed To Run This Function!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
        else{
            let new_user = {
                name: req.body.name,
                age: req.body.age,
                id: count++,
                phone: req.body.phone
            }

            let user_Auth = {
                name: user_name,
                password: user_pass
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

router.post('/login', function (req, res, next) {

    var response = new httpresponse();
    
        user_name = req.body.name;
        user_pass = req.body.password;

    CheckUserStatus = checkUser(user_name);
    CheckUserCred = checkUserAuth(user_name, user_pass);
    CheckisAdmin = checkisAdmin(user_name);

    if (CheckUserStatus === undefined) {

        response.success = false;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"User NOT Found!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }
    else if(CheckUserCred){

        req.session.user_logged_in = user_name

        response.success = true;

        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"User Logged In!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`

        if(CheckisAdmin == true){
            response.redirect = "http://localhost:3000/adminhome"
        }
        else{
            response.redirect = "http://localhost:3000/homepage"
        }
        
    }
    else{

        response.success = false;

        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"The User Credentials does NOT match!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`
    }

    res.json(response);
});

function checkUserAuth(user_name, user_pass) {
    for (let i = 0; i < usersAuth.length; i++){
        if ( usersAuth[i].name == user_name){
            if ( usersAuth[i].password == user_pass){
                return true;
            }
        }
    }
}

function checkUser(user_name) {
    for (let i = 0; i < usersAuth.length; i++){
        if ( usersAuth[i].name == user_name){
                return true;
        }
    }
}

function checkisAdmin(user_name) {
    for (let i = 0; i < AdminUsers.length; i++){
        if ( AdminUsers[i].name == user_name){
                return true;
        }
    }
}

module.exports = router;