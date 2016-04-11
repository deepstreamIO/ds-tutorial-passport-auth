var config = require( './config' );
var PassportFacebook = require( 'passport-facebook' );

function enablePassportFacebook( app, passport ) {
	passport.use( new PassportFacebook( {
			clientID: config.FACEBOOK_ID,
			clientSecret: config.FACEBOOK_SECRET,
			callbackURL: '//' + config.HOST_NAME +  '/login/facebook/return'
		},
		( accessToken, refreshToken, profile, cb ) => {
			return cb( null, profile );
	} ) );

	app.get( '/login/facebook', passport.authenticate('facebook') );

	app.get( '/login/facebook/return', 
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		( req, res ) => {
			res.redirect('/');
	} );
}

module.exports = enablePassportFacebook;
