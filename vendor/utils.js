const User = require('../models/User')
const _ = require('lodash')
const botStates = require('../FSM/botStates')
const stringSimilarity = require('string-similarity')
const messenger = require('./messenger')
const sendCard = require('./sendCard')

const signs = ['aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis']

let utils = {
  saveUser: async function (sender, state, sign) {
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
  },
  inputZodiac: async function (sender, value) {
    console.log("input zodiac!!!")
    let matches = stringSimilarity.findBestMatch(_.deburr(value), signs)
    let bestMatch = matches.bestMatch.target
    console.log(value, '<= bestMatch =>', bestMatch)

    let payload = {
      messages: [
        `¿Quisiste decir ${bestMatch} ?`
      ],
      options: [
        {text: 'shi 😦', payload: {state: 'confirm_zodiac'}},
        {text: 'ño 😟', payload: {state: 'capture_zodiac'}}
      ]
    }

    let data = await messenger.generateData(payload)
    console.log("data data =>", data)
    sendCard(sender, payload, 'confirm_inputted_zodiac')
  },
  inputDateZodiac: function (value) {
    console.log('input date zodiac function =>', value)
  },
  getLastStateWait: function(user){
    //Returns wait function of last state if exists
    if ('lastState' in user) {
      let lastState = botStates[user.lastState]
      if ('waitInputFunction' in lastState) {
        let waitInputFunction = lastState['waitInputFunction']
        return waitInputFunction
      } else {
        return ''
      }
    } else {
      return ''
    }
  },
  getMessageInput: function(item){
    if('message' in item && 'text' in item.message){
      return item.message.text
    } else {
      return ''
    }
  }
}

module.exports = utils
