require('dotenv').config({ path: '.env' })

const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const uuid = require('uuid/v4')
const config = require('./config')
const router = require('./routes')

const app = new Koa()

app.use(config.corsOrigin ? cors({ origin: config.corsOrigin }) : cors())

app.use(bodyParser())

// simple request middleware
app.use(async (ctx, next) => {
    ctx.request.id = uuid().replace(/-/g, '') // because hyphen sucks
    await next()
})

app.use(router.routes())

if (!module.parent)
    app.listen(config.port, () => {
        // eslint-disable-next-line no-console
        console.info(`DOC http://localhost:${config.port}/document`)
    })
