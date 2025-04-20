const express = require("express") ; 
const urlRoute = require('./routes/url')
const {connectToMongoDb} = require('./connect')
const URL = require('./models/url')
const app = express() ; 
const PORT = 8001 ; 


connectToMongoDb('mongodb://localhost:27017/short-url').then(()=>console.log("connected to mongo db ")
)

app.use(express.json())

app.use("/url" , urlRoute)
app.get('/:shortid' , async (req , res)=>{
    const shortId = req.params.shortid ;
    console.log(shortId);
    
    const entry = await URL.findOneAndUpdate({
        shortId},
        {
        $push : {visitHistory : {timestamp : Date.now()}}
    }) ;
    console.log(entry)
    // if (!entry) {
    //     return res.status(404).json({ error: "Short URL not found" });
    // }
    res.redirect(entry.redirectUrl)

})


app.listen(PORT , console.log(`server started at port ${PORT}`))