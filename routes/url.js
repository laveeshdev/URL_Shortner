const express = require("express") ;
const {handleGenerateNewShortUrl , handleAnalytics} = require('../controllers/url')
const router = express.Router() ; 


router.post('/' , handleGenerateNewShortUrl)

router.get('/analytics/:id' , handleAnalytics)


module.exports = router ;