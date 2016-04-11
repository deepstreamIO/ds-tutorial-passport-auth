var config = require( './config' );

/**
* Configure Passport
*/
var passport = require( 'passport' );
var passportFacebook = require( './passport-facebook' );
var passportTwitter = require( './passport-twitter' );

var initialisedPassport = passport.initialize();
var passportSession = passport.session();

passport.serializeUser( function(user, cb) {
  cb(null, user);
} );

passport.deserializeUser( function(obj, cb) {
  cb(null, obj);
} );

/**
* Configure Express
*/
var http = require( 'http' );
var express = require( 'express' );
var expressSession = require( 'express-session' );

var app = express();
var httpServer = http.createServer(app);
var session = expressSession({
  secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
  resave: false,
  saveUninitialized: false,
  name: 'sid'
});

app.use( express.static( '../client' ) );
app.use( session );
app.use( initialisedPassport );
app.use( passportSession );
passportFacebook( app, passport );
passportTwitter( app, passport );


/**
* Configure Deepstream
*/
var Deepstream = require( 'deepstream.io' );
var PermissionHandler = require( './permission-handler' );

var deepstream = new Deepstream();
deepstream.set( 'urlPath', '/deepstream' );
deepstream.set( 'httpServer', httpServer );
deepstream.set( 'permissionHandler', new PermissionHandler( [ session, initialisedPassport, passportSession ] ) );
deepstream.start();

httpServer.listen( config.HTTP_PORT, function() {
  console.log( 'HTTP server listening on', process.env.HTTP_PORT );
} );