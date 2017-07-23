
const verification = process.env.FB_APP_VERIFICATION
const parser = require('../vendor/parser')


// GET /{uri}?hub.mode=subscribe&hub.challenge={code}&hub.verify_token={token}
module.exports = function (router) {
  router.get('/bot', (ctx, next) => {
    if (ctx.query['hub.verify_token'] === verification) {
      ctx.body = ctx.query['hub.challenge']
    } else {
      ctx.body = 'Error, wrong validation token'
    }
  })

  router.post('/bot', async (ctx, next) => {
    ctx.body = 'ok'
    await next() // end request
    // console.log("BOT POST => ", JSON.stringify(ctx.request.body, null, 2))
    parser(ctx.request.body)
  })
}
