require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useMongoClient: true })

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  console.log(ctx.method, ctx.originalUrl)

  try {
    await next()
  } catch (error) {
    console.error(error)
    throw error
  }
})

require('./routes/bot')(router)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)
