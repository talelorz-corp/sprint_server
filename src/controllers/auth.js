const userRepository = require('../repository/userRepository')
const passport = require('passport');
const express = require('express');
exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated() && req.user.userId){
        next();
    }else[
        res.status(403).send(new Error('10003'))
    ]
}


exports.SNSSignUp = async (req, res)=>{
    console.log(req.user)

    //is authenticated by SNS auth provider?
    if(!req.isAuthenticated()) {
        return res.status(403).send('20003')
    }

    if(!req.user || !req.user.snsId || !req.user.provider){
        return res.status(403).send('10003')
    }

    if(req.user.userId){
        return res.status(403).send('10004')//userId is already specified
    }

    let user = {
        serviceId: null,
        userId : req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        snsId : req.user.snsId,
        provider: req.user.provider,
        gender: parseInt(req.body.gender),
    }
    //register
    try{
        await userRepository.createUser(user)
    } catch(error){
        return res.status(401).send('signup error')
    }

    res.json(user)
}

//uses oauth2 access token to 
exports.oAuthLoginHandler = async (req, res, next)=>{
    console.log(req.body)
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(user.userId){
            console.log(user.userId, "has logged in")
            //registered user
            req.login(user, (loginError)=>{
                if(loginError){
                    console.error(loginError)
                    return next(loginError)
                }
                return res.send('auth ok')
            })
        } else{
            //null or empty userId means new user
            //authenticate the user, but the userId field will be empty
            req.login(user, (loginError)=>{
                if(loginError){
                    console.error(loginError)
                    return next(loginError)
                }
                return res.send('auth ok. not registered')
            })
        }
    })(req, res, next)

}

exports.oAuthSignupHandler = async(req, res, next)=>{
    //is authenticated by SNS auth provider?
    if(!req.isAuthenticated()) {
        return res.status(403).send('20003')
    }

    if(!req.user || !req.user.snsId || !req.user.provider){
        return res.status(403).send('10003')
    }

    if(req.user.userId){
        return res.status(403).send('10004')//userId is already specified
    }

    let user = {
        serviceId: null,
        userId : req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        snsId : req.user.snsId,
        provider: req.user.provider,
        gender: parseInt(req.body.gender),
    }
    //register
    try{
        await userRepository.createUser(user)
    } catch(error){
        return res.status(401).send('signup error')
    }
    console.log("registered new user ", req.user.userId)
    //should sign out and request login again.
    return req.logout(()=>{
        return res.json(user)
    })
}

exports.oAuthSignoutHandler = async(req, res, next)=>{
    if(!req.isAuthenticated()){
        return res.status(403).send('not signed in')
    }
    console.log(req.user.userId, " has logged out")
    return req.logout(()=>{
        return res.json('bye')
    })
}