const express = require('express'), http = require('http'), path = require('path');
const https = require('https');
const fs = require("fs");
const static = require('serve-static');

const options = {
   key: fs.readFileSync("cert.key"),
   cert: fs.readFileSync("cert.crt")
};

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 8080);
app.set('host', '172.16.164.77');
app.use(static(__dirname));
app.use(express.urlencoded());
app.use(express.json());

router.route('/').get((req, res) => {
   res.redirect('/source/jquery.html')
});

router.route('/routetest').get((req, res) => {
   res.redirect('https://google.com/')
});

router.route('/rss').get((req, res) => {
   console.log("RSS data requested");
   const feed = 'https://news.sbs.co.kr/news/headlineRssFeed.do?plink=RSSREADER';
   https.get(feed, (httpRes) => {
      let rssRes = "";
      httpRes.on('data', (chunk) => rssRes += chunk);
      httpRes.on('end', () => {
         res.send(rssRes);
         console.log("RSS respond completed");
         res.end();
      })
   })
});

router.route('/youtube-rss').get((req, res) => {
   console.log("RSS data requested");
   const feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCRWxH4fGhuNsh0klWnDbt0w';
   https.get(feed, (httpRes) => {
      let rssRes = "";
      httpRes.on('data', (chunk) => rssRes += chunk);
      httpRes.on('end', () => {
         res.send(rssRes);
         console.log("RSS respond completed");
         res.end();
      })
   })
})

app.use('/', router);

http.createServer(app).listen(app.get('port'), app.get('host'), () => {
   console.log(`Server started on http://${app.get('host')}:${app.get('port')}`);
});

const PORT = 8000;
https.createServer(options, app).listen(PORT, app.get('host'), () => {
   console.log(`Express HTTPS started on https://${app.get('host')}:${PORT}`)
})