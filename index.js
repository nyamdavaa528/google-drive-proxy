const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
  res.send('Google Drive proxy is running');
});

app.get('/stream/:id', (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  request
    .get(driveUrl)
    .on('response', (r) => {
      res.setHeader('Content-Type', r.headers['content-type']);
    })
    .pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
