var Deepstream = require( 'deepstream.io' );
var useExpressMiddleware = require( 'use-express-middleware' );
var express = require( 'express' );
var expressSession = require( 'express-session' );
var passport = require( 'passport' );
var PassportFacebook = require( 'passport-facebook' );
var http = require( 'http' );

// Passport
var initialisedPassport = passport.initialize();
var passportSession = passport.session();

passport.use( new PassportFacebook( {
    clientID: '235659440155031',
    clientSecret: '6972c46ef624c4df77ddcfe711ab2806',
    callbackURL: 'http://1a4e93d4.ngrok.io/login/facebook/return'
  },
  ( accessToken, refreshToken, profile, cb ) => {
    return cb( null, profile );
} ) );

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Express
var app = express();
var httpServer = http.createServer(app);
var session = expressSession({
  secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
  resave: false,
  saveUninitialized: false,
  name: 'sid',
  cookie: {
    secure: false,
    maxAge: 2147483647  // Never expire
  }
});
var middleware = [ session, initialisedPassport, passportSession ];

app.use( session );
app.use( initialisedPassport );
app.use( passportSession );
app.use( express.static( '../client' ) );

app.get( '/login/facebook', passport.authenticate('facebook') );
app.get( '/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  ( req, res ) => {
    res.redirect('/');
} );

// Deepstream
const deepstream = new Deepstream();
deepstream.set( 'urlPath', '/deepstream' );
deepstream.set( 'httpServer', httpServer );
deepstream.set( 'permissionHandler', {
  
  isValidUser( connectionData, authData, callback ) {
    console.log( connectionData )
    useExpressMiddleware( connectionData.headers, middleware, ( req, res ) => {
      if( req.user ) {
        callback( null, req.user.id );
      } else {
        callback( 'Login Denied' );
      }
    })
  },

  canPerformAction( id, message, callback ) {
    callback(null, true );
  }
} );
deepstream.start();

httpServer.listen( 7072, function() {
  console.log( 'HTTP server listening on 7072' );
} );