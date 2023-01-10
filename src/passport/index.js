const passport = require('passport')
const kakao = require('./kakaoStrategy')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        console.log('deserialize user: ', user)
        done(null, user)
    })

    kakao()
}