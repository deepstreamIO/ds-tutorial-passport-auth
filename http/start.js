var config = require( './config' );

console.log( config )

/**
* Configure Passport
*/
var passport = require( 'passport' );
var passportFacebook = require( './passport-facebook' );
var passportTwitter = require( './passport-twitter' );

passport.serializeUser( function(user, cb) {
  cb(null, user);
} );

passport.deserializeUser( function(obj, cb) {
  cb(null, obj);
} );

/**
* Configure Express
*/
var express = require( 'express' );
var expressSession = require( 'express-session' );

var app = express();

app.use( express.static( '../client' ) );
app.use( expressSession( {
  secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
  resave: false,
  saveUninitialized: false,
  name: 'sid'
} ) );
app.use( passport.initialize() );
app.use( passport.session() );
//passportFacebook( app, passport );
passportTwitter( app, passport );

app.listen( config.HTTP_PORT, function() {
  console.log( 'Express server listening on', config.HTTP_PORT );
} );