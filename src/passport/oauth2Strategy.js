const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userRepository = require('../repository/userRepository')
const axios = require('axios');


module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'accessToken',
        passReqToCallback: false,
    }, async(userId, accessToken, done)=>{
        console.log('requesting info with access token ', accessToken)
        //fetch user snsid from accessToken
        const resourceServerUrl = "https://kapi.kakao.com/v2/user/me"
        let response = null
        try{
            response = await axios.get(resourceServerUrl, {
                params: {property_keys : ["kakao_account.gender"]},
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } catch(error){
            done(error)
        }


        //parse response
        const snsId = response.data.id
        const profile = response.data.properties
        //query database for user using the snsid
        try{
            let user = await userRepository.findUserSNS(snsId, 'KAKAO')
            if(user){
                //if existing user, invoke done with that user
                done(null, user)
            }
            else {
                //if nonexisting user, invoke done with a user object with empty serviceid field
                console.log("repository found null")
                user = {snsId: snsId, provider:'KAKAO', userId: null}
                done(null, user)
            }
        } catch (error){
            console.error(error)
            done(error)
        }

    }))
}