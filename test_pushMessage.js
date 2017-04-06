'use strict'
const line = require('./index')

// init with auth token
line.init({
  accessToken: '4L2aRBb34xjalpFoMdeaTiSABsn4p6r5/cvVTbBnnOfB3Lzfu79gwW/Q3BU4HMVSiUbVPax7Eq++UEguxptioW72UCqgHO3PW9gaUVVZnAuSArf6RYP4gUYa8SIe3RRDniLOSbsRuafMJ5mu7lSojwdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'fb5a231a8330f2438503cc5d4f9b2cc9'
})

line.client
  .pushMessage({
    to: '{YOUR_MID}',
    messages:[
        {
            "type":"text",
            "text":"Hello, world1"
        },
        {
            "type":"text",
            "text":"Hello, world2"
        }
    ]
  })
  .then(() => console.log({success: true}))
  .catch(err => console.log(err))
