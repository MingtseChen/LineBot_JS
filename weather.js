var request = require('request');
var jsonQuery = require('json-query');
var string = '台北';

request({
	uri: 'https://works.ioa.tw/weather/api/all.json',
	method: 'GET',
	timeut: '10000'
}, function(error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	//console.log('body:', body); // Print the HTML for the Google homepage.
	var data = JSON.parse(body);
	//console.log(data[0].towns[1].name);
	var query = '[*][*][name ='+string+']' ;
	var result = jsonQuery(query, {
		data: data
	}).value.id;
	console.log(data[0]);
	console.log('-----------------------------------');
	console.log(result);
});

function getCurrentWeather(location) {

}

/*
request({
	uri:'https://works.ioa.tw/weather/api/weathers/15.json',
	method:'GET',
	timeut:'10000'
}, function(error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	//console.log('body:', body); // Print the HTML for the Google homepage.
	var data = JSON.parse(body);
	console.log(data);
});*/