const fetch = require('node-fetch')
const token = process.env.FB_PAGE_TOKEN
const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${token}`

module.exports = function sendRequest (message) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}
