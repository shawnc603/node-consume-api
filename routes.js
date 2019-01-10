const request = require('request');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const User = require('./models/user');



router.get('/signup', function(req, res, next){
    res.render('signguest');
});
router.post('/signup', function(req, res, next){
    const  myUser = new User(req.body); 
    myUser
        .save()
        .then(result => {
                console.log(result);
                return res.render('guestbook');
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err                
            });
        });

});


router.get('/guestbook', function(req, res, next) {
    User.find(function(err, data) {
      res.render('guestbook', { title: 'Shawn Guestbook', contents: data });
  });
});


router.get('/',function(req, res, next){
    res.render('index', {title: 'Cool', condition: false, anyArray: [1,2,3]});
});

router.get("/getAllUsers", (req, res, next) => {
    console.log("attempt to enter data");

    const connection = mysql.createConnection({
        host: 'localhost:3306',
        user: 'root',
        password: 'root',
        database: 'sakila'
    });

    if(connection.state == 'disconnected'){
        console.log("connection : " + connection.state);
        return;
    }else{
        console.log("connection success");
    }

    const userId = req.params.id;
    const querystring = "select * from actor";
    connection.query(querystring,userId, (err,rows,fields)=>{
        if(err)
        {
            //res.sendStatus(500).jsonp({message: 'crtical error'});
            return;
        }

        /*const users = rows.map((row) => {
            return {FirstName: row.firstname, LastName: row.lastname};
        }*/

        res.json(users);
    });

});

router.post("/register", (req, res, next) => {
    var output = '';
    request.post({
        "headers": {"content-type": "application/json"},
        "url": 'https://reqres.in/api/register',
        "body": JSON.stringify(req.body)
    }, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }   
        output =  JSON.parse(body)     
        return res.status(200).json({
            message: output
        });
    });
});


router.post("/login", (req, res, next) => {
    var output = '';
    request.post({
        "headers": {"content-type": "application/json"},
        "url": 'https://reqres.in/api/register',
        "body": JSON.stringify(req.body)
    }, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }   
        output =  JSON.parse(body);    
        return res.status(200).json({
            message: output  
        }); 
    });
});

router.get("/getUsers", (req, res, next) => {
    var output = '';
    request.get('https://reqres.in/api/users', (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }
        output = JSON.parse(body);
        console.log(output);

        return res.status(200).json({
            message: output
        });
    }); 

});

router.post("/createUser", (req, res, next) => {
    var output = '';
    request.post({
        "headers": {"content-type": "application/json"},
        "url": 'https://reqres.in/api/users',
        "body": JSON.stringify(req.body) 
    }, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }   
        output =  JSON.parse(body)     
        return res.status(200).json({
            message: output,
            request: {
                type: 'GET',
                url: 'http://localhost:3002/action/getUser/' + output.id
            }
        });
    });
});


router.get("/getUser/:userid", (req, res, next) => {
    const id = req.params.userid;
    var output = '';
    request.get('https://reqres.in/api/users/'+ id, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }
        output = JSON.parse(body);
        console.log(output);

        return res.status(200).json({
            message: output,
            request: {
                type: 'GET',
                url: 'http://localhost:3002/action/getUser/' + output.id
            }
        });
    }); 

});

router.patch("/updateUser/:userid", (req, res, next) => {
    const id = req.params.userid;
    request.post({
        "headers": {"content-type": "application/json"},
        "url": 'https://reqres.in/api/users/'+ id,
        "body": JSON.stringify(req.body)
    }, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        }
        return res.status(200).json({
            message: 'updated Id:' + id
        });
    });
});


router.delete("/deleteUser/:userid", (req, res, next) => {
    const id = req.params.userid;
    request.post({
        "headers": {"content-type": "application/json"},
        "url": 'https://reqres.in/api/users/'+ id,
        "body": JSON.stringify(req.body)
    }, (error, response, body) => {
        if (error) { 
            return console.log(error); 
        } 
        return res.status(200).json({
            message: 'deleted! -' + id
        });
    });
});


module.exports = router;