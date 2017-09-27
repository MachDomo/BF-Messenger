import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-facebook';
import fbAuth from './key/facebookapp.js';
import mongoose from 'mongoose';
import db from './db/config.js';
import User from './db/models/user.js';
import Message from './db/models/message.js';



import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev'

let storage = [
  {username: 'Dom', message: 'Hello World'},
  {username: 'Joe', message: 'I like donuts.'},
  {username: '1337 h4x0r', message: 'All your base are belong to us'}
];

function checkAuth(req, res, next) {
  // if(req.isAuthenticated()) {
  //   console.log('Authenticated!');
  //   next();
  // } else {
  //   console.log('Authentication failed!');
  //   console.log(req.authInfo);
  //   res.redirect('/auth/facebook');
  //   res.end();
  // }
  next();
};


passport.serializeUser(function(user, done) {
  console.log('serialized!');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {

  console.log('deserialized!');
  done(null, obj);
});

passport.use(new Strategy({
    clientID: fbAuth.FACEBOOK_APP_ID,
    clientSecret: fbAuth.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:1337/auth/facebook/callback',
    enableProof: false,
    profileFields: ['id', 'displayName', 'photos']
  }, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {
      console.log('next tick');
      done(null, {
        accessToken: accessToken,
        profile: profile
      });
    });






}));

let app = express();

// Webpack Middleware
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// Headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Static File Server
app.use(express.static((__dirname + '/client')));

app.use(session({
  secret: fbAuth.FACEBOOK_APP_SECRET,
  resave: false,
  saveUninitialized: true
}))
// Passport
app.use(passport.initialize());
app.use(passport.session());


// Body parser
app.use(bodyParser.json());

// Router
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  } else {
    res.redirect('/auth/facebook');
  }
});
// Authentication Routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',

passport.authenticate('facebook', {
  failureRedirect: '/auth/facebook'
}),
function(req, res) {
  console.log('authenticated!');
  res.redirect('/');
}
);

app.get('/messages', checkAuth, (req, res) => {
  Message.find().exec((err, messages) => {
    if (err) {
      return err;
    }
    res.send(JSON.stringify(messages));
  })
  // res.send(JSON.stringify(storage));
});

app.post('/messages', checkAuth, (req, res) => {
  console.log('message received', req.body);
  console.log(req.body);
  storage.push(req.body);
  new Message(req.body).save();
  res.end();
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username, password: password}).exec((err, found) => {
    if (err) {
      console.log(err);
    }
    if (found) {
      res.send(JSON.stringify({username: found.username}));
    } else {
      res.send({"InvalidSubmission": true});
    }
  })
});

app.post('/signup', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);

  User.findOne({username: username, password: password}).exec((err, found) => {
    if (err) {
      throw err;
    }
    if (found) {
      res.send({'InvalidSubmission': true});
    } else {
      let newUser = new User({username: username, password: password});
      newUser.save();
      res.send(JSON.stringify({username: newUser.username}));
    }
  })
});


app.listen(1337, () => console.log('Running on localhost:1337'));
