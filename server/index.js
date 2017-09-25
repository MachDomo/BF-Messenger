import express from 'express';
import path from 'path';

let app = express();

app.get('/*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(1337, () => console.log('Running on localhost:1337'));