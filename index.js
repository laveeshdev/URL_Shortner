const express = require("express") ; 
const urlRoute = require('./routes/url')
const {connectToMongoDb} = require('./connect')
const app = express() ; 
const PORT = 8001 ; 


connectToMongoDb('mongodb://localhost:27017/short-url').then(()=>console.log("connected to mongo db ")
)

app.use(express.json())

app.use("/url" , urlRoute)


app.listen(PORT , console.log(`server started at port ${PORT}`))