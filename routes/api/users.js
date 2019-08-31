var express = require('express');
var router = express.Router();
var httpresponse = require('../../moduls/httpresponse')

count = 0;
countforAuth = 0;
countforadmin = 1;

users = [
    { name: "admin", age: null, id: count++, phone: null },
    { name: "test", age: null, id: count++, phone: null },
    { name: "eli", age: 33, id: count++, phone: "0526670100" },
    { name: "saar", age: 38, id: count++, phone: "0525005001" },
    { name: "tomer", age: 22, id: count++, phone: "0526006001" }
];

AdminUsers = [
    { name: "admin", id: 0 }
];

usersAuth = [
    { name: "admin", password: "1234" },
    { name: "test", password: "1234" }
];

// GET users listing.
router.get('/', function (req, res) {

    var response = new httpresponse();

    username = req.session.user_logged_in
    CheckifAdmin = checkisAdmin(username);

    if (username && CheckifAdmin) {
        
        response.redirect = "http://localhost:3000/adminpage";
        response.success = true;
        response.data = users;
        response.AdminUsers = AdminUsers;

    } else if(username && !CheckifAdmin){

        response.redirect = "http://localhost:3000/homepage";
        response.success = true;
        response.data = users;

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

// Delete Regular users
router.delete('/deleteuser', function (req, res) {

    var response = new httpresponse();

    var username = req.session.user_logged_in
    CheckifAdmin = checkisAdmin(username);

    if (username && CheckifAdmin) {

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

// Delete Admins
router.delete('/deleteadmin', function (req, res) {

    var response = new httpresponse();

    var username = req.session.user_logged_in
    CheckifAdmin = checkisAdmin(username);
    BuildInAdminUser = req.body.user_name

    if (username && CheckifAdmin) {

        if(BuildInAdminUser == "admin"){

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>"admin" User is a Build-In Administrator Account for managing the Application, and Cannot be Deleted.</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`;

        }
        else{

            response.success = true;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Admin User '${req.body.user_name}' has been Deleted!</strong>
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

        }
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

// Remove User Session when press LogOut Button
router.post('/deletesession', function (req, res) {

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

// Add New "Admin" User From Admin Page
router.put('/addadminuser', function (req, res) {

    var response = new httpresponse();

    var username = req.body.name;
    var userpass = req.body.password;

    CheckifAdmin = checkisAdmin(username);
    CheckifLoggedinAdmin = checkisAdmin(req.session.user_logged_in);

        if(CheckifAdmin == true){
            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Admin User '${username}' already registered!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`
        }
        else if(CheckifLoggedinAdmin){

            response.success = true;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Admin User has Added!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`

            var user_admin = {
                name: username,
                id: countforadmin++
            }
            
            let new_user = {
                name: username,
                age: req.body.age,
                id: count++,
                phone: req.body.phone
            }
            let user_Auth = {
                name: username,
                password: userpass
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

// Register User from Registration window ( on Login Screen )
router.put('/registeruser', function (req, res) {

    var response = new httpresponse();

    var username = req.body.name;
    var userpass = req.body.password;

    CheckUserRegStatus = checkUser(username)

        if (CheckUserRegStatus) {

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User '${username}' already registered!</strong>
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
                name: username,
                password: userpass
            };
        
            users.push(new_user);
            usersAuth.push(user_Auth)
            
            response.redirect = "http://localhost:3000/homepage";
            response.success = true;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User has Registration Complete!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`

        } 

    res.json(response);
});

// Add New "Regular" User From Admin Page
router.put('/addUser', function (req, res) {

    var response = new httpresponse();

    var username = req.body.name;
    var userpass = req.body.password;

    CheckifLoggedinAdmin = checkisAdmin(req.session.user_logged_in);
    CheckUserRegStatus = checkUser(username)

        if (CheckUserRegStatus) {

            response.success = false;
            response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>User '${username}' already registered!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>`

        }
        else if(!CheckifLoggedinAdmin){

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
                name: username,
                age: req.body.age,
                id: count++,
                phone: req.body.phone
            }

            let user_Auth = {
                name: username,
                password: userpass
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

// Login Request
router.post('/login', function (req, res) {

    var response = new httpresponse();
    
    username = req.body.name;
    userpass = req.body.password;

    CheckUserStatus = checkUser(username);
    CheckUserCred = checkUserAuth(username, userpass);
    CheckifAdmin = checkisAdmin(username);

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

        req.session.user_logged_in = username

        response.success = true;
        response.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>"User Logged In!"</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`

        if(CheckifAdmin == true){
            response.redirect = "http://localhost:3000/adminpage"
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

//  Functions that work with variables and arrays //
// ( In the meantime, until the app works with DataBase like MySql/MongoDB etc.. ) //

// Checks user Credentials and compare with "usersAuth" Array.
function checkUserAuth(username, userpass) {
    for (let i = 0; i < usersAuth.length; i++){
        if ( usersAuth[i].name == username){
            if ( usersAuth[i].password == userpass){
                return true;
            }
        }
    }
}

// Checks whether the requested user is exists in "users" Group.
function checkUser(username) {
    for (let i = 0; i < users.length; i++){
        if ( users[i].name == username){
                return true;
        }
    }
}

// Checks whether the requested Admin user is exists in "AdminUsers" Group.
function checkisAdmin(username) {
    for (let i = 0; i < AdminUsers.length; i++){
        if ( AdminUsers[i].name == username){
                return true;
        }
    }
}

module.exports = router;