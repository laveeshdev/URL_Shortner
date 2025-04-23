const express = require("express") ; 
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')
const staticRoute = require('./routes/static')
const {connectToMongoDb} = require('./connect')
const path = require('path')
const URL = require('./models/url')
const app = express() ; 
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')
// const cookieParser = require('cookie-parser')
const PORT = 8001 ; 


connectToMongoDb('mongodb://localhost:27017/short-url').then(()=>console.log("connected to mongo db ")
)
// app.use(cookieParser());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json()) ;
app.use(express.urlencoded({extended : true }))
app.set("view engine" , "ejs")
app.set("views" , path.resolve('./views'))
// app.set("views" , path.resolve('./views'))

app.get("/test" , async (req,res) =>{
    const allUrls = await URL.find({}) ; 
    return res.render("home") 
})

app.use("/url", restrictToLoggedInUserOnly, urlRoute)
app.use("/user" , userRoute)
app.use("/" , staticRoute)


app.listen(PORT , console.log(`server started at port ${PORT}`))