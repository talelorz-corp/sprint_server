const express = require('express')
const passport = require('passport')
const router = express.Router()
const {SNSSignUp} = require('../controllers/auth')

router.get('/kakao', passport.authenticate('kakao'))
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=kakao'
}), (req, res)=>{
    console.log("user:" , req.user)
    res.send('sns_auth ok')
})
router.post('/sns_signup', SNSSignUp)
module.exports = router
