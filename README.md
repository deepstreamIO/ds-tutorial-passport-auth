# ds-tutorial-passport-auth
A basic example on how to integrate facebook auth using the amazing passport.js library and use-express-middleware

Steps:
- cd server
- npm install
- HOST_NAME=`HOST_NAME` FACEBOOK_ID=`FACEBOOK_ID` FACEBOOK_SECRET=`FACEBOOK_SECRET` TWITTER_KEY=`TWITTER_KEY` TWITTER_SECRET=`TWITTER_SECRET` node start.js

Note: You need a facebook application, twitter application and to ensure the hostname provided is accessible publicly ( either by hosting it on a public accesible machine or using a tool like [ngrok](https://ngrok.com/) to expose your localhost ).
