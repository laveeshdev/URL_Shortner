const express = require("express") ;
const {handleGenerateNewShortUrl , handleAnalytics ,  handleRedirect} = require('../controllers/url')
const router = express.Router() ; 


router.post('/' , handleGenerateNewShortUrl)
// .get('/' , handleShowAllUrl )

router.get('/:shortid' , handleRedirect)


router.get('/analytics/:id' , handleAnalytics)


module.exports = router ;