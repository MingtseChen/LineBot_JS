var request = require('request');
var jsonQuery = require('json-query');

var stringCity = '台北';
var DstringCity = '台北ssss@中正區';
var stringCounty1 = '中正區';

trimInput(DstringCity);

function trimInput(inStr) {
	var city;
	var getStringRAW = inStr.trim();
	if (getStringRAW.includes('@')) {
		console.log("Raw : " + getStringRAW);
		if (getStringRAW.includes("市")) {
			city = getStringRAW.replace("市", "");
		} else if (getStringRAW.includes("縣")) {
			city = getStringRAW.replace("縣", "");
		}
		city = getStringRAW.slice(0, getStringRAW.indexOf("@"));
		console.log("City : " + city);
		var dist = getStringRAW.slice(getStringRAW.indexOf("@") + 1);
		console.log("Dist : " + dist);
		console.log("Clean String, Load Query");
		getCurrentWeather(city, dist);
	} else {
		console.log('invalid : need spec char');
	}
}
function getCurrentWeather(ct, dt) {
	try {
		request({
			uri: 'https://works.ioa.tw/weather/api/all.json',
			method: 'GET',
			timeut: '10000'
		}, function(error, response, body) {
			if (response.statusCode == 200) {
				console.log('Get Data Success', response && response.statusCode); // Print the response status code if a response was received
				var data = JSON.parse(body);
				//console.log(data[0].towns[1].name);
				var query = '[*][*][name =' + ct + '][*towns][name = ' + dt + ']';
				var dIndex = jsonQuery(query, {
					data: data
				}).value.id;
				//console.log(data[0]);
				//console.log('-----------------------------------');
				//console.log(dIndex);
				request({
					uri: 'https://works.ioa.tw/weather/api/weathers/' + dIndex + '.json',
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
				});
			} else {
				console.log('Connect Api Error:', error); // Print the error if one occurred
			}
			console.log('Success Get Replied : End Weather Func');
		});
	} catch (error) {
		console.log('Error', error);
	}
}