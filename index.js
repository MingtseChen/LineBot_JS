var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1508877129',
    channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9',
    channelAccessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
});

bot.listen('/linewebhook', 3000);
/*
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});*/
const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
app.listen(3000);
