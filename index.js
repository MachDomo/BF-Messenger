import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev'

let storage = [
  {username: 'Dom', message: 'Hello World'},
  {username: 'Joe', message: 'I like donuts.'},
  {username: '1337 h4x0r', message: 'All your base are belong to us'}
];



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

// Body parser
app.use(bodyParser.json());

// Static File Server
app.use(express.static(path.join(__dirname, 'client')));

// Router
app.get('/messages', (req, res) => {
  res.send(JSON.stringify(storage));
});

app.post('/messages', (req, res) => {
  console.log('message received', req.body);
  console.log(req.body);
  storage.push(req.body);
  res.send(JSON.stringify(storage));
});


app.get('/*', (req, res) => {

  res.sendFile(path.join(__dirname, 'client/index.html'));
});


app.listen(1337, () => console.log('Running on localhost:1337'));
