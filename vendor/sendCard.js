const User = require('../models/User')
const fetch = require('node-fetch')
const messenger = require('./messenger')
const token = process.env.FB_PAGE_TOKEN
const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${token}`

module.exports = async function sendCard (sender, state, stateName) {
  console.log('sendCard Function =>', state)
  // if ('action' in state) {
  //   if (state.action === 'saveUser') {
  //     await saveUser(sender, stateName)
  //   }
  // }

  //update state in user
  await saveUser(sender, stateName)

  let options = []

  if ('options' in state) {
    options = state.options
  }

  state.messages.map(async message => {
    let data = await messenger.generateData(sender, message, options)
    console.log('data =>', data)
    if (data) {
      sendRequest(data).then(function (response) {
        console.log('requeste SENT =>', response)
      })
    }
  })
}

function sendRequest (message) {
  console.log('send request message >', message)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}

async function saveUser (sender, state, sign) {
  console.log('save user function!!! =>', sender, state)
  let user = await User.findOne({fbID: sender})

  if (!user) {
    console.log('Saving New User')
    let newUser = new User({fbID: sender, lastState: state})
    await newUser.save()
    console.log('User Saved')
  } else {
    user.lastState = state
    if(sign){ user.sign = sign}
    await user.save()
  }
}
