import express from 'express';
import path from 'path';

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
const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, 'client')));

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/messages', (req, res) => {
  console.log('sending data');
  res.send(JSON.stringify(storage));
})



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});


app.listen(1337, () => console.log('Running on localhost:1337'));
