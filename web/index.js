var url = require('url')
var http = require('http')
var Router = require('routes-router')
var concat = require('concat-stream')
var hyperquest = require('hyperquest')

var router = Router()

function dbAddress(){
	return (process.env.DB_PORT || '').replace(/^tcp:/, 'http:')
}

function logicAddress(){
	return (process.env.LOGIC_PORT || '').replace(/^tcp:/, 'http:')
}

function loadNumbers(done){
	var req = hyperquest(dbAddress() + '/load').pipe(concat(function(result){
		done(null, JSON.parse(result.toString()))
	}))
	req.on('error', done)
}

function calcNumbers(operator, a, b, done){
	var req = hyperquest(logicAddress() + '/' + operator + '/' + a + '/' + b).pipe(concat(function(result){
		done(null, result.toString())
	}))
	req.on('error', done)
}

// load the values from the database server
// then add them via the logic server
router.addRoute('/add', function(req, res){
	loadNumbers(function(err, numbers){
		if(err){
			res.statusCode = 500
			res.end(err)
			return
		}
		calcNumbers('add', numbers.a, numbers.b, function(err, result){
			if(err){
				res.statusCode = 500
				res.end(err)
				return
			}
			res.end(result.toString())
		})
	})
})

// load the values from the database server
// then minus them via the logic server
router.addRoute('/minus', function(req, res, opts){
	loadNumbers(function(err, numbers){
		if(err){
			res.statusCode = 500
			res.end(err)
			return
		}
		calcNumbers('minus', numbers.a, numbers.b, function(err, result){
			if(err){
				res.statusCode = 500
				res.end(err)
				return
			}
			res.end(result.toString())
		})
	})
})

var server = http.createServer(router)
server.listen(80)