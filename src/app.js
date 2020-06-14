const express = require('express')
const path=require('path')
require('./db/mongoose')
const router = require('./routers/homer')
const userRouter = require('./routers/user')
const payRouter = require('./routers/paymentRouter')
const app = express()
app.use(express.json())
app.use(router)
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(userRouter)
app.use(payRouter)

module.exports=app