var config = require( './config' );

/**
* Configure Passport
*/
var passport = require( 'passport' );

var initialisedPassport = passport.initialize();
var passportSession = passport.session();
var session = expressSession({
  secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
  resave: false,
  saveUninitialized: false,
  name: 'sid'
});
var middleware = [ session, initialisedPassport, passportSession ];

/**
* Configure Deepstream
*/
var Deepstream = require( 'deepstream.io' );
var PermissionHandler = require( './permission-handler' );

var deepstream = new Deepstream();
deepstream.set( 'permissionHandler', new PermissionHandler( middleware ) );
deepstream.start();