var request = require('request');
var jsonQuery = require('json-query');
var linebot = require('linebot');

var bot = linebot({
	channelId: '1508877129',
	channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9',
	channelAccessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU='
});

var rplyString;

exports.weather = function() {
	this.inputTrim = function(inStr, uid) {
		var passflag = false;
		var getStringRAW = inStr.trim();
		var city = getStringRAW.slice(0, getStringRAW.indexOf("@"));
		if (getStringRAW.includes('@')) {
			//console.log("Raw : ", getStringRAW);
			if (city.includes("市")) {
				city = city.replace("市", "");
			} else if (city.includes("縣")) {
				city = city.replace("縣", "");
			}
			//console.log("City : " + city);
			var dist = getStringRAW.slice(getStringRAW.indexOf("@") + 1);
			//console.log("Dist : " + dist);
			//console.log("Clean String, Load Query");
			request({
				uri: 'https://works.ioa.tw/weather/api/all.json',
				method: 'GET',
				timeut: '10000'
			}, function(error, response, body) {
				if (response.statusCode == 200) {
					console.log('Access...'); // Print the response status code if a response was received
					var fetchCt = JSON.parse(body);
					for (i = 0; i < 22; i++) {
						//console.log(fetchCt[i].name);
						var k = 0;
						if (fetchCt[i].name == city) {
							for (j = 0; j < fetchCt[i].towns.length; j++) {
								//console.log(fetchCt[i].towns[k].name);
								if (fetchCt[i].towns[k].name == dist) {
									passflag = true;
									//getCurrentWeather(city, dist);
									getCurrentWeather(city, dist);
								}
								k++;
							}
						}
					}
				} else {
					console.log('Connect Api Error:', error); // Print the error if one occurred
				}
				console.log('Query Status : ', passflag);
			});
		} else {
			console.log('invalid : need spec char');
		}
		if (passflag) {
			reply(uid);
			console.log('send');
		}
	};

};

function getCurrentWeather(ct, dt) {
	var dIndex;
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
			try {
				dIndex = jsonQuery(query, {
					data: data
				}).value.id;

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
					// console.log(ct + dt);
					// console.log(resultDesc);
					// console.log(resultTemp.slice(0, 2) + "~" + resultTemp.slice(2) + " C");
					// console.log(resultRf + "%");
					// console.log(resultAt);
					rplyString = ct + dt + "\n" +
						resultTemp.slice(0, 2) + "~" + resultTemp.slice(2) + ' °C ' +
						resultDesc + "\n" +
						'降雨機率 : ' + resultRf + "%\n" +
						"Time : " + resultAt;
				});
			} catch (err) {
				console.log('Get Data Err \n ', err);
			}
		} else {
			console.log('Connect Api Error:', error); // Print the error if one occurred
		}
		console.log('Success Get Replied : End Weather Func');
	});
	//return rplyString;
}

function reply(uid) {
	bot.on('message', function(event) {
		event.push(uid, rplyString)
	});
}