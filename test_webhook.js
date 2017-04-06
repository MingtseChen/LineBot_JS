'use strict'
const line = require('./index')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

// init with auth
line.init({
  accessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9'
})

/**
 * response example (https://devdocs.line.me/ja/#webhook):
 * {
 *   "events": [
 *     {
 *       "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
 *       "type": "message",
 *       "timestamp": 1462629479859,
 *       "source": {
 *         "type": "user",
 *         "userId": "u206d25c2ea6bd87c17655609a1c37cb8"
 *       },
 *       "message": {
 *         "id": "325708",
 *         "type": "text",
 *         "text": "Hello, world"
 *       }
 *     }
 *   ]
 * }
 */

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: event.message.text
          }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})
