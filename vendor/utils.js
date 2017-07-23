const User = require('../models/User')

let utils = {
  saveUser: async function (sender, state) {
    let user = await User.findOne({fbID: sender})

    if(!user){
      console.log("Saving New User")
      let newUser = new User({fbID: sender, lastState: state})
      await newUser.save()
      console.log("User Saved")
    }
  },
  inputZodiac: function (value) {
    console.log("input zodiac function =>", value)
  },
  inputZodiac: function (value) {
    console.log("input date zodiac function =>", inputZodiac)
  }
}

module.exports = utils
