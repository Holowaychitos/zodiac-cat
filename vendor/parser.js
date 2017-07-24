const handler = require('../FSM/handler')
const messenger = require('./messenger')
const utils = require('./utils')
const User = require('../models/User')

// check last state for actions or input waits
// GO to FSM HANDLER

module.exports = function parser (obj) {
  console.log('obj =>', obj)
  obj.entry.map(({messaging}) => {
    messaging.map(async item => {
      // get user
      let user = await User.findOne({fbID: item.sender.id})

      if (user) {
        console.log("user exists!")
        // check last state
        let waitFunction = utils.getLastStateWait(user)
        console.log("waitFUNCTION =>", waitFunction)
        if (waitFunction) {
          // if wait function, gets inputs text
          let inputText = utils.getMessageInput(item)
          // executes waitFunction
          console.log('Getting waited text =>', inputText)
          await utils[waitFunction].call(null, item.sender.id, inputText)
        } else {
          // if not wait function, send to FSM HANDLER
          handler(item)
        }
      } else {
        // not user
        console.log("user not exists")
        handler(item)
      }
    })
  })
}
