var faker = require('faker')
var express = require('express')
var request = require('superagent')
var app = express();
const chalk = require('chalk');
const pyramid = require('./pascal-triangle').pyramid
const tr2 = require("./pascal-triangle").tr2;

const modifiers = [
	'reset',
	'bold',
	'dim',
	'italic',
	'underline',
	'inverse',
	'hidden',
	'strikethrough',
	'visible',
]

const colors = [
	'black',
	'red',
	'green',
	'yellow',
	'blue',
	'magenta',
	'cyan',
	'white',
	'blackBright',
	'redBright',
	'greenBright',
	'yellowBright',
	'blueBright',
	'magentaBright',
	'cyanBright',
	'whiteBright'
]

const backgroundColors = [
	'bgBlack',
	'bgRed',
	'bgGreen',
	'bgYellow',
	'bgBlue',
	'bgMagenta',
	'bgCyan',
	'bgWhite',
	'bgBlackBright (alias: bgGray, bgGrey)',
	'bgRedBright',
	'bgGreenBright',
	'bgYellowBright',
	'bgBlueBright',
	'bgMagentaBright',
	'bgCyanBright',
	'bgWhiteBright',
]

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generatePascal(n) {
  let arr = [];
  let tmp;
  for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j == i) {
        arr[i].push(1);
      } else {
        tmp =
          (!!arr[i - 1][j - 1] ? arr[i - 1][j - 1] : 0) +
          (!!arr[i - 1][j] ? arr[i - 1][j] : 0);
        arr[i].push(tmp);
      }
    }
  }
  return arr;
}

function setIntervalX(callback, delay, repetitions) {
  let x = 0;
  let intervalID = setInterval(function() {
    callback();

    if (++x === repetitions) {
      clearInterval(intervalID);
    }
  }, delay);
}

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
	let error = new Error('something went wrong')
	next(error);
})

app.get('/chuck', chuck)

setInterval(function(){
	const isTriangle = Math.random() >= 0.5;
	if(isTriangle){
		const randomNumber = between(5, 20)
		console.log(pyramid(tr2(randomNumber)))
	}
	else{
		const numParaGraphs = between(100, 2000)
		setIntervalX(randomParagraph,10000 / numParaGraphs, numParaGraphs)
	}
}, 10000)

function randomParagraph(){
	const paragraph = faker.lorem.paragraph();
	paragraph.split(" ").forEach((curr) => {
		const modifierOn = Math.random() >= 0.5;
		const isColor = Math.random() >= 0.5;
		let tempChalk = chalk;
		if (modifierOn) {
			const randomModifierIndex = between(0, modifiers.length);
			tempChalk = tempChalk[modifiers[randomModifierIndex]];
		}
		const randomStyleIndex = between(0, colors.length);
		if (isColor) {
			tempChalk = tempChalk[colors[randomStyleIndex]];
		} else {
			tempChalk = tempChalk[backgroundColors[randomStyleIndex]];
		}
		try {
			process.stdout.write(tempChalk(curr + " "));
		} catch (Err) {
			process.stdout.write(curr + " ");
		}
	})
}


app.use((err, req, res, next)=>{
	res.status(500);
	res.send('something went wrong')
})
app.listen(80)
