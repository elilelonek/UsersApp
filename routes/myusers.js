var express = require('express');
var router = express.Router();

count = 0;

users = [
    { name: "Eli", age: 33, id: count++, phone: "0526670100" },
    { name: "Saar", age: 38, id: count++, phone: "0525005001" },
    { name: "Tomer", age: 22, id: count++, phone: "0526006001" }
];

var result = {};
result.success = true;
result.data = users

router.get('/', function (req, res, next) {
    res.send(result);
});

router.delete('/deleteuser', function (req, res, next) {
    
    users.map((user, index) => {
        if (user.id == req.body.user_id) {
            users.splice(index, 1);
            count -= 1
        }
    });
    
    var result = {};
    result.success = true;
    result.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>User has been Deleted!</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`;
    
    res.send(result);
    });

    router.put('/adduser', function (req, res, next) {
        
        let new_user = {
            name: req.body.name,
            age: req.body.age,
            id: count++,
            phone: req.body.phone
        }
        
        users.push(new_user);
        
        var result = {};
        result.success = true;
        result.message = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>User has been Added!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>`;
        
        res.send(result);
        });

module.exports = router;