var linebot = require('linebot');
var express = require('express');

var bot = linebot({
	channelId: '1508877129',
	channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9',
	channelAccessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU='
});

/*
setTimeout(function(){
    var userId = 'U9539bade81b0b8581173f6ab7bbe5b0c';
    var sendMsg = '要發送的文字';
    bot.push(userId,sendMsg);
    console.log('send: '+sendMsg);
},1000);*/
/*
bot.on('message', function(event) {
	console.log('UID : ' + event.source.userId); //user id
	event.source.profile().then(function(profile) {
		console.log('User : ' + profile.displayName); //user name
		event.reply('Hello' + profile.displayName);
	}).catch(function(error) {
		console.log('Get ID Error',error); //error
	});
});*/

bot.on('message', function(event) {
	var uid = event.source.userId;
	var name = event.getUserProfile(uid);
	//console.log(event);
	event.reply(name + ' : ' + event.message.text).then(function(data) {
		//console.log('Success', data);
	}).catch(function(error) {
		//console.log('Error', error);
	});
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
});