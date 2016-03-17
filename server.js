/*
 * Copyright (c) 2016 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * Main application code
 */
"use strict";

/**
 * set NODE_ENV if undefined
 */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
}

/**
 * import all required libraries
 */
var config   = require('config'); 
var http     = require('http');
var express  = require('express');
var passport = require('passport');
var Salesforce = require('./lib/salesforce');
var async    = require('async');

var pg = require ('pg');

var Account = require('./src/database').accounts;
var SurveyRoute = require('./src/database').sroute;

/**
 * load controllers
 */
//var AccountsController = require("./controllers/AccountsController");


require('./lib/setup_passport');

var app      = express();

app.configure(function () {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(express.static('public'));

  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
});

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0'),
  function(req, res) {
    res.redirect("/");
  });


// Start Survey endpoint
app.get('/', function (req, res) {
  
   var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     console.log('Request User IP: '+ip);

    res.render('index', {
      ip: ip,
      env:  process.env
    });

});


app.post('/chatter', function (req, res) {
  if (!req.user || req.user.identities[0].provider !== 'salesforce') {
    return res.redirect('/');
  }

  var access_token = req.user.identities[0].access_token;
  var urls = req.user._json.urls;
  var salesforce_client = new Salesforce(access_token, urls);

  salesforce_client.getGroups(function (err, groups) {
    if (err) return res.send(500);
    salesforce_client.postToChatter({
      group:   groups[0],
      message: req.body.message
    }, function (err) {
      if (err) return res.send(500);
      res.redirect('/');
    });
  });
});


/// PROMIS - Call APEX REST using Promis example
/*
app.post('/conact', function (req, res) {

  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     console.log(' User IP: '+ip);

      console.log('FN:'+req.body.firstName+' LN:'+req.body.lastName+' EMAIL:'+req.body.email);

  var options = {
    method: 'POST',
    uri: 'https://dev1-vantage-metrics.cs2.force.com/services/apexrest/consumer',
    body: {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        phone: ''
      
    },
    json: true // Automatically stringifies the body to JSON 
  };
 
  rp(options)
    .then(function (parsedBody) {
        // POST succeeded... 
        console.log('Contact Succcess: '+parsedBody);

    })
    .catch(function (err) {
        // POST failed... 
        console.log('Contact ERROR: '+err);

    }); 

});
*/
var port = process.env.PORT || 5000;

http.createServer(app).listen(port, function () {
  console.log('listening in http://localhost:' + port);
});