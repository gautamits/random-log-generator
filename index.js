var faker = require('faker')
var express = require('express')
var request = require('superagent')
var app = express();

async function chuck(req, res){
	try{
		const result = await request.get('https://api.chucknorris.io/jokes/random')
		//const result2 = await result.json()
		//console.log({result2});
		res.status(200).type('json').send(result.text)
	}
	catch(err){
		console.log({err})	
		res.status(500);
		res.send(err)
	
	}
}
app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/success', function(req, res){
	res.send('success')
		
})

app.get('/error', function(req, res){
	var error = new Error('something went wrong')
	next(error);
})

app.get('/chuck', chuck)
setInterval(function(){
	console.log(faker.lorem.paragraph());
}, 100)

app.use((err, req, res, next)=>{
	res.status(500);
	res.send('something went wrong')
})
app.listen(80)
