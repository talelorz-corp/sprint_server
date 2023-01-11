const passport = require('passport')
const kakao = require('./kakaoStrategy')
const oauth2 = require('./oauth2Strategy')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    oauth2()
    kakao()
}