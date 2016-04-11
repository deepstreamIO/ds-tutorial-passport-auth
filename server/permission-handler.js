var useExpressMiddleware = require( 'use-express-middleware' );

function PermissionHandler( middleware ) {	
	this._middleware = middleware;
}

PermissionHandler.prototype.isValidUser = function( connectionData, authData, callback ) {
	useExpressMiddleware( connectionData.headers, this._middleware, ( req, res ) => {
		if( req.user ) {
			callback( null, req.user.id );
		} else {
			callback( 'Login Denied' );
		}
    } );
};

PermissionHandler.prototype.canPerformAction = function( id, message, callback ) {
	callback(null, true );
};

module.exports = PermissionHandler;