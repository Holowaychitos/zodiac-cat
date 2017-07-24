const botStates = require('./botStates')
const sendCard = require('../vendor/sendCard')

module.exports = function handler (item) {
  console.log("FSM HANDLER! =>", item)
  let sender = item.sender.id
  if('postback' in item){
    console.log("HAS POSTBACK")
    let payload = JSON.parse(item.postback.payload)
    //make match with FSM STATE
    var state = botStates[payload.state]
    sendCard(sender, state, payload.state)
    //SEND CARD
  } else if ('message' in item && 'quick_reply' in item.message) {
    console.log("HAS QUICKREPLIES")
    let payload = JSON.parse(item.message.quick_reply.payload)
    //make match with FSM STATE
    var state = botStates[payload.state]
    sendCard(sender, state, payload.state)
    //SEND CARD
  } else {
    console.log("HAS MESSAGE =>", item.message.text)
    //insert AI HERE ?
  }
}
