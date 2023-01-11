const express = require('express')
const passport = require('passport')
const router = express.Router()
const {oAuthLoginHandler, SNSSignUp, oAuthSignupHandler, oAuthSignoutHandler} = require('../controllers/auth')


router.get('/kakao',passport.authenticate('kakao'))


router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=kakao'
}), (req, res)=>{
    console.log("user:" , req.user)
    res.send('sns_auth ok')
})

/*
router.get('/kakao/callback', (req, res)=>{
    console.log(req.body)
    res.send('ok')
})
*/
router.post('/oauth2', oAuthLoginHandler)
router.post('/sns_signup', SNSSignUp)
router.post('/oauth2_signup', oAuthSignupHandler)
router.get('/checkLogin', (req, res)=>{
    console.log("logged in as", req.user)
    if(req.isAuthenticated() && req.user) res.json(req.user)
    else res.send('Not logged in')
})
router.get('/logout', oAuthSignoutHandler)
module.exports = router
