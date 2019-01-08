//https://jsonplaceholder.typicode.com/users

var http =  require('http');

var options = {
    host: 'jsonplaceholder.typicode.com',
    port:80,
    path: '/users',
    method: 'GET' 
}; 

function getJSON(options, cb){
    http.request(options, function(res)
    {
        var body ='';
        res.on('data', function(chunk){
            body += chunk;

        });
        res.on('end', function(chunk){
            x = JSON.parse(body);
            console.log(x);
        });
    }).end();

}

module.exports = nodeRequest;

