const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const userRepository = require('../repository/userRepository')

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken)
        //tries to find a user
        try{
            let user = await userRepository.findUserSNS(profile.id, 'KAKAO')
            if(user){
            //existing user
                done(null, user)
            }
            else {
            //user is null new user.
                console.log("repository found null")
                user = {snsId: profile.id, provider:'KAKAO', userId: null}
                done(null, user)
            }
        } catch (error){
            console.error(error)
            done(error)
        }

    }))
}