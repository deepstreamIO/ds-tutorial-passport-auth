var config = require( './config' );
var PassportTwitter = require('passport-twitter').Strategy;

function enablePassportTwitter( app, passport ) {
	passport.use( new PassportTwitter( {
			consumerKey: config.TWITTER_KEY,
			consumerSecret: config.TWITTER_SECRET,
			callbackURL: '//' + config.HOST_NAME +  '/login/twitter/return'
		},
		( accessToken, refreshToken, profile, cb ) => {
			return cb( null, profile );
	} ) );

	app.get('/login/twitter', passport.authenticate('twitter') );

	app.get('/login/twitter/return', 
		passport.authenticate('twitter', { failureRedirect: '/login' } ),
		( req, res ) => {
			res.redirect('/');
		}
	);
}

module.exports = enablePassportTwitter;
