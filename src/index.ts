var express = require('express')
var request = require('superagent')
var app = express();
import  {pyramid} from './pascal-triangle'
import {Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import {between, setIntervalX} from './util'
const tr2 = require("./pascal-triangle").tr2;
const colors = require('colors')
const randomParagraph = require('./chalk-colors').randomParagraph

async function chuck(req:Request, res: Response){
	try{
		const result = await request.get('https://api.chucknorris.io/jokes/random')
		//const result2 = await result.json()
		//console.log({result2});
		res.status(200).type('json').send(result.text)
	}
	catch(err){
		res.status(500);
		res.send(err)
	
	}
}
app.get("/", function(req: Request, res: Response) {
  res.send("Hello world!");
});

app.get("/success", function(req: Request, res: Response) {
  res.send("success");
});

app.get("/error", function(req: Request, res: Response, next: NextFunction) {
  let error = new Error("something went wrong");
  next(error);
});

app.get('/chuck', chuck)

setInterval(function(){
	const isTriangle = Math.random() >= 0.5;
	if(isTriangle){
		const randomNumber = between(5, 15)
		console.log('')
		console.log(pyramid(tr2(randomNumber)))
	}
	else{
		const numParaGraphs = between(10, 500)
		setIntervalX(randomParagraph,10000 / numParaGraphs, numParaGraphs)
	}
}, 10000)

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.send("something went wrong");
});
app.listen(80)
