const sendRequest = require('./sendRequest')
const zodiaco = require('../FSM/zodiaco')
const messenger = require('./messenger')


module.exports = function parser (obj) {
  obj.entry.map(({messaging}) => {
    messaging.map(item => {
      let sender = item.sender.id
      if ('postback' in item) {
        let payload = JSON.parse(item.postback.payload)
        postbacks(sender, payload)
      } else if ('message' in item && 'quick_reply' in item.message) {
        let payload = JSON.parse(item.message.quick_reply.payload)
        postbacks(sender, payload)
      } else {
        console.warn('message =>', item.message.text)
      }
    })
  })
}

//when is not a message but it has a payload...
async function postbacks (sender, payload) {
  console.log("inside postback!!! =>", payload)
  if (payload.state in zodiaco) {
    let state = zodiaco[payload.state]
    console.log("state =>", state)
    for (var i = 0; i < state.messages.length; i++) {
      let ops = state.messages.length - 1 === i ? state.options : undefined
      let quickReplies = messenger.generateQuickReplies(sender, state.messages[i], ops)
      await sendRequest(quickReplies)
    }
  }
}
