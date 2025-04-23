const shortid = require('shortid')
const URL = require('../models/url')


async function handleShowAllUrl(req , res)  {
    const allUrls = await URL.find({}) ; 
    return res.render("allUrls" , {urls : allUrls}) ;     
}

async function handleRedirect(req , res){
    const shortId = req.params.shortid ;
    console.log(shortId);
    
    const entry = await URL.findOneAndUpdate({
        shortId},
        {
        $push : {visitHistory : {timestamp : Date.now()}}
    }) ;
    console.log(entry)
    
    const newUrl = entry.redirectUrl ; 
   
    res.redirect(newUrl)

}


async function handleGenerateNewShortUrl(req , res) {
    const body = req.body ; 
    if(!body.url) return res.status(400).json({msg : "url is required "})
    
    const shortId = shortid() ; 
    console.log(shortId);
    
    await URL.create({
        shortId : shortId , 
        redirectUrl :  body.url , 
        visitHistory : []  , 
    })

    return res.json({id : shortId}); 
    
}

async function handleAnalytics(req, res) {
    const shortid = req.params.id ; 
    const entry = await URL.findOne({shortId}) ; 
    // res.json({entrys : entry})

    return res.json({ totalVisits : entry.visitHistory.length , analytics : entry.visitHistory })

    
}

module.exports = {
    handleGenerateNewShortUrl , 
    handleAnalytics , 
    handleShowAllUrl,
    handleRedirect ,
}

