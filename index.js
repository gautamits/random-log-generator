var faker = require('faker')
setInterval(function(){
	console.log(faker.lorem.paragraph());
}, 1000)
