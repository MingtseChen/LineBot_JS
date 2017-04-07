var request = require('request');
var jsonQuery = require('json-query');
var stringCity = '台北';
var DstringCity = '台北市@中正區';
var DstringCity = '台北市@中正區';
var stringCounty1 = '中正區';

trimInput(DstringCity);

function trimInput(inStr) {
	var getStringRAW = inStr.trim();
	console.log("Raw : " + getStringRAW);
	if (getStringRAW.includes("市")) {
		var city = getStringRAW.replace("市", "");
	} else if (getStringRAW.includes("縣")) {
		var city = getStringRAW.replace("縣", "");
	}
	var city = city.slice(0, city.indexOf("@"));
	console.log("City : " + city);
	var dist = getStringRAW.slice(getStringRAW.indexOf("@") + 1);
	console.log("Dist : " + dist);
}



function getCurrentWeather(location) {



	request({
		uri: 'https://works.ioa.tw/weather/api/all.json',
		method: 'GET',
		timeut: '10000'
	}, function(error, response, body) {
		if (response.statusCode == 200) {
			console.log('Get Data Success', response && response.statusCode); // Print the response status code if a response was received
			var data = JSON.parse(body);
			//console.log(data[0].towns[1].name);
			var query = '[*][*][name =' + stringCity + '][*towns][name = ' + stringCounty1 + ']';
			var result = jsonQuery(query, {
				data: data
			}).value.id;
			//console.log(data[0]);
			//console.log('-----------------------------------');
			//console.log(result);
			request({
				uri: 'https://works.ioa.tw/weather/api/weathers/' + result + '.json',
				method: 'GET',
				timeut: '10000'
			}, function(error, response, body) {
				console.log('Get Data Success', response && response.statusCode);
				var data = JSON.parse(body);
				var resultDesc = jsonQuery('', {
					data: data
				}).value.desc;
				var resultTemp = jsonQuery('', {
					data: data
				}).value.temperature;
				var resultRf = jsonQuery('', {
					data: data
				}).value.rainfall;
				var resultAt = jsonQuery('', {
					data: data
				}).value.at;
				console.log(stringCity + stringCounty1);
				console.log(resultDesc);
				console.log(resultTemp.slice(0, 2) + "~" + resultTemp.slice(2) + " C");
				console.log(resultRf + "%");
				console.log(resultAt);
			})
		} else {
			console.log('Connect Api Error:', error); // Print the error if one occurred
		}
		console.log('Success Get Replied End Weather Func');
	});
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