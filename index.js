const tools = require('./weather.js');
let val = tools.weather();


tools.getCurrentWeather('花蓮縣@富里鄉', function() {
	console.log(tools.reply());
});