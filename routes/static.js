const express = require ("express") 
const router = express.Router() ; 
const {handleShowAllUrl } = require ("../controllers/url")
router.get('/' , handleShowAllUrl ) ; 

router.get('/signup' , (req , res) => {
    return res.render("signup")

})
router.get('/login' , (req , res) => {
    return res.render("login")

})
router.get('/create' , (req , res) => {
    return res.render("createUser")

})


module.exports = router ; 