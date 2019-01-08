const http = require('http');
const app = require('./app');

const port = 3002;

const server = http.createServer(app);

server.on('listening',function(){
    console.log('ok, server is running on port : ' + port);
});

server.listen(port);