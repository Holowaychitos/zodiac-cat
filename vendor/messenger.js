let messenger = {
  generateData: function (sender, text, replies = []) {
    let obj = {
      'recipient': {
        'id': sender
      },
      'message': {
        'text': text
      }
    }

    if (replies.length > 0) {
      obj.message['quick_replies'] = replies.map(item => {
        return {
          'content_type': 'text',
          'title': item.text,
          'payload': JSON.stringify(item.payload)
        }
      })
    }

    return obj
  }
}
module.exports = messenger
