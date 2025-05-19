const express = require('express');
const https = require('https');
const { pipeline } = require('stream');
const app = express();

app.get('/', (req, res) => {
  res.send('Google Drive proxy is running');
});

app.get('/stream/:id', (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  https.get(driveUrl, (driveRes) => {
    res.setHeader('Content-Type', driveRes.headers['content-type'] || 'video/mp4');
    res.setHeader('Content-Disposition', 'inline');

    pipeline(driveRes, res, (err) => {
      if (err) {
        console.error('Pipeline error:', err);
        res.sendStatus(500);
      }
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
