var linebot = require('linebot');
var express = require('express');

const tools = require('./weather.js');
let val = tools.weather();

//config
var bot = linebot({
	channelId: '1508877129',
	channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9',
	channelAccessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU='
});

//start
var menu = 'Hello Im Chatta U can ask me : \n';
var mWeather = '1. Weather';
bot.on('message', function(event) {
	event.source.profile().then(function(profile) {
		event.reply(profile.displayName + ' : \n' + menu + mWeather /* + event.message.text*/ ).then(function(data) {
			if(event.message.text == '1'){
				event.reply('1');
				tools.inputTrim(event.message.text);
			}
			//console.log('Reply Success');
			//console.log('=======E====N=====D==========');
		}).catch(function(error) {
			//console.log('Reply Error : ', error);
			//console.log('=======E====N=====D==========');
		});
		//console.log("User Name : " + profile.displayName);
	}).catch(function(error) {
		// error
	});
	console.log('=========E=V=E=N=T===========');
	console.log(event);
	console.log('=========E=V=E=N=T===========');
});


//var DstringCity = '台北@中正區';



//end


//footer (port changer)
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port : ", port);
});