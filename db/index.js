var fs = require('fs')
var url = require('url')
var http = require('http')
var Router = require('routes-router')
var router = Router()

var filePath = '/data/numbers.json'

var defaultData = {a:0,b:10}

function loadNumbers(done){
	fs.readFile(filePath, 'utf8', function(err, data){
		if(err || !data){
			data = JSON.stringify(defaultData)
		}
		data = JSON.parse(data)
		done(null, data)
	})
}

function saveNumbers(data, done){
	fs.writeFile(filePath, JSON.stringify(data), 'utf8', done)
}

// load the numbers from the file - increment both and return
router.addRoute('/load', function(req, res, opts){
	loadNumbers(function(err, data){
		if(err){
			res.statusCode = 500
			res.end(err)
			return
		}
		data.a++
		data.b++
		saveNumbers(data, function(err){
			if(err){
				res.statusCode = 500
				res.end(err)
				return
			}
			res.end(JSON.stringify(data))
		})
	})
})

router.addRoute('/reset', function(req, res, opts){
	saveNumbers(defaultData, function(err){
		if(err){
			res.statusCode = 500
			res.end(err)
			return
		}
		res.end('ok')
	})
})

var server = http.createServer(router)
server.listen(80)