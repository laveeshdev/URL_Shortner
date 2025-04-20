const shortid = require('shortid')
const URL = require('../models/url')
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

module.exports = {
    handleGenerateNewShortUrl , 
}

