var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs')

var config      = cc(),
    app         = restify.createServer()

require('./app/core/mongoose')

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
	fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

// Routes
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/data', controllers.content.getHello);

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: './static/'}));

// Article Start
app.post("/articles", controllers.article.createArticle)
app.put("/articles/:id", controllers.article.updateArticle)
app.del("/articles/:id", controllers.article.deleteArticle)
app.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle)
app.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2)

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
