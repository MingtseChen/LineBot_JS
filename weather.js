var request = require('request');
var jsonQuery = require('json-query');
var fs = require('fs');

var rplyString = 'null',
	city, dist;

//request('https://works.ioa.tw/weather/api/all.json').pipe(fs.createWriteStream('local.json'))

exports.weather = function() {
	this.reply = function() {
		return rplyString;
	}
	this.getCurrentWeather = function(rawData, callback) {
		if (this.inputTrim(rawData)) {
			var dIndex;
			request({
				uri: 'https://works.ioa.tw/weather/api/all.json',
				method: 'GET',
				timeut: '5000'
			}, function(error, response, body) {
				if (response.statusCode == 200) {
					console.log('Getting Data Success', response && response.statusCode); // Print the response status code if a response was received
					var data = JSON.parse(body);
					//console.log(data[0].towns[1].name);
					var query = '[*][*][name =' + city + '][*towns][name = ' + dist + ']';
					try {
						dIndex = jsonQuery(query, {
							data: data
						}).value.id;
						request({
							uri: 'https://works.ioa.tw/weather/api/weathers/' + dIndex + '.json',
							method: 'GET',
							timeut: '5000'
						}, function(error, response, body) {
							//console.log('Get Data Success', response && response.statusCode);
							var data = JSON.parse(body);
							var qObj = jsonQuery('', {
								data: data
							}).value;
							var resultDesc = qObj.desc;
							// var resultDesc = jsonQuery('', {
							// 	data: data
							// }).value.desc;
							var resultTemp = qObj.temperature;
							var resultRf = qObj.rainfall;
							var resultAt = qObj.at;
							// console.log(ct + dt);
							// console.log(resultDesc);
							// console.log(resultTemp.slice(0, 2) + "~" + resultTemp.slice(2) + " C");
							// console.log(resultRf + "%");
							// console.log(resultAt);
							rplyString = city + dist + "\n" +
								resultTemp.slice(0, 2) + /*" ~ " + resultTemp.slice(2) + */ '°C ' +
								resultDesc + "\n" +
								'降雨機率 : ' + resultRf + "%" + "\n";
							//console.log(rplyString);
							//console.log('callback'); // Print the error if one occurred
							callback && callback();
							//console.log('Success Get Replied : End Weather Func\n', rplyString);
						});
					} catch (err) {
						console.log('Get Data Err \n ', err);
					}
				} else {
					console.log('Connect Api Error:', error); // Print the error if one occurred
				}
			});
			//return rplyString;
		}
	};

	this.inputTrim = function(inStr) {
		var passflag = false;
		this.inStr = inStr.trim();
		city = this.inStr.slice(0, this.inStr.indexOf("@"));
		if (this.inStr.includes('@')) {
			console.log("Raw : ", this.inStr);
			if (city.includes("市")) {
				city = city.replace("市", "");
			} else if (city.includes("縣")) {
				city = city.replace("縣", "");
			}
			//console.log("City : " + city);
			dist = this.inStr.slice(this.inStr.indexOf("@") + 1);
			//console.log("Dist : " + dist);
			//console.log("Clean String, Load Query");
			request({
				uri: 'https://works.ioa.tw/weather/api/all.json',
				method: 'GET',
				timeut: '10000'
			}, function(error, response, body) {
				if (response.statusCode == 200) {
					console.log('Access Data...'); // Print the response status code if a response was received
					var fetchCt = JSON.parse(body);
					console.log('Fetching...');
					for (i = 0; i < 22; i++) {
						var k = 0;
						if (fetchCt[i].name == city) {
							for (j = 0; j < fetchCt[i].towns.length; j++) {
								//console.log(fetchCt[i].towns[k].name);
								if (fetchCt[i].towns[k].name == dist) {
									passflag = true;
									console.log('Finish');
								}
								k++;
							}
						}
					}
				} else {
					console.log('Connect Api Error:', error); // Print the error if one occurred
					return false;
				}
				console.log('Query Status : ', passflag);
			});
		} else {
			console.log('Invalid : Need Spec Char');
			return false;
		}
		return true;
	};
};