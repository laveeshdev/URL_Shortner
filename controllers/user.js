const {v4 : uuid } = require('uuid')
const User = require('../models/user')
const { getUser , setUser } = require('../service/auth')

async function handleUserSignUp(req , res)  {
    const {name , email , password } = req.body ; 
    await User.create({
        name , 
        email, 
        password ,

    }) ; 
    return res.render("home")
    
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).render('login', {
            error: 'Email and password are required!',
        });
    }

    
        const myUser = await User.findOne({ email, password });
        if (!myUser) {
            return res.status(401).render('login', {
                error: 'Invalid credentials!',
            });
        }

        const sessionId = uuid() ; 
        setUser(sessionId , myUser )
        res.cookie("uid" , sessionId)
        

        // Redirect to home or dashboard on successful login
        return res.redirect('/');
    
}

module.exports = {
    handleUserSignUp ,
    handleUserLogin , 
}