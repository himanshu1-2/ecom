const express = require('express')

require('./db/mongoose')
const router = require('./routers/homer')
const userRouter = require('./routers/user')
const app = express()
app.use(express.json())
app.use(router)
app.use(userRouter)




//undefiend

//logout
//mongo
//heruko deployement
//mongo production db
//remove one api
//aaj ka task 



const port = process.env.port||3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
