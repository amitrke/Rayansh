exports.getHello = function(req, res, next) {
	res.status(200);
	res.header('Content-Type', 'text/html');
	res.end("Hello World 1");
}