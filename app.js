const express = require('express'), http = require('http'), path = require('path');
const static = require('serve-static');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 8080);
app.set('host', '127.0.0.1');
app.use(static(__dirname));
app.use(express.urlencoded());
app.use(express.json());

router.route('/').get((req, res) => {
   res.redirect('/source/jquery.html')
});

router.route('/routetest').get((req, res) => {
   res.redirect('https://google.com/')
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), app.get('host'), () => {
   console.log('Server started on http://' + app.get('host') + ':' + app.get('port') + '...');
});