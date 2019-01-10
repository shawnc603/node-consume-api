const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const routes = require('./routes');

//database connection
mongoose.connect('mongodb://admin:admin123@ds253804.mlab.com:53804/node-consume-api',{ useNewUrlParser: true } );


//view engine setup
app.engine('hbs', hbs({
        extname: 'hbs', 
        defaultLayout: 'layout', 
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//parsing body
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//routes which handles requests
app.use('/', routes);

app.use((req, res, next)=> {
        const error = new Error('Not found');
        error.status= 404;
        next(error);
});
    
app.use((error, req, res, next)=> {
        res.status(error.status || 500);
        res.json({
                error: {
                message: error.message
                }
        });
});
    

module.exports = app;
