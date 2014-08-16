var url = require('url')
var http = require('http')
var Router = require('routes-router')

var router = Router()

router.addRoute('/add/:a/:b', function(req, res, opts){
	var a = parseInt(opts.params.a || '0')
	var b = parseInt(opts.params.b || '0')
	res.end('' + (a+b))
})

router.addRoute('/minus/:a/:b', function(req, res, opts){
	var a = parseInt(opts.params.a || '0')
	var b = parseInt(opts.params.b || '0')
	res.end('' + (a-b))
})

var server = http.createServer(router)
server.listen(80)