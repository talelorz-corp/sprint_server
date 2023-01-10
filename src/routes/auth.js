const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/kakao', passport.authenticate('kakao'))
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=kakao'
}), (req, res)=>{
    console.log("user:", req.user)
    res.send('login ok')
})

module.exports = router
